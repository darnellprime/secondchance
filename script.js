let player = {
name:"",
age:0,

health:100,
happiness:100,
smarts:50,
looks:50,

money:0,

school:"None",
college:"None",
degree:"None",

job:"None",
salary:0,
jobRank:0,

partner:null,
children:0,

house:null,
car:null,

log:[]
};

/* SCREEN */
function show(s){
document.querySelectorAll(".screen").forEach(x=>x.classList.remove("active"));
document.getElementById(s).classList.add("active");
}

function showCreator(){show("creatorScreen");}
function showMenu(){show("menuScreen");}

/* START */
function startGame(){
player.name=document.getElementById("first").value+" "+document.getElementById("last").value;

player.looks=+document.getElementById("looks").value;
player.smarts=+document.getElementById("smarts").value;
player.money=+document.getElementById("money").value;

show("gameScreen");
update();
popup("Life begins.");
}

/* AGE SYSTEM */
function ageUp(){
player.age++;

/* SCHOOL */
if(player.age<18) player.school="School";

/* COLLEGE ENTRY */
if(player.age===18) player.school="Graduated";

/* JOB */
if(player.age>=18 && !player.job){
player.job="Entry Job";
player.salary=1000;
player.jobRank=1;
}

/* INCOME */
if(player.job) player.money+=player.salary;

/* EVENTS */
runEvents();

clamp();
update();
}

/* EVENTS ENGINE */
function runEvents(){

let events=[
"You had a normal day.",
"You found money.",
"You got sick.",
"You met someone new.",
"You had a bad day."
];

let e=events[Math.floor(Math.random()*events.length)];

if(e.includes("money")) player.money+=100;
if(e.includes("sick")) player.health-=10;

log("Age "+player.age+": "+e);
popup(e);
}

/* DATING */
function goDating(){
player.partner="Person";
popup("You started dating.");
update();
}

/* COLLEGE */
function goCollege(){
if(player.age>=18){
player.college="State University";
player.degree="Business";
popup("You enrolled in college.");
}
}

/* ASSETS */
function buyHouse(){
player.house="Small House";
player.money-=500;
popup("House bought");
update();
}

function buyCar(){
player.car="Car";
player.money-=300;
popup("Car bought");
update();
}

/* CRIME */
function commitCrime(){
if(Math.random()>0.5){
player.money+=200;
popup("Crime successful");
}else{
player.happiness-=10;
popup("Caught!");
}
update();
}

/* LOG */
function log(t){
player.log.push(t);
let box=document.getElementById("log");
box.innerHTML="";
player.log.slice(-8).forEach(x=>box.innerHTML+="<div>• "+x+"</div>");
}

/* POPUP */
function popup(t){
let d=document.createElement("div");
d.className="popup";
d.innerText=t;
document.getElementById("popup").appendChild(d);
setTimeout(()=>d.remove(),3000);
}

/* UI */
function update(){
document.getElementById("name").innerText=player.name;
document.getElementById("ageDisplay").innerText="Age: "+player.age;

document.getElementById("healthBar").style.width=player.health+"%";
document.getElementById("happinessBar").style.width=player.happiness+"%";
document.getElementById("smartsBar").style.width=player.smarts+"%";
document.getElementById("looksBar").style.width=player.looks+"%";

let m=Math.min(player.money/2000*100,100);
document.getElementById("moneyBar").style.width=m+"%";

document.getElementById("school").innerText=player.school;
document.getElementById("college").innerText=player.college;
document.getElementById("degree").innerText=player.degree;

document.getElementById("job").innerText=player.job;
document.getElementById("salary").innerText=player.salary;
document.getElementById("jobRank").innerText=player.jobRank;

document.getElementById("partner").innerText=player.partner;
document.getElementById("children").innerText=player.children;
}

/* SAVE */
function saveGame(){
localStorage.setItem("sc_v5",JSON.stringify(player));
popup("Saved");
}

/* LOAD */
function loadGame(){
let d=localStorage.getItem("sc_v5");
if(!d)return;

player=JSON.parse(d);
show("gameScreen");
update();
popup("Loaded");
}

/* TABS */
function setTab(t){
document.querySelectorAll(".tab").forEach(x=>x.classList.remove("activeTab"));
document.getElementById(t+"Tab").classList.add("activeTab");
}

/* CLAMP */
function clamp(){
player.health=Math.max(0,Math.min(100,player.health));
player.happiness=Math.max(0,Math.min(100,player.happiness));
player.smarts=Math.max(0,Math.min(100,player.smarts));
player.looks=Math.max(0,Math.min(100,player.looks));
}