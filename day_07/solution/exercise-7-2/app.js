// ============================================================
// Übung 7.2 - Lösung
// ============================================================
//
// Zwei Orte für Zustand, die das Neuladen überleben:
//   localStorage  - was der Benutzer HAT    (seine Rezepte)
//   URL           - was er gerade ANSIEHT   (Suche, Filter, Detail)
// Der state bleibt die eine Wahrheit. Beim Start wird er aus URL und
// localStorage befüllt, bei jeder Änderung wird zurückgeschrieben:
//   state ändern → saveState() / updateUrl() → render()
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
  selectedId: null,        // Ausbau A: id des geöffneten Rezepts - oder null
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
  // 4. Auch die Eingabefelder gehören zur Darstellung. Ohne diese
  //    zwei Zeilen ist die Liste nach dem Neuladen richtig gefiltert,
  //    aber Suchfeld und Checkbox sind leer.
  searchInput.value = state.searchText;
  vegCheckbox.checked = state.onlyVegetarian;

  if (state.loading) {
    list.textContent = "Rezepte werden geladen …";
    counter.textContent = "";
    return;
  }

  // Ausbau A: Detailansicht statt Liste
  const selected = state.recipes.find((recipe) => recipe.id === state.selectedId);
  if (selected !== undefined) {
    renderDetail(selected);
    return;
  }
  list.hidden = false;
  detail.hidden = true;

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

// Ausbau A
function renderDetail(recipe) {
  list.hidden = true;
  detail.hidden = false;
  counter.textContent = "";

  const heading = document.createElement("h2");
  heading.textContent = recipe.title;
  const info = document.createElement("p");
  info.textContent = `${recipe.durationMinutes} Minuten · ${recipe.vegetarian ? "vegetarisch" : "nicht vegetarisch"}`;
  const hint = document.createElement("p");
  hint.textContent = "Zurück zur Liste: Zurück-Button des Browsers";

  detail.textContent = "";
  detail.append(heading, info, hint);
}


// ------------------------------------------------------------
// Speichern und URL
// ------------------------------------------------------------

// 1. localStorage speichert nur Text - darum JSON.stringify.
//    Ohne steht im Application-Tab "[object Object],[object Object]".
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.recipes));
}

// 1. + 2. Beim allerersten Besuch liefert getItem null. Ist der
//    gespeicherte Text kein gültiges JSON ("kaputt"), wirft
//    JSON.parse einen SyntaxError - der catch fängt ihn, und die App
//    startet mit den Startrezepten.
function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      state.recipes = JSON.parse(saved);
    }
  } catch (error) {
    console.error("Gespeicherte Rezepte unlesbar - starte mit den Startrezepten.", error);
  }
}

// 3. Nur setzen, was gesetzt ist - dann bleibt die URL kurz, und es
//    gibt kein  veg=false , das beim Lesen als Text "false" truthy ist.
//    replaceState: Tippen soll keine Einträge im Verlauf erzeugen.
function updateUrl() {
  const params = new URLSearchParams();
  if (state.searchText !== "") {
    params.set("search", state.searchText);
  }
  if (state.onlyVegetarian) {
    params.set("veg", "1");
  }
  if (state.selectedId !== null) {                // Ausbau A
    params.set("recipe", state.selectedId);
  }
  history.replaceState(null, "", `?${params}`);
}

// 3. Alles aus der URL ist Text: "1", nicht true - und null, wenn
//    der Parameter fehlt.
function readUrl() {
  const params = new URLSearchParams(location.search);
  state.searchText = params.get("search") === null ? "" : params.get("search");
  state.onlyVegetarian = params.get("veg") === "1";
  state.selectedId = params.get("recipe") === null ? null : Number(params.get("recipe"));  // Ausbau A
}

// Ausbau B
async function loadStartRecipes() {
  const response = await fetch("recipes.json");
  return await response.json();
}


// ------------------------------------------------------------
// 4. Ereignisse - Zustand ändern, speichern, dann render()
// ------------------------------------------------------------
vegCheckbox.addEventListener("change", () => {
  state.onlyVegetarian = vegCheckbox.checked;
  updateUrl();
  render();
});

searchInput.addEventListener("input", () => {
  state.searchText = searchInput.value;
  updateUrl();
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
  saveState();
  render();
  form.reset();
  errorMessage.textContent = "";
});

list.addEventListener("click", (event) => {
  const item = event.target.closest("li");
  if (item === null) {
    return;
  }
  const id = Number(item.dataset.id);

  if (event.target.closest("button") !== null) {  // "Löschen"
    state.recipes = state.recipes.filter((recipe) => recipe.id !== id);
    saveState();
    render();
    return;
  }

  // Ausbau A: pushState - ein "echter" Schritt, der Zurück-Button
  // soll ihn rückgängig machen.
  history.pushState(null, "", `?recipe=${id}`);
  readUrl();
  render();
});

// Ausbau A: Zurück / Vor im Browser. Die Seite wird NICHT neu
// geladen - also wie beim Start: URL lesen → state → render().
window.addEventListener("popstate", () => {
  readUrl();
  render();
});

// Ausbau B
resetButton.addEventListener("click", async () => {
  localStorage.removeItem(STORAGE_KEY);
  state.recipes = await loadStartRecipes();
  render();
});


// ------------------------------------------------------------
// 5. Start: URL + localStorage → state → render()
// ------------------------------------------------------------
async function init() {
  readUrl();
  render();                                       // "Rezepte werden geladen …"

  loadState();
  if (state.recipes.length === 0) {               // nichts gespeichert:
    state.recipes = await loadStartRecipes();     // Startrezepte laden
  }

  state.loading = false;
  render();
}

init();


// ------------------------------------------------------------
// Gut zu wissen
// ------------------------------------------------------------
// - Wer ALLE Rezepte löscht, speichert ein leeres Array. Beim
//   nächsten Start ist state.recipes.length 0 - und die Startrezepte
//   kommen wieder. Wer das anders will, lässt loadState() true oder
//   false zurückgeben: "Es war etwas gespeichert."
// - Gespeichert werden nur die DATEN. loading, Fehlermeldungen und
//   die Ansicht (Suche, Filter) gehören nicht in den localStorage.
