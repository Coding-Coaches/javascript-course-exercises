// ============================================================
// Zitate-Sammlung (Lösung)
// ------------------------------------------------------------
// Starten:  Rechtsklick auf index.html → Open with Live Server
// ============================================================
//
// Die Seite soll:
//   - die Zitate von https://dummyjson.com/quotes laden und
//     währenddessen  Zitate werden geladen …  zeigen
//   - bei einem Fehler  Zitate konnten nicht geladen werden.  zeigen -
//     auch offline (Network → "No throttling" → "Offline")
//   - bei Klick auf ☆ ein Zitat als Favorit markieren (★), ein
//     zweiter Klick nimmt es wieder heraus
//   - oben die Zahl der Favoriten anzeigen:  2 Favoriten
//   - nach dem Neuladen die Favoriten noch kennen - egal ob einer
//     oder mehrere
//   - den Filter "Nur Favoriten" in der URL halten: Nach dem
//     Neuladen gilt derselbe Filter - eingeschaltet UND
//     ausgeschaltet
//
// Fünf Fehler. Die ersten beiden zeigen sich sofort beim Start,
// die anderen drei erst, wenn man das Soll Punkt für Punkt
// durchtestet: offline, Favoriten + Neuladen, Filter aus + Neuladen.
// ============================================================

// FEHLER 2 behoben: "qoutes" statt "quotes".
// Erkennungszeichen: Console zeigt
//   Uncaught (in promise) SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
// Die Meldung führt auf die falsche Spur - das JSON ist nicht kaputt,
// es ist gar keins. Network: die Anfrage ist rot, Status 404,
// Preview zeigt eine HTML-Seite.
// Zur vollständigen Behebung gehört auch die ok-Prüfung in loadJson:
// Ein 404 soll als Fehlermeldung auf der Seite landen.
const API_URL = "https://dummyjson.com/quotes?limit=20";
const STORAGE_KEY = "quotes-7-3";


// ------------------------------------------------------------
// 1. Zustand
// ------------------------------------------------------------
const state = {
  quotes: [],
  favorites: [],          // ids der Lieblingszitate
  onlyFavorites: false,
  loading: true,
  error: null,
};


// ------------------------------------------------------------
// 2. Elemente
// ------------------------------------------------------------
const list = document.querySelector("#quote-list");
const favoritesCheckbox = document.querySelector("#only-favorites");
const favoriteCount = document.querySelector("#favorite-count");


// ------------------------------------------------------------
// 3. Darstellung
// ------------------------------------------------------------
function render() {
  favoritesCheckbox.checked = state.onlyFavorites;
  favoriteCount.textContent = `${state.favorites.length} Favoriten`;

  if (state.loading) {
    list.textContent = "Zitate werden geladen …";
    return;
  }
  if (state.error !== null) {
    list.textContent = state.error;
    return;
  }

  const visible = state.quotes
    .filter((quote) => !state.onlyFavorites || state.favorites.includes(quote.id));

  list.textContent = "";
  for (const quote of visible) {
    const item = document.createElement("li");
    item.textContent = `„${quote.quote}“ - ${quote.author}`;

    const button = document.createElement("button");
    button.textContent = state.favorites.includes(quote.id) ? "★" : "☆";
    button.dataset.id = quote.id;

    item.append(button);
    list.append(item);
  }
}


// ------------------------------------------------------------
// Speichern, URL, Laden
// ------------------------------------------------------------

// FEHLER 4 behoben: Das Array wurde ohne JSON.stringify gespeichert.
// Erkennungszeichen: Application → Local Storage zeigt  3,7  statt
// [3,7]  - setItem macht aus dem Array stillschweigend Text.
//   - Mehrere Favoriten: Nach dem Neuladen sind alle weg, in der
//     Console steht "Gespeicherte Favoriten unlesbar" mit einem
//     SyntaxError - JSON.parse("3,7") scheitert.
//   - Genau ein Favorit: JSON.parse("3") klappt - und liefert die
//     ZAHL 3, kein Array. Oben steht "undefined Favoriten", danach
//     TypeError: state.favorites.includes is not a function.
// Gleicher Fehler, zwei Symptome - darum sagt das Soll "egal ob
// einer oder mehrere".
function saveFavorites() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.favorites));
}

