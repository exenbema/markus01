import React from 'react';
import { ArrowRight, Compass, ShieldCheck, SunMedium } from 'lucide-react';
import heroImg from '../assets/images/hero_camper_nature_1790157555473.jpg';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-end pb-16 pt-24 overflow-hidden">
      {/* Background Image Container with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Wohlfühl Wohnmobil am See im goldenen Morgenlicht mit Solaranlage"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1713]/90 via-[#1C1713]/50 to-[#1C1713]/25" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-3xl">
          {/* Subtle unboxed kicker */}
          <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-[#E4D7C8] mb-4 tracking-wide">
            <span>Handgefertigter Naturholz-Ausbau</span>
            <span aria-hidden="true">·</span>
            <span>Auro Bio-Pflanzenöle</span>
            <span aria-hidden="true">·</span>
            <span>Volle Victron Autarkie</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold text-white tracking-tight leading-[1.1] mb-6 [text-wrap:balance]">
            Freiheit beginnt, wo dein Zuhause nach Zirbe und Wald duftet.
          </h1>

          <p className="text-lg md:text-xl text-[#E8DFC8] font-light leading-relaxed mb-8 max-w-2xl">
            Reisen und Wohnen im gesunden Vollholz-Van. Kein Plastik, keine künstlichen Lacke —
            nur reine Hölzer, warmes Licht und grenzenlose Unabhängigkeit durch 330&nbsp;Ah LiFePO4 &amp; 700&nbsp;Watt Dach-Solar.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#autarkie-rechner"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-[#251D18] bg-[#FAF8F5] hover:bg-white rounded-full transition-all duration-200 shadow-md hover:shadow-lg group whitespace-nowrap"
            >
              <span>Autarkie berechnen</span>
              <ArrowRight className="w-4 h-4 text-[#455B45] group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#hoelzer"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-white/95 border border-white/30 hover:border-white/70 hover:bg-white/10 rounded-full backdrop-blur-xs transition-all duration-200 whitespace-nowrap"
            >
              <Compass className="w-4 h-4 text-[#E2CDAF]" />
              <span>Die 5 Hölzer fühlen</span>
            </a>
          </div>
        </div>

        {/* Essential Specs Bar (Typographic, No Pills) */}
        <div className="mt-14 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
          <div>
            <div className="text-2xl lg:text-3xl font-serif font-semibold tracking-tight tabular-nums text-white">
              330 <span className="text-lg font-sans font-light text-[#E8DFD5]">Ah</span>
            </div>
            <div className="text-xs text-[#D8C7B5] mt-1">LiFePO4 Batterie · 4.224 Wh</div>
          </div>

          <div>
            <div className="text-2xl lg:text-3xl font-serif font-semibold tracking-tight tabular-nums text-white">
              700 <span className="text-lg font-sans font-light text-[#E8DFD5]">W</span>
            </div>
            <div className="text-xs text-[#D8C7B5] mt-1">PV-Solarmodule am Dach</div>
          </div>

          <div>
            <div className="text-2xl lg:text-3xl font-serif font-semibold tracking-tight tabular-nums text-white">
              3.000 <span className="text-lg font-sans font-light text-[#E8DFD5]">VA</span>
            </div>
            <div className="text-xs text-[#D8C7B5] mt-1">Victron MultiPlus Sinus</div>
          </div>

          <div>
            <div className="text-2xl lg:text-3xl font-serif font-semibold tracking-tight text-white">
              5 <span className="text-lg font-sans font-light text-[#E8DFD5]">Hölzer</span>
            </div>
            <div className="text-xs text-[#D8C7B5] mt-1">Auro Naturöl veredelt</div>
          </div>
        </div>
      </div>
    </section>
  );
};
