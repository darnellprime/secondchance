let player = {
    name: "",
    age: 0,
    health: 100,
    happiness: 100,
    smarts: 70,
    looks: 70,
    money: 0,
    log: []
};

/* SCREEN SWITCH */
function show(screen){
    document.querySelectorAll(".screen").forEach(s=>{
        s.classList.remove("active");
    });
    document.getElementById(screen).classList.add("active");
}

/* NAV */
function showCreator(){
    show("creatorScreen");
}

function showMenu(){
    show("menuScreen");
}

/* START GAME */
function startGame(){

let first = document.getElementById("first").value || "New";
let last = document.getElementById("last").value || "Born";

player.name = first + " " + last;
player.age = 0;

show("gameScreen");
updateUI();

addLog("You were born into the world.");
}

/* AGE UP SYSTEM (REAL BITLIFE STYLE) */
function ageUp(){

player.age++;

/* yearly decay + randomness */
player.health += rand(-3, 2);
player.happiness += rand(-4, 4);
player.smarts += rand(0, 2);
player.looks += rand(-2, 1);
player.money += rand(0, 50);

/* events */
let events = [
"You had a peaceful year.",
"You got sick as a child.",
"You learned something new.",
"You had a fun day with family.",
"You fell and got a small injury."
];

let e = events[Math.floor(Math.random()*events.length)];
addLog("Age " + player.age + ": " + e);

/* clamp stats */
clampStats();

updateUI();
}

/* LOG SYSTEM */
function addLog(text){
player.log.push(text);
renderLog();
}

function renderLog(){
let log = document.getElementById("log");
log.innerHTML = "";

player.log.slice(-6).forEach(e=>{
    log.innerHTML += "<div>• " + e + "</div>";
});
}

/* UI UPDATE */
function updateUI(){

document.getElementById("name").innerText = player.name;

document.getElementById("ageDisplay").innerText = "Age: " + player.age;

document.getElementById("health").innerText = player.health;
document.getElementById("happiness").innerText = player.happiness;
document.getElementById("smarts").innerText = player.smarts;
document.getElementById("looks").innerText = player.looks;
document.getElementById("money").innerText = player.money;

}

/* STAT LIMITS */
function clampStats(){

player.health = Math.max(0, Math.min(100, player.health));
player.happiness = Math.max(0, Math.min(100, player.happiness));
player.smarts = Math.max(0, Math.min(100, player.smarts));
player.looks = Math.max(0, Math.min(100, player.looks));

}

/* RANDOM HELPER */
function rand(min,max){
return Math.floor(Math.random()*(max-min+1))+min;
}