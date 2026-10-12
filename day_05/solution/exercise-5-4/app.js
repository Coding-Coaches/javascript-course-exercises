// ============================================================
// Übung 5.4 - Lösung
// ============================================================

const recipes = [
  { title: "Pfannkuchen", durationMinutes: 20 },
  { title: "Lasagne", durationMinutes: 60 },
  { title: "Rührei", durationMinutes: 10 },
];

const list = document.querySelector("#recipe-list");
const form = document.querySelector("#recipe-form");
const titleInput = document.querySelector("#title-input");   // nur für Ausbau B
const errorMessage = document.querySelector("#error-message");

function renderRecipes(list, recipes) {
  list.textContent = "";
  for (const { title, durationMinutes } of recipes) {
    const item = document.createElement("li");
    item.textContent = `${title} (${durationMinutes} min)`;
    list.append(item);
  }
}

renderRecipes(list, recipes);


// submit am FORMULAR - kommt auch bei Enter im Eingabefeld.
form.addEventListener("submit", (event) => {
  // 1. Kein Neuladen der Seite
  event.preventDefault();

  // 2. + 3. Alle Felder mit name einsammeln, als Objekt:
  //         { title: "Lasagne", duration: "60" }
  const data = Object.fromEntries(new FormData(form));

  // 4. Normalisieren: Werte aus dem Formular sind immer Strings
  const title = data.title.trim();
  const durationMinutes = Number(data.duration);

  // Prüfen - Guard Clauses wie an Tag 2
  if (title === "") {
    errorMessage.textContent = "Bitte einen Titel eingeben.";
    return;
  }
  if (durationMinutes <= 0) {
    // Leeres Feld: Number("") ist 0 - landet also auch hier.
    errorMessage.textContent = "Die Dauer muss größer als 0 sein.";
    return;
  }

  // Ausbau A
  const existing = recipes.find(
    (recipe) => recipe.title.toLowerCase() === title.toLowerCase()
  );
  if (existing !== undefined) {
    errorMessage.textContent = "Dieses Rezept gibt es schon.";
    return;
  }

  // 5. Ausführen: Daten ändern → neu rendern
  recipes.push({ title, durationMinutes });
  renderRecipes(list, recipes);

  // Aufräumen
  form.reset();
  errorMessage.textContent = "";

  // Ausbau B
  titleInput.focus();
});
