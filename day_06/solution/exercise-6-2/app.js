// ============================================================
// Übung 6.2 - Lösung
// ============================================================
//
// Neu gegenüber 6.1: Die Rezepte kommen aus recipes.json.
// Am Muster ändert sich nichts - auch "lädt gerade" ist einfach
// Zustand, und "die Daten sind da" ist nur ein weiteres Ereignis:
// Zustand ändern, dann render().
// ============================================================

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


// ------------------------------------------------------------
// 1. Zustand
// ------------------------------------------------------------
const state = {
  recipes: [],       // kommt aus recipes.json
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


// ------------------------------------------------------------
// 3. Darstellung
// ------------------------------------------------------------
function render() {
  // 3. Ladezustand - Guard Clause wie an Tag 2
  if (state.loading) {
    list.textContent = "Rezepte werden geladen …";
    counter.textContent = "";
    return;
  }

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
// 5. Start - Daten laden
// ------------------------------------------------------------
async function init() {
  render();                                       // "Rezepte werden geladen …"

  await wait(1500);                               // Ausbau A

  console.log(fetch("recipes.json"));             // Ausbau B

  const response = await fetch("recipes.json");   // warten auf die Antwort
  state.recipes = await response.json();          // warten auf die Daten
  state.loading = false;
  render();                                       // die Liste
}

init();


// ------------------------------------------------------------
// Ausbau A
// ------------------------------------------------------------
// Der Ladetext steht 1,5 Sekunden lang da. Die Checkbox lässt sich
// trotzdem anklicken: await wartet nur in init(). Die Funktion gibt
// den Call Stack frei, der Event Loop arbeitet die Klicks ab, und
// nach 1,5 Sekunden geht init() genau hinter dem await weiter.
// (Ganz anders als eine while-Schleife, die die Seite einfriert.)
//
// Weil der Klick state.onlyVegetarian schon gesetzt hat, ist der
// Filter nach dem Laden sofort aktiv - das Muster sorgt dafür.
//
// ------------------------------------------------------------
// Ausbau B
// ------------------------------------------------------------
// Die Console zeigt  Promise {<pending>}  - fetch gibt sofort ein
// Versprechen zurück, die Antwort ist noch nicht da. Klappt man den
// Eintrag später auf, steht dort  [[PromiseState]]: "fulfilled"
// und als Wert ein Response-Objekt.
// Merke: Steht in der Console "Promise", fehlt fast immer ein await.
