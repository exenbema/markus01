import React from 'react';
import interiorImg from '../assets/images/interior_wood_living_1790157568765.jpg';
import sceneryImg from '../assets/images/vanlife_freedom_scenery_1790157594177.jpg';
import { Coffee, Wind, Moon, Heart } from 'lucide-react';

export const VanlifeMoments: React.FC = () => {
  return (
    <section id="gefuehl" className="py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs uppercase tracking-widest text-[#577057] font-semibold mb-3">
            01. Das Lebensgefühl
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#2C241F] tracking-tight leading-tight">
            Ankommen. Durchatmen. Unterwegs zu Hause sein.
          </h2>
          <p className="mt-4 text-base text-[#6B5C51] leading-relaxed">
            Reisefieber ist die Lust, hinter der nächsten Kurve ein neues Panorama zu entdecken —
            und am Abend in ein behagliches, duftendes Nest zurückzukehren.
          </p>
        </div>

        {/* Visual Storytelling Grid (More Images, Few Words) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Visual: Interior living */}
          <div className="lg:col-span-7 group relative overflow-hidden rounded-2xl border border-[#E8DFD5] shadow-sm bg-white">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={interiorImg}
                alt="Gemütlicher Naturholz-Innenraum des Wohnmobils mit massiver Eichenplatte und Leinen"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 bg-gradient-to-b from-white to-[#FDFBF7]">
              <div className="flex items-center gap-2 text-xs text-[#577057] font-medium mb-1">
                <span>Wohnen & Geborgenheit</span>
                <span aria-hidden="true">·</span>
                <span>Fichte & Eiche massiv</span>
              </div>
              <h3 className="text-xl font-serif font-semibold text-[#2C241F]">
                Ein Raum, der atmet und nach Wald riecht.
              </h3>
              <p className="text-sm text-[#6B5C51] mt-2 font-light">
                Keine Dünste von Klebstoffen oder Kunststoffen. Das Vollholz sorgt für eine
                optimale Luftfeuchtigkeit und einen erholsamen, tiefen Schlaf wie in einer Almhütte.
              </p>
            </div>
          </div>

          {/* Secondary Visual: Open doors into the wild */}
          <div className="lg:col-span-5 space-y-8">
            <div className="group relative overflow-hidden rounded-2xl border border-[#E8DFD5] shadow-sm bg-white">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={sceneryImg}
                  alt="Blick aus den geöffneten Hecktüren auf Bergtal und Fichtenwald"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-5 bg-gradient-to-b from-white to-[#FDFBF7]">
                <div className="flex items-center gap-2 text-xs text-[#577057] font-medium mb-1">
                  <span>Morgenritual</span>
                  <span aria-hidden="true">·</span>
                  <span>Freier Horizont</span>
                </div>
                <h4 className="text-lg font-serif font-semibold text-[#2C241F]">
                  Frischer Kaffee bei offenem Heck
                </h4>
                <p className="text-xs text-[#6B5C51] mt-1.5 leading-relaxed">
                  Die ersten Sonnenstrahlen wärmen das Holz. Ein Schluck handgebrühter Kaffee,
                  während der Tau über den Wiesen aufsteigt.
                </p>
              </div>
            </div>

            {/* Three Poetic Emotion Triggers */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F5EFE8]/70 border border-[#E5DAD0]">
                <Coffee className="w-5 h-5 text-[#84542B] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-sm font-semibold text-[#2C241F]">Der Duft von Freiheit</h5>
                  <p className="text-xs text-[#6B5C51] mt-0.5">
                    Kiefernharze und Auro Leinöl mischen sich mit frischer Morgenluft.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F0F5F0]/70 border border-[#D7E3D7]">
                <Moon className="w-5 h-5 text-[#455B45] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-sm font-semibold text-[#2C241F]">Stille Nächte ohne Landstrom</h5>
                  <p className="text-xs text-[#6B5C51] mt-0.5">
                    Kein Brummen, kein Stress. Die 330 Ah Batterie versorgt alles leise und autark.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
