// ============================================================
// Übung 6.1 - Die Rezeptliste umbauen
// ------------------------------------------------------------
// Starten:  Rechtsklick auf index.html → Open with Live Server
// ============================================================
//
// Das ist der Stand von Tag 5. Er funktioniert - aber nur, solange
// man immer nur EINE Sache macht. Probiere es aus:
//
//   "Nur vegetarisch" anhaken, dann "Lasagne 2" (nicht vegetarisch)
//   hinzufügen. Was zeigt die Liste - und was zeigt die Checkbox?
//
// Baue den Code nach dem Muster Zustand → Darstellung → Ereignis um:
//
// 1. Lege ein Objekt state an mit
//      recipes         - die Rezepte von unten
//      onlyVegetarian  - false
//      searchText      - ""
//
// 2. Schreibe EINE Funktion render(), die aus state
//      - die sichtbaren Rezepte berechnet (Filter UND Suche)
//      - die Liste aufbaut
//      - den Zähler setzt:   3 von 8 Rezepten
//    renderRecipes wird danach nicht mehr gebraucht.
//
// 3. Die Checkbox und das Suchfeld ändern NUR state und rufen
//    danach render() auf. Das Suchfeld filtert bei jedem
//    Tastendruck (Event "input").
//
// 4. Das Formular fügt ein Rezept zu state.recipes hinzu und ruft
//    render() auf. Der Filter bleibt dabei erhalten.
//
// Die Gliederung am Ende soll so aussehen:
//   1. Zustand  2. Elemente  3. Darstellung  4. Ereignisse  5. Start
// ============================================================

const recipes = [
  { id: 1, title: "Pfannkuchen", durationMinutes: 20, vegetarian: true },
  { id: 2, title: "Lasagne", durationMinutes: 60, vegetarian: false },
  { id: 3, title: "Chili sin Carne", durationMinutes: 45, vegetarian: true },
  { id: 4, title: "Rührei", durationMinutes: 10, vegetarian: true },
  { id: 5, title: "Hähnchencurry", durationMinutes: 40, vegetarian: false },
  { id: 6, title: "Gemüsesuppe", durationMinutes: 35, vegetarian: true },
  { id: 7, title: "Spaghetti Bolognese", durationMinutes: 30, vegetarian: false },
  { id: 8, title: "Ofengemüse", durationMinutes: 50, vegetarian: true },
];

const list = document.querySelector("#recipe-list");
const vegCheckbox = document.querySelector("#only-vegetarian");
const searchInput = document.querySelector("#search-input");
const counter = document.querySelector("#recipe-count");
const form = document.querySelector("#recipe-form");
const titleInput = document.querySelector("#title-input");
const durationInput = document.querySelector("#duration-input");
const vegetarianInput = document.querySelector("#vegetarian-input");
const errorMessage = document.querySelector("#error-message");

function renderRecipes(list, recipes) {
  list.textContent = "";
  for (const recipe of recipes) {
    const item = document.createElement("li");
    item.textContent = `${recipe.title} (${recipe.durationMinutes} min)`;
    list.append(item);
  }
}

renderRecipes(list, recipes);

vegCheckbox.addEventListener("change", () => {
  if (vegCheckbox.checked) {
    renderRecipes(list, recipes.filter((recipe) => recipe.vegetarian));
  } else {
    renderRecipes(list, recipes);
  }
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

  // Date.now() ist eine Zahl, die sich jede Millisekunde ändert -
  // für uns eine einfache, eindeutige id.
  recipes.push({ id: Date.now(), title, durationMinutes, vegetarian: vegetarianInput.checked });
  renderRecipes(list, recipes);
  form.reset();
  errorMessage.textContent = "";
});


// ------------------------------------------------------------
// Ausbau: Ein Klick auf ein Rezept löscht es.
//
//   - Gib jedem <li> in render() die id mit:  item.dataset.id = recipe.id
//   - EIN Listener an der Liste sucht das <li>:  event.target.closest("li")
//   - Achtung: dataset.id ist ein String - und ein Klick zwischen
//     zwei Einträge trifft die Liste selbst: closest liefert dann null.
// ------------------------------------------------------------
