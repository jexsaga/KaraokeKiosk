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
    queueBlock.innerHTML="";
    let div = document.createElement("div");
    div.className = "songInQueue";
    for (let i = 0; i < queue.length; i++){
        let song = queue[i];
        let p_song = document.createElement("p");
        p_song.innerText = song.song;
        let p_artist = document.createElement("p");
        p_artist.innerText = song.artist;
        p_artist.style.fontSize = 'smaller';
        let remove_btn = document.createElement("button");
        remove_btn.className = "removeBtn";
        remove_btn.addEventListener("click", () => {
            removeFromQueue(i);
        });
        let remove_icon = document.createElement("img");
        remove_icon.className = "removeIcon";
        remove_icon.src = "/media/remove_btn.png";
        remove_btn.appendChild(remove_icon);
        div.appendChild(p_song);
        div.appendChild(p_artist);
        div.appendChild(remove_btn);
        queueBlock.appendChild(div);
        div = document.createElement("div");
        div.className = "songInQueue";
    }
}

//set genres
// function setGenres(genresList){
//     genres = genresList;
// }

// displays recommended songs by genre
function displaySongsByGenre(requestGenre){
    const catalogBlock = document.getElementById("recs");
    catalogBlock.innerHTML = "";

    // let div = document.createElement("div");
    // div.className = "songInGenre";
    // let genre = genres[requestGenre];
    // console.log("requestGenre:", requestGenre);
    // console.log(genre);

    document.getElementById("clear-btn").style.display = "block";

    const genre = songs.filter(s => s.genre === requestGenre);
    for (let i = 0; i < genre.length; i++){
        let song = genre[i];
        
        let div = document.createElement("div");
        div.className = "songInGenre";

        //infos
        let p_song = document.createElement("p");
        p_song.innerText = song.song;
        let p_artist = document.createElement("p");
        p_artist.innerText = song.artist;
        p_artist.style.fontSize = 'smaller';

        //duration
        let p_duration = document.createElement("p");
        const min = Math.floor(song.duration / 60);
        const sec = song.duration%60;
        p_duration.innerText = `${min}:${sec}`;

        //add
        let btn = document.createElement("button");
        btn.innerText="+";
        btn.addEventListener('click', () => addToQueue(song));

        div.appendChild(p_song);
        div.appendChild(p_artist);
        div.appendChild(p_duration);
        div.appendChild(btn);
        catalogBlock.appendChild(div);
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
    {'song' : 'La vie en rose 0', 'artist' : 'so and so'},
    {'song' : 'La vie en rose 1', 'artist' : 'so and so'},
    {'song' : 'La vie en rose 2', 'artist' : 'so and so'},
    
]
displayQueue();

// removing songs from queue
function removeFromQueue(index){
    queue.splice(index, 1);
    displayQueue();
}

// genre types
// let genres = {};
// const genresFile = "./media/genres.json";
// loadData(genresFile, setGenres);

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


const songsFile = "./media/music.json"
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

        //infos
        let p_song = document.createElement("p");
        p_song.innerText = song.song;
        let p_artist = document.createElement("p");
        p_artist.innerText = song.artist;
        p_artist.style.fontSize = 'smaller';

        //duration
        let p_duration = document.createElement("p");
        const min = Math.floor(song.duration / 60);
        const sec = song.duration%60;
        p_duration.innerText = `${min}:${sec}`;

        //add
        let btn = document.createElement("button");
        btn.innerText="+";
        btn.addEventListener('click', () => addToQueue(song));

        div.appendChild(p_song);
        div.appendChild(p_artist);
        div.appendChild(p_duration);
        div.appendChild(btn);
        catalogBlock.appendChild(div);
        // div = document.createElement("div");
        // div.className = "songInGenre";
    }

    
}

//when the little X is clicked everithingue diseapear
function clearSearch(){
    document.getElementById("searchbar").value = "";
    document.getElementById("clear-btn").style.display = "none";
    displayMusicRecs();
}

//----------------
// bottom bar
//--------------------- 

