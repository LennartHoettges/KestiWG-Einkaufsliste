# 🛒 WG Einkaufsliste - Progressive Web App

Eine moderne, synchronisierte Einkaufslisten-App für die WG mit Echtzeit-Synchronisierung. Entwickelt als Progressive Web App (PWA) für einfache Installation auf allen Geräten.

## 📱 Features

- ✅ **Echtzeit-Synchronisierung** über Firebase Firestore
- 👥 **3 WG-Mitglieder** - einfache Personen-Auswahl ohne komplexes Login
- 📝 **Items hinzufügen, abhaken und löschen**
- 👀 **Sichtbarkeit** wer Items hinzugefügt und abgehakt hat
- 🎨 **Clean & Minimalistisches Design** - Mobile-First
- 💾 **PWA-Funktionalität** - Installierbar auf Smartphone & Desktop
- 🌐 **Offline-fähig** durch Service Worker
- 🆓 **Kostenlos hostbar** mit Firebase Free Tier

## 🛠️ Tech Stack

- **Frontend:** React 18 mit Vite
- **Backend/Datenbank:** Firebase Firestore (Realtime Database)
- **Styling:** CSS mit modernem Design
- **PWA:** Service Worker + Web App Manifest
- **Hosting:** Firebase Hosting kompatibel

## 📋 Voraussetzungen

