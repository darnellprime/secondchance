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
jobLevel:0,

school:"None",
education:"None",

partner:null,
children:0,

prison:0,

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
popup("You were born.");
}

/* AGE SYSTEM */
function ageUp(){
player.age++;

/* prison tick */
if(player.prison>0){
player.prison--;
if(player.prison===0) popup("You were released from prison.");
}

/* school */
if(player.age<18) player.school="School";
if(player.age===18) player.education="High School Graduate";

/* job */
if(player.age===18){
player.job="Entry Job";
player.salary=1200;
player.jobLevel=1;
}

/* income */
if(player.job!=="None" && player.prison===0){
player.money+=player.salary;
}

/* events */
runEvents();

clamp();
update();
}

/* EVENTS */
function runEvents(){
let events=[
"normal day",
"you got sick",
"you found money",
"you got promoted",
"bad day"
];

let e=events[Math.floor(Math.random()*events.length)];

if(e==="you found money") player.money+=150;
if(e==="you got sick") player.health-=10;
if(e==="you got promoted") player.salary+=200;

log("Age "+player.age+": "+e);
popup(e);
}

/* CAREER PROMOTION */
function workPromotion(){
player.jobLevel++;
player.salary+=300;
popup("You worked hard and got promoted!");
update();
}

/* COLLEGE */
function goCollege(){
if(player.age>=18){
player.education="College Student";
popup("You joined college.");
}
}

/* DATING */
function goDating(){
player.partner="Person";
popup("You started dating someone.");
}

/* CRIME */
function commitCrime(){
if(player.prison>0)return;

if(Math.random()>0.5){
player.money+=300;
popup("Crime successful");
}else{
player.prison=3;
popup("You were arrested (3 years)");
}
}

/* ASSETS */
function buyHouse(){
player.house="House";
player.money-=500;
popup("House purchased");
}

function buyCar(){
player.car="Car";
player.money-=300;
popup("Car purchased");
}

/* LOG */
function log(t){
player.log.push(t);
let box=document.getElementById("log");
box.innerHTML="";
player.log.slice(-8).forEach(x=>box.innerHTML+="• "+x+"<br>");
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

document.getElementById("job").innerText=player.job;
document.getElementById("salary").innerText=player.salary;
document.getElementById("jobLevel").innerText=player.jobLevel;

document.getElementById("school").innerText=player.school;
document.getElementById("education").innerText=player.education;

document.getElementById("partner").innerText=player.partner;
document.getElementById("children").innerText=player.children;

document.getElementById("prison").innerText=player.prison>0?player.prison+" years":"None";

document.getElementById("house").innerText=player.house;
document.getElementById("car").innerText=player.car;
}

/* SAVE */
function saveGame(){
localStorage.setItem("sc_v6",JSON.stringify(player));
popup("Saved");
}

/* LOAD */
function loadGame(){
let d=localStorage.getItem("sc_v6");
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