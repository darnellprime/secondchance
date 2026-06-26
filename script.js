let age = 0;

const life = {
  health: 80,
  smarts: 60,
  happiness: 70,
  looks: 50,
  money: 0
};

/* OCCUPATION SYSTEM */
function getOccupation(age) {
  if (age === 0) return "Infant";
  if (age <= 2) return "Toddler";
  if (age <= 4) return "Day Care";
  if (age <= 10) return "Elementary School";
  if (age <= 13) return "Middle School";
  if (age <= 17) return "High School";
  return "Adult";
}

/* AGE UP */
function ageUp() {
  age++;

  document.getElementById("ageDisplay").innerText = "Age: " + age;
  document.getElementById("occupation").innerText = getOccupation(age);

  simulateYear();
  updateUI();
}

/* YEAR SIM */
function simulateYear() {
  life.happiness += rand(-5, 5);
  life.health += rand(-3, 3);
  life.smarts += rand(0, 2);

  life.happiness = clamp(life.happiness);
  life.health = clamp(life.health);
  life.smarts = clamp(life.smarts);

  addFeed("You aged up to " + age);
}

/* FEED */
function addFeed(text) {
  const feed = document.getElementById("lifeFeed");
  const div = document.createElement("div");
  div.innerText = text;
  feed.prepend(div);
}

/* STATS UI */
function updateUI() {
  document.getElementById("stats").innerHTML = `
    Health: ${life.health}<br>
    Smarts: ${life.smarts}<br>
    Happiness: ${life.happiness}<br>
    Looks: ${life.looks}<br>
    Money: $${life.money}
  `;
}

/* TABS */
function setTab(tab) {
  const content = document.getElementById("tabContent");

  if (tab === "relationships") {
    content.innerHTML = "No relationships yet.";
  }

  if (tab === "activities") {
    content.innerHTML = "Go to school, work out, or explore.";
  }

  if (tab === "assets") {
    content.innerHTML = "No assets owned.";
  }

  if (tab === "school") {
    if (age < 18) content.innerHTML = "Currently enrolled in school.";
    else content.innerHTML = "Not in school.";
  }
}

/* HELPERS */
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(val) {
  return Math.max(0, Math.min(100, val));
}

/* INIT */
updateUI();
setTab("relationships");