// LOADING SCREEN
setTimeout(() => {
  document.getElementById("loading-screen").style.display = "none";
  document.getElementById("game").classList.remove("hidden");
}, 2500);

// STATE DATA
const statesByCountry = {
  US: ["Alabama", "Alaska", "California", "Florida", "New York", "Texas"],
  CA: ["Alberta", "British Columbia", "Ontario", "Quebec"],
  MX: ["Jalisco", "Nuevo León", "Chihuahua"],
  UK: ["England", "Scotland", "Wales", "Northern Ireland"],
  JP: ["Tokyo", "Osaka", "Hokkaido"],
  DE: ["Bavaria", "Berlin", "Hamburg"]
};

// UPDATE STATES
function updateStates() {
  const country = document.getElementById("country").value;
  const stateSelect = document.getElementById("state");

  stateSelect.innerHTML = "";

  if (!statesByCountry[country]) {
    stateSelect.innerHTML = "<option>No states available</option>";
    return;
  }

  statesByCountry[country].forEach(state => {
    const opt = document.createElement("option");
    opt.value = state;
    opt.innerText = state;
    stateSelect.appendChild(opt);
  });

  updatePreview();
}

// LIVE INPUT LISTENERS
["name", "age", "gender", "country", "state"].forEach(id => {
  document.getElementById(id).addEventListener("input", updatePreview);
});

// PREVIEW
function updatePreview() {
  const name = document.getElementById("name").value || "Unknown";
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;

  const country = document.getElementById("country").value;
  const state = document.getElementById("state").value;

  document.getElementById("previewText").innerText =
`Name: ${name}
Age: ${age}
Gender: ${gender}
Location: ${state ? state + "," : ""} ${country}`;
}

// START GAME
function startGame() {
  alert("Character created! Next step: Life Simulation Engine");
}