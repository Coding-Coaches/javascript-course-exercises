// ============================================================
// Bücherliste (Lösung)
// ------------------------------------------------------------
// Starten:  Rechtsklick auf index.html → Open with Live Server
// ============================================================
//
// Die Seite soll:
//   - alle vier Bücher nummeriert anzeigen:  1. Momo (Michael Ende)
//   - verfügbare Bücher grün markieren (Klasse "available")
//   - darunter  Verfügbar: 3 von 4  anzeigen
//   - über das Formular ein Buch hinzufügen - OHNE dass die Seite
//     neu lädt. Neue Bücher sind verfügbar.
//   - bei leerem Titel  Bitte einen Titel eingeben.  anzeigen
//
// FEHLER 1 steht in index.html (Skript im <head>).
// ============================================================

const books = [
  { title: "Momo", author: "Michael Ende", available: true },
  { title: "Tschick", author: "Wolfgang Herrndorf", available: false },
  { title: "Der Vorleser", author: "Bernhard Schlink", available: true },
  { title: "Krabat", author: "Otfried Preußler", available: true },
];

const list = document.querySelector("#book-list");
const availableCount = document.querySelector("#available-count");
const form = document.querySelector("#book-form");
const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
const errorMessage = document.querySelector("#error-message");

function createBookItem(book, number) {
  const item = document.createElement("li");
  item.textContent = `${number}. ${book.title} (${book.author})`;
  if (book.available) {
    item.classList.add("available");
  }
  return item;
}

function renderBooks() {
  for (let i = 0; i < books.length; i++) {
    list.append(createBookItem(books[i], i + 1));
  }
}

// FEHLER 2 behoben: stand als  availableCount.value = ...
// Erkennungszeichen: KEINE Fehlermeldung, aber die Zeile unter der
// Überschrift bleibt leer. Im Elements-Panel ist das <p> leer.
// Breakpoint in updateCount: available ist richtig (3) - der Wert
// kommt also nur nicht auf die Seite.
// value gibt es nur bei Eingabefeldern. Bei einem <p> legt
// JavaScript einfach eine neue Eigenschaft an, die niemand anzeigt.
// Merksatz: value bei Eingabefeldern - textContent bei allem anderen.
function updateCount() {
  const available = books.filter((book) => book.available).length;
  availableCount.textContent = `Verfügbar: ${available} von ${books.length}`;
}

form.addEventListener("submit", (event) => {
  // FEHLER 5 behoben: preventDefault fehlte.
  // Erkennungszeichen: KEINE Fehlermeldung - die Seite blitzt kurz
  // auf und ist wieder im Ausgangszustand. Die Adresszeile endet
  // plötzlich auf "?". In der Console mit "Preserve log" sieht man
  // "Navigated to ...".
  // Das Formular hat die Seite neu geladen - und mit ihr das Array.
  event.preventDefault();

  // FEHLER 3 behoben: stand als  titleInput.textContent.trim()
  // Erkennungszeichen: KEINE Fehlermeldung, aber immer
  // "Bitte einen Titel eingeben." - auch mit Titel.
  // Breakpoint auf die Zeile, F10: title ist "".
  // Bei Eingabefeldern steht das Getippte in value.
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (title === "") {
    errorMessage.textContent = "Bitte einen Titel eingeben.";
    return;
  }

  const book = { title, author, available: true };
  books.push(book);

  // FEHLER 4 behoben: Das Element wurde erzeugt, aber nie angehängt.
  // Erkennungszeichen: KEINE Fehlermeldung. Der Zähler springt auf
  // "4 von 5" - das Buch ist also im Array -, aber es erscheint
  // nicht in der Liste. Im Elements-Panel: weiterhin vier <li>.
  // createElement baut nur im Speicher. Erst append hängt in die Seite.
  const item = createBookItem(book, books.length);
  list.append(item);

  updateCount();
  form.reset();
  errorMessage.textContent = "";
});

renderBooks();
updateCount();
