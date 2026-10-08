// ============================================================
// Übung 5.2 - Lösung
// ============================================================

const durations = [20, 60, 45, 10, 40];


// 1. Überschrift
const heading = document.querySelector("h1");
heading.textContent = "Meine Rezepte";


// 2. Anzahl der Rezepte - aus der Seite gezählt, nicht von Hand
const cards = document.querySelectorAll(".card");
const recipeCount = document.querySelector("#recipe-count");
recipeCount.textContent = `${cards.length} Rezepte`;


// 3. Lange Rezepte markieren
// Das Aussehen steht in style.css (.long). JavaScript schaltet nur
// die Klasse ein.
for (let i = 0; i < cards.length; i++) {
  if (durations[i] > 30) {
    cards[i].classList.add("long");
  }
}


// 4. Bild austauschen - Attribute sind Eigenschaften des Elements
const image = document.querySelector("img");
image.src = "img/lasagne.svg";
image.alt = "Lasagne in der Auflaufform";


// ------------------------------------------------------------
// Ausbau A
// ------------------------------------------------------------
// textContent einer Karte enthält den ganzen Text darin - auch den
// aus <h2> und <p>.
for (const card of cards) {
  if (card.textContent.includes("vegetarisch")) {
    card.classList.add("highlight");
  }
}


// ------------------------------------------------------------
// Ausbau B
// ------------------------------------------------------------
// document.querySelector("recipe-count") sucht ein Element
// <recipe-count> - das gibt es nicht, also null. Der Fehler kommt
// erst in der nächsten Zeile:
//
//   Uncaught TypeError: Cannot set properties of null
//   (setting 'textContent')
//
// Die Meldung zeigt die FOLGE. Die URSACHE steht eine Zeile davor.
