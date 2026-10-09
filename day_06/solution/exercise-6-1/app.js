// ============================================================
// Übung 6.1 - Lösung
// ============================================================
//
// Das Problem im Startstand: Zwei Stellen haben die Seite verändert,
// und keine wusste von der anderen. Die Checkbox hat gefiltert, das
// Formular hat danach wieder ALLE Rezepte gezeigt - obwohl die
// Checkbox noch angehakt war.
//
// Jetzt gilt:
//   - Ein Zustand: Alles, was sich ändern kann, steht in state.
//   - Nur render() ändert die Seite - und baut sie komplett aus state.
//   - Handler ändern nur state und rufen danach render() auf.
// ============================================================


// ------------------------------------------------------------
// 1. Zustand
// ------------------------------------------------------------
const state = {
  recipes: [
    { id: 1, title: "Pfannkuchen", durationMinutes: 20, vegetarian: true },
    { id: 2, title: "Lasagne", durationMinutes: 60, vegetarian: false },
    { id: 3, title: "Chili sin Carne", durationMinutes: 45, vegetarian: true },
    { id: 4, title: "Rührei", durationMinutes: 10, vegetarian: true },
    { id: 5, title: "Hähnchencurry", durationMinutes: 40, vegetarian: false },
    { id: 6, title: "Gemüsesuppe", durationMinutes: 35, vegetarian: true },
    { id: 7, title: "Spaghetti Bolognese", durationMinutes: 30, vegetarian: false },
    { id: 8, title: "Ofengemüse", durationMinutes: 50, vegetarian: true },
  ],
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
  // Berechnen - die sichtbaren Rezepte werden NICHT gespeichert.
  const visible = state.recipes
    .filter((recipe) => !state.onlyVegetarian || recipe.vegetarian)
    .filter((recipe) => recipe.title.toLowerCase().includes(state.searchText));

  // Anzeigen - erst leeren, dann alles neu aufbauen.
  list.textContent = "";
  for (const recipe of visible) {
    const item = document.createElement("li");
    item.textContent = `${recipe.title} (${recipe.durationMinutes} min)`;
    item.dataset.id = recipe.id;   // Ausbau
    list.append(item);
  }

  // Der Zähler wird aus state berechnet - nie aus dem DOM gelesen.
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

  // Die Fehlermeldung schreiben wir hier direkt - sie ist eine
  // Rückmeldung auf die Eingabe, kein Teil der Rezeptliste.
  // Wer mag, legt sie als state.error an und zeigt sie in render().
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

// Ausbau: Klick löscht
// Der Listener hängt an der LISTE: render() wirft bei jedem Aufruf
// alle <li> weg und baut neue. Ein Listener an einem alten <li> wäre
// danach verschwunden.
list.addEventListener("click", (event) => {
  // closest sucht vom geklickten Element aufwärts das <li>.
  // Klick zwischen zwei Einträge trifft die <ul> - dann gibt es kein <li>.
  const item = event.target.closest("li");
  if (item === null) {
    return;
  }
  const id = Number(item.dataset.id);   // dataset ist immer Text
  state.recipes = state.recipes.filter((recipe) => recipe.id !== id);
  render();
});


// ------------------------------------------------------------
// 5. Start
// ------------------------------------------------------------
render();
