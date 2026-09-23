import React, { useState } from 'react';
import { NatureAudioPlayer } from './NatureAudioPlayer';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Zone 1: Single Text Element Brand Wordmark */}
        <a
          href="#"
          className="text-xl md:text-2xl font-serif font-semibold tracking-tight text-[#2C241F] hover:text-[#455B45] transition-colors"
        >
          Wohlraum Van
        </a>

        {/* Zone 2: 4-6 Clean Text Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5C5046]">
          <a
            href="#gefuehl"
            className="hover:text-[#2C241F] transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-[#577057] hover:after:w-full after:transition-all"
          >
            Das Gefühl
          </a>
          <a
            href="#hoelzer"
            className="hover:text-[#2C241F] transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-[#577057] hover:after:w-full after:transition-all"
          >
            Naturhölzer
          </a>
          <a
            href="#elektroanlage"
            className="hover:text-[#2C241F] transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-[#577057] hover:after:w-full after:transition-all"
          >
            Victron Elektrik
          </a>
          <a
            href="#autarkie-rechner"
            className="hover:text-[#2C241F] transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-[#577057] hover:after:w-full after:transition-all"
          >
            Autarkie-Dashboard
          </a>
          <a
            href="#kontakt"
            className="hover:text-[#2C241F] transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-[#577057] hover:after:w-full after:transition-all"
          >
            Kontakt
          </a>
        </nav>

        {/* Zone 3: Actions (Audio Ambiance + CTA) */}
        <div className="hidden sm:flex items-center gap-4">
          <NatureAudioPlayer />
          <a
            href="#kontakt"
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#455B45] hover:bg-[#364836] rounded-full transition-all duration-200 shadow-sm whitespace-nowrap"
          >
            Anfrage senden
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <NatureAudioPlayer />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#5C5046] hover:text-[#2C241F]"
            aria-label="Navigation öffnen"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E8DFD5] bg-[#FAF8F5] px-6 py-4 space-y-3">
          <a
            href="#gefuehl"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#5C5046] hover:text-[#2C241F]"
          >
            Das Gefühl
          </a>
          <a
            href="#hoelzer"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#5C5046] hover:text-[#2C241F]"
          >
            Naturhölzer & Auro
          </a>
          <a
            href="#elektroanlage"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#5C5046] hover:text-[#2C241F]"
          >
            Victron Elektrik
          </a>
          <a
            href="#autarkie-rechner"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#5C5046] hover:text-[#2C241F]"
          >
            Autarkie-Dashboard
          </a>
          <a
            href="#kontakt"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#455B45]"
          >
            Kontakt & Kennenlernen
          </a>
        </div>
      )}
    </header>
  );
};
