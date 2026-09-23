import React, { useState } from 'react';
import woodDetailImg from '../assets/images/wood_craft_details_1790157581859.jpg';
import { Sparkles, Wind, Shield, CheckCircle2, Feather, Droplets } from 'lucide-react';

interface WoodItem {
  id: string;
  name: string;
  botanical: string;
  role: string;
  characteristics: string;
  scent: string;
  advantage: string;
  badge: string;
}

const woods: WoodItem[] = [
  {
    id: 'fichte',
    name: 'Nordische Fichte',
    botanical: 'Picea abies',
    role: 'Decken- & Wandvertäfelung',
    characteristics: 'Helle, seidig schimmernde Maserung mit feinen Jahresringen. Bringt Weite und Licht in den Wohnraum.',
    scent: 'Dezent harzig, warm und beruhigend wie ein sonniger Nadelwald.',
    advantage: 'Hervorragende Wärmedämmung, federleicht und hellt den Raum optisch auf.',
    badge: 'Licht & Weite',
  },
  {
    id: 'kiefer',
    name: 'Alpen-Kiefer',
    botanical: 'Pinus sylvestris',
    role: 'Schlafnische & Stirnwände',
    characteristics: 'Lebhafte Maserung mit markanten Ästen und warmem, honigfarbenem Holzton.',
    scent: 'Intensiver, ätherischer Pinienduft. Wirkt nachweislich pulsberuhigend und schlaffördernd.',
    advantage: 'Natürlicher Insektenschutz durch ätherische Harze; sorgt für tiefen, erholsamen Schlaf.',
    badge: 'Aroma & Schlaf',
  },
  {
    id: 'laerche',
    name: 'Gebirgs-Lärche',
    botanical: 'Larix decidua',
    role: 'Eingangsbereich & Nassraum-Details',
    characteristics: 'Dichtes, rotbraunes Hartholz der Nadelbäume mit hoher Zähigkeit.',
    scent: 'Würzig-erdiger Duft mit feiner Harznote.',
    advantage: 'Von Natur aus extrem wasserabweisend und widerstandsfähig gegen Abrieb und Nässe.',
    badge: 'Robust & Wetterfest',
  },
  {
    id: 'pappel',
    name: 'Leichtbau-Pappel',
    botanical: 'Populus alba',
    role: 'Schrankkorpusse & Innenauszüge',
    characteristics: 'Gleichmäßige, fast astfreie Struktur mit samtig matter Textur.',
    scent: 'Sehr mild, neutral und sauber.',
    advantage: 'Spart über 40% Gewicht gegenüber Standard-Spanplatten bei hervorragender Formstabilität.',
    badge: 'Ultraleicht & Agil',
  },
  {
    id: 'eiche',
    name: 'Wildeiche Massiv',
    botanical: 'Quercus robur',
    role: 'Küchen-Arbeitsplatte & Klapptisch',
    characteristics: 'Ausdrucksstarke Spiegel, feine Risse und unverwüstliche Härte.',
    scent: 'Edel-holzig, geerdet und warm.',
    advantage: 'Hält Generationen stand. Schnittfest, formstabil und samtweich von Hand geschliffen.',
    badge: 'Unverwüstlich',
  },
];

