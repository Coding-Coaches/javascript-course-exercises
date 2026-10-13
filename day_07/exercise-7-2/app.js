// ============================================================
// Übung 7.2 - Rezepte merken, Filter teilen
// ------------------------------------------------------------
// Starten:  Rechtsklick auf index.html → Open with Live Server
// ============================================================
//
// Das ist die Rezept-App von Tag 6 (Lösung 6.2). Zwei Kleinigkeiten
// sind neu:
//   - Gelöscht wird jetzt mit dem Button "Löschen" - ein Klick auf
//     das Rezept selbst bleibt frei für Ausbau A.
//   - state.searchText ist der Text genau so, wie er im Suchfeld
//     steht. Kleingeschrieben wird erst beim Filtern.
//
// Das Problem: Nach dem Neuladen ist alles weg - neue Rezepte,
// gelöschte Rezepte, Suche und Filter.
//
// Teil A - Daten behalten (localStorage)
//
// 1. Schreibe  saveState() : speichert state.recipes als JSON unter
//    STORAGE_KEY. Rufe sie nach jedem Hinzufügen und Löschen auf.
//    Schreibe  loadState() : lädt die Rezepte, falls etwas
//    gespeichert ist. Der Aufruf in init() steht schon da.
//
// 2. Application → Local Storage → den Wert doppelklicken,  kaputt
//    eintippen, neu laden. Die App startet trotzdem - mit den
//    Startrezepten aus recipes.json und einer Meldung in der Console.
//
// Teil B - Ansicht teilen (URL)
//
// 3. Schreibe  updateUrl() : schreibt searchText und onlyVegetarian
//    mit history.replaceState in die URL - nur, was gesetzt ist:
//      ?search=nudel&veg=1
//    Rufe sie in den Handlern von Suchfeld und Checkbox auf.
//    Schreibe  readUrl() : liest beide aus der URL in den state.
//    Der Aufruf in init() steht schon da.
//
// 4. Nach dem Neuladen stimmen Liste, Suchfeld UND Checkbox.
//    Test: Filter setzen, URL kopieren, in einem neuen Tab öffnen.
// ============================================================

const STORAGE_KEY = "recipes-7-2";   // Live Server teilt den Speicher
                                     // zwischen allen Übungen


// ------------------------------------------------------------
// 1. Zustand
// ------------------------------------------------------------
const state = {
  recipes: [],
  loading: true,
  onlyVegetarian: false,
  searchText: "",
};


// ------------------------------------------------------------
// 2. Elemente - einmal suchen
// ------------------------------------------------------------
const list = document.querySelector("#recipe-list");
const vegCheckbox = document.querySelector("#only-vegetarian");
const searchInput = document.querySelector("#search-input");
const counter = document.querySelector("#recipe-count");
const form = document.querySelector("#recipe-form");
const titleInput = document.querySelector("#title-input");
const durationInput = document.querySelector("#duration-input");
const vegetarianInput = document.querySelector("#vegetarian-input");
const errorMessage = document.querySelector("#error-message");
const resetButton = document.querySelector("#reset-button");    // Ausbau B
const detail = document.querySelector("#recipe-detail");        // Ausbau A


// ------------------------------------------------------------
// 3. Darstellung
// ------------------------------------------------------------
function render() {
  if (state.loading) {
    list.textContent = "Rezepte werden geladen …";
    counter.textContent = "";
    return;
  }

  const search = state.searchText.trim().toLowerCase();
  const visible = state.recipes
    .filter((recipe) => !state.onlyVegetarian || recipe.vegetarian)
    .filter((recipe) => recipe.title.toLowerCase().includes(search));

  list.textContent = "";
  for (const recipe of visible) {
    const item = document.createElement("li");
    item.textContent = `${recipe.title} (${recipe.durationMinutes} min)`;
    item.dataset.id = recipe.id;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Löschen";
    item.append(deleteButton);

    list.append(item);
  }

  counter.textContent = `${visible.length} von ${state.recipes.length} Rezepten`;
}


// ------------------------------------------------------------
// Speichern und URL
// ------------------------------------------------------------
function saveState() {
  // Teil A, Punkt 1
}

function loadState() {
  // Teil A, Punkt 1 und 2
}

function updateUrl() {
  // Teil B, Punkt 3
}

function readUrl() {
  // Teil B, Punkt 3
}


// ------------------------------------------------------------
// 4. Ereignisse - Zustand ändern, dann render()
// ------------------------------------------------------------
vegCheckbox.addEventListener("change", () => {
  state.onlyVegetarian = vegCheckbox.checked;
  render();
});

searchInput.addEventListener("input", () => {
  state.searchText = searchInput.value;
  render();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = titleInput.value.trim();
  const durationMinutes = Number(durationInput.value);

  if (title === "") {
    errorMessage.textContent = "Bitte einen Titel eingeben.";
    return;
  }
  if (durationMinutes <= 0) {
    errorMessage.textContent = "Die Dauer muss größer als 0 sein.";
    return;
  }

  state.recipes.push({
    id: Date.now(),
    title,
    durationMinutes,
    vegetarian: vegetarianInput.checked,
  });
  render();
  form.reset();
  errorMessage.textContent = "";
});

list.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (button === null) {
    return;                  // Klick auf das Rezept selbst: frei für Ausbau A
  }
  const id = Number(button.closest("li").dataset.id);
  state.recipes = state.recipes.filter((recipe) => recipe.id !== id);
  render();
});


// ------------------------------------------------------------
// 5. Start
// ------------------------------------------------------------
async function init() {
  readUrl();                                      // Teil B
  render();                                       // "Rezepte werden geladen …"

  loadState();                                    // Teil A
  if (state.recipes.length === 0) {               // nichts gespeichert:
    const response = await fetch("recipes.json"); // Startrezepte laden
    state.recipes = await response.json();
  }

  state.loading = false;
  render();
}

init();


// ------------------------------------------------------------
// Ausbau A: Ein Klick auf ein Rezept öffnet eine Detailansicht
//           (Titel, Dauer, vegetarisch ja/nein) im Element
//           #recipe-detail - die Liste wird solange ausgeblendet:
//             list.hidden = true;   detail.hidden = false;
//           Die URL wird per pushState zu  ?recipe=3 .
//           Der Zurück-Button des Browsers führt wieder zur Liste
//           (Event "popstate"). Und ein Link mit ?recipe=3 öffnet
//           direkt die Detailansicht.
//
// Ausbau B: Der Button "Alles zurücksetzen" löscht den Speicher und
//           zeigt wieder die Startrezepte aus recipes.json.
// ------------------------------------------------------------
