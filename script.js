let player = {
    name: "",
    age: 0,
    health: 100,
    happiness: 100,
    smarts: 60,
    looks: 60,
    money: 0,
    log: []
};

/* SCREEN SYSTEM */
function show(screen){
    document.querySelectorAll(".screen").forEach(s=>{
        s.classList.remove("active");
    });
    document.getElementById(screen).classList.add("active");
}

/* NAV */
function showCreator(){ show("creatorScreen"); }
function showMenu(){ show("menuScreen"); }

/* START GAME */
function startGame(){

let first = document.getElementById("first").value || "New";
let last = document.getElementById("last").value || "Life";

player.name = first + " " + last;
player.age = 0;

show("gameScreen");
updateUI();

log("You were born.");
}

/* AGE UP */
function ageUp(){

player.age++;

/* yearly simulation */
player.health += rand(-3,2);
player.happiness += rand(-4,3);
player.smarts += rand(0,2);
player.looks += rand(-2,1);
player.money += rand(0,30);

/* events */
let events = [
"You had a peaceful year.",
"You got sick.",
"You learned something new.",
"You had a rough day.",
"You found money on the ground."
];

let e = events[Math.floor(Math.random()*events.length)];
log("Age " + player.age + ": " + e);

clamp();
updateUI();
updateBars();
}

/* LOG */
function log(text){
player.log.push(text);

let logBox = document.getElementById("log");
logBox.innerHTML = "";

player.log.slice(-8).forEach(e=>{
    logBox.innerHTML += "<div>• " + e + "</div>";
});
}

/* UI */
function updateUI(){
document.getElementById("name").innerText = player.name;
document.getElementById("ageDisplay").innerText = "Age: " + player.age;
}

/* BARS */
function updateBars(){

document.getElementById("healthBar").style.width = player.health + "%";
document.getElementById("happinessBar").style.width = player.happiness + "%";
document.getElementById("smartsBar").style.width = player.smarts + "%";
document.getElementById("looksBar").style.width = player.looks + "%";

let moneyBar = Math.min(player.money / 1000 * 100, 100);
document.getElementById("moneyBar").style.width = moneyBar + "%";
}

/* TABS */
function setTab(tab){

document.querySelectorAll(".tab").forEach(t=>{
    t.classList.remove("activeTab");
});

document.getElementById(tab + "Tab").classList.add("activeTab");
}

/* SAVE */
function saveGame(){
localStorage.setItem("sc_save", JSON.stringify(player));
log("Game saved.");
}

/* LOAD */
function loadGame(){
let data = localStorage.getItem("sc_save");
if(!data) return;

player = JSON.parse(data);

show("gameScreen");
updateUI();
updateBars();
log("Game loaded.");
}

/* CRIME */
function commitCrime(){

if(Math.random() > 0.5){
    player.money += 100;
    log("You committed a crime and made money.");
}else{
    player.happiness -= 10;
    log("You got caught committing a crime.");
}

updateUI();
updateBars();
}

/* HELPERS */
function clamp(){
player.health = Math.max(0, Math.min(100, player.health));
player.happiness = Math.max(0, Math.min(100, player.happiness));
player.smarts = Math.max(0, Math.min(100, player.smarts));
player.looks = Math.max(0, Math.min(100, player.looks));
}

function rand(min,max){
return Math.floor(Math.random()*(max-min+1))+min;
}