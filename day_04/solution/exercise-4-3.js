// ============================================================
// Übung 4.3 - Lösung
// ============================================================

const recipes = [
  { title: "Pfannkuchen", durationMinutes: 20, vegetarian: true, servings: 4, ingredients: ["Mehl", "Eier", "Milch"] },
  { title: "Lasagne", durationMinutes: 60, vegetarian: false, servings: 6, ingredients: ["Nudelplatten", "Hackfleisch", "Tomaten", "Käse"] },
  { title: "Chili sin Carne", durationMinutes: 45, vegetarian: true, servings: 4, ingredients: ["Bohnen", "Mais", "Tomaten", "Paprika"] },
  { title: "Rührei", durationMinutes: 10, vegetarian: true, servings: 2, ingredients: ["Eier", "Butter", "Salz"] },
  { title: "Hähnchencurry", durationMinutes: 40, vegetarian: false, servings: 4, ingredients: ["Hähnchen", "Kokosmilch", "Curry", "Reis"] },
];


// 1. Eigenes Rezept
const bananaBread = {
  title: "Bananenbrot",
  durationMinutes: 70,
  vegetarian: true,
  servings: 8,
  ingredients: ["Bananen", "Mehl", "Eier", "Butter"],
};

for (const entry of Object.entries(bananaBread)) {
  console.log(`${entry[0]}: ${entry[1]}`);
}
// ingredients wird als "Bananen,Mehl,Eier,Butter" ausgegeben -
// ein Array im Template Literal wird mit Kommas aneinandergehängt.


// 2. Titel der vegetarischen Rezepte
const vegetarianTitles = recipes
  .filter((recipe) => recipe.vegetarian)
  .map((recipe) => recipe.title);
console.log(vegetarianTitles);   // [ 'Pfannkuchen', 'Chili sin Carne', 'Rührei' ]


// 3. Durchschnittliche Dauer
const totalMinutes = recipes.reduce((sum, recipe) => sum + recipe.durationMinutes, 0);
console.log(totalMinutes / recipes.length);   // 35


// 4. Zutaten der Lasagne
const lasagne = recipes.find((recipe) => recipe.title === "Lasagne");
console.log(lasagne.ingredients);   // [ 'Nudelplatten', 'Hackfleisch', 'Tomaten', 'Käse' ]


// ------------------------------------------------------------
// Ausbau A - alle Zutaten zusammen
// ------------------------------------------------------------
const ingredientCount = recipes.reduce((sum, recipe) => sum + recipe.ingredients.length, 0);
console.log(ingredientCount);   // 18


// ------------------------------------------------------------
// Ausbau B - Suche ohne Groß-/Kleinschreibung
// ------------------------------------------------------------
function findRecipe(title) {
  const query = title.toLowerCase();
  return recipes.find((recipe) => recipe.title.toLowerCase() === query);
}

console.log(findRecipe("rührei").durationMinutes);   // 10
console.log(findRecipe("Pizza"));                    // undefined

// findRecipe("Pizza").ingredients
// → TypeError: Cannot read properties of undefined (reading 'ingredients')
// find liefert undefined, wenn nichts passt. Wer das Ergebnis weiter
// benutzt, muss vorher prüfen - z. B. mit einer Guard Clause.