// play/pause toggle to change button state 
const playPauseBtn = document.getElementById("playPauseBtn");
const playBtnIcon = document.getElementById("playBtnIcon");
let isPlaying = true; 
playPauseBtn.addEventListener("click", () => {
    if (isPlaying) {
        playBtnIcon.src = "/media/pause_btn.png";
        playBtnIcon.alt = "pause";
    } else {
        playBtnIcon.src = "/media/play_btn.png";
        playBtnIcon.alt = "play";
    }
    isPlaying = !isPlaying;
});

// moving next in the queue 
function nextInQueue() {
    let newCurrentSong = queue.shift();
    console.log("Updated queue:", queue);
    let currentSongDiv = document.getElementById("currentSong");
    currentSongDiv.innerHTML = "";

    let p_song = document.createElement("p");
    p_song.innerText = newCurrentSong.song;
    let p_artist = document.createElement("p");
    p_artist.innerText = newCurrentSong.artist;
    p_artist.style.fontSize = 'smaller';
    currentSongDiv.appendChild(p_song);
    currentSongDiv.appendChild(p_artist);

    displayQueue();
}

//add a song to the queue
function addToQueue(song){
    queue.push(song);
    displayQueue();
}
const nextBtn = document.getElementById("nextBtn");
nextBtn.addEventListener("click", nextInQueue);



//--------------
//Menuuuuuuuuu
//----------

let menu = [];
const menuFile = "./media/menu.json";
loadData(menuFile, setMenu);


function setMenu(menuList){
    menu = menuList;
    displayMenuItems('food');
}




//one menu item has menuItem.item, menuItem.price, menuItem.type, menuItem.description and menuItem.image
function oneMenuItem(menuItem){
    const div = document.createElement("div");
    div.className = "menuItemCard";

    const img = document.createElement("img");
    img.src = menuItem.image;
    img.alt = menuItem.item;
    img.className = "menuItemImg";

    //div displayed on the right of the card
    const infosDiv= document.createElement("div");
    infosDiv.className = "menuItemInfo";

    const name = document.createElement("p");
    name.innerText = menuItem.item;
    name.className = "menuItemName";

    const description = document.createElement("p");
    description.innerText = menuItem.description;
    description.className = "menuItemDescription";

    infosDiv.appendChild(name);
    infosDiv.appendChild(description);

    const bottomDiv = document.createElement("div");
    bottomDiv.className = "menuItemBottom";

    const quantityDiv = document.createElement("div");
    quantityDiv.className = "menuItemQuantity";

    const lessBtn = document.createElement("button");
    lessBtn.innerText = "-";
    const moreBtn = document.createElement("button");
    moreBtn.innerText = "+";

    const quantityDisplay = document.createElement("span");
    quantityDisplay.innerText = "0";

    let quantity = 0;
    lessBtn.addEventListener("click", () =>{
        if (quantity >= 1){
            quantity--;
            quantityDisplay.innerText = quantity;
        }
    });
    moreBtn.addEventListener("click", () =>{
            quantity++;
            quantityDisplay.innerText = quantity;
        
    });

    quantityDiv.appendChild(lessBtn);
    quantityDiv.appendChild(quantityDisplay);
    quantityDiv.appendChild(moreBtn);

    const price = document.createElement("p");
    price.innerText = menuItem.price;
    price.className = "menuItemPrice";

    bottomDiv.appendChild(quantityDiv);
    bottomDiv.appendChild(price);

    div.appendChild(img);
    div.appendChild(infosDiv);
    div.appendChild(bottomDiv);

    return div;
}

function displayMenuItems(menuType){

    const menuCatalog = document.getElementById("food-block");
    menuCatalog.innerHTML = "";

    const filtered = menu.filter(item => item.type === menuType);

    let div = document.createElement("div");
    div.className = "menu-row";

    for (let i = 0; i < filtered.length; i++){
        
        div.appendChild(oneMenuItem(filtered[i]));

        if((i + 1) % 3 === 0){
            menuCatalog.appendChild(div);
            div = document.createElement("div");
            div.className = "menu-row";
        } 
    }
    if (div.children.length > 0) {
        menuCatalog.appendChild(div);
    }
}