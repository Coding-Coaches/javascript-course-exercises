// ============================================================
// Übung 4.1 - Lösung
// ============================================================

const ingredients = ["Mehl", "Eier", "Milch", "Butter"];


// 1. Erste und letzte Zutat
console.log(ingredients[0]);                        // Mehl
console.log(ingredients[ingredients.length - 1]);   // Butter
// length - 1 funktioniert auch noch, wenn die Liste länger wird.


// 2. Anhängen und entfernen
ingredients.push("Zucker");
console.log(ingredients);   // [ 'Mehl', 'Eier', 'Milch', 'Butter', 'Zucker' ]

ingredients.pop();
console.log(ingredients);   // [ 'Mehl', 'Eier', 'Milch', 'Butter' ]


// 3. Nummeriert ausgeben
for (let i = 0; i < ingredients.length; i++) {
  console.log(`${i + 1}. ${ingredients[i]}`);
}
// Der Index beginnt bei 0, die Nummerierung für Menschen bei 1.


// ------------------------------------------------------------
// Ausbau A - for...of
// ------------------------------------------------------------
for (const ingredient of ingredients) {
  console.log(ingredient);
}


// ------------------------------------------------------------
// Ausbau B - Rückgabewert von push
// ------------------------------------------------------------
const result = ingredients.push("Salz");
console.log(result);   // 5

// push gibt die NEUE LÄNGE zurück, nicht das Array.
// Das Array selbst wurde verändert - in result steht nur eine Zahl.
