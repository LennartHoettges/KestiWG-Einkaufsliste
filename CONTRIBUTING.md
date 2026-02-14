# Entwickler-Dokumentation

## Development Setup

### Erstmalige Einrichtung

1. **Repository klonen**
   ```bash
   git clone https://github.com/LennartHoettges/KestiWG-Einkaufsliste.git
   cd KestiWG-Einkaufsliste
   ```

2. **Dependencies installieren**
   ```bash
   npm install
   ```

3. **Firebase konfigurieren**
   - Kopiere `.env.example` zu `.env`
   - Fülle die Firebase-Credentials aus (siehe README.md)

4. **Firebase Hosting konfigurieren** (optional)
   - Kopiere `.firebaserc.example` zu `.firebaserc`
   - Ersetze `"dein-projekt-id"` mit deiner Firebase Projekt-ID

### Lokale Entwicklung

```bash
# Development Server starten (mit Hot-Reload)
npm run dev

# App ist verfügbar unter: http://localhost:3000
```

### Build & Deployment

```bash
# Production Build erstellen
npm run build

# Build testen
npm run preview

# Mit Firebase deployen (benötigt Firebase CLI)
firebase deploy
```

## Projekt-Struktur

```
/
├── public/              # Statische Assets
│   ├── manifest.json   # PWA Manifest
│   ├── sw.js          # Service Worker
│   └── icons/         # App Icons
├── src/
│   ├── components/    # React Komponenten
│   ├── firebase/      # Firebase Konfiguration
│   ├── hooks/         # Custom React Hooks
│   ├── App.jsx        # Haupt-App
│   └── main.jsx       # Entry Point
├── index.html         # HTML Template (Vite Root)
└── vite.config.js     # Vite Konfiguration
```

## Coding Guidelines

### React Best Practices

- Nutze funktionale Komponenten mit Hooks
- Verwende `useState` für lokalen State
- Verwende `useEffect` für Side Effects
- Custom Hooks für wiederverwendbare Logik (z.B. `useShoppingList`)

### Styling

- CSS-Module werden NICHT verwendet - jede Komponente hat ihre eigene `.css` Datei
- Import CSS direkt in der Komponente: `import './Component.css'`
- BEM-ähnliche Namenskonvention für Klassen
- Mobile-First Approach

### Firebase

- Alle Firestore-Operationen in `src/hooks/useShoppingList.js`
- Real-time Updates mit `onSnapshot`
- Error Handling für alle Firebase-Operationen

## Komponenten-Übersicht

### Header.jsx
Header mit App-Titel und User-Info

### UserSelect.jsx
Modal für Benutzer-Auswahl beim ersten Start

### ShoppingList.jsx
Container für offene und erledigte Items

### ShoppingItem.jsx
Einzelnes Item mit Checkbox und Löschen-Button

### AddItem.jsx
Eingabefeld zum Hinzufügen neuer Items

## Custom Hooks

### useShoppingList()
Verwaltet den Firestore-State und bietet Funktionen:
- `items` - Array aller Items
- `loading` - Lade-Status
- `error` - Fehler-Status
- `addItem(name, addedBy)` - Item hinzufügen
- `toggleItem(id, currentChecked, userName)` - Item abhaken/wiederherstellen
- `deleteItem(id)` - Item löschen

## Debugging

### Browser DevTools

- Console: Fehler und Warnungen
- Network: Firebase-Requests überprüfen
- Application > Service Workers: PWA-Status
- Application > Local Storage: Gespeicherter Username

### Häufige Probleme

**Firebase Fehler "Could not reach Cloud Firestore"**
- Überprüfe `.env` Datei
- Stelle sicher, dass Firestore aktiviert ist
- Überprüfe Firestore-Regeln

**Service Worker wird nicht aktualisiert**
- Hard Reload: `Ctrl+Shift+R` (Windows) oder `Cmd+Shift+R` (Mac)
- DevTools: Application > Service Workers > Unregister

**Items werden nicht synchronisiert**
- Überprüfe Internetverbindung
- Überprüfe Firestore-Regeln
- Überprüfe Console auf Fehler

## Testing

Aktuell gibt es keine automatisierten Tests. Für manuelle Tests:

1. Öffne die App in mehreren Browser-Tabs
2. Füge Items hinzu
3. Überprüfe Echtzeit-Sync zwischen Tabs
4. Teste auf verschiedenen Geräten (Desktop, Mobile)
5. Teste Offline-Funktionalität

## Deployment

### Firebase Hosting

```bash
# 1. Firebase CLI installieren (einmalig)
npm install -g firebase-tools

# 2. Login
firebase login

# 3. Projekt initialisieren (einmalig)
firebase init hosting

# 4. Build und Deploy
npm run build
firebase deploy
```

### Andere Hosting-Optionen

Die App kann auf jedem Static-Hosting deployed werden:
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

**Wichtig**: Stelle sicher, dass alle Requests auf `index.html` umgeleitet werden (SPA Routing).

## Erweiterungen

### Neue Features hinzufügen

1. Erstelle neue Komponente in `src/components/`
2. Erstelle zugehörige CSS-Datei
3. Importiere und nutze in `App.jsx` oder anderen Komponenten
4. Aktualisiere README.md wenn nötig

### Firestore Schema ändern

Wenn du die Datenstruktur änderst:
1. Aktualisiere `src/hooks/useShoppingList.js`
2. Aktualisiere Firestore-Regeln
3. Dokumentiere Änderungen im README.md

## Performance

### Bundle Size

Aktuell: ~128 KB gzipped (hauptsächlich Firebase SDK)

Um Bundle Size zu reduzieren:
- Lazy Loading für Komponenten
- Code Splitting
- Tree Shaking ist bereits aktiv (Vite)

### Lighthouse Score

Ziel: 90+ in allen Kategorien
- Performance
- Accessibility
- Best Practices
- SEO
- PWA

## Lizenz

Private WG-Projekt - keine formelle Lizenz
