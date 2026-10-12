// ============================================================
// Bücherliste (Lösung)
// ------------------------------------------------------------
// Ausführen:  node day_04/exercise-4-5.js
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

// FEHLER 1 behoben: Die Schleife begann bei i = 1.
// Erkennungszeichen: KEINE Fehlermeldung, aber "Momo" fehlt und die
// Liste beginnt mit "1. Tschick". Das erste Element hat Index 0.
// Die Nummer für Menschen ist i + 1.
function printList(list) {
  for (let i = 0; i < list.length; i++) {
    const { title, year } = list[i];
    console.log(`${i + 1}. ${title} (${year})`);
  }
}

// FEHLER 2 behoben: stand als book.availabel.
// Erkennungszeichen: KEINE Fehlermeldung, aber "Verfügbar: 0 von 4".
// Eine Eigenschaft, die es nicht gibt, ist undefined - und undefined
// ist falsy. filter wirft also jedes Buch raus.
const countAvailable = (list) => list.filter((book) => book.available).length;

// FEHLER 3 behoben: verglich book.title === query direkt.
// Erkennungszeichen: TypeError: Cannot read properties of undefined
// (reading 'author'). Die Meldung zeigt die FOLGE: find hat nichts
// gefunden. Die URSACHE: "krabat" ist nicht === "Krabat".
function findAuthor(list, query) {
  const lowerQuery = query.toLowerCase();
  const book = list.find((book) => book.title.toLowerCase() === lowerQuery);
  return book.author;
}

// FEHLER 4 behoben: stand als  return updated.push(newBook);
// Erkennungszeichen: KEINE Fehlermeldung, aber
// "Nach dem Hinzufügen: undefined Bücher". push gibt die neue Länge
// zurück (eine Zahl), und eine Zahl hat kein .length.
function addBook(list, newBook) {
  return [...list, newBook];
}

// FEHLER 5 behoben: stand als  book.available = false; return book;
// Erkennungszeichen: KEINE Fehlermeldung, aber
// "Original unverändert: 2 verfügbar" statt 3.
// map baut zwar ein neues Array - aber das Buch darin war dasselbe
// Objekt wie im Original (Watch: afterLending[0] === books[0] ist true).
// Spread baut ein neues Objekt.
function lendBook(list, title) {
  return list.map((book) => {
    if (book.title !== title) {
      return book;
    }
    return { ...book, available: false };
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
console.log(`Nach dem HinafterLendingzufügen: ${withNewBook.length} Bücher`);

const afterLending = lendBook(books, "Momo");
console.log(`Nach dem Ausleihen von "Momo": ${countAvailable(afterLending)} verfügbar`);
console.log(`Original unverändert: ${countAvailable(books)} verfügbar`);
