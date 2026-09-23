import React from 'react';
import { Battery, Zap, Sun, Gauge, Shield, Cpu } from 'lucide-react';

export const ElectricalSystem: React.FC = () => {
  const components = [
    {
      icon: Battery,
      title: '330 Ah LiFePO4 Batterie',
      subtitle: 'Lithium-Eisenphosphat · 12.8V',
      capacity: '4.224 Wh',
      description: 'Gewaltige nutzbare Speicherkapazität. Eigensicher, extrem zyklenfest (über 3.500 Zyklen bei 80% Entladetiefe) und mit integriertem Bluetooth Smart BMS für Zellüberwachung.',
      highlight: 'Bis zu 95% nutzbare Energie ohne Spannungsabfall',
    },
    {
      icon: Zap,
      title: 'Victron MultiPlus 12/3000/120',
      subtitle: 'Reiner Sinus-Wechselrichter & Ladegerät',
      capacity: '3.000 VA / 2.400 W Dauerlast',
      description: 'Versorgt anspruchsvolle 230V Verbraucher spielend: Induktionsherd, italienische Siebträgermaschine, Reiseföhn oder Werkzeug. PowerAssist verhindert Überlastung bei schwachen Campingplatz-Sicherungen.',
      highlight: '6.000 Watt Spitzenleistung zum Anlauf von Großgeräten',
    },
    {
      icon: Gauge,
      title: 'Victron Orion XS 12/12-50A',
      subtitle: 'Intelligenter DC-DC Ladebooster',
      capacity: '50A Ladestrom (~700 W)',
      description: 'Lädt die Bordbatterie während der Fahrt rasend schnell und schonend über die Lichtmaschine nach. Extrem kompakt mit 98,5% Wirkungsgrad und adaptiver 4-Stufen-Ladekennlinie.',
      highlight: 'Nur 3 Stunden Fahrzeit laden ca. 50% der 330Ah Batterie auf',
    },
    {
      icon: Sun,
      title: '700 Watt PV Dach-Anlage',
      subtitle: 'Hocheffiziente Schindel-Monokristallin-Module',
      capacity: '700 W Peak',
      description: 'Vollflächig auf dem Van-Dach integriert. Liefert an sonnigen Tagen bis zu 3.500 Wh sauberste Sonnenenergie direkt ins System – genug für autarkes Leben ohne fremden Stromanschluss.',
      highlight: 'Hervorragende Ausbeute auch bei schrägem Lichteinfall',
    },
    {
      icon: Cpu,
      title: 'Victron SmartSolar MPPT 100/50',
      subtitle: 'Ultra-schneller Solar-Laderegler',
      capacity: 'Bis 98% Effizienz',
      description: 'Modernstes Maximum Power Point Tracking (MPPT). Findet selbst bei Teilverschattung durch Bäume in Millisekunden den optimalen Arbeitspunkt für maximalen Stromertrag.',
      highlight: 'Echtzeit-Überwachung per VictronConnect App',
    },
  ];

  return (
    <section id="elektroanlage" className="py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs uppercase tracking-widest text-[#577057] font-semibold mb-3">
            03. Autarke Energieversorgung
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#2C241F] tracking-tight leading-tight">
            Kein Landstrom nötig. Maximale Unabhängigkeit.
          </h2>
          <p className="mt-4 text-base text-[#6B5C51] leading-relaxed">
            Die elektrische Anlage wurde kompromisslos auf echte Autarkie dimensioniert. Hochwertigste
            Victron Energy Komponenten arbeiten perfekt aufeinander abgestimmt mit dem 330&nbsp;Ah LiFePO4 Speicher.
          </p>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map((comp, idx) => {
            const Icon = comp.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#E8DFD5] shadow-xs hover:border-[#D5C6B5] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F4EFEA] flex items-center justify-center text-[#455B45]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-medium px-2.5 py-1 bg-[#FAF6F0] text-[#84542B] rounded-md border border-[#EADBCE] tabular-nums">
                      {comp.capacity}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-semibold text-[#2C241F]">
                    {comp.title}
                  </h3>
                  <div className="text-xs text-[#577057] font-medium mt-0.5 mb-3">
                    {comp.subtitle}
                  </div>

                  <p className="text-xs text-[#6B5C51] leading-relaxed">
                    {comp.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F5EFE8] flex items-center gap-2 text-xs font-medium text-[#364836]">
                  <Shield className="w-3.5 h-3.5 text-[#577057] shrink-0" />
                  <span>{comp.highlight}</span>
                </div>
              </div>
            );
          })}

          {/* Quick Victron Ecosystem Card */}
          <div className="bg-gradient-to-br from-[#2D3E2C] to-[#1E2B1E] rounded-2xl p-6 text-white flex flex-col justify-between shadow-sm">
            <div>
              <div className="text-xs font-mono tracking-wider text-[#A3BFA2] uppercase mb-2">
                System-Harmonie
              </div>
              <h3 className="text-xl font-serif font-semibold text-white mb-3">
                Victron Energy Ökosystem
              </h3>
              <p className="text-xs text-[#D1DFD0] leading-relaxed mb-4">
                Alle Komponenten kommunizieren über das VE.Direct und VE.Bus Netzwerk. Keine Bastellösung,
                sondern maritime Industriequalität für absolute Ausfallsicherheit auf jeder Reise.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#B5CAB4]">
              <span>Integrierter Tiefentladeschutz</span>
              <span>·</span>
              <span>Bluetooth Smart</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
