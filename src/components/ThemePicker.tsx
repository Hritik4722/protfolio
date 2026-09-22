'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const themes = [
  { name: 'light', bg: '#ffffff', accent: '#FACC15', border: '#000000' },
  { name: 'slate', bg: '#020617', accent: '#a3e635', border: '#cbd5e1' },
  { name: 'midnight', bg: '#000000', accent: '#06b6d4', border: '#e5e7eb' },
  { name: 'obsidian', bg: '#09090b', accent: '#f97316', border: '#e4e4e7' },
  { name: 'bubblegum', bg: '#2e1065', accent: '#f472b6', border: '#fbcfe8' },
];

export default function ThemePicker() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="flex gap-2 sm:gap-3 w-[140px] h-5 sm:h-6"></div>;
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {themes.map((t) => (
        <button
          key={t.name}
          onClick={() => setTheme(t.name)}
          aria-label={`Switch to ${t.name} theme`}
          className="w-5 h-5 sm:w-6 sm:h-6 border-2 transition-all hover:-translate-y-1"
          style={{
            background: `linear-gradient(135deg, ${t.bg} 50%, ${t.accent} 50%)`,
            borderColor: theme === t.name ? t.border : 'transparent',
            boxShadow: theme === t.name ? `2px 2px 0 ${t.accent}` : 'none',
            opacity: theme === t.name ? 1 : 0.5,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => {
            if (theme !== t.name) e.currentTarget.style.opacity = '0.5';
          }}
        />
      ))}
    </div>
  );
}
