// LOAD
setTimeout(() => {
  document.getElementById("loading-screen").style.display = "none";
  document.getElementById("game").classList.remove("hidden");
}, 2500);

// STATE DATA
const statesByCountry = {
  US: ["California", "Texas", "New York"],
  CA: ["Ontario", "Quebec"],
  MX: ["Jalisco", "Nuevo León"],
  UK: ["England", "Scotland"],
  JP: ["Tokyo", "Osaka"],
  DE: ["Berlin", "Bavaria"]
};

let step = 1;

// NAV
function nextStep() {
  if (step < 4) step++;
  updateSteps();
}

function prevStep() {
  if (step > 1) step--;
  updateSteps();
}

// UPDATE UI STEPS
function updateSteps() {

  for (let i = 1; i <= 4; i++) {
    document.getElementById("step" + i).classList.add("hidden");
  }

  document.getElementById("step" + step).classList.remove("hidden");

  const titles = [
    "Step 1: Identity",
    "Step 2: Location",
    "Step 3: Appearance",
    "Step 4: Life Story"
  ];

  document.getElementById("stepTitle").innerText = titles[step - 1];

  generatePreview();
  generateStory();
}

// STATES
function updateStates() {
  const country = document.getElementById("country").value;
  const stateSelect = document.getElementById("state");

  stateSelect.innerHTML = "";

  if (!statesByCountry[country]) return;

  statesByCountry[country].forEach(s => {
    let opt = document.createElement("option");
    opt.value = s;
    opt.innerText = s;
    stateSelect.appendChild(opt);
  });
}

// PREVIEW
function generatePreview() {
  const name = document.getElementById("name").value || "Unknown";
  const age = document.getElementById("age").value || "18";
  const gender = document.getElementById("gender").value;

  const country = document.getElementById("country").value;
  const state = document.getElementById("state").value;

  document.getElementById("previewText").innerText =
`Name: ${name}
Age: ${age}
Gender: ${gender}
Location: ${state ? state + ", " : ""}${country}`;
}

// STORY GENERATOR
function generateStory() {
  const stories = [
    "You were born into a struggling household in a quiet city.",
    "Your family moved frequently, never staying in one place long.",
    "You grew up in a wealthy suburban neighborhood with strict parents.",
    "Life started rough — but you always had ambition burning inside you.",
    "A mysterious event in your childhood shaped your future path."
  ];

  document.getElementById("story").innerText =
    stories[Math.floor(Math.random() * stories.length)];
}

// START GAME
function startGame() {
  alert("Life begins... (next: full simulation system)");
}