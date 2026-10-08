// ============================================================
// Übung 6.2 - Rezepte laden
// ------------------------------------------------------------
// Starten:  Rechtsklick auf index.html → Open with Live Server
//           (Doppelklick auf die Datei reicht hier NICHT -
//            fetch braucht einen Server.)
// ============================================================
//
// Das ist die Lösung von Übung 6.1. Die Rezepte stehen jetzt nicht
// mehr im Code, sondern in der Datei recipes.json daneben.
//
// 1. state.recipes startet als LEERES Array. Ergänze in state
//    loading: true
//
// 2. Schreibe  async function init() :
//      - Rezepte mit fetch aus "recipes.json" laden
//      - in state.recipes speichern, loading auf false setzen
//      - render()
//    Ersetze den Aufruf ganz unten durch  init();
//
// 3. Solange geladen wird, zeigt render() nur
//
//      Rezepte werden geladen …
//
//    in der Liste an.
//
// Prüfe im Network-Panel: Wurde recipes.json geladen? Status 200?
// ============================================================

// Ein Promise, das nach ms Millisekunden erfüllt wird.
// Fertig zum Benutzen - wie es innen funktioniert, brauchst du heute
// nicht.
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


// ------------------------------------------------------------
// 1. Zustand
// ------------------------------------------------------------
const state = {
  recipes: [],
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


// ------------------------------------------------------------
// 3. Darstellung
// ------------------------------------------------------------
function render() {
  const visible = state.recipes
    .filter((recipe) => !state.onlyVegetarian || recipe.vegetarian)
    .filter((recipe) => recipe.title.toLowerCase().includes(state.searchText));

  list.textContent = "";
  for (const recipe of visible) {
    const item = document.createElement("li");
    item.textContent = `${recipe.title} (${recipe.durationMinutes} min)`;
    item.dataset.id = recipe.id;
    list.append(item);
  }

  counter.textContent = `${visible.length} von ${state.recipes.length} Rezepten`;
}


// ------------------------------------------------------------
// 4. Ereignisse - Zustand ändern, dann render()
// ------------------------------------------------------------
vegCheckbox.addEventListener("change", () => {
  state.onlyVegetarian = vegCheckbox.checked;
  render();
});

searchInput.addEventListener("input", () => {
  state.searchText = searchInput.value.trim().toLowerCase();
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
  if (event.target.dataset.id === undefined) {
    return;
  }
  const id = Number(event.target.dataset.id);
  state.recipes = state.recipes.filter((recipe) => recipe.id !== id);
  render();
});


// ------------------------------------------------------------
// 5. Start
// ------------------------------------------------------------
render();


// ------------------------------------------------------------
// Ausbau A: Baue in init() vor dem fetch  await wait(1500);  ein.
//           Siehst du jetzt den Ladetext? Kannst du während der
//           1,5 Sekunden die Checkbox anklicken? Warum?
//
// Ausbau B: Schreibe  console.log(fetch("recipes.json"));  in init().
//           Was steht in der Console - und was, wenn du den Eintrag
//           ein paar Sekunden später aufklappst?
// ------------------------------------------------------------
