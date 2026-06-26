let player = {
    name:"",
    age:0,

    health:100,
    happiness:100,
    smarts:50,
    looks:50,

    money:0,

    job:null,
    salary:0,

    school:"Elementary",
    grade:0,

    partner:null,
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

player.name = document.getElementById("first").value + " " + document.getElementById("last").value;

player.looks = +document.getElementById("looks").value;
player.smarts = +document.getElementById("smarts").value;
player.money = +document.getElementById("money").value;

player.age = 0;

show("gameScreen");
update();
popup("You were born.");
}

/* AGE UP */
function ageUp(){

player.age++;

/* school */
if(player.age < 18){
player.grade++;
}

/* job */
if(player.age === 18){
player.job = "Unemployed";
}

/* income */
if(player.job && player.salary){
player.money += player.salary;
}

/* events */
let events=[
"normal day","you got sick","you found money","you made a friend","bad day"
];

let e=events[Math.floor(Math.random()*events.length)];

if(e==="you found money") player.money+=100;
if(e==="you got sick") player.health-=10;

log("Age "+player.age+": "+e);
popup(e);

clamp();
update();
}

/* POPUP */
function popup(text){
let div=document.createElement("div");
div.className="popupBox";
div.innerText=text;
document.getElementById("popup").appendChild(div);

setTimeout(()=>div.remove(),3000);
}

/* LOG */
function log(t){
player.log.push(t);

let box=document.getElementById("log");
box.innerHTML="";

player.log.slice(-8).forEach(x=>{
box.innerHTML+="<div>• "+x+"</div>";
});
}

/* UI */
function update(){
document.getElementById("name").innerText=player.name;
document.getElementById("ageDisplay").innerText="Age: "+player.age;

document.getElementById("healthBar").style.width=player.health+"%";
document.getElementById("happinessBar").style.width=player.happiness+"%";
document.getElementById("smartsBar").style.width=player.smarts+"%";
document.getElementById("looksBar").style.width=player.looks+"%";

let m=Math.min(player.money/1000*100,100);
document.getElementById("moneyBar").style.width=m+"%";

document.getElementById("school").innerText=player.school;
document.getElementById("grade").innerText=player.grade;
document.getElementById("job").innerText=player.job;
document.getElementById("salary").innerText=player.salary;
document.getElementById("partner").innerText=player.partner;
document.getElementById("house").innerText=player.house;
document.getElementById("car").innerText=player.car;
}

/* SYSTEMS */
function commitCrime(){
popup("Crime attempt...");
if(Math.random()>0.5){
player.money+=200;
popup("Success");
}else{
player.happiness-=10;
popup("Caught!");
}
update();
}

function goDating(){
player.partner="Random Person";
popup("You started dating someone!");
update();
}

function buyHouse(){
player.house="Small House";
player.money-=500;
popup("House purchased");
update();
}

function buyCar(){
player.car="Basic Car";
player.money-=300;
popup("Car purchased");
update();
}

/* TABS */
function setTab(t){
document.querySelectorAll(".tab").forEach(x=>x.classList.remove("activeTab"));
document.getElementById(t+"Tab").classList.add("activeTab");
}

/* SAVE */
function saveGame(){
localStorage.setItem("sc_v4",JSON.stringify(player));
popup("Saved");
}

/* LOAD */
function loadGame(){
let d=localStorage.getItem("sc_v4");
if(!d)return;

player=JSON.parse(d);
show("gameScreen");
update();
popup("Loaded");
}

/* UTIL */
function clamp(){
player.health=Math.max(0,Math.min(100,player.health));
player.happiness=Math.max(0,Math.min(100,player.happiness));
player.smarts=Math.max(0,Math.min(100,player.smarts));
player.looks=Math.max(0,Math.min(100,player.looks));
}