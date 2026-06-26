// LOADING -> CREATOR TRANSITION
window.onload = () => {
setTimeout(() => {
document.getElementById("loadingScreen").style.display = "none";
document.getElementById("creatorScreen").classList.remove("hidden");
}, 2000);
};

// START GAME
function startGame(){

const player = {
name: document.getElementById("name").value,
gender: document.getElementById("gender").value,
country: document.getElementById("country").value,
place: document.getElementById("place").value,
talent: document.getElementById("talent").value,
age: 0
};

console.log("NEW LIFE STARTED:", player);

// move to game screen (placeholder)
document.getElementById("creatorScreen").classList.add("hidden");
document.getElementById("gameScreen").classList.remove("hidden");
}