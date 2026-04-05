// js for the index.html

function switchTabs(switchTo){
    const musicTab = document.getElementById("music-tab");
    const menuTab = document.getElementById("food-tab");
    if (switchTo == "music"){
        musicTab.style.display = "flex";
        menuTab.style.display = "none";
    } else {
        musicTab.style.display = "none";
        menuTab.style.display = "flex";
    }
}

const musicBtn = document.getElementById("musicBtn");
const menuBtn = document.getElementById("menuBtn");
musicBtn.addEventListener('click', () => switchTabs("music"));
menuBtn.addEventListener('click', () => switchTabs("menu"));



