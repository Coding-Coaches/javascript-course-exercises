// ============================================================
// Übung 5.3 - Liste rendern und Klicks
// ------------------------------------------------------------
// Starten:  Rechtsklick auf index.html → Open with Live Server
// ============================================================

const recipes = [
  { title: "Pfannkuchen", durationMinutes: 20, vegetarian: true },
  { title: "Lasagne", durationMinutes: 60, vegetarian: false },
  { title: "Chili sin Carne", durationMinutes: 45, vegetarian: true },
  { title: "Rührei", durationMinutes: 10, vegetarian: true },
  { title: "Hähnchencurry", durationMinutes: 40, vegetarian: false },
];

const list = document.querySelector("#recipe-list");


// 1. Schreibe renderRecipes(list, recipes):
//    ein <li> pro Rezept mit Titel und Dauer.
//
//      Pfannkuchen (20 min)
//      Lasagne (60 min)
//      ...
//
//    Leere die Liste zuerst - die Funktion soll man beliebig oft
//    aufrufen können. Rufe sie danach einmal auf.


// 2. Ein Klick auf ein Rezept schaltet die Klasse "done" um.
//
//    Tipp: EIN Listener an der Liste genügt.
//          event.target ist das <li>, auf das geklickt wurde.


// 3. Der Button #only-vegetarian zeigt nur noch die vegetarischen
//    Rezepte an.
//
//    Tipp: filter von Tag 4 - und dann neu rendern.



// ------------------------------------------------------------
// Ausbau A: Der Button schaltet um: Beim zweiten Klick werden
//           wieder alle Rezepte gezeigt. Passe auch die Beschriftung
//           an ("Nur vegetarisch" ↔ "Alle zeigen").
//
// Ausbau B: Vegetarische Rezepte bekommen hinter dem Titel ein " 🌱".
// ------------------------------------------------------------
