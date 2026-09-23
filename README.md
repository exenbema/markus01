# Wohlfühl-Wohnmobil · Naturholz & Autarkie

Eine atmosphärische, moderne Website für das Reisen und Wohnen im gesunden Vollholz-Wohnmobil mit interaktivem Victron Autarkie-Dashboard und Kontaktformular.

## 🌲 Features
- **Naturholz-Atmosphäre**: Fichte, Kiefer, Lärche, Pappel und Eiche – veredelt mit biologischen Auro Naturölen.
- **Victron Elektroanlage**: 330 Ah LiFePO4 Batterie, MultiPlus 12/3000/120, Orion XS 50A Ladebooster, SmartSolar MPPT und 700 W Dach-PV.
- **Interaktiver Autarkie-Rechner**: Live-Simulation von Verbrauch & Ertrag je nach Wetter und Fahrzeit.
- **Benutzerfreundliches Kontaktformular**: Unkomplizierte Anfrage mit automatischem Download des Ausbau-Leitfadens.
- **Entspannende Naturklänge**: Synthetisierte Hintergrundakustik (Wald & Kaminfeuer via Web Audio API).

## 🚀 Deployment mit GitHub & Vercel

### 1. In GitHub hochladen
```bash
git init
git add .
git commit -m "Initial commit - Wohlfuehl Wohnmobil Website"
git branch -M main
git remote add origin https://github.com/DEIN-BENUTZERNAME/DEIN-REPO-NAME.git
git push -u origin main
```

### 2. Mit Vercel publizieren
1. Gehe auf [vercel.com](https://vercel.com) und logge dich mit deinem GitHub-Konto ein.
2. Klicke auf **"Add New..."** > **"Project"**.
3. Wähle dein soeben gepushtes GitHub-Repository aus und klicke auf **"Import"**.
4. Vercel erkennt das Projekt automatisch als **Vite**:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Klicke auf **"Deploy"**.
6. Innerhalb weniger Sekunden ist deine Website weltweit live und über deine eigene Vercel-Domain erreichbar!
