// ============================================================
// Bücherliste
// ------------------------------------------------------------
// Starten:  Rechtsklick auf index.html → Open with Live Server
// Debuggen: F12 → Sources → app.js → Breakpoint setzen
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
// Benutze Elements und den Debugger im Browser.
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

function updateCount() {
  const available = books.filter((book) => book.available).length;
  availableCount.value = `Verfügbar: ${available} von ${books.length}`;
}

form.addEventListener("submit", (event) => {
  const title = titleInput.textContent.trim();
  const author = authorInput.value.trim();

  if (title === "") {
    errorMessage.textContent = "Bitte einen Titel eingeben.";
    return;
  }

  const book = { title, author, available: true };
  books.push(book);
  const item = createBookItem(book, books.length);

  updateCount();
  form.reset();
  errorMessage.textContent = "";
});

renderBooks();
updateCount();
