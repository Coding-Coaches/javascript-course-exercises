// ============================================================
// Übung 4.3 - Objekte
// ------------------------------------------------------------
// Ausführen:  node day_04/exercise-4-3.js
// ============================================================

const recipes = [
  { title: "Pfannkuchen", durationMinutes: 20, vegetarian: true, servings: 4, ingredients: ["Mehl", "Eier", "Milch"] },
  { title: "Lasagne", durationMinutes: 60, vegetarian: false, servings: 6, ingredients: ["Nudelplatten", "Hackfleisch", "Tomaten", "Käse"] },
  { title: "Chili sin Carne", durationMinutes: 45, vegetarian: true, servings: 4, ingredients: ["Bohnen", "Mais", "Tomaten", "Paprika"] },
  { title: "Rührei", durationMinutes: 10, vegetarian: true, servings: 2, ingredients: ["Eier", "Butter", "Salz"] },
  { title: "Hähnchencurry", durationMinutes: 40, vegetarian: false, servings: 4, ingredients: ["Hähnchen", "Kokosmilch", "Curry", "Reis"] },
];


// 1. Lege ein eigenes Rezept als Objekt an - mit denselben
//    Eigenschaften wie oben.
//    Gib alle Eigenschaften mit Object.entries aus:
//
//      title: Bananenbrot
//      durationMinutes: 70
//      ...


// 2. Gib die Titel aller vegetarischen Rezepte aus recipes aus.
//
//      ["Pfannkuchen", "Chili sin Carne", "Rührei"]


// 3. Berechne die durchschnittliche Dauer aller Rezepte (35).


// 4. Finde die Lasagne und gib ihre Zutaten aus.



// ------------------------------------------------------------
// Ausbau A: Wie viele Zutaten haben alle Rezepte zusammen? (18)
//
// Ausbau B: Schreibe findRecipe(title), die ein Rezept ohne
//           Rücksicht auf Groß-/Kleinschreibung findet.
//           Was gibt findRecipe("Pizza") zurück - und was passiert,
//           wenn du danach .ingredients abfragst?
// ------------------------------------------------------------
