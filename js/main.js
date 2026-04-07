// js for the index.html


// toggle display tabs between menu and music by setting display to flex or none
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

// load JSON from file and call function to handle said data
async function loadData(file, func){
  try {
    const response = await fetch(file);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    func(result);
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

// displays music recommendations by 3s
function displayMusicRecs(music){
    const catalog = document.getElementById("catalog-block");
    let div = document.createElement("div");
    div.className = "row-recs";
    for (let i = 0; i < music.length; i++){
        const p = document.createElement("p");
        p.innerText = music[i].genre;
        p.style.backgroundImage = `url(${music[i].image})`;
        p.className = "genre";
        console.log(music[i].image)
        div.appendChild(p);
        if((i + 1) % 3 === 0){
            catalog.appendChild(div);
            div = document.createElement("div");
            div.className = "row-recs";
        } 
    }
    if (div.children.length > 0) {
        catalog.appendChild(div);
    }
}

// displays the queue by adding title and artist in <p> to a div and adding to the queue block element
function displayQueue(){
    const queueBlock = document.getElementById("queue-block");
    let div = document.createElement("div");
    div.className = "songInQueue";
    for (let i = 0; i < queue.length; i++){
        let song = queue[i];
        let p_song = document.createElement("p");
        p_song.innerText = song.name;
        let p_artist = document.createElement("p");
        p_artist.innerText = song.artist;
        p_artist.style.fontSize = 'smaller';
        div.appendChild(p_song);
        div.appendChild(p_artist);
        queueBlock.appendChild(div);
        div = document.createElement("div");
        div.className = "songInQueue";
    }
}

// music/menu buttons
const musicBtn = document.getElementById("musicBtn");
const menuBtn = document.getElementById("menuBtn");
musicBtn.addEventListener('click', () => switchTabs("music"));
menuBtn.addEventListener('click', () => switchTabs("menu"));

// fetch catalog data and display
const musicRecsFile = "./media/musicrecs.json";
loadData(musicRecsFile, displayMusicRecs);

// temp queue
let queue = [
    {'name' : 'La vie en rose', 'artist' : 'so and so'},
    {'name' : 'La vie en rose', 'artist' : 'so and so'},
    {'name' : 'La vie en rose', 'artist' : 'so and so'},
    {'name' : 'La vie en rose', 'artist' : 'so and so'},
    {'name' : 'La vie en rose', 'artist' : 'so and so'},
    {'name' : 'La vie en rose', 'artist' : 'so and so'},
    {'name' : 'La vie en rose', 'artist' : 'so and so'},
    {'name' : 'La vie en rose', 'artist' : 'so and so'},
    {'name' : 'La vie en rose', 'artist' : 'so and so'},
    {'name' : 'La vie en rose', 'artist' : 'so and so'},
    {'name' : 'La vie en rose', 'artist' : 'so and so'},
]
displayQueue();