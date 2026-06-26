let player = {
    name: "",
    age: 0,

    stage: "baby",

    health: 100,
    happiness: 100,
    smarts: 50,
    looks: 50,

    money: 0,

    job: null,
    salary: 0,

    school: "none",
    grade: 0,

    crimeLevel: 0,

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
let last = document.getElementById("last").value || "Born";

player.name = first + " " + last;

show("gameScreen");
updateUI();

addLog("You were born into the world.");
}

/* AGE SYSTEM */
function ageUp(){

player.age++;

/* LIFE STAGES */
if(player.age === 3) player.stage = "child";
if(player.age === 13) player.stage = "teen";
if(player.age === 18) player.stage = "adult";

/* SCHOOL SYSTEM */
if(player.age < 18){
    player.school = "School";
    player.grade += rand(1,2);
}

/* JOB SYSTEM */
if(player.age >= 18 && !player.job){
    tryGetJob();
}

/* MONEY */
if(player.job){
    player.money += player.salary;
}

/* RANDOM EVENTS */
runEvents();

/* STAT DECAY */
player.health += rand(-3,1);
player.happiness += rand(-4,3);
player.smarts += rand(0,2);

/* CRIME CONSEQUENCE */
if(player.crimeLevel > 5 && Math.random() < 0.2){
    addLog("You got caught and fined!");
    player.money -= 200;
}

/* CLAMP */
clamp();

/* UPDATE */
updateUI();
renderLog();
}

/* JOB SYSTEM */
function tryGetJob(){

let jobs = [
{title:"Retail Worker",salary:2000},
{title:"Fast Food Worker",salary:1800},
{title:"Office Assistant",salary:2500}
];

let job = jobs[Math.floor(Math.random()*jobs.length)];

player.job = job.title;
player.salary = job.salary;

addLog("You got a job as a " + job.title);
}

/* EVENTS */
function runEvents(){

let events = [

"You had a normal day.",
"You felt motivated.",
"You argued with someone.",
"You found $50.",
"You studied hard.",
"You got sick."

];

let e = events[Math.floor(Math.random()*events.length)];

if(e.includes("found $")) player.money += 50;
if(e.includes("sick")) player.health -= 10;
if(e.includes("motivated")) player.happiness += 5;

addLog("Age " + player.age + ": " + e);
}

/* CRIME */
function commitCrime(){

let success = Math.random() > 0.5;

if(success){
    player.money += 100;
    player.crimeLevel += 2;
    addLog("You committed a small crime and made money.");
}else{
    player.crimeLevel += 5;
    player.happiness -= 10;
    addLog("You got caught doing a crime!");
}

updateUI();
}

/* SAVE SYSTEM */
function saveGame(){
localStorage.setItem("secondChance", JSON.stringify(player));
addLog("Game saved.");
}

/* LOAD SYSTEM */
function loadGame(){
let data = localStorage.getItem("secondChance");
if(!data) return;

player = JSON.parse(data);

show("gameScreen");
updateUI();
renderLog();

addLog("Game loaded.");
}

/* LOG */
function addLog(text){
player.log.push(text);
}

/* RENDER LOG */
function renderLog(){
let log = document.getElementById("log");
log.innerHTML = "";

player.log.slice(-8).forEach(e=>{
    log.innerHTML += "<div>• " + e + "</div>";
});
}

/* UI */
function updateUI(){

document.getElementById("name").innerText = player.name;
document.getElementById("ageDisplay").innerText = "Age: " + player.age;

document.getElementById("health").innerText = player.health;
document.getElementById("happiness").innerText = player.happiness;
document.getElementById("smarts").innerText = player.smarts;
document.getElementById("looks").innerText = player.looks;
document.getElementById("money").innerText = player.money;

}

/* CLAMP */
function clamp(){

player.health = Math.max(0,Math.min(100,player.health));
player.happiness = Math.max(0,Math.min(100,player.happiness));
player.smarts = Math.max(0,Math.min(100,player.smarts));

}

/* RANDOM */
function rand(min,max){
return Math.floor(Math.random()*(max-min+1))+min;
}