export const WoodShowcase: React.FC = () => {
  const [selectedWood, setSelectedWood] = useState<WoodItem>(woods[0]);

  return (
    <section id="hoelzer" className="py-24 bg-[#F5EFE8]/40 border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs uppercase tracking-widest text-[#577057] font-semibold mb-3">
            02. Handwerk & Baubiologie
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#2C241F] tracking-tight leading-tight">
            Fünf Hölzer. Ein gesunder Lebensraum.
          </h2>
          <p className="mt-4 text-base text-[#6B5C51] leading-relaxed">
            Jede Holzart erfüllt eine präzise Funktion im Van — von der federleichten Pappel bis zur
            unverwüstlichen Eiche. Veredelt mit 100% ökologischen <strong>Auro Naturölen</strong>,
            die die Poren offen halten, damit das Holz weiter atmen und duften kann.
          </p>
        </div>

        {/* Interactive Wood Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Wood Selection & Specs */}
          <div className="lg:col-span-6 space-y-6">
            {/* Functional Selector Buttons */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-[#EFE8DF] rounded-xl border border-[#DFD5C8]">
              {woods.map((wood) => {
                const isActive = wood.id === selectedWood.id;
                return (
                  <button
                    key={wood.id}
                    onClick={() => setSelectedWood(wood)}
                    type="button"
                    className={`px-3.5 py-2 text-xs md:text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-white text-[#2C241F] shadow-sm font-semibold'
                        : 'text-[#6B5C51] hover:text-[#2C241F] hover:bg-white/50'
                    }`}
                  >
                    {wood.name.split(' ')[1] || wood.name}
                  </button>
                );
              })}
            </div>

            {/* Selected Wood Card */}
            <div className="bg-white rounded-2xl p-7 border border-[#E8DFD5] shadow-sm transition-all duration-300">
              <div className="flex items-center justify-between gap-4 mb-2">
                <div>
                  <h3 className="text-2xl font-serif font-semibold text-[#2C241F]">
                    {selectedWood.name}
                  </h3>
                  <div className="text-xs italic text-[#84542B] font-mono">
                    {selectedWood.botanical}
                  </div>
                </div>
                <div className="text-xs font-semibold px-3 py-1 bg-[#F3F6F3] text-[#364836] rounded-full border border-[#D5E2D5]">
                  {selectedWood.badge}
                </div>
              </div>

              <div className="text-xs font-medium text-[#577057] uppercase tracking-wide mt-2">
                Einsatzort im Van: <span className="text-[#2C241F] capitalize font-semibold">{selectedWood.role}</span>
              </div>

              <p className="text-sm text-[#5C5046] mt-4 leading-relaxed">
                {selectedWood.characteristics}
              </p>

              <div className="mt-6 pt-6 border-t border-[#F0EBE3] space-y-4">
                <div className="flex items-start gap-3">
                  <Wind className="w-4 h-4 text-[#84542B] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-[#2C241F]">Duftcharakter: </span>
                    <span className="text-xs text-[#6B5C51]">{selectedWood.scent}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#577057] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-[#2C241F]">Baubiologischer Vorteil: </span>
                    <span className="text-xs text-[#6B5C51]">{selectedWood.advantage}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Auro Naturöle Spotlight Card */}
            <div className="bg-[#FAF6F0] rounded-2xl p-6 border border-[#DECFC1]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#E5D7C7] flex items-center justify-center text-[#5A3F29]">
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base font-serif font-semibold text-[#2C241F]">
                    Veredelung mit Auro Naturölen
                  </h4>
                  <div className="text-xs text-[#84542B]">100% lösungsmittelfrei &amp; rein pflanzlich</div>
                </div>
              </div>
              <p className="text-xs text-[#6B5C51] leading-relaxed">
                Wir versiegeln kein Holz mit Plastiklacken. Auro Naturöle auf Leinöl- und Bienenwachsbasis
                ziehen tief in die Faser ein, lassen das Holz atmungsaktiv und sorgen für ein
                feuchtigkeitsausgleichendes Raumklima. <em>Es riecht nach echter Natur und frischem Handwerk.</em>
              </p>
            </div>
          </div>

          {/* Wood Craft Detail Imagery */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#E8DFD5] shadow-sm bg-white">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={woodDetailImg}
                  alt="Detailaufnahme von geöltem Massivholz mit weichen Kanten und Auro Seidenglanz"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 bg-white">
                <div className="flex items-center justify-between text-xs text-[#6B5C51] mb-2">
                  <span>Haptik &amp; Kantenbearbeitung</span>
                  <span>Meisterhandwerk</span>
                </div>
                <h4 className="text-lg font-serif font-semibold text-[#2C241F]">
                  Handschmeichler mit samtiger Seidenmatt-Oberfläche
                </h4>
                <p className="text-xs text-[#6B5C51] mt-2 leading-relaxed">
                  Jede Kurve, jeder Griff und jede Tischkante wird mehrfach von Hand mit feinstem Korn geschliffen
                  und in drei Durchgängen mit Auro Hartöl einmassiert. So entsteht ein samtiges Tastgefühl, das
                  man bei jeder Berührung spürt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
