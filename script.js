let step = 1;
let seed = Math.floor(Math.random() * 999999);

/* LOAD */
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loading").style.display = "none";
    document.getElementById("app").classList.remove("hidden");
  }, 1200);
});

/* STEP */
function showStep() {
  document.querySelectorAll(".step").forEach(s => s.classList.remove("show"));
  document.getElementById("step" + step).classList.add("show");
}

function nextStep() {
  if (step < 4) step++;
  showStep();
  updateUI();
  if (step === 3) generateLife();
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

/* SAFE AGE */
function getAge() {
  const a = parseInt(document.getElementById("age").value);
  return isNaN(a) || a < 1 ? 18 : a;
}

/* STATS GENERATOR */
function genStat(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* LIFE ENGINE */
let life = {};

function generateLife() {

  const country = document.getElementById("country").value || "Unknown";

  life = {
    health: genStat(40, 100),
    smarts: genStat(40, 100),
    happiness: genStat(30, 100),
    looks: genStat(20, 100),
    money: genStat(0, 5000),

    traits: [],
    family: {},
    story: ""
  };

  /* TRAITS */
  const traitsPool = ["Ambitious", "Lazy", "Risk Taker", "Charismatic", "Aggressive"];
  life.traits.push(traitsPool[Math.floor(Math.random() * traitsPool.length)]);

  /* FAMILY */
  life.family = {
    income: ["Poor", "Middle Class", "Wealthy"][Math.floor(Math.random() * 3)],
    stability: ["Stable", "Chaotic", "Broken"][Math.floor(Math.random() * 3)]
  };

  /* STORY */
  const stories = [
    "You were born into a quiet but uncertain world.",
    "Your childhood was shaped by instability and change.",
    "You grew up in a structured but strict household.",
    "Life began with challenges that shaped your mindset.",
    "You were born into opportunity, but expectations were high."
  ];

  life.story = stories[Math.floor(Math.random() * stories.length)];

  document.getElementById("story").innerHTML =
    `<b>Birth Story:</b><br>${life.story}`;
}

/* UI */
function updateUI() {

  const name = document.getElementById("name").value || "Unknown";
  const gender = document.getElementById("gender").value;

  document.getElementById("liveName").textContent = name;
  document.getElementById("liveMeta").textContent =
    `${gender} • Seed ${seed}`;

  document.getElementById("preview").innerHTML =
    `
    <b>Stats</b><br>
    Health: ${life.health || "-"}<br>
    Smarts: ${life.smarts || "-"}<br>
    Happiness: ${life.happiness || "-"}<br>
    Looks: ${life.looks || "-"}<br><br>

    <b>Traits</b><br>
    ${life.traits?.join(", ") || "-"}<br><br>

    <b>Family</b><br>
    ${life.family ? life.family.income + " / " + life.family.stability : "-"}
    `;
}

/* START */
function startGame() {
  alert("Life simulation begins (next step: aging system)");
}

/* INIT */
showStep();
updateUI();