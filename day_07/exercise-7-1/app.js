// ============================================================
// Übung 7.1 - Rezepte von einer API
// ------------------------------------------------------------
// Starten:  Rechtsklick auf index.html → Open with Live Server
// ============================================================
//
// Das ist die Rezept-App von Tag 6 - schon umgestellt auf das
// Format der Übungs-API DummyJSON:
//   name             statt  title
//   cookTimeMinutes  statt  durationMinutes
// Ein Feld "vegetarian" kennt die API nicht - die Checkbox ist weg.
// Noch lädt die App die Rezepte aus recipes.json daneben. Die Datei
// hat schon denselben Aufbau wie die Antwort der API.
//
// 1. Schreibe  async function loadJson(url) :
//      - fetch(url)
//      - ist response.ok false →  throw new Error(...)  mit dem
//        Status und der URL im Text
//      - sonst die Daten zurückgeben:  return await response.json();
//
// 2. Lade in init() die Rezepte mit loadJson von
//
//      https://dummyjson.com/recipes
//
//    Network → Anfrage anklicken → Preview: Wie ist die Antwort
//    aufgebaut? Wo steckt das Array?
//
// 3. Ergänze state um  error: null .
//    - Während des Ladens zeigt render():
//        Rezepte werden geladen …
//    - Bei einem Fehler zeigt render():
//        Rezepte konnten nicht geladen werden.
//    Baue try / catch / finally in init() ein.
//
// 4. Teste beide Fehlerfälle:
//    - Network → "No throttling" auf "Offline" stellen, neu laden
//    - die URL absichtlich falsch schreiben, z. B. .../recipess
//      (Vorsicht: .../recipe ohne s klappt bei DummyJSON trotzdem!)
//    In beiden Fällen: Meldung auf der Seite UND Fehler in der Console.
//
// Kein Netz im Raum? Dann lass "recipes.json" als URL stehen -
// der Code ist derselbe.
// ============================================================


// ------------------------------------------------------------
// 1. Zustand
// ------------------------------------------------------------
const state = {
  recipes: [],
  searchText: "",
  loading: true,
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
// 4. Ereignisse - Zustand ändern, dann render()
// ------------------------------------------------------------
searchInput.addEventListener("input", () => {
  state.searchText = searchInput.value.trim().toLowerCase();
  render();
});

form.addEventListener("submit", (event) => {
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

  state.recipes.push({
    id: Date.now(),
    name,
    cookTimeMinutes,
  });
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
  state.recipes = state.recipes.filter((recipe) => recipe.id !== id);
  render();
});


// ------------------------------------------------------------
// 5. Start - Daten laden
// ------------------------------------------------------------
async function init() {
  render();                                       // "Rezepte werden geladen …"

  const response = await fetch("recipes.json");
  const data = await response.json();             // { recipes: [...], total, ... }
  state.recipes = data.recipes;
  state.loading = false;
  render();
}

init();


// ------------------------------------------------------------
// Ausbau: Das Formular legt das Rezept nicht mehr nur im state an,
//         sondern schickt es per POST an
//
//           https://dummyjson.com/recipes/add
//
//         mit  { name, cookTimeMinutes }  im body. Die Antwort des
//         Servers - das Rezept mit seiner neuen id - kommt in
//         state.recipes.
//         Klappt das Senden nicht, steht unter dem Formular:
//           Rezept konnte nicht gespeichert werden.
//
//         Network → Anfrage anklicken → Payload: Was wurde gesendet?
//         Hinweis: DummyJSON speichert nichts wirklich. Beim nächsten
//         Laden ist das neue Rezept wieder weg.
// ------------------------------------------------------------
