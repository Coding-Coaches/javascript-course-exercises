// ============================================================
// Bücherliste
// ------------------------------------------------------------
// Ausführen:  node day_04/exercise-4-5.js
// Debuggen:   Datei im Editor öffnen, Breakpoint setzen, F5
// ============================================================
//
// Regeln:
//   - Die Liste ist ab 1 nummeriert.
//   - Die Suche nach einem Titel ignoriert Groß- und
//     Kleinschreibung.
//   - addBook und lendBook geben eine NEUE Liste zurück.
//     Die übergebene Liste bleibt unverändert.
// ============================================================

const books = [
  { title: "Momo", author: "Michael Ende", year: 1973, available: true },
  { title: "Tschick", author: "Wolfgang Herrndorf", year: 2010, available: false },
  { title: "Der Vorleser", author: "Bernhard Schlink", year: 1995, available: true },
  { title: "Krabat", author: "Otfried Preußler", year: 1971, available: true },
];

function printList(list) {
  for (let i = 1; i < list.length; i++) {
    const { title, year } = list[i];
    console.log(`${i}. ${title} (${year})`);
  }
}

const countAvailable = (list) => list.filter((book) => book.availabel).length;

function findAuthor(list, query) {
  const book = list.find((book) => book.title === query);
  return book.author;
}

function addBook(list, newBook) {
  const updated = [...list];
  return updated.push(newBook);
}

function lendBook(list, title) {
  return list.map((book) => {
    if (book.title !== title) {
      return book;
    }
    book.available = false;
    return book;
  });
}

printList(books);
console.log(`Verfügbar: ${countAvailable(books)} von ${books.length}`);
console.log(`Suche "krabat": ${findAuthor(books, "krabat")}`);

const withNewBook = addBook(books, {
  title: "Die Mitte der Welt",
  author: "Andreas Steinhöfel",
  year: 1998,
  available: true,
});
console.log(`Nach dem Hinzufügen: ${withNewBook.length} Bücher`);

const afterLending = lendBook(books, "Momo");
console.log(`Nach dem Ausleihen von "Momo": ${countAvailable(afterLending)} verfügbar`);
console.log(`Original unverändert: ${countAvailable(books)} verfügbar`);
