// js for the index.html

let songs = [];
// let mode = "recos";

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

function setMusic(musicList){
    music = musicList;
    displayMusicRecs();
}

// displays music recommendations by 3s
function displayMusicRecs(){
    // mode = "recos";
    document.getElementById("clear-btn").style.display = "none";

    const catalog = document.getElementById("recs");
    catalog.innerHTML = "";
    let div = document.createElement("div");
    div.className = "row-recs";
    for (let i = 0; i < music.length; i++){
        const p = document.createElement("p");
        p.innerText = music[i].genre;
        p.style.backgroundImage = `url(${music[i].image})`;
        p.className = "genre";
        p.addEventListener('click', () => displaySongsByGenre(music[i].genre));
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

//set genres
function setGenres(genresList){
    genres = genresList;
}

// displays recommended songs by genre
function displaySongsByGenre(requestGenre){
    const catalogBlock = document.getElementById("recs");
    catalogBlock.innerHTML = "";
    let div = document.createElement("div");
    div.className = "songInGenre";
    let genre = genres[requestGenre];
    console.log("requestGenre:", requestGenre);
    console.log(genre);
    for (let i = 0; i < genre.length; i++){
        let song = genre[i];
        let p_song = document.createElement("p");
        p_song.innerText = song.name;
        let p_artist = document.createElement("p");
        p_artist.innerText = song.artist;
        p_artist.style.fontSize = 'smaller';
        div.appendChild(p_song);
        div.appendChild(p_artist);
        catalogBlock.appendChild(div);
        div = document.createElement("div");
        div.className = "songInGenre";
    }
}

// music/menu buttons
const musicBtn = document.getElementById("musicBtn");
const menuBtn = document.getElementById("menuBtn");
musicBtn.addEventListener('click', () => switchTabs("music"));
menuBtn.addEventListener('click', () => switchTabs("menu"));

// fetch catalog data and display
let music = [];
const musicRecsFile = "./media/musicrecs.json";
loadData(musicRecsFile, setMusic);

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

// genre types
let genres = {};
const genresFile = "./media/genres.json";
loadData(genresFile, setGenres);

// genre back button   //NINA : i commented temporarly this bc it made the search not working

//const genreBack = document.getElementById("genre-back");
//genreBack.addEventListener('click', displayMusicRecs);


//----------------
//search bar
//---------------------

//when search is clicked and inputed, list of songs appears
//set genres
const searchbar = document.getElementById("searchbar");

function setSongs(songsList){
    songs = songsList;
}


const songsFile = "./media/musicdropdown.json"
loadData(songsFile, setSongs)


//display the songs that fit with the input in the searchbar
function searchSongs() {
    let input = document.getElementById('searchbar').value
    input = input.toLowerCase();

    const catalogBlock = document.getElementById("recs");
    catalogBlock.innerHTML = "";

    document.getElementById("clear-btn").style.display = "block";

    let filtered;
    if(input){
        filtered = songs.filter(s => s.song.toLowerCase().includes(input) || s.artist.toLowerCase().includes(input));
    }
    else{
        filtered = songs;
    }
    
    for (let i = 0; i < filtered.length; i++){
        let song = filtered[i];
        let div = document.createElement("div");
        div.className = "songInGenre";
        let p_song = document.createElement("p");
        p_song.innerText = song.song;
        let p_artist = document.createElement("p");
        p_artist.innerText = song.artist;
        p_artist.style.fontSize = 'smaller';
        div.appendChild(p_song);
        div.appendChild(p_artist);
        catalogBlock.appendChild(div);
        div = document.createElement("div");
        div.className = "songInGenre";
    }

    
}

//when the little X is clicked everithingue diseapear
function clearSearch(){
    document.getElementById("searchbar").value = "";
    document.getElementById("clear-btn").style.display = "none";
    displayMusicRecs();
}

