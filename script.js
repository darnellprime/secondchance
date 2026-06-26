let step = 1;

/* SAFE LOAD */
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loading").style.display = "none";
    document.getElementById("app").classList.remove("hidden");
  }, 1200);
});

/* STEP CONTROL */
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
  UK: ["England", "Scotland"],
  JP: ["Tokyo", "Osaka"]
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

/* SAFE AGE SYSTEM (FIXED) */
function getSafeAge() {
  const val = parseInt(document.getElementById("age").value);
  return isNaN(val) || val < 1 ? 18 : val;
}

/* UI */
function updateUI() {
  const name = document.getElementById("name").value || "Unknown";
  const gender = document.getElementById("gender").value;
  const age = getSafeAge();

  document.getElementById("liveName").textContent = name;
  document.getElementById("liveMeta").textContent = `${gender} • Age ${age}`;

  document.getElementById("preview").textContent =
    `${name} begins their life at age ${age}.`;
}

/* START GAME */
function startGame() {
  document.getElementById("story").textContent =
    "Your journey begins now... every choice will shape your future.";
}

/* INIT */
showStep();
updateUI();