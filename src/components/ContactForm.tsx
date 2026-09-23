import React, { useState } from 'react';
import { Mail, Phone, Calendar, Heart, CheckCircle2, Download, Send, ArrowRight } from 'lucide-react';

interface FormData {
  intent: 'urlaub' | 'probewohnen' | 'ausbau';
  name: string;
  email: string;
  phone: string;
  preferredSeason: string;
  favoriteWood: string;
  message: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    intent: 'urlaub',
    name: '',
    email: '',
    phone: '',
    preferredSeason: '',
    favoriteWood: 'Zirbe & Kiefer (Duftend)',
    message: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = 'Bitte gib deinen Namen an.';
    if (!formData.email.trim()) {
      errs.email = 'Bitte gib deine E-Mail-Adresse an.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Bitte gib eine gültige E-Mail-Adresse ein.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const downloadChecklist = () => {
    const textContent = `WOHLFÜHL-WOHNMOBIL · AUSBAU & AUTARKIE-LEITFADEN
=====================================================

1. DIE VERWENDETEN NATURHÖLZER:
- Nordische Fichte: Decken & Wände (feuchtigkeitsregulierend, hell)
- Alpen-Kiefer: Schlafnische (reich an ätherischen Ölen & waldigem Duft)
- Gebirgs-Lärche: Kanten & Nassbereich (extrem zäh & wasserfest)
- Leichtbau-Pappel: Schrankkorpusse (-40% Gewichtsersparnis)
- Wildeiche massiv: Küchenplatte & Tisch (unverwüstlich & samtweich)
- Oberflächenschutz: 100% ökologische Auro Naturöle (offenporig & atmungsaktiv)

2. VERBAUTE VICTRON ELEKTROANLAGE:
- 330 Ah LiFePO4 Batterie (4.224 Wh Nutzkapazität)
- Victron MultiPlus 12/3000/120 Sinus-Wechselrichter (3.000 VA / 2.400 W Dauerlast)
- Victron Orion XS 12/12-50A Ladebooster (50A Ladestrom / 640W bei Fahrt)
- Victron SmartSolar MPPT 100/50 Regler (bis zu 98% Wirkungsgrad)
- 700 Watt Hochleistungs-Schindel-Solarmodule auf dem Dach

3. PACKLISTE FÜR DEN PERFEKTEN VAN-URLAUB:
[ ] Lieblingskaffee (gemahlen für Bialetti oder French Press)
[ ] Lieblingsbuch für gemütliche Abende im warmen Holz
[ ] Wanderschuhe & Fernglas
[ ] Kuscheldecke aus reiner Schurwolle

Herzliche Grüße,
Dein Wohlraum-Team`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Wohlfuehl_Wohnmobil_Autarkie_Leitfaden.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="kontakt" className="py-24 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-[#577057] font-semibold mb-3">
            05. Der nächste Schritt
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#2C241F] tracking-tight">
            Lust auf echtes Reisefieber?
          </h2>
          <p className="mt-4 text-base text-[#6B5C51] leading-relaxed">
            Ob du einen unvergesslichen Urlaub planst, das Raumgefühl bei einem Probewohnen
            erleben willst oder Inspiration für deinen eigenen Ausbau suchst: Schreib uns unkompliziert.
          </p>
        </div>

        {/* The Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8DFD5] shadow-xs">
          {submitted ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 bg-[#E3EBE3] rounded-full flex items-center justify-center mx-auto text-[#455B45]">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-[#2C241F]">
                Vielen Dank, {formData.name}!
              </h3>
              <p className="text-sm text-[#6B5C51] max-w-md mx-auto leading-relaxed">
                Deine Anfrage ist bei uns eingegangen. Wir melden uns innerhalb von 24 Stunden persönlich bei dir,
                damit deiner Reise in die Natur nichts im Wege steht.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={downloadChecklist}
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#455B45] hover:bg-[#364836] rounded-full transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Autarkie-Leitfaden herunterladen</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      intent: 'urlaub',
                      name: '',
                      email: '',
                      phone: '',
                      preferredSeason: '',
                      favoriteWood: 'Zirbe & Kiefer (Duftend)',
                      message: '',
                    });
                  }}
                  className="text-xs text-[#6B5C51] hover:text-[#2C241F] underline underline-offset-4"
                >
                  Weitere Nachricht senden
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7" noValidate>
              {/* Intent Segmented Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#2C241F] uppercase tracking-wider mb-2">
                  Dein Anliegen
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1 bg-[#F4EFEA] rounded-xl border border-[#E2D5C8]">
                  {[
                    { id: 'urlaub', label: 'Wohnmobil mieten & urlauben' },
                    { id: 'probewohnen', label: 'Probewohnen & Besichtigung' },
                    { id: 'ausbau', label: 'Beratung für Holzausbau' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, intent: item.id as FormData['intent'] })}
                      className={`py-2 px-3 text-xs font-medium rounded-lg transition-all cursor-pointer text-center ${
                        formData.intent === item.id
                          ? 'bg-white text-[#2C241F] font-semibold shadow-xs'
                          : 'text-[#6B5C51] hover:text-[#2C241F]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-[#2C241F] mb-1.5">
                    Dein Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="z.B. Markus Huber"
                    className={`w-full px-4 py-3 text-sm rounded-xl border bg-[#FAF8F5] focus:bg-white focus:outline-hidden transition-colors ${
                      errors.name ? 'border-[#B91C1C] ring-1 ring-[#B91C1C]' : 'border-[#DECFC1] focus:border-[#455B45]'
                    }`}
                  />
                  {errors.name && <span className="text-[11px] text-[#B91C1C] mt-1 block">{errors.name}</span>}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-[#2C241F] mb-1.5">
                    Deine E-Mail-Adresse *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="hallo@deinedomain.de"
                    className={`w-full px-4 py-3 text-sm rounded-xl border bg-[#FAF8F5] focus:bg-white focus:outline-hidden transition-colors ${
                      errors.email ? 'border-[#B91C1C] ring-1 ring-[#B91C1C]' : 'border-[#DECFC1] focus:border-[#455B45]'
                    }`}
                  />
                  {errors.email && <span className="text-[11px] text-[#B91C1C] mt-1 block">{errors.email}</span>}
                </div>
              </div>

              {/* Phone & Travel Season */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-semibold text-[#2C241F] mb-1.5">
                    Telefonnummer (optional)
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+49 170 1234567"
                    className="w-full px-4 py-3 text-sm rounded-xl border border-[#DECFC1] bg-[#FAF8F5] focus:bg-white focus:border-[#455B45] focus:outline-hidden transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-season" className="block text-xs font-semibold text-[#2C241F] mb-1.5">
                    Wunschzeitraum / Reisedauer
                  </label>
                  <input
                    id="contact-season"
                    type="text"
                    value={formData.preferredSeason}
                    onChange={(e) => setFormData({ ...formData, preferredSeason: e.target.value })}
                    placeholder="z.B. 2 Wochen im August / Frühling 2026"
                    className="w-full px-4 py-3 text-sm rounded-xl border border-[#DECFC1] bg-[#FAF8F5] focus:bg-white focus:border-[#455B45] focus:outline-hidden transition-colors"
                  />
                </div>
              </div>

              {/* Preferred Wood Atmosphere */}
              <div>
                <label htmlFor="contact-wood" className="block text-xs font-semibold text-[#2C241F] mb-1.5">
                  Welches Holz spricht dich am meisten an?
                </label>
                <select
                  id="contact-wood"
                  value={formData.favoriteWood}
                  onChange={(e) => setFormData({ ...formData, favoriteWood: e.target.value })}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-[#DECFC1] bg-[#FAF8F5] focus:bg-white focus:border-[#455B45] focus:outline-hidden transition-colors"
                >
                  <option value="Kiefer & Zirbe">Kiefer &amp; Zirbe (Duftend, beruhigend, gesunder Schlaf)</option>
                  <option value="Nordische Fichte">Nordische Fichte (Hell, skandinavisch, freundlich)</option>
                  <option value="Wildeiche massiv">Wildeiche massiv (Charakterstark, edel, langlebig)</option>
                  <option value="Gebirgs-Lärche">Gebirgs-Lärche (Warm, rustikal, markant)</option>
                  <option value="Kombination aus allen 5">Harmonische Kombination aus allen 5 Hölzern</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-[#2C241F] mb-1.5">
                  Deine Gedanken oder Fragen
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Erzähl uns von deinem Reiseplan, deinen Wünschen an den Van oder Fragen zur Victron Elektroanlage..."
                  className="w-full px-4 py-3 text-sm rounded-xl border border-[#DECFC1] bg-[#FAF8F5] focus:bg-white focus:border-[#455B45] focus:outline-hidden transition-colors resize-none"
                />
              </div>

              {/* Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[#6B5C51]">
                  Unverbindlich &amp; kostenfrei. Wir schätzen Privatsphäre.
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#455B45] hover:bg-[#364836] rounded-full transition-all duration-200 shadow-sm cursor-pointer whitespace-nowrap"
                >
                  <span>Anfrage absenden</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
