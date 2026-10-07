// ============================================================
// Übung 4.4 - Lösung
// ============================================================

// ------------------------------------------------------------
// 1. Referenzen
// ------------------------------------------------------------
const original = ["Mehl", "Eier"];
const sameList = original;
sameList.push("Milch");
console.log(original);           // a) [ 'Mehl', 'Eier', 'Milch' ]
// sameList ist kein neues Array, sondern ein zweiter Name für
// dasselbe Array.

const realCopy = [...original];
realCopy.push("Zucker");
console.log(original);           // b) [ 'Mehl', 'Eier', 'Milch' ]
// Spread hat ein neues Array gebaut - original bleibt, wie es war.

const recipe = { title: "Rührei", durationMinutes: 10 };
const renamed = recipe;
renamed.title = "Spiegelei";
console.log(recipe.title);       // c) Spiegelei
// Bei Objekten genauso wie bei Arrays.


// ------------------------------------------------------------
// 2. addIngredient
// ------------------------------------------------------------
// Zweimal Spread: ein neues Objekt UND ein neues Array.
// Nur { ...recipe } würde nicht reichen - das ingredients-Array
// wäre in Kopie und Original immer noch dasselbe (flache Kopie).
function addIngredient(recipe, ingredient) {
  return { ...recipe, ingredients: [...recipe.ingredients, ingredient] };
}

const pancakes = { title: "Pfannkuchen", ingredients: ["Mehl", "Eier"] };
const sweet = addIngredient(pancakes, "Zucker");
console.log(sweet.ingredients);      // [ 'Mehl', 'Eier', 'Zucker' ]
console.log(pancakes.ingredients);   // [ 'Mehl', 'Eier' ]


// ------------------------------------------------------------
// 3. describe
// ------------------------------------------------------------
const describe = ({ title, durationMinutes }) => `${title} (${durationMinutes} min)`;

console.log(describe({ title: "Lasagne", durationMinutes: 60 }));   // Lasagne (60 min)


// ------------------------------------------------------------
// 4. totalMinutes
// ------------------------------------------------------------
function totalMinutes(...durations) {
  return durations.reduce((sum, minutes) => sum + minutes, 0);
}

console.log(totalMinutes(10, 20, 30));   // 60
console.log(totalMinutes(45));           // 45
console.log(totalMinutes());             // 0 - deshalb der Startwert bei reduce


// ------------------------------------------------------------
// Ausbau
// ------------------------------------------------------------
const titles = ["Pfannkuchen", "Lasagne", "Rührei"];

const [first, ...others] = titles;
console.log(first);    // Pfannkuchen
console.log(others);   // [ 'Lasagne', 'Rührei' ]

const withSalad = ["Salat", ...titles];
console.log(withSalad);   // [ 'Salat', 'Pfannkuchen', 'Lasagne', 'Rührei' ]