- Node.js 18+ installiert ([Download](https://nodejs.org/))
- Ein Google/Firebase Account
- Git (optional, für Versionskontrolle)

## 🚀 Setup & Installation

### 1. Repository klonen

```bash
git clone https://github.com/LennartHoettges/KestiWG-Einkaufsliste.git
cd KestiWG-Einkaufsliste
```

### 2. Dependencies installieren

```bash
npm install
```

### 3. Firebase Projekt erstellen

1. Gehe zur [Firebase Console](https://console.firebase.google.com/)
2. Klicke auf "Projekt hinzufügen"
3. Gib deinem Projekt einen Namen (z.B. "WG-Einkaufsliste")
4. Google Analytics ist optional - kann deaktiviert werden
5. Klicke auf "Projekt erstellen"

### 4. Firebase Web-App registrieren

1. In der Firebase Console, klicke auf das Web-Icon `</>`
2. Gib einen App-Namen ein (z.B. "WG Shopping List")
3. **Wichtig:** Aktiviere "Firebase Hosting einrichten" (optional für lokale Entwicklung)
4. Klicke auf "App registrieren"
5. **Kopiere die Firebase-Konfiguration** - du brauchst sie gleich!

### 5. Firestore Database einrichten

1. Gehe in der Firebase Console zu "Build" → "Firestore Database"
2. Klicke auf "Datenbank erstellen"
3. Wähle den Modus:
   - **Testmodus** für Development (Daten sind öffentlich lesbar/schreibbar)
   - **Produktionsmodus** für echte Nutzung (siehe Firestore Regeln unten)
4. Wähle einen Cloud Firestore-Standort (z.B. `europe-west3` für Europa)
5. Klicke auf "Aktivieren"

### 6. Umgebungsvariablen konfigurieren

1. Kopiere die `.env.example` Datei:
   ```bash
   cp .env.example .env
   ```

2. Öffne die `.env` Datei und füge deine Firebase-Konfiguration ein:
   ```env
   VITE_FIREBASE_API_KEY=dein-api-key
   VITE_FIREBASE_AUTH_DOMAIN=dein-projekt.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=dein-projekt-id
   VITE_FIREBASE_STORAGE_BUCKET=dein-projekt.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=deine-sender-id
   VITE_FIREBASE_APP_ID=deine-app-id
   ```

   ℹ️ Diese Werte findest du in der Firebase Console unter Projekteinstellungen → Allgemein → Deine Apps

### 7. App lokal starten

```bash
npm run dev
```

Die App läuft jetzt auf `http://localhost:3000` 🎉

## 🔐 Firestore Sicherheitsregeln

Für eine sichere Nutzung solltest du in der Firebase Console Sicherheitsregeln einrichten:

1. Gehe zu "Firestore Database" → "Regeln"
2. Füge folgende Regeln ein:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Einkaufsliste für WG-Mitglieder
    match /wg-lists/einkaufsliste/items/{itemId} {
      // Jeder kann lesen, schreiben und löschen
      // Für eine WG ausreichend - bei Bedarf erweitern
      allow read, write, delete: if true;
    }
  }
}
```

**Hinweis:** Diese Regeln erlauben jedem mit dem Link Zugriff. Für eine private WG-Liste kannst du:
- Einen geheimen Unterdokument-Pfad verwenden (z.B. `/wg-lists/meine-geheime-wg-id/items`)
- Firebase Authentication hinzufügen (erfordert Anpassungen am Code)

## 🌐 Deployment mit Firebase Hosting

### 1. Firebase CLI installieren

```bash
npm install -g firebase-tools
```

### 2. Firebase Login

```bash
firebase login
```

### 3. Firebase Projekt initialisieren

```bash
firebase init
```

Wähle aus:
- ✅ Hosting
- Verwende bestehendes Projekt (dein erstelltes Firebase Projekt)
- **Public directory:** `dist` (nicht `public`!)
- **Configure as single-page app:** Yes
- **Set up automatic builds with GitHub:** Optional

### 4. App bauen und deployen

```bash
npm run build
firebase deploy
```

Deine App ist jetzt live unter `https://dein-projekt.web.app` 🚀

## 📱 PWA Installation

### Auf Android:

1. Öffne die App im Chrome Browser
2. Tippe auf das Menü (⋮) → "Zum Startbildschirm hinzufügen"
3. Bestätige den Namen
4. Die App erscheint jetzt auf deinem Homescreen!

### Auf iOS:

1. Öffne die App im Safari Browser
2. Tippe auf das Teilen-Symbol (□↑)
3. Scrolle runter und tippe auf "Zum Home-Bildschirm"
4. Bestätige den Namen
5. Die App erscheint jetzt auf deinem Homescreen!

### Auf Desktop (Chrome/Edge):

1. Öffne die App im Browser
2. Klicke auf das ⊕ Symbol in der Adressleiste
3. Oder gehe zu Menü → "App installieren"
4. Die App öffnet sich als eigenes Fenster!

## 📁 Projektstruktur

```
/
├── public/
│   ├── manifest.json          # PWA Manifest
│   ├── sw.js                  # Service Worker für Offline-Funktionalität
│   ├── index.html             # HTML Template
│   └── icons/                 # PWA Icons (verschiedene Größen)
├── src/
│   ├── App.jsx                # Haupt-App Komponente
│   ├── App.css                # App Styles
│   ├── main.jsx               # React Entry Point
│   ├── index.css              # Globale Styles
│   ├── components/
│   │   ├── Header.jsx         # Header mit WG Name
│   │   ├── UserSelect.jsx     # Personen-Auswahl Modal
│   │   ├── ShoppingList.jsx   # Listen-Container
│   │   ├── ShoppingItem.jsx   # Einzelnes List-Item
│   │   └── AddItem.jsx        # Eingabefeld für neue Items
│   ├── firebase/
│   │   └── config.js          # Firebase Konfiguration
│   └── hooks/
│       └── useShoppingList.js # Custom Hook für Firestore
├── .env.example               # Beispiel für Umgebungsvariablen
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Anpassungen

### WG-Mitglieder ändern

Öffne `src/components/UserSelect.jsx` und ändere das Array:

```javascript
const WG_MEMBERS = ['Dein Name', 'Name 2', 'Name 3'];
```

### Farben anpassen

Die Hauptfarbe (Grün) kann in den CSS-Dateien geändert werden:
- `src/components/Header.css` - Header-Farbe
- `src/App.css`, `src/components/*.css` - Andere Komponenten

Suche nach `#4CAF50` und ersetze es mit deiner Wunschfarbe.

### Icons ersetzen

1. Erstelle Icons in den benötigten Größen (siehe `public/icons/README.md`)
2. Nutze Tools wie [RealFaviconGenerator](https://realfavicongenerator.net/)
3. Ersetze die Icons im `public/icons/` Ordner

## 🐛 Troubleshooting

### "Fehler beim Laden" erscheint

- ✅ Überprüfe ob die `.env` Datei existiert und korrekt ausgefüllt ist
- ✅ Stelle sicher, dass Firestore Database in Firebase aktiviert ist
- ✅ Überprüfe die Firestore-Regeln (siehe oben)
- ✅ Öffne die Browser-Konsole (F12) für detaillierte Fehlermeldungen

### App lädt nicht / weißer Bildschirm

- ✅ Führe `npm install` erneut aus
- ✅ Lösche `node_modules` und führe `npm install` erneut aus
- ✅ Überprüfe die Browser-Konsole auf Fehler

### Service Worker funktioniert nicht

- ✅ Service Worker funktionieren nur über HTTPS oder localhost
- ✅ Nach Code-Änderungen: Hard-Reload mit `Ctrl+Shift+R` (Windows/Linux) oder `Cmd+Shift+R` (Mac)
- ✅ In den Browser DevTools → Application → Service Workers → "Unregister"

### Items werden nicht synchronisiert

- ✅ Überprüfe deine Internetverbindung
- ✅ Stelle sicher, dass Firestore-Regeln korrekt sind
- ✅ Überprüfe die Browser-Konsole auf Firebase-Fehler

## 📝 Lizenz

Dieses Projekt ist für den privaten Gebrauch in der WG erstellt. Fühle dich frei, es zu forken und anzupassen!

## 🤝 Beitragen

Verbesserungsvorschläge und Pull Requests sind willkommen! Für größere Änderungen öffne bitte zuerst ein Issue.

## 💡 Weitere Ideen für Erweiterungen

- 📊 Statistiken: Wer kauft am meisten ein?
- 🏪 Kategorien für Items (Obst, Getränke, etc.)
- 📅 Wiederkehrende Items
- 💰 Kostentracking pro Item
- 📸 Fotos zu Items hinzufügen
- 🔔 Push-Benachrichtigungen bei neuen Items
- 🌙 Dark Mode

---

Erstellt mit ❤️ für die KestiWG