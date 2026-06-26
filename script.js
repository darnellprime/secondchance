let player={
name:"",
age:0,

health:100,
happiness:100,
smarts:50,
looks:50,
money:0,

job:"None",
salary:0,

school:"None",

house:"None",
car:"None",

log:[]
};

/* NAV */
function show(id){
document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
document.getElementById(id).classList.add("active");
}

function showCreator(){show("creatorScreen");}

/* START */
function startGame(){
player.name=document.getElementById("first").value+" "+document.getElementById("last").value;
player.looks=+document.getElementById("looks").value;
player.smarts=+document.getElementById("smarts").value;
player.money=+document.getElementById("money").value;

show("gameScreen");
update();
}

/* AGE */
function ageUp(){
player.age++;

if(player.age<18) player.school="School";
if(player.age===18){
player.job="Starter Job";
player.salary=1000;
}

if(player.job!=="None"){
player.money+=player.salary;
}

/* simple event */
let events=[
"normal day",
"you found money",
"bad day"
];

let e=events[Math.floor(Math.random()*events.length)];

if(e==="you found money") player.money+=100;

log("Age "+player.age+": "+e);

update();
}

/* CRIME */
function commitCrime(){
if(Math.random()>0.5){
player.money+=200;
log("Crime successful");
}else{
player.happiness-=10;
log("Got caught");
}
update();
}

/* ASSETS */
function buyHouse(){
player.house="House";
player.money-=500;
update();
}

function buyCar(){
player.car="Car";
player.money-=300;
update();
}

/* LOG */
function log(t){
player.log.push(t);
document.getElementById("log").innerHTML=player.log.slice(-8).map(x=>"• "+x).join("<br>");
}

/* UI */
function update(){
document.getElementById("ageDisplay").innerText="Age: "+player.age;
document.getElementById("name").innerText=player.name;

document.getElementById("healthBar").style.width=player.health+"%";
document.getElementById("happinessBar").style.width=player.happiness+"%";
document.getElementById("smartsBar").style.width=player.smarts+"%";
document.getElementById("looksBar").style.width=player.looks+"%";

document.getElementById("moneyBar").style.width=Math.min(player.money/2000*100,100)+"%";

document.getElementById("job").innerText=player.job;
document.getElementById("salary").innerText=player.salary;
document.getElementById("school").innerText=player.school;

document.getElementById("house").innerText=player.house;
document.getElementById("car").innerText=player.car;
}

/* TABS */
function setTab(t){
document.querySelectorAll(".tab").forEach(x=>x.classList.remove("activeTab"));
document.getElementById(t+"Tab").classList.add("activeTab");
}

/* SAVE */
function saveGame(){
localStorage.setItem("sc_v04",JSON.stringify(player));
}

/* LOAD */
function loadGame(){
let d=localStorage.getItem("sc_v04");
if(!d)return;

player=JSON.parse(d);
show("gameScreen");
update();
}