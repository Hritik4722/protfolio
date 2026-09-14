import GitHubHeatmap, { Day, Week } from './GitHubHeatmap';

async function fetchGitHubContributions(username: string) {
  try {
    const res = await fetch(`https://github.com/users/${username}/contributions`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!res.ok) {
      return null;
    }
    
    const html = await res.text();
    
    // Parse total contributions
    const totalMatch = html.match(/<h2[^>]*>\s*([0-9,]+)\s*contributions/i);
    const totalContributions = totalMatch ? totalMatch[1] : '0';

    // Parse days
    const days: Day[] = [];
    
    // Extract all <td> elements
    const tdRegex = /<td([^>]*class="ContributionCalendar-day"[^>]*)><\/td>/g;
    const tdMatches = [...html.matchAll(tdRegex)];
    
    // Extract all tool-tips
    const tooltipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/g;
    const tooltips: Record<string, string> = {};
    for (const match of html.matchAll(tooltipRegex)) {
      tooltips[match[1]] = match[2];
    }

    for (const match of tdMatches) {
      const attrs = match[1];
      const dateMatch = attrs.match(/data-date="([^"]+)"/);
      const idMatch = attrs.match(/id="([^"]+)"/);
      const levelMatch = attrs.match(/data-level="([^"]+)"/);

      if (dateMatch && idMatch && levelMatch) {
        const id = idMatch[1];
        days.push({
          date: dateMatch[1],
          level: parseInt(levelMatch[1], 10),
          countText: tooltips[id] || `${levelMatch[1]} contributions`,
        });
      }
    }

    // Sort days chronologically
    days.sort((a, b) => a.date.localeCompare(b.date));

    // Group into weeks
    const weeks: Week[] = [];
    if (days.length > 0) {
      let currentWeek: Week = [];
      
      // Pad the first week if necessary
      const firstDayDate = new Date(days[0].date);
      const firstDayOfWeek = firstDayDate.getDay(); // 0 = Sunday
      
      for (let i = 0; i < firstDayOfWeek; i++) {
        currentWeek.push({ date: '', level: -1, countText: '' });
      }

      for (const day of days) {
        currentWeek.push(day);
        if (currentWeek.length === 7) {
          weeks.push(currentWeek);
          currentWeek = [];
        }
      }

      // Pad the last week if necessary
      if (currentWeek.length > 0) {
        while (currentWeek.length < 7) {
          currentWeek.push({ date: '', level: -1, countText: '' });
        }
        weeks.push(currentWeek);
      }
    }

    return { totalContributions, weeks };
  } catch (error) {
    console.error("Failed to fetch GitHub contributions:", error);
    return null;
  }
}

export default async function GitHubStats() {
  const username = "Hritik4722";
  const data = await fetchGitHubContributions(username);

  return (
    <section id="github" className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="font-mono text-2xl md:text-3xl font-bold mb-10">{"//"} github</h2>
      
      {data && data.weeks.length > 0 ? (
        <GitHubHeatmap 
          weeks={data.weeks} 
          totalContributions={data.totalContributions} 
          username={username} 
        />
      ) : (
        <div className="border-3 border-black bg-white p-6 shadow-[4px_4px_0_#000] relative flex flex-col items-center text-center">
          <p className="font-mono text-gray-600 mb-2">Could not load contribution data for @{username}.</p>
          <p className="font-sans text-sm text-gray-500 max-w-md">
            Please check the console or ensure the GitHub username is correct.
          </p>
        </div>
      )}
    </section>
  );
}
