/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { VanlifeMoments } from './components/VanlifeMoments.tsx';
import { WoodShowcase } from './components/WoodShowcase.tsx';
import { ElectricalSystem } from './components/ElectricalSystem.tsx';
import { AutarkyDashboard } from './components/AutarkyDashboard.tsx';
import { ContactForm } from './components/ContactForm.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2C241F]">
      {/* Top Bar Navigation Contract */}
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero with 16:9 imagery & dream proposition */}
        <Hero />

        {/* 2. Visual Vanlife & Emotion Moments (More images, few words) */}
        <VanlifeMoments />

        {/* 3. The 5 Woods (Fichte, Kiefer, Lärche, Pappel, Eiche) & Auro Eco Oils */}
        <WoodShowcase />

        {/* 4. Electrical Hardware Specs (Victron MultiPlus, Orion XS, MPPT, 330Ah LiFePO4, 700W PV) */}
        <ElectricalSystem />

        {/* 5. Modern Interactive Autarky Dashboard & Live Simulator */}
        <AutarkyDashboard />

        {/* 6. User-friendly Contact & Inquiry Form */}
        <ContactForm />
      </main>

      {/* 7. Quiet clean footer */}
      <Footer />
    </div>
  );
}
