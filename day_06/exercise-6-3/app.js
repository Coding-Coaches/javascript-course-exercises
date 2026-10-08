// ============================================================
// Workshop-Anmeldung
// ------------------------------------------------------------
// Starten:  Rechtsklick auf index.html → Open with Live Server
// Debuggen: F12 → Sources → app.js → Breakpoint setzen
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
// Benutze Console, Network und den Debugger.
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
function handleSignup(event) {
  const id = Number(event.target.dataset.id);
  const workshop = state.workshops.find((workshop) => workshop.id === id);
  workshop.freeSeats--;
  state.signups++;
}


// ------------------------------------------------------------
// 5. Start
// ------------------------------------------------------------
async function init() {
  render();
  const response = fetch("workshops.json");
  state.workshops = await response.json();
  render();

  for (const button of document.querySelectorAll(".signup-button")) {
    button.addEventListener("click", handleSignup);
  }
}

init();
