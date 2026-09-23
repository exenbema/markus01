import React from 'react';
import { Heart, Compass, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#231D19] text-[#E8DFD5] border-t border-[#3B322C] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#3B322C]">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <span className="text-2xl font-serif font-semibold text-white tracking-tight">
              Wohlraum Van
            </span>
            <p className="text-xs text-[#BFAEA0] leading-relaxed max-w-sm">
              Reisen und Wohnen im gesunden Vollholz-Wohnmobil. Handgefertigt mit Fichte, Kiefer, Lärche,
              Pappel und Eiche — veredelt mit rein biologischen Auro Naturölen für echtes Wohlbefinden
              und maximale Autarkie mit Victron Energy.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-[#A8988B]">
              <span>Handwerk mit Herz</span>
              <span aria-hidden="true">·</span>
              <span>100% Giftstofffrei</span>
              <span aria-hidden="true">·</span>
              <span>Made for Freedom</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#BFAEA0]">
              <li>
                <a href="#gefuehl" className="hover:text-white transition-colors">
                  Das Lebensgefühl
                </a>
              </li>
              <li>
                <a href="#hoelzer" className="hover:text-white transition-colors">
                  Die fünf Hölzer &amp; Auro
                </a>
              </li>
              <li>
                <a href="#elektroanlage" className="hover:text-white transition-colors">
                  Victron Elektroanlage
                </a>
              </li>
              <li>
                <a href="#autarkie-rechner" className="hover:text-white transition-colors">
                  Autarkie-Dashboard
                </a>
              </li>
              <li>
                <a href="#kontakt" className="hover:text-white transition-colors">
                  Kontakt &amp; Kennenlernen
                </a>
              </li>
            </ul>
          </div>

          {/* Key Specs Mirror & Contact */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Direkter Kontakt &amp; Details
            </h4>
            <div className="space-y-2 text-xs text-[#BFAEA0]">
              <div>
                <span className="text-[#8F7E71] block text-[11px]">E-Mail</span>
                <a href="mailto:exenberger.markus@gmail.com" className="text-white hover:text-[#BFAEA0] transition-colors font-medium">
                  exenberger.markus@gmail.com
                </a>
              </div>
              <div>
                <span className="text-[#8F7E71] block text-[11px]">WhatsApp / Telegram</span>
                <a href="https://wa.me/436801573635" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#BFAEA0] transition-colors font-medium">
                  +43 6801573635
                </a>
              </div>
              <div>
                <span className="text-[#8F7E71] block text-[11px]">Instagram</span>
                <a href="https://www.instagram.com/tinyandvan" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#BFAEA0] transition-colors font-medium">
                  @tinyandvan
                </a>
              </div>
            </div>

            <div className="pt-2 border-t border-[#3B322C]">
              <div className="text-[11px] text-[#8F7E71] uppercase tracking-wider mb-1">Victron Autarkie-Setup</div>
              <p className="text-xs text-[#A8988B] font-mono leading-relaxed">
                330 Ah LiFePO4 · MultiPlus 3000 · Orion XS 50A · MPPT 100/50 · 700W PV
              </p>
            </div>
          </div>
        </div>

        {/* Quiet copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8F7E71] gap-4">
          <div>
            &copy; {new Date().getFullYear()} Wohlraum Van · Gesundes Reisen im Vollholz-Wohnmobil.
          </div>
          <div className="flex items-center gap-6">
            <a href="#kontakt" className="hover:text-[#BFAEA0] transition-colors">
              Impressum &amp; Datenschutz
            </a>
            <a href="#kontakt" className="hover:text-[#BFAEA0] transition-colors">
              Ausbau-Anfrage
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
