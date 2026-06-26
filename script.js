let player={
name:"",
age:0,

health:100,
happiness:100,
smarts:50,
looks:50,
money:0,

job:null,
jobLevel:0,
salary:0,

education:"None",

house:null,
car:null
};

/* EVENTS DATABASE (EXPANDABLE TO 1000+) */
const events=[
{
text:"You got into a fight at school.",
minAge:6,
effect:{health:-10,happiness:-5},
choices:[
{text:"Fight back",effect:{health:-5}},
{text:"Run away",effect:{happiness:-5}}
]
},
{
text:"You found $100 on the ground.",
minAge:0,
effect:{money:+100},
choices:[
{text:"Keep it",effect:{money:+0}},
{text:"Report it",effect:{happiness:+5}}
]
},
{
text:"A stranger offered you a job.",
minAge:18,
effect:{},
choices:[
{text:"Accept",effect:{job:"Worker",salary:1200,jobLevel:1}},
{text:"Decline",effect:{happiness:-5}}
]
},
{
text:"You feel sick today.",
minAge:0,
effect:{health:-10},
choices:[
{text:"Rest",effect:{health:+5}},
{text:"Ignore it",effect:{health:-5}}
]
}
];

/* START */
function startGame(){
player.name=document.getElementById("first").value+" "+document.getElementById("last").value;

player.looks=+document.getElementById("looks").value;
player.smarts=+document.getElementById("smarts").value;
player.money=+document.getElementById("money").value;

show("gameScreen");
update();
}

/* NEXT YEAR (CORE ENGINE) */
function nextYear(){
player.age++;

let available=events.filter(e=>player.age>=e.minAge);
let event=available[Math.floor(Math.random()*available.length)];

renderEvent(event);
update();
}

/* EVENT SYSTEM */
function renderEvent(event){

let card=document.getElementById("eventCard");

card.innerHTML=`<div class="card">
<h3>${event.text}</h3>
</div>`;

/* choices */
event.choices.forEach(c=>{
let btn=document.createElement("button");
btn.className="choice";
btn.innerText=c.text;
btn.onclick=()=>applyChoice(event,c);
card.appendChild(btn);
});

}

/* APPLY CHOICE */
function applyChoice(event,choice){

applyEffect(event.effect);
applyEffect(choice.effect);

document.getElementById("eventCard").innerHTML="";
update();
}

/* EFFECT ENGINE */
function applyEffect(effect){
for(let key in effect){
if(player[key]!==undefined){
player[key]+=effect[key];
}
if(key==="job") player.job=effect.job;
if(key==="salary") player.salary=effect.salary;
if(key==="jobLevel") player.jobLevel=effect.jobLevel;
}
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
document.getElementById("jobLevel").innerText=player.jobLevel;
document.getElementById("salary").innerText=player.salary;

document.getElementById("education").innerText=player.education;

document.getElementById("house").innerText=player.house;
document.getElementById("car").innerText=player.car;
}

/* NAV */
function show(id){
document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
document.getElementById(id).classList.add("active");
}

function setTab(t){
document.querySelectorAll(".tab").forEach(x=>x.classList.remove("activeTab"));
document.getElementById(t+"Tab").classList.add("activeTab");
}

/* SAVE */
function saveGame(){
localStorage.setItem("sc_v7",JSON.stringify(player));
}

function loadGame(){
let d=localStorage.getItem("sc_v7");
if(!d)return;

player=JSON.parse(d);
show("gameScreen");
update();
}