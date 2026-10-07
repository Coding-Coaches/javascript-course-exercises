// ============================================================
// Übung 4.2 - Lösung
// ============================================================

const durations = [30, 45, 15, 90, 20];
const ingredients = ["Mehl", "Eier", "Milch", "Butter"];


// 1. map
const labels = durations.map((minutes) => `${minutes} min`);
console.log(labels);   // [ '30 min', '45 min', '15 min', '90 min', '20 min' ]


// 2. filter
const quick = durations.filter((minutes) => minutes <= 30);
console.log(quick);    // [ 30, 15, 20 ]


// 3. find und includes
console.log(durations.find((minutes) => minutes > 60));   // 90
console.log(ingredients.includes("Eier"));                // true
console.log(ingredients.includes("Zucker"));              // false


// 4. reduce
const total = durations.reduce((sum, minutes) => sum + minutes, 0);
const average = total / durations.length;
console.log(total);     // 200
console.log(average);   // 40


// ------------------------------------------------------------
// Ausbau A - verketten
// ------------------------------------------------------------
const quickTotal = durations
  .filter((minutes) => minutes <= 30)
  .reduce((sum, minutes) => sum + minutes, 0);
console.log(quickTotal);   // 65


// ------------------------------------------------------------
// Ausbau B - dieselbe Summe als Schleife
// ------------------------------------------------------------
let loopTotal = 0;
for (let i = 0; i < durations.length; i++) {
  loopTotal += durations[i];
}
console.log(loopTotal);   // 200

// Beides ist richtig. Die reduce-Fassung sagt in einer Zeile WAS
// passiert; die Schleife zeigt, WIE es passiert.
