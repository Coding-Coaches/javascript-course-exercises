// ============================================================
// Übung 5.3 - Lösung
// ============================================================

const recipes = [
  { title: "Pfannkuchen", durationMinutes: 20, vegetarian: true },
  { title: "Lasagne", durationMinutes: 60, vegetarian: false },
  { title: "Chili sin Carne", durationMinutes: 45, vegetarian: true },
  { title: "Rührei", durationMinutes: 10, vegetarian: true },
  { title: "Hähnchencurry", durationMinutes: 40, vegetarian: false },
];

const list = document.querySelector("#recipe-list");
const vegButton = document.querySelector("#only-vegetarian");


// 1. Liste aus Daten rendern
// Erst leeren, dann alles neu aufbauen. So kann man die Funktion
// beliebig oft aufrufen, ohne dass sich Einträge verdoppeln.
function renderRecipes(list, recipes) {
  list.textContent = "";
  for (const { title, durationMinutes, vegetarian } of recipes) {
    const item = document.createElement("li");
    item.textContent = `${title} (${durationMinutes} min)`;
    if (vegetarian) {
      item.textContent += " 🌱";   // Ausbau B
    }
    list.append(item);
  }
}

renderRecipes(list, recipes);


// 2. Klick schaltet "done" um
// Ein Listener an der Liste statt einer an jedem <li>.
// event.target ist das Element, auf das wirklich geklickt wurde.
list.addEventListener("click", (event) => {
  event.target.classList.toggle("done");
});


// 3. + Ausbau A: Nur vegetarisch ↔ alle
// onlyVegetarian merkt sich, was gerade angezeigt wird.
let onlyVegetarian = false;

vegButton.addEventListener("click", () => {
  onlyVegetarian = !onlyVegetarian;

  if (onlyVegetarian) {
    renderRecipes(list, recipes.filter((recipe) => recipe.vegetarian));
    vegButton.textContent = "Alle zeigen";
  } else {
    renderRecipes(list, recipes);
    vegButton.textContent = "Nur vegetarisch";
  }
});

// Wer ganz genau hinschaut: Ein Klick auf den Rand der Liste trifft
// die <ul> selbst - dann bekommt die ganze Liste "done". Wie man das
// verhindert, kommt an Tag 6.
