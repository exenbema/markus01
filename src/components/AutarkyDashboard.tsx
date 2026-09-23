import React, { useState, useId } from 'react';
import {
  Sun,
  BatteryCharging,
  Zap,
  Car,
  Coffee,
  Flame,
  Laptop,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sliders,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Info
} from 'lucide-react';

interface WeatherPreset {
  id: string;
  name: string;
  solarWh: number;
  peakW: number;
  iconText: string;
}

const weatherOptions: WeatherPreset[] = [
  { id: 'summer', name: 'Hochsommer (Klar)', solarWh: 3300, peakW: 680, iconText: '☀️' },
  { id: 'spring', name: 'Frühling / Heiter', solarWh: 2100, peakW: 460, iconText: '⛅' },
  { id: 'cloudy', name: 'Bewölkt / Regnerisch', solarWh: 650, peakW: 140, iconText: '🌧️' },
  { id: 'shade', name: 'Tiefschatten / Wald', solarWh: 240, peakW: 55, iconText: '🌲' },
];

export const AutarkyDashboard: React.FC = () => {
  // Base Hardware specs
  const TOTAL_BATTERY_AH = 330;
  const NOMINAL_VOLTAGE = 12.8;
  const TOTAL_BATTERY_WH = TOTAL_BATTERY_AH * NOMINAL_VOLTAGE; // 4224 Wh
  const MIN_RESERVE_PERCENT = 10; // Protect LiFePO4
  const USABLE_WH = TOTAL_BATTERY_WH * ((100 - MIN_RESERVE_PERCENT) / 100); // 3801.6 Wh
  const ORION_WATT_RATE = 640; // 50A @ 12.8V = 640W charging power

  // Simulator State
  const [selectedWeather, setSelectedWeather] = useState<WeatherPreset>(weatherOptions[0]);
  const [drivingHours, setDrivingHours] = useState<number>(1);
  const [batterySoc, setBatterySoc] = useState<number>(90); // 10% - 100%

  // Appliance Consumers
  const [fridgeEnabled, setFridgeEnabled] = useState<boolean>(true); // ~480 Wh/day
  const [cookingMinutes, setCookingMinutes] = useState<number>(30); // 2000W Induction via MultiPlus
  const [coffeeCups, setCoffeeCups] = useState<number>(3); // 1450W Espresso (~40 Wh per cup)
  const [workHours, setWorkHours] = useState<number>(5); // Laptop + Starlink (55W)
  const [heaterHours, setHeaterHours] = useState<number>(0); // 25W Diesel air blower
  const [lightsEnabled, setLightsEnabled] = useState<boolean>(true); // LEDs + USB charging (~180 Wh)
  const [boilerMinutes, setBoilerMinutes] = useState<number>(15); // 200W Warm water boiler

  // Energy Calculation
  const solarGenerationWh = selectedWeather.solarWh;
  const boosterGenerationWh = drivingHours * ORION_WATT_RATE;
  const totalGenerationWh = solarGenerationWh + boosterGenerationWh;

  // Consumption Calculation
  const fridgeWh = fridgeEnabled ? 480 : 0;
  const cookingWh = Math.round((cookingMinutes / 60) * 1800); // 1.8kW average cooking power
  const coffeeWh = coffeeCups * 45;
  const workWh = workHours * 55;
  const heaterWh = heaterHours * 25;
  const lightsWh = lightsEnabled ? 180 : 0;
  const boilerWh = Math.round((boilerMinutes / 60) * 200);

  const totalConsumptionWh =
    fridgeWh + cookingWh + coffeeWh + workWh + heaterWh + lightsWh + boilerWh;

  const netBalanceWh = totalGenerationWh - totalConsumptionWh;

  // Current usable energy stored in battery right now
  const currentStoredWh = (batterySoc / 100) * TOTAL_BATTERY_WH;
  const currentUsableWh = Math.max(0, currentStoredWh - (MIN_RESERVE_PERCENT / 100) * TOTAL_BATTERY_WH);

  // Autarky Days calculation
  let autarkyDaysText = '';
  let isFullySelfSufficient = false;

  if (netBalanceWh >= 0) {
    isFullySelfSufficient = true;
    autarkyDaysText = 'Unbegrenzt autark';
  } else {
    const dailyDeficit = Math.abs(netBalanceWh);
    const days = currentUsableWh / dailyDeficit;
    if (days >= 30) {
      autarkyDaysText = '> 30 Tage';
    } else {
      autarkyDaysText = `${days.toFixed(1)} Tage`;
    }
  }

  // Preset Scenario Loaders
  const loadScenario = (type: 'sweden' | 'portugal' | 'alps') => {
    if (type === 'sweden') {
      setSelectedWeather(weatherOptions[1]); // Heiter
      setDrivingHours(1.5);
      setBatterySoc(90);
      setFridgeEnabled(true);
      setCookingMinutes(30);
      setCoffeeCups(3);
      setWorkHours(4);
      setHeaterHours(2);
      setBoilerMinutes(15);
    } else if (type === 'portugal') {
      setSelectedWeather(weatherOptions[0]); // Vollsonne
      setDrivingHours(0); // Feststehen am Strand
      setBatterySoc(100);
      setFridgeEnabled(true);
      setCookingMinutes(45); // Ausgiebig kochen
      setCoffeeCups(4);
      setWorkHours(6);
      setHeaterHours(0);
      setBoilerMinutes(25);
    } else if (type === 'alps') {
      setSelectedWeather(weatherOptions[2]); // Bewölkt
      setDrivingHours(0);
      setBatterySoc(80);
      setFridgeEnabled(true);
      setCookingMinutes(25);
      setCoffeeCups(4);
      setWorkHours(7);
      setHeaterHours(8); // Standheizung durch die Nacht
      setBoilerMinutes(15);
    }
  };

  const weatherRadioName = useId();

  return (
    <section id="autarkie-rechner" className="py-24 bg-[#F5EFE8]/50 border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs uppercase tracking-widest text-[#577057] font-semibold mb-3">
            04. Interaktive Live-Simulation
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-[#2C241F] tracking-tight leading-tight">
            Das Autarkie-Dashboard
          </h2>
          <p className="mt-4 text-base text-[#6B5C51] leading-relaxed">
            Berechne in Echtzeit, wie viele Tage du mit der <strong>330 Ah LiFePO4 Batterie</strong>, dem
            <strong> 700 W Solardach</strong> und dem <strong>Orion XS 50A Ladebooster</strong> frei in der Natur
            stehen kannst — ganz ohne Landstrom oder lauten Generator.
          </p>
        </div>

        {/* Quick Scenario Buttons */}
        <div className="mb-10 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-[#6B5C51] mr-1">Reise-Szenarien:</span>
          <button
            onClick={() => loadScenario('portugal')}
            type="button"
            className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-[#F3EFE9] text-[#2C241F] rounded-lg border border-[#D8C7B5] transition-colors cursor-pointer"
          >
            ☀️ Strand in Portugal (Stationär)
          </button>
          <button
            onClick={() => loadScenario('sweden')}
            type="button"
            className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-[#F3EFE9] text-[#2C241F] rounded-lg border border-[#D8C7B5] transition-colors cursor-pointer"
          >
            🌲 Wildcamping Schweden (Mit Fahrt)
          </button>
          <button
            onClick={() => loadScenario('alps')}
            type="button"
            className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-[#F3EFE9] text-[#2C241F] rounded-lg border border-[#D8C7B5] transition-colors cursor-pointer"
          >
            🏔️ Herbst in den Alpen (Heizung &amp; Wolken)
          </button>
        </div>

        {/* Main Grid: Left Controls, Right Real-time Cockpit */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Box 1: Solar & Fahrt / Energiequellen */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DFD5] shadow-xs">
              <h3 className="text-base font-serif font-semibold text-[#2C241F] mb-4 flex items-center gap-2">
                <Sun className="w-4 h-4 text-[#D97706]" />
                <span>1. Energiequellen &amp; Wetterbedingungen</span>
              </h3>

              {/* Weather presets */}
              <div className="mb-6">
                <label className="text-xs font-medium text-[#6B5C51] block mb-2">
                  Sonnenstunden &amp; Dach-PV (700 Wp)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {weatherOptions.map((w) => {
                    const isSelected = selectedWeather.id === w.id;
                    return (
                      <button
                        key={w.id}
                        type="button"
                        onClick={() => setSelectedWeather(w)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#FAF6F0] border-[#84542B] text-[#2C241F] ring-1 ring-[#84542B]'
                            : 'bg-white border-[#E8DFD5] text-[#6B5C51] hover:border-[#D5C6B5]'
                        }`}
                      >
                        <div className="text-xl mb-1">{w.iconText}</div>
                        <div className="text-xs font-semibold leading-tight">{w.name}</div>
                        <div className="text-[11px] font-mono text-[#84542B] mt-1 tabular-nums">
                          +{w.solarWh} Wh
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Driving hours with Orion XS */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-medium text-[#6B5C51] flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-[#577057]" />
                    Tägliche Fahrzeit (Victron Orion XS 50A Booster)
                  </span>
                  <span className="font-mono font-semibold text-[#2C241F] tabular-nums">
                    {drivingHours} Std. (+{drivingHours * ORION_WATT_RATE} Wh)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4"
                  step="0.5"
                  value={drivingHours}
                  onChange={(e) => setDrivingHours(parseFloat(e.target.value))}
                  className="w-full accent-[#577057] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#A6978A] font-mono mt-1">
                  <span>0 Std. (Fest stehen)</span>
                  <span>2 Std.</span>
                  <span>4 Std. (Lange Etappe)</span>
                </div>
              </div>
            </div>

            {/* Box 2: Consumers & Lifestyle */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DFD5] shadow-xs">
              <h3 className="text-base font-serif font-semibold text-[#2C241F] mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#84542B]" />
                <span>2. Verbraucher im Van (12V &amp; 230V via MultiPlus)</span>
              </h3>

              <div className="space-y-4">
                {/* Fridge */}
                <div className="flex items-center justify-between py-2 border-b border-[#F5EFE8]">
                  <div>
                    <div className="text-xs font-semibold text-[#2C241F]">
                      Kompressorkühlschrank (12V Dauerbetrieb)
                    </div>
                    <div className="text-[11px] text-[#6B5C51]">45 Watt Kompressor, getaktet (~480 Wh/Tag)</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFridgeEnabled(!fridgeEnabled)}
                    className={`px-3 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors ${
                      fridgeEnabled
                        ? 'bg-[#E3EBE3] text-[#2B3A2B] font-semibold'
                        : 'bg-[#F0EBE5] text-[#8C7A6E]'
                    }`}
                  >
                    {fridgeEnabled ? 'Aktiv (480 Wh)' : 'Aus'}
                  </button>
                </div>

                {/* Induction Cooking */}
                <div className="py-2 border-b border-[#F5EFE8]">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div>
                      <span className="font-semibold text-[#2C241F]">Induktionskochen (230V)</span>
                      <span className="text-[11px] text-[#6B5C51] block">
                        Über Victron MultiPlus 3000VA ohne Gas kochen
                      </span>
                    </div>
                    <span className="font-mono font-semibold text-[#84542B] tabular-nums">
                      {cookingMinutes} Min. ({cookingWh} Wh)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="60"
                    step="5"
                    value={cookingMinutes}
                    onChange={(e) => setCookingMinutes(parseInt(e.target.value))}
                    className="w-full accent-[#84542B] cursor-pointer"
                  />
                </div>

                {/* Coffee Cups */}
                <div className="flex items-center justify-between py-2 border-b border-[#F5EFE8]">
                  <div>
                    <div className="text-xs font-semibold text-[#2C241F]">
                      Espresso- / Kaffeemaschine (230V)
                    </div>
                    <div className="text-[11px] text-[#6B5C51]">Siebträger oder Kapselmaschine über MultiPlus</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCoffeeCups(Math.max(0, coffeeCups - 1))}
                      className="w-7 h-7 rounded-lg bg-[#F5EFE8] text-sm font-semibold text-[#2C241F] flex items-center justify-center hover:bg-[#EADBCE]"
                    >
                      -
                    </button>
                    <span className="font-mono font-semibold text-xs tabular-nums w-12 text-center">
                      {coffeeCups} Tassen
                    </span>
                    <button
                      type="button"
                      onClick={() => setCoffeeCups(coffeeCups + 1)}
                      className="w-7 h-7 rounded-lg bg-[#F5EFE8] text-sm font-semibold text-[#2C241F] flex items-center justify-center hover:bg-[#EADBCE]"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remote Work */}
                <div className="py-2 border-b border-[#F5EFE8]">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div>
                      <span className="font-semibold text-[#2C241F]">Laptop &amp; Starlink / Internet</span>
                      <span className="text-[11px] text-[#6B5C51] block">Mobiles Arbeiten mit Blick auf den See</span>
                    </div>
                    <span className="font-mono font-semibold text-[#84542B] tabular-nums">
                      {workHours} Std. ({workWh} Wh)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={workHours}
                    onChange={(e) => setWorkHours(parseInt(e.target.value))}
                    className="w-full accent-[#577057] cursor-pointer"
                  />
                </div>

                {/* Standheizung Gebläse */}
                <div className="py-2">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div>
                      <span className="font-semibold text-[#2C241F]">Diesel-Standheizung (Gebläse &amp; Pumpe)</span>
                      <span className="text-[11px] text-[#6B5C51] block">
                        Für gemütliche, kühle Bergnächte
                      </span>
                    </div>
                    <span className="font-mono font-semibold text-[#84542B] tabular-nums">
                      {heaterHours} Std. ({heaterWh} Wh)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={heaterHours}
                    onChange={(e) => setHeaterHours(parseInt(e.target.value))}
                    className="w-full accent-[#84542B] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Box 3: Battery Starting SOC */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DFD5] shadow-xs">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-[#2C241F]">
                  Start-Ladezustand der 330 Ah LiFePO4 Batterie:
                </span>
                <span className="font-mono font-semibold text-[#577057] tabular-nums">
                  {batterySoc}% (ca. {Math.round(currentStoredWh)} Wh gespeichert)
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                step="5"
                value={batterySoc}
                onChange={(e) => setBatterySoc(parseInt(e.target.value))}
                className="w-full accent-[#577057] cursor-pointer"
              />
            </div>
          </div>

          {/* Right Real-time Cockpit / Visual Summary */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* The Big Autarky Hero Box */}
            <div className={`rounded-2xl p-7 text-white shadow-md transition-all duration-300 ${
              isFullySelfSufficient
                ? 'bg-gradient-to-br from-[#2D452C] via-[#354F34] to-[#253924]'
                : 'bg-gradient-to-br from-[#4A3A2F] via-[#3E3027] to-[#2C221B]'
            }`}>
              <div className="flex items-center justify-between text-xs tracking-wider uppercase text-[#B7D4B6] font-mono mb-2">
                <span>Autarkie-Berechnung</span>
                <span>Victron MultiPlus 3000</span>
              </div>

              <div className="mt-3">
                <div className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-white mb-2">
                  {autarkyDaysText}
                </div>
                <div className="text-xs text-[#E3EDE2] font-light leading-relaxed">
                  {isFullySelfSufficient
                    ? 'Dein täglicher Ertrag übersteigt deinen Verbrauch. Du benötigst bei diesen Bedingungen niemals Landstrom!'
                    : `Mit dem aktuellen Batteriestand kannst du ${autarkyDaysText} autark stehen, bevor die 10% Schon-Reserve erreicht wird.`}
                </div>
              </div>

              {/* Net Balance Pill */}
              <div className="mt-6 pt-5 border-t border-white/15 flex items-center justify-between">
                <div className="text-xs text-[#D8E6D7]">Tägliche Energie-Bilanz:</div>
                <div className={`font-mono text-sm font-semibold tabular-nums ${
                  netBalanceWh >= 0 ? 'text-[#A1F0A0]' : 'text-[#FFB2A8]'
                }`}>
                  {netBalanceWh >= 0 ? `+${netBalanceWh} Wh / Tag` : `${netBalanceWh} Wh / Tag`}
                </div>
              </div>
            </div>

            {/* Energy Flow Breakdown Card */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8DFD5] shadow-xs space-y-5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#6B5C51]">
                Täglicher Energiefluss
              </h4>

              {/* Inflow */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                  <span className="text-[#364836] flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-[#577057]" />
                    Gesamtertrag (Solar + Ladebooster)
                  </span>
                  <span className="font-mono text-[#364836] font-semibold tabular-nums">
                    +{totalGenerationWh} Wh
                  </span>
                </div>
                <div className="w-full bg-[#F3EFE9] h-2.5 rounded-full overflow-hidden flex">
                  <div
                    className="bg-[#D97706] h-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (solarGenerationWh / Math.max(1, totalGenerationWh)) * 100)}%` }}
                    title={`Solar: ${solarGenerationWh} Wh`}
                  />
                  <div
                    className="bg-[#577057] h-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (boosterGenerationWh / Math.max(1, totalGenerationWh)) * 100)}%` }}
                    title={`Ladebooster: ${boosterGenerationWh} Wh`}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-[#6B5C51] mt-1 font-mono">
                  <span>PV 700W: +{solarGenerationWh} Wh</span>
                  <span>Orion XS: +{boosterGenerationWh} Wh</span>
                </div>
              </div>

              {/* Outflow */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                  <span className="text-[#84542B] flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#84542B]" />
                    Gesamtverbrauch der Verbraucher
                  </span>
                  <span className="font-mono text-[#84542B] font-semibold tabular-nums">
                    -{totalConsumptionWh} Wh
                  </span>
                </div>
                <div className="w-full bg-[#F3EFE9] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#84542B] h-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (totalConsumptionWh / 4000) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Battery Status Visualization */}
              <div className="pt-4 border-t border-[#F5EFE8]">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-[#2C241F]">
                    330 Ah LiFePO4 Speicherfüllstand
                  </span>
                  <span className="font-mono font-bold text-[#577057] tabular-nums">
                    {batterySoc}% ({Math.round((batterySoc / 100) * TOTAL_BATTERY_AH)} Ah)
                  </span>
                </div>
                <div className="w-full bg-[#EDE5DB] h-4 rounded-full p-0.5 border border-[#D8C7B5]">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      batterySoc > 50
                        ? 'bg-[#577057]'
                        : batterySoc > 20
                        ? 'bg-[#D97706]'
                        : 'bg-[#B91C1C]'
                    }`}
                    style={{ width: `${batterySoc}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-[#8C7A6E] mt-1 font-mono">
                  <span>0 Ah (0%)</span>
                  <span>Schongrenze 10%</span>
                  <span>330 Ah (100% = 4.224 Wh)</span>
                </div>
              </div>

              {/* Guarantee Box */}
              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E8DFD5] text-xs text-[#5C5046] flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#577057] shrink-0 mt-0.5" />
                <span>
                  <strong>Victron-Sicherheit:</strong> Der integrierte Batteriewächter schaltet Verbraucher
                  automatisch vor einer Tiefentladung ab. Die Zellen bleiben über Jahre geschützt.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
