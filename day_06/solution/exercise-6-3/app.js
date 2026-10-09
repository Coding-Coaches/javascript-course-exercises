// ============================================================
// Workshop-Anmeldung (Lösung)
// ------------------------------------------------------------
// Starten:  Rechtsklick auf index.html → Open with Live Server
// ============================================================
//
// Die Seite soll:
//   - beim Start  Workshops werden geladen …  zeigen, dann die
//     Workshops aus workshops.json
//   - bei jedem Workshop die freien Plätze und einen Button
//     "Anmelden" anzeigen
//   - bei Klick auf "Anmelden" einen Platz abziehen - bei JEDEM
//     Klick, auch beim zweiten. Ohne freie Plätze ist der Button
//     ausgegraut.
//   - oben die Zahl der Anmeldungen anzeigen:
//       Anmeldungen: 0,  Anmeldungen: 1,  Anmeldungen: 2, …
//
// Die Fehler zeigen sich nacheinander: Solange einer davor die
// Seite anhält, sieht man den nächsten noch nicht.
// ============================================================

// ------------------------------------------------------------
// 1. Zustand
// ------------------------------------------------------------
const state = {
  workshops: [],
  signups: 0,
  loading: true,
};


// ------------------------------------------------------------
// 2. Elemente
// ------------------------------------------------------------
const list = document.querySelector("#workshop-list");
const signupCount = document.querySelector("#signup-count");


// ------------------------------------------------------------
// 3. Darstellung
// ------------------------------------------------------------
function render() {
  signupCount.textContent = `Anmeldungen: ${state.signups}`;

  if (state.loading) {
    list.textContent = "Workshops werden geladen …";
    return;
  }

  // FEHLER 4 behoben: Die Liste wurde vor dem Aufbauen nicht geleert.
  // Erkennungszeichen: KEINE Fehlermeldung. Über den Workshops steht
  // noch "Workshops werden geladen …", und nach jedem Klick ist die
  // ganze Liste noch einmal angehängt. Elements-Panel: Die Zahl der
  // <li> wächst mit jedem render().
  // render() baut die Seite KOMPLETT aus dem Zustand - also zuerst
  // alles Alte weg.
  list.textContent = "";

  for (const workshop of state.workshops) {
    const item = document.createElement("li");
    item.textContent = `${workshop.title} - ${workshop.date} - ${workshop.freeSeats} Plätze frei`;

    const button = document.createElement("button");
    button.textContent = "Anmelden";
    button.className = "signup-button";
    button.dataset.id = workshop.id;
    button.disabled = workshop.freeSeats === 0;

    item.append(button);
    list.append(item);
  }
}


// ------------------------------------------------------------
// 4. Ereignisse
// ------------------------------------------------------------

// FEHLER 5 behoben: Der Listener wurde in init() einmal an jeden
// Button gehängt:
//
//     for (const button of document.querySelectorAll(".signup-button")) {
//       button.addEventListener("click", handleSignup);
//     }
//
// Erkennungszeichen: KEINE Fehlermeldung. Der erste Klick wirkt,
// jeder weitere nicht. Elements → neuen Button auswählen → Tab
// "Event Listeners": leer.
// render() wirft bei jedem Aufruf alle Buttons weg und baut NEUE.
// Die Listener hingen an den alten. Deshalb hängt der Listener jetzt
// an der Liste, die bleibt - und event.target.closest sagt, welcher
// Button geklickt wurde (Event-Delegation).
list.addEventListener("click", (event) => {
  // Klick auf den Text oder neben den Button: kein Button → nichts tun
  const button = event.target.closest("button");
  if (button === null) {
    return;
  }

  const id = Number(button.dataset.id);
  const workshop = state.workshops.find((workshop) => workshop.id === id);
  workshop.freeSeats--;
  state.signups++;

  // FEHLER 3 behoben: render() fehlte.
  // Erkennungszeichen: KEINE Fehlermeldung, aber nach dem Klick
  // ändert sich nichts. Breakpoint im Handler: Er wird aufgerufen,
  // und state.signups steigt (Watch) - der Zustand stimmt also, nur
  // die Seite erfährt nichts davon.
  // Regel: Handler ändern den Zustand - und rufen DANN render() auf.
  render();
});


// ------------------------------------------------------------
// 5. Start
// ------------------------------------------------------------
async function init() {
  render();

  // FEHLER 1 behoben: stand als  const response = fetch("workshops.json");
  // Erkennungszeichen: die einzige rote Meldung -
  //   Uncaught (in promise) TypeError: response.json is not a function
  // Ohne await ist response kein Response-Objekt, sondern das
  // Promise darauf. Ein Promise hat keine Methode json().
  // (console.log(response) zeigt es: Promise {<pending>})
  const response = await fetch("workshops.json");
  state.workshops = await response.json();

  // FEHLER 2 behoben: loading wurde nie auf false gesetzt.
  // Erkennungszeichen: KEINE Fehlermeldung. Im Network-Panel ist
  // workshops.json mit Status 200 geladen, aber die Seite zeigt
  // weiter "Workshops werden geladen …". Breakpoint in render():
  // state.workshops ist gefüllt, aber die Guard Clause greift.
  state.loading = false;
  render();
}

init();
