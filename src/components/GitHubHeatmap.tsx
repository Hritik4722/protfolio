'use client';

import { useState } from 'react';

export type Day = {
  date: string;
  countText: string;
  level: number;
};

export type Week = Day[];

const LEVEL_COLORS = [
  'bg-gray-100',        // 0
  'bg-yellow-200',      // 1  
  'bg-yellow-300',      // 2
  'bg-yellow-400',      // 3
  'bg-accent',          // 4 (this maps to #FACC15)
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function GitHubHeatmap({ weeks, totalContributions, username }: { weeks: Week[]; totalContributions: string; username: string }) {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);

  // Calculate month labels with positions
  const monthLabels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, colIdx) => {
    const validDay = week.find(d => d.date !== '');
    if (validDay) {
      const month = new Date(validDay.date).getMonth();
      if (month !== lastMonth) {
        monthLabels.push({ label: MONTHS[month], col: colIdx });
        lastMonth = month;
      }
    }
  });

  return (
    <div className="border-3 border-black bg-white p-4 sm:p-6 shadow-[4px_4px_0_#000] relative max-w-full">
      <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
        <p className="font-mono text-xs sm:text-sm text-gray-600">
          {totalContributions} contributions in the last year
        </p>
      </div>

      {/* Graph container — horizontally scrollable on mobile, stretches full width on desktop */}
      <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full">
        <div className="min-w-[700px] w-full pb-2 flex flex-col">
          
          {/* Month labels */}
          <div className="relative h-4 mb-2 w-full flex">
            <div className="w-8 shrink-0 mr-[2px] md:mr-[3px]"></div>
            <div className="relative flex-1">
              {monthLabels.map((m, i) => (
                <span
                  key={i}
                  className="absolute font-mono text-[10px] text-gray-500"
                  style={{ left: `${(m.col / weeks.length) * 100}%` }}
                >
                  {m.label}
                </span>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="flex gap-[2px] md:gap-[3px] w-full">
            {/* Day labels */}
            <div className="flex flex-col gap-[2px] md:gap-[3px] w-8 shrink-0">
              {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((label, i) => (
                <div key={i} className="flex-1 flex items-center justify-end pr-2">
                  <span className="font-mono text-[10px] leading-none text-gray-500">{label}</span>
                </div>
              ))}
            </div>

            {/* Weeks */}
            {weeks.map((week, weekIdx) => (
              <div key={weekIdx} className="flex flex-col gap-[2px] md:gap-[3px] flex-1 min-w-0">
                {week.map((day, dayIdx) => (
                  <div
                    key={dayIdx}
                    className={`w-full aspect-square ${
                      day.level === -1
                        ? 'bg-transparent'
                        : LEVEL_COLORS[day.level]
                    } ${day.level >= 0 ? 'border border-black/10' : ''}`}
                    onMouseEnter={(e) => {
                      if (day.date) {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setTooltip({
                          x: rect.left + rect.width / 2,
                          y: rect.top - 8,
                          text: day.countText,
                        });
                      }
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between mt-4 gap-3">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs sm:text-sm font-bold hover:text-accent transition-colors"
        >
          @{username} →
        </a>
        <div className="flex items-center gap-1">
          <span className="font-mono text-[10px] sm:text-xs text-gray-500 mr-1">Less</span>
          {LEVEL_COLORS.map((color, i) => (
            <div key={i} className={`w-[9px] h-[9px] sm:w-[11px] sm:h-[11px] ${color} border border-black/10`} />
          ))}
          <span className="font-mono text-[10px] sm:text-xs text-gray-500 ml-1">More</span>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 bg-black text-white font-mono text-xs px-2 py-1 pointer-events-none -translate-x-1/2 -translate-y-full whitespace-nowrap"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
