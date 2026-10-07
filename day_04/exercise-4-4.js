// ============================================================
// Übung 4.4 - Referenzen, Spread, Destructuring, Rest
// ------------------------------------------------------------
// Ausführen:  node day_04/exercise-4-4.js
// ============================================================

// ------------------------------------------------------------
// 1. Referenzen: Sage für a) bis c) vorher, was ausgegeben wird.
//    Schreibe deine Vorhersage hinter die Zeile, DANN ausführen.
// ------------------------------------------------------------
const original = ["Mehl", "Eier"];
const sameList = original;
sameList.push("Milch");
console.log(original);           // a) Vorhersage:

const realCopy = [...original];
realCopy.push("Zucker");
console.log(original);           // b) Vorhersage:

const recipe = { title: "Rührei", durationMinutes: 10 };
const renamed = recipe;
renamed.title = "Spiegelei";
console.log(recipe.title);       // c) Vorhersage:


// ------------------------------------------------------------
// 2. Schreibe addIngredient(recipe, ingredient).
//    Sie gibt ein NEUES Rezept mit der zusätzlichen Zutat zurück.
//    Das übergebene Rezept darf sich NICHT verändern.
//
//      const pancakes = { title: "Pfannkuchen", ingredients: ["Mehl", "Eier"] };
//      const sweet = addIngredient(pancakes, "Zucker");
//
//      sweet.ingredients     →  ["Mehl", "Eier", "Zucker"]
//      pancakes.ingredients  →  ["Mehl", "Eier"]
// ------------------------------------------------------------


// ------------------------------------------------------------
// 3. Schreibe describe(recipe) mit Destructuring im Parameter.
//
//      describe({ title: "Lasagne", durationMinutes: 60 })
//        →  "Lasagne (60 min)"
// ------------------------------------------------------------


// ------------------------------------------------------------
// 4. Schreibe totalMinutes(...durations) mit einem Rest-Parameter.
//
//      totalMinutes(10, 20, 30)   →  60
//      totalMinutes(45)           →  45
//      totalMinutes()             →  0
// ------------------------------------------------------------



// ------------------------------------------------------------
// Ausbau: Teile die Rezeptliste mit Destructuring und Rest auf:
//
//           const titles = ["Pfannkuchen", "Lasagne", "Rührei"];
//
//         first   →  "Pfannkuchen"
//         others  →  ["Lasagne", "Rührei"]
//
//         Und andersherum: Wie bekommst du mit Spread die Liste
//         ["Salat", "Pfannkuchen", "Lasagne", "Rührei"]?
// ------------------------------------------------------------
