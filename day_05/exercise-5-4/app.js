// ============================================================
// Übung 5.4 - Formular
// ------------------------------------------------------------
// Starten:  Rechtsklick auf index.html → Open with Live Server
// ============================================================

const recipes = [
  { title: "Pfannkuchen", durationMinutes: 20 },
  { title: "Lasagne", durationMinutes: 60 },
  { title: "Rührei", durationMinutes: 10 },
];

const list = document.querySelector("#recipe-list");
const form = document.querySelector("#recipe-form");
const titleInput = document.querySelector("#title-input");
const errorMessage = document.querySelector("#error-message");

// Fertig aus Übung 5.3 - hier musst du nichts ändern.
function renderRecipes(list, recipes) {
  list.textContent = "";
  for (const { title, durationMinutes } of recipes) {
    const item = document.createElement("li");
    item.textContent = `${title} (${durationMinutes} min)`;
    list.append(item);
  }
}

renderRecipes(list, recipes);


// 1. Beim Absenden soll die Seite NICHT neu laden.
//
// 2. Lies Titel und Dauer aus und füge das Rezept der Liste hinzu.
//    Die Liste auf der Seite muss das neue Rezept danach zeigen.
//
// 3. Leerer Titel oder Dauer ≤ 0 → Fehlermeldung in #error-message,
//    nichts hinzufügen:
//
//      Bitte einen Titel eingeben.
//      Die Dauer muss größer als 0 sein.
//
// 4. Nach dem Hinzufügen das Formular leeren - und eine alte
//    Fehlermeldung verschwindet.
//
// Tipp: preventDefault → FormData → fromEntries → prüfen → ausführen.
//       Die Felder haben name="title" und name="duration".
//       Ein Wert aus einem Formular ist IMMER ein String.



// ------------------------------------------------------------
// Ausbau A: Ein Titel, den es schon gibt, wird abgelehnt - ohne
//           Rücksicht auf Groß-/Kleinschreibung:
//
//             Dieses Rezept gibt es schon.
//
// Ausbau B: Nach dem Hinzufügen steht der Cursor wieder im Titelfeld.
//           Suche auf MDN nach "HTMLElement focus".
// ------------------------------------------------------------
