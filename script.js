let player = {
    name: "",
    age: 18,
    health: 80,
    happiness: 80,
    smarts: 70,
    looks: 70,
    money: 0,
    log: []
};

/* SCREEN SWITCH */
function showMenu(){
    switchScreen("menuScreen");
}

function showCreator(){
    switchScreen("creatorScreen");
}

function startGame(){

let first = document.getElementById("first").value || "John";
let last = document.getElementById("last").value || "Doe";

player.name = first + " " + last;

switchScreen("gameScreen");

updateUI();
}

/* CORE SCREEN ENGINE */
function switchScreen(id){
    document.querySelectorAll(".screen").forEach(s=>{
        s.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");
}

/* TAB SYSTEM */
function setTab(tab){

document.querySelectorAll(".tab").forEach(t=>{
    t.classList.remove("activeTab");
});

document.getElementById(tab + "Tab").classList.add("activeTab");

}

/* AGE UP */
function ageUp(){

player.age++;

let events = [
"You had a normal day.",
"You got sick.",
"You found $20.",
"You worked hard and improved yourself."
];

let e = events[Math.floor(Math.random()*events.length)];
player.log.push(e);

if(e.includes("sick")) player.health -= 5;
if(e.includes("$")) player.money += 20;
if(e.includes("worked")) player.happiness += 5;

updateUI();
renderLog();
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

/* LOG */
function renderLog(){

let log = document.getElementById("log");
log.innerHTML = "";

player.log.slice(-6).forEach(e=>{
    log.innerHTML += "<div>• " + e + "</div>";
});

}