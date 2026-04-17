// js for the index.html

// toggle display tabs between menu and music by setting display to flex or none
function switchTabs(switchTo){
    const musicTab = document.getElementById("music-tab");
    const menuTab = document.getElementById("food-tab");
    if (switchTo == "music"){
        musicTab.style.display = "flex";
        menuTab.style.display = "none";
        menuBtn.classList.add("inactiveTab");
        musicBtn.classList.remove("inactiveTab");
    } else {
        musicBtn.classList.add("inactiveTab");
        menuBtn.classList.remove("inactiveTab");
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
        const left = document.createElement("div");
        left.classList.add("left-hand");
        let p_song = document.createElement("p");
        p_song.innerText = song.song;
        p_song.style.fontWeight = 'bold';
        let p_artist = document.createElement("p");
        p_artist.innerText = song.artist;
        
        const right = document.createElement("div");
        right.classList.add("right-hand");
        const singer = document.createElement("div");
        singer.innerText = singers[i].firstName.charAt(0) + singers[i].lastName.charAt(0);
        singer.classList.add('guest-singer');


        let remove_btn = document.createElement("button");
        remove_btn.className = "removeBtn";
        remove_btn.addEventListener("click", () => {
            removeFromQueue(i);
        });
        let remove_icon = document.createElement("img");
        remove_icon.className = "removeIcon";
        remove_icon.src = "/media/remove_btn.png";
        remove_btn.appendChild(remove_icon);
        left.appendChild(p_song);
        left.appendChild(p_artist);
        right.appendChild(singer);
        right.appendChild(remove_btn);
        div.appendChild(left);
        div.appendChild(right);
        queueBlock.appendChild(div);
        div = document.createElement("div");
        div.className = "songInQueue";
    }
}

// displays recommended songs by genre
function displaySongsByGenre(requestGenre){
    const catalogBlock = document.getElementById("recs");
    catalogBlock.innerHTML = "";

    document.getElementById("clear-btn").style.display = "block";

    const genre = songs.filter(s => s.genre === requestGenre);
    for (let i = 0; i < genre.length; i++){
        let song = genre[i];
        
        let div = document.createElement("div");
        div.className = "songInGenre";
        
        const left = document.createElement("div");
        left.classList.add("left-hand");
        const right = document.createElement("div");
        right.classList.add("right-hand");

        //infos
        let p_song = document.createElement("p");
        p_song.innerText = song.song;
        p_song.style.fontWeight = 'bold';
        let p_artist = document.createElement("p");
        p_artist.innerText = song.artist;
        // p_artist.style.fontSize = 'smaller';

        //duration
        let p_duration = document.createElement("p");
        const min = Math.floor(song.duration / 60);
        const sec = song.duration%60;
        p_duration.innerText = `${min}:${sec}`;

        //add
        let btn = document.createElement("button");
        btn.innerText="+";
        
        btn.classList.add("more");
        console.log(btn.classList);
        btn.addEventListener('click', () => addToQueue(song));

        left.appendChild(p_song);
        left.appendChild(p_artist);
        right.appendChild(p_duration);
        right.appendChild(btn);
        div.appendChild(left);
        div.appendChild(right);
        catalogBlock.appendChild(div);
    }
}

function setSongs(songsList){
    songs = songsList;
}

// removing songs from queue
function removeFromQueue(index){
    queue.splice(index, 1);
    singers.splice(index, 1);
    displayQueue();
}

//----------------
//search bar
//---------------------

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

        
        const left = document.createElement("div");
        left.classList.add("left-hand");
        const right = document.createElement("div");
        right.classList.add("right-hand");

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

        left.appendChild(p_song);
        left.appendChild(p_artist);
        right.appendChild(p_duration);
        right.appendChild(btn);
        div.appendChild(left);
        div.appendChild(right);
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

let currentSong = null;
let songElapsed = 0;
let songInterval = null;

function formatTime(seconds){
    const m = Math.floor(seconds / 60);
    const s = String(Math.floor(seconds % 60)).padStart(2, '0');
    return `${m}:${s}`;
}

function updateProgessBar(){
    if (!currentSong) return;
    const pourcentage = Math.min((songElapsed/currentSong.duration) * 100, 100);
    document.getElementById("progress-fill").style.width = pourcentage + "%";
    document.getElementById("time-elapsed").innerText = formatTime(songElapsed);
    document.getElementById("time-total").innerText = formatTime(currentSong.duration);
}