function loadFavorites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      state.favorites = JSON.parse(saved);
    }
  } catch (error) {
    console.error("Gespeicherte Favoriten unlesbar - starte leer.", error);
  }
}

// updateUrl war nicht falsch, aber Ursache von FEHLER 5: Sie schreibt
// auch  favorites=false  in die URL. Hier mit "1" und nur, wenn der
// Filter an ist - wie auf den Folien. (Wer updateUrl so lässt und
// nur readUrl korrigiert, hat den Fehler auch behoben.)
function updateUrl() {
  const params = new URLSearchParams();
  if (state.onlyFavorites) {
    params.set("favorites", "1");
  }
  history.replaceState(null, "", `?${params}`);
}

// FEHLER 5 behoben: if (params.get("favorites")) prüfte nur, ob
// IRGENDEIN Text dasteht. Auch "false" ist ein nicht-leerer Text -
// und damit truthy.
// Erkennungszeichen: Filter an, Filter aus, neu laden → der Filter
// ist wieder an. Keine Fehlermeldung. Die Adresszeile zeigt
// ?favorites=false.
// Werte aus der URL sind immer Text - also mit einem Text vergleichen.
function readUrl() {
  const params = new URLSearchParams(location.search);
  state.onlyFavorites = params.get("favorites") === "1";
}

// FEHLER 2 (Teil 2) behoben: fetch scheitert bei 404 NICHT - erst
// response.ok sagt, ob der Server Erfolg meldet.
async function loadJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Fehler ${response.status} beim Laden von ${url}`);
  }
  return await response.json();
}


// ------------------------------------------------------------
// 4. Ereignisse
// ------------------------------------------------------------
favoritesCheckbox.addEventListener("change", () => {
  state.onlyFavorites = favoritesCheckbox.checked;
  updateUrl();
  render();
});

list.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (button === null) {
    return;
  }
  const id = Number(button.dataset.id);

  if (state.favorites.includes(id)) {
    state.favorites = state.favorites.filter((favoriteId) => favoriteId !== id);
  } else {
    state.favorites.push(id);
  }
  saveFavorites();
  render();
});


// ------------------------------------------------------------
// 5. Start
// ------------------------------------------------------------
async function init() {
  loadFavorites();
  readUrl();
  render();

  try {
    // FEHLER 1 behoben: await fehlte. data war ein Promise,
    // data.quotes damit undefined.
    // Erkennungszeichen: Console zeigt
    //   Uncaught (in promise) TypeError: Cannot read properties of
    //   undefined (reading 'filter')
    // in render() - bei state.quotes.filter. Breakpoint auf die Zeile
    // darunter: data ist  Promise {<pending>}.
    // Ohne await ist der try-Block längst verlassen, wenn das Promise
    // scheitert - der catch kann dann nichts mehr fangen.
    const data = await loadJson(API_URL);
    state.quotes = data.quotes;
  } catch (error) {
    // FEHLER 3 behoben: Der catch war leer, und loading wurde nur im
    // try auf false gesetzt.
    // Erkennungszeichen: offline (oder mit der falschen URL aus
    // Fehler 2, sobald Fehler 1 behoben ist) bleibt
    // "Zitate werden geladen …" für immer stehen - und die Console
    // ist LEER. Ein leerer catch macht den Fehler unsichtbar.
    console.error(error);
    state.error = "Zitate konnten nicht geladen werden.";
  } finally {
    state.loading = false;          // mit und ohne Fehler
  }
  render();
}

init();
