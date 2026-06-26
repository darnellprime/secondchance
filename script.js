let step = 1;

/* SAFER LOADING SCREEN REMOVAL */
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loading");
    const app = document.getElementById("app");

    if (loader) {
      loader.style.opacity = "0";
      loader.style.transition = "0.5s ease";
      
      setTimeout(() => {
        loader.style.display = "none";
      }, 600);
    }

    if (app) {
      app.classList.remove("hidden");
    }

  }, 1500);
});

/* STEP SYSTEM */
function showStep() {
  document.querySelectorAll(".step").forEach(s => s.classList.remove("show"));
  document.getElementById("step" + step).classList.add("show");
}

function nextStep() {
  if (step < 4) step++;
  showStep();
  updateUI();
}

function prevStep() {
  if (step > 1) step--;
  showStep();
  updateUI();
}

/* STATES */
const states = {
  US: ["California", "Texas", "Florida"],
  CA: ["Ontario", "Quebec"],
  MX: ["Jalisco", "Chihuahua"],
  UK: ["England", "Scotland"]
};

function updateStates() {
  const c = document.getElementById("country").value;
  const s = document.getElementById("state");

  s.innerHTML = "";

  (states[c] || []).forEach(x => {
    let o = document.createElement("option");
    o.textContent = x;
    s.appendChild(o);
  });
}

/* LIVE UI */
function updateUI() {
  const name = document.getElementById("name").value || "Unknown";
  const gender = document.getElementById("gender").value;
  const age = document.getElementById("age").value;

  document.getElementById("liveName").textContent = name;
  document.getElementById("liveMeta").textContent = gender + " • Age " + age;

  document.getElementById("preview").textContent =
    name + " is beginning their life journey...";
}

/* START GAME */
function startGame() {
  document.getElementById("story").textContent =
    "Your story begins... every choice matters.";
}

/* INIT */
showStep();
updateUI();