function startSongTimer(){
    clearInterval(songInterval);
    songElapsed = 0;
    updateProgessBar();
    if(isPlaying){
        songInterval = setInterval(()=> {
            if (isPlaying){
                songElapsed++;
                updateProgessBar();
                if( songElapsed>=currentSong.duration){
                    clearInterval(songInterval);
                    if(queue.length>0){
                        nextInQueue();
                    }else{
                        currentSong = null;
                        document.getElementById("currentSong").innerHTML="";
                        document.getElementById("progress-fill").style.width="0%";
                        document.getElementById("time-elapsed").innerText="0:00";
                        document.getElementById("time-total").innerHTML="0.00";
                    }
                }
            }
        },1000);    
    }
}


// moving next in the queue 
function nextInQueue() {
    if (queue.length === 0) return;
    currentSong = queue.shift();
    let currentSongDiv = document.getElementById("currentSong");
    currentSongDiv.innerHTML = "";

    let p_song = document.createElement("p");
    p_song.innerText = currentSong.song;
    p_song.classList.add('currrent-song');
    let p_artist = document.createElement("p");
    p_artist.innerText = currentSong.artist;
    p_artist.classList.add('current-artist');
    currentSongDiv.appendChild(p_song);
    currentSongDiv.appendChild(p_artist);
    
    if (singers.length > 0){
        const singer = document.getElementById("current-singer");
        const s = singers.shift();
        singer.innerText = s.firstName.charAt(0) + s.lastName.charAt(0);
        singer.classList.add('guest-singer', 'white');
    }

    displayQueue();
    startSongTimer();
}

//add a song to the queue
function addToQueue(song){
    queue.push(song);
    const singer = assignSinger();
    singers.push(singer);
    console.log(singer);
    console.log(singers);
    displayQueue();

    if(!currentSong){
        nextInQueue;
    }
}

function assignSinger(){
    // temp function to assign who is singing
    const n = guests.length-1;
    console.log(guests);
    const random = Math.floor(Math.random() * (n + 1));
    return guests[random];
}

// help and fx
function displayFX(){
    const fxDiv = document.getElementById("fx-overlay");
    if (fxDiv.style.display == "none" || fxDiv.style.display == ""){
        fxDiv.style.display = "flex";
    } else {
        fxDiv.style.display = "none";
    }
}

function displayHelp(){
    const helpDiv = document.getElementById("help-overlay");
    if (helpDiv.style.display == "none" || helpDiv.style.display == ""){
        helpDiv.style.display = "flex";
    } else {
        helpDiv.style.display = "none";
    }

}

//------------
//Timer of the session !!
//--------

const SESSION_DURATION = 2 * 60 * 60; //2 h
let sessionRemaining = SESSION_DURATION;
let sessionInterval = null;
 
function formatSessionTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = String(seconds % 60);
    return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}` : `${m}:${s}`;
}
 
function startSessionTimer() {
    sessionInterval = setInterval(() => {
        if (sessionRemaining > 0) {
            sessionRemaining--;
            const el = document.getElementById("session-timer");
            el.innerText = formatSessionTime(sessionRemaining);
        } else {
            clearInterval(sessionInterval);
            document.getElementById("session-timer").innerText = "End of session";
        }
    }, 1000);
}

//--------------
//Menuuuuuuuuu
//----------

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
            const index = cart.indexOf(menuItem);
            if (index > -1) {
                cart.splice(index, 1);
                updateCartDisplay();
            }
        }
    });
    moreBtn.addEventListener("click", () =>{
            quantity++;
            quantityDisplay.innerText = quantity;
            cart.push(menuItem);
            updateCartDisplay();
    });

    quantityDiv.appendChild(lessBtn);
    quantityDiv.appendChild(quantityDisplay);
    quantityDiv.appendChild(moreBtn);

    const price = document.createElement("p");
    price.innerText = "€" + menuItem.price.toFixed(2);
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

// toggle display tabs between menu and music by setting display to flex or none
function switchTabsMenu(switchTo){
    
    if (switchTo == "food"){
        // foodBtn.classList.add("inactiveTab");
        drinkBtn.classList.add("inactiveBtn");
        appetizerBtn.classList.add("inactiveBtn");
        specialBtn.classList.add("inactiveBtn");
        foodBtn.classList.remove("inactiveBtn");
    } else  if (switchTo == "drink"){
        foodBtn.classList.add("inactiveBtn");
        // drinkBtn.classList.add("inactiveTab");
        appetizerBtn.classList.add("inactiveBtn");
        specialBtn.classList.add("inactiveBtn");
        drinkBtn.classList.remove("inactiveBtn");
    }
    else  if (switchTo == "appetizer"){
        foodBtn.classList.add("inactiveBtn");
        drinkBtn.classList.add("inactiveBtn");
        // appetizerBtn.classList.add("inactiveTab");
        specialBtn.classList.add("inactiveBtn");
        appetizerBtn.classList.remove("inactiveBtn");
    }
    else{
        foodBtn.classList.add("inactiveBtn");
        drinkBtn.classList.add("inactiveBtn");
        appetizerBtn.classList.add("inactiveBtn");
        // specialBtn.classList.add("inactiveTab");
        specialBtn.classList.remove("inactiveBtn");
    }
}

function updateCartDisplay(){
    const items = document.getElementById("cart-display");
    const total = document.getElementById("cart-total");
    items.innerHTML = "";
    total.innerText = "";
    if (cart.length > 0){
        let total_price = 0;
        for (menuItem of cart){
            const itemInCart = document.createElement('div');
            itemInCart.classList.add('item-in-cart');
            const name = document.createElement('p');
            name.innerText = menuItem.item;
            const price = document.createElement('p');
            price.innerText = "€" + menuItem.price.toFixed(2);
            total_price += menuItem.price;

            itemInCart.appendChild(name);
            itemInCart.appendChild(price);
            items.appendChild(itemInCart);
        }
        total.innerText = "€" + total_price.toFixed(2);
    } else {
        total.innerText = "€0.00"
    }
}

function setGuests(guestList){
    guests = guestList;
    console.log(guests);
}


let songs = [];

// music/menu buttons
const musicBtn = document.getElementById("musicBtn");
const menuBtn = document.getElementById("menuBtn");
menuBtn.classList.add("inactiveTab");
musicBtn.addEventListener('click', () => switchTabs("music"));
menuBtn.addEventListener('click', () => switchTabs("menu"));

// fetch catalog data and display
let music = [];
const musicRecsFile = "./media/musicrecs.json";
loadData(musicRecsFile, setMusic);

// temp queue
let queue = [];
let singers = [];

displayQueue();

//when search is clicked and inputed, list of songs appears
//set genres
const searchbar = document.getElementById("searchbar");

const songsFile = "./media/music.json"
loadData(songsFile, setSongs)

// play/pause toggle to change button state 
const playPauseBtn = document.getElementById("playPauseBtn");
const playBtnIcon = document.getElementById("playBtnIcon");
let isPlaying = false; 

playPauseBtn.addEventListener("click", () => {
    isPlaying = !isPlaying;

    if (isPlaying) {
        playBtnIcon.src = "/media/pause_btn.png";
        playBtnIcon.alt = "pause";
        if(currentSong && !songInterval){
            songInterval = setInterval(() => {
                if(isPlaying){
                    songElapsed++;
                    updateProgessBar();
                    if(songElapsed >= currentSong.duration){
                        clearInterval(songInterval);
                        songInterval = null;
                        if(queue.length>0) nextInQueue();
                    }
                }
            }, 1000);
        }
    } else {
        playBtnIcon.src = "/media/play_btn.png";
        playBtnIcon.alt = "play";

        clearInterval(songInterval);
        songInterval = null;
    }
    // isPlaying = !isPlaying; //!!
});

      

// food type buttons
const foodBtn = document.getElementById("foodBtn");
const drinkBtn = document.getElementById("drinkBtn");
const appetizerBtn = document.getElementById("appetizerBtn");
const specialBtn = document.getElementById("specialBtn");

drinkBtn.classList.add("inactiveBtn");
appetizerBtn.classList.add("inactiveBtn");
specialBtn.classList.add("inactiveBtn");
foodBtn.addEventListener('click', () => switchTabsMenu("food"));
drinkBtn.addEventListener('click', () => switchTabsMenu("drink"));
appetizerBtn.addEventListener('click', () => switchTabsMenu("appetizer"));
specialBtn.addEventListener('click', () => switchTabsMenu("special"));

const nextBtn = document.getElementById("nextBtn");
nextBtn.addEventListener("click", nextInQueue);

const fxBtn = document.getElementById("fx");
fxBtn.addEventListener('click', displayFX);
const fx1Btn = document.getElementById("fx1");
fx1Btn.addEventListener('click', displayFX);
const fx2Btn = document.getElementById("fx2");
fx2Btn.addEventListener('click', displayFX);
const fx3Btn = document.getElementById("fx3");
fx3Btn.addEventListener('click', displayFX);
const helpBtn = document.getElementById("help");
helpBtn.addEventListener('click', displayHelp);
const helpYesBtn = document.getElementById("help-yes");
helpYesBtn.addEventListener('click', displayHelp);
const helpNoBtn = document.getElementById("help-no");
helpNoBtn.addEventListener('click', displayHelp);

let menu = [];
const menuFile = "./media/menu.json";
loadData(menuFile, setMenu);

let cart = [];
updateCartDisplay();

const checkOutBtn = document.getElementById("checkout-btn");
checkOutBtn.addEventListener('click', ()=>{
    cart = [];
    updateCartDisplay();
});

document.getElementById("session-timer").innerText = formatSessionTime(sessionRemaining);
startSessionTimer();

let guests = [];
const guestsFile = './media/guests.json';
loadData(guestsFile, setGuests);