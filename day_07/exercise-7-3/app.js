// ============================================================
// Zitate-Sammlung
// ------------------------------------------------------------
// Starten:  Rechtsklick auf index.html → Open with Live Server
// Debuggen: F12 → Sources → app.js → Breakpoint setzen
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
// Benutze Console, Network, Application und die Adresszeile.
// ============================================================

const API_URL = "https://dummyjson.com/qoutes?limit=20";
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
function saveFavorites() {
  localStorage.setItem(STORAGE_KEY, state.favorites);
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

function updateUrl() {
  const params = new URLSearchParams();
  params.set("favorites", state.onlyFavorites);
  history.replaceState(null, "", `?${params}`);
}

function readUrl() {
  const params = new URLSearchParams(location.search);
  if (params.get("favorites")) {
    state.onlyFavorites = true;
  }
}

async function loadJson(url) {
  const response = await fetch(url);
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
    const data = loadJson(API_URL);
    state.quotes = data.quotes;
    state.loading = false;
  } catch (error) {
  }
  render();
}

init();
