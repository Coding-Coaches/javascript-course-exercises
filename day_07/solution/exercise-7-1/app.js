// ============================================================
// Übung 7.1 - Lösung
// ============================================================
//
// Neu gegenüber Tag 6: Die Rezepte kommen von einer echten API,
// und beide Fehlerfälle von fetch landen im selben catch:
//   - kein Netz       → fetch selbst scheitert
//   - 404, 500, …     → fetch klappt, loadJson wirft selbst
// Auch ein Fehler ist nur Zustand - render() entscheidet, was
// angezeigt wird.
// ============================================================

const API_URL = "https://dummyjson.com/recipes";


// ------------------------------------------------------------
// 1. Zustand
// ------------------------------------------------------------
const state = {
  recipes: [],       // kommt von der API
  searchText: "",
  loading: true,
  error: null,       // 3. Text der Fehlermeldung - oder null
};


// ------------------------------------------------------------
// 2. Elemente - einmal suchen
// ------------------------------------------------------------
const list = document.querySelector("#recipe-list");
const searchInput = document.querySelector("#search-input");
const counter = document.querySelector("#recipe-count");
const form = document.querySelector("#recipe-form");
const nameInput = document.querySelector("#name-input");
const durationInput = document.querySelector("#duration-input");
const errorMessage = document.querySelector("#error-message");


// ------------------------------------------------------------
// 3. Darstellung
// ------------------------------------------------------------
function render() {
  if (state.loading) {
    list.textContent = "Rezepte werden geladen …";
    counter.textContent = "";
    return;
  }

  // 3. Fehler - genauso eine Guard Clause wie der Ladezustand
  if (state.error !== null) {
    list.textContent = state.error;
    counter.textContent = "";
    return;
  }

  const visible = state.recipes
    .filter((recipe) => recipe.name.toLowerCase().includes(state.searchText));

  list.textContent = "";
  for (const recipe of visible) {
    const item = document.createElement("li");
    item.textContent = `${recipe.name} (${recipe.cookTimeMinutes} min)`;
    item.dataset.id = recipe.id;
    list.append(item);
  }

  counter.textContent = `${visible.length} von ${state.recipes.length} Rezepten`;
}


// ------------------------------------------------------------
// Hilfsfunktionen für die API
// ------------------------------------------------------------

// 1. Liefert die Daten - oder wirft. Auch bei 404 und 500.
async function loadJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Fehler ${response.status} beim Laden von ${url}`);
  }
  return await response.json();
}

// Ausbau: dasselbe Prinzip für POST
async function sendJson(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Fehler ${response.status} beim Senden an ${url}`);
  }
  return await response.json();
}


// ------------------------------------------------------------
// 4. Ereignisse - Zustand ändern, dann render()
// ------------------------------------------------------------
searchInput.addEventListener("input", () => {
  state.searchText = searchInput.value.trim().toLowerCase();
  render();
});

// Ausbau: Der Handler ist jetzt async, weil er auf den Server wartet.
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();
  const cookTimeMinutes = Number(durationInput.value);

  if (name === "") {
    errorMessage.textContent = "Bitte einen Namen eingeben.";
    return;
  }
  if (cookTimeMinutes <= 0) {
    errorMessage.textContent = "Die Kochzeit muss größer als 0 sein.";
    return;
  }

  try {
    const created = await sendJson(`${API_URL}/add`, { name, cookTimeMinutes });
    state.recipes.push(created);     // { id: 51, name, cookTimeMinutes }
    form.reset();
    errorMessage.textContent = "";
  } catch (error) {
    console.error(error);
    errorMessage.textContent = "Rezept konnte nicht gespeichert werden.";
  }
  render();
});

list.addEventListener("click", (event) => {
  const item = event.target.closest("li");
  if (item === null) {
    return;
  }
  const id = Number(item.dataset.id);
  state.recipes = state.recipes.filter((recipe) => recipe.id !== id);
  render();
});


// ------------------------------------------------------------
// 5. Start - Daten laden
// ------------------------------------------------------------
async function init() {
  render();                                       // "Rezepte werden geladen …"
  try {
    const data = await loadJson(API_URL);         // 2. await INNERHALB von try
    state.recipes = data.recipes;                 // das Array steckt in data.recipes
  } catch (error) {
    console.error(error);                         // nie leer lassen
    state.error = "Rezepte konnten nicht geladen werden.";
  } finally {
    state.loading = false;                        // mit und ohne Fehler
    render();                                     // Liste oder Fehlermeldung
  }
}

init();


// ------------------------------------------------------------
// 4. Die beiden Fehlerfälle
// ------------------------------------------------------------
// Offline:   fetch scheitert. Console:  TypeError: Failed to fetch
//            (Firefox: NetworkError when attempting to fetch resource)
// .../recipess:  Der Server antwortet mit 404 und einer HTML-Seite.
//            Ohne die ok-Prüfung käme  SyntaxError: Unexpected token '<'
//            - die Meldung führt auf die falsche Spur. Mit der Prüfung
//            steht in der Console:  Fehler 404 beim Laden von ...
//
// Typische Stolperstellen:
// - state.recipes = data  statt  data.recipes → recipes ist ein Objekt,
//   und .filter in render() scheitert.
// - loading = false nur im try → offline bleibt der Ladetext für immer.
//
// ------------------------------------------------------------
// Ausbau
// ------------------------------------------------------------
// DummyJSON speichert nichts und gibt JEDEM neuen Rezept die id 51.
// Legt man zwei Rezepte an, haben beide die id 51 - ein Klick löscht
// dann beide. Bei einer echten API wäre jede id eindeutig.
