let player = {
    firstName: "",
    lastName: "",
    gender: "",
    age: 18,
    health: 80,
    happiness: 80,
    smarts: 70,
    looks: 70,
    money: 0,
    events: []
};

// SCREEN SWITCH
function show(screen){
    document.querySelectorAll(".screen").forEach(s=>{
        s.classList.remove("active");
        s.classList.add("hidden");
    });

    document.getElementById(screen).classList.remove("hidden");
    document.getElementById(screen).classList.add("active");
}

// MENU
function newLife(){
    show("creator");
}

function backMenu(){
    show("menu");
}

// START GAME
function startLife(){

player.firstName = document.getElementById("firstName").value || "John";
player.lastName = document.getElementById("lastName").value || "Doe";
player.gender = document.getElementById("gender").value;

show("game");
updateUI();

}

// UPDATE UI
function updateUI(){

document.getElementById("charName").innerText =
player.firstName + " " + player.lastName;

document.getElementById("ageText").innerText =
"Age: " + player.age;

document.getElementById("health").innerText = player.health;
document.getElementById("happiness").innerText = player.happiness;
document.getElementById("smarts").innerText = player.smarts;
document.getElementById("looks").innerText = player.looks;
document.getElementById("money").innerText = player.money;

}

// AGE UP SYSTEM
function ageUp(){

player.age++;

let events = [
"You had a good day.",
"You got sick.",
"You found $20.",
"You felt motivated."
];

let e = events[Math.floor(Math.random()*events.length)];
player.events.push(e);

if(e.includes("sick")) player.health -= 5;
if(e.includes("$")) player.money += 20;
if(e.includes("good")) player.happiness += 5;

updateUI();
renderLog();

}

// LOG
function renderLog(){

let log = document.getElementById("eventLog");
log.innerHTML = "";

player.events.slice(-6).forEach(e=>{
    log.innerHTML += "<div>• " + e + "</div>";
});

}

// LOAD
function loadLife(){
alert("No save system yet.");
}