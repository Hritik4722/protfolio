'use client';

import { useState } from 'react';
import ThemePicker from '@/components/ThemePicker';

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background border-b-[3px] border-border-brutal">
      <div className="max-w-6xl mx-auto px-4 py-3 sm:px-6 sm:py-4 flex flex-col md:flex-row md:items-center justify-between transition-all duration-200">
        
        {/* Top bar (Always visible) */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <a href="#" className="font-pixel text-sm sm:text-base tracking-[-1.5px] sm:tracking-[-2px] mt-1">
            hritik.online
          </a>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden font-mono text-[10px] sm:text-xs font-bold px-3 py-1.5 bg-surface text-foreground border-2 border-border-brutal shadow-[2px_2px_0_var(--shadow-color)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? '[ CLOSE ]' : '[ MENU ]'}
          </button>
        </div>

        {/* Desktop Nav & Mobile Dropdown */}
        <div 
          className={`${
            isMenuOpen ? 'flex' : 'hidden'
          } md:flex flex-col md:flex-row items-stretch md:items-center gap-5 md:gap-6 mt-6 md:mt-0 pb-3 md:pb-0 w-full md:w-auto`}
        >
          {/* Theme Picker Container */}
          <div className="flex items-center justify-between md:justify-start gap-4 p-3 md:p-0 border-2 border-border-brutal md:border-none bg-surface md:bg-transparent">
            <span className="md:hidden font-mono text-xs font-bold text-muted uppercase tracking-wider">
              Theme
            </span>
            <ThemePicker />
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-row w-full md:w-auto gap-3 md:gap-4">
            <a
              href="mailto:yadavhritik158@gmail.com"
              className="flex-1 md:flex-none text-center font-mono text-xs sm:text-sm font-bold px-3 py-2.5 md:px-4 md:py-2 bg-surface text-foreground border-2 border-border-brutal shadow-[4px_4px_0_var(--shadow-color)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150"
            >
              Email
            </a>
            <a
              href="/resume"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-none text-center font-mono text-xs sm:text-sm font-bold px-3 py-2.5 md:px-4 md:py-2 bg-accent text-black border-2 border-border-brutal shadow-[4px_4px_0_var(--shadow-color)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150"
            >
              Resume
            </a>
          </div>
        </div>

      </div>
    </nav>
  );
}
