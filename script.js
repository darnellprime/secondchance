let step = 1;

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loading").style.display = "none";
    document.getElementById("app").classList.remove("hidden");
  }, 1200);
});

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

function updateUI() {
  const name = document.getElementById("name").value || "Unknown";
  const gender = document.getElementById("gender").value;
  const age = document.getElementById("age").value;

  document.getElementById("liveName").textContent = name;
  document.getElementById("liveMeta").textContent = `${gender} • Age ${age}`;

  document.getElementById("preview").textContent =
    `${name} is beginning a new life...`;
}

function startGame() {
  document.getElementById("story").textContent =
    "Your life begins in a quiet moment... everything is unwritten.";
}

showStep();
updateUI();