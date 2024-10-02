addEventListener("DOMContentLoaded", function(){

    const songs = [
        {
            title: "Drive breakbeat",
            duration: "1:49",
            thumbnail: "icons/music-icon.svg",  
            src: "data/track1.mp3",
            artist: "Rocket",
            year: 2023,
        },
        {
            title: "Titanium",
            duration: "1:46",
            thumbnail: "icons/music-icon.svg",  
            src: "data/track2.mp3",
            artist: "AlishBeats",
            year: 2023,
        },
        {
            title: "Science Documentary",
            duration: "2:07",
            thumbnail: "icons/music-icon.svg",  
            src: "data/track3.mp3",
            artist: "Lexin_Music",
            year: 2023,
        },
        {
            title: "Once In Paris",
            duration: "2:12",
            thumbnail: "icons/music-icon.svg",  
            src: "data/track4.mp3",
            artist: "Pumpupthemind",
            year: 2023,
        },
    ];
   
    let audio = new Audio();
   
    const songList = document.getElementById("song-list");
    const thumbnail = document.getElementById("thumbnail");
    const trackTitle = document.getElementById("player-title");
    const trackDescription = document.getElementById("player-description");
    const progress = document.getElementById("progress");
    const currTime = document.getElementById("current-time");
    const leftTime = document.getElementById("time-left");
    const playPauseBtn = document.getElementById("play-pause");
    const restartBtn = document.getElementById("restart");
    const stopBtn = document.getElementById("stop");
    const volumeControl = document.getElementById("volume"); 

    playPauseBtn.addEventListener("click", playPause);
    restartBtn.addEventListener("click", restart);
    stopBtn.addEventListener("click", stopTrack);
    progress.addEventListener("input", function(){
        audio.currentTime = progress.value;
    });
    volumeControl.addEventListener("input", updateVolume);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("play", () => updatePlayPauseButton(true));
    audio.addEventListener("pause", () => updatePlayPauseButton(false));

    let currentSongIndex = 0;
    loadSong(currentSongIndex);

    const updatePlayPauseButton = (paused) => {
        playPauseBtn.innerHTML = paused
            ? `<img src="icons/pause-button.svg">`
            : `<img src="icons/play-button.svg">`;
    };

    function playPause(){
        if(audio.paused){
            audio.play();
            updatePlayPauseButton(audio.paused);
        } else {
            audio.pause();
            updatePlayPauseButton(audio.paused);
        }
    }

    function loadSong(index){
        const currentSong = songs[index];
        audio.src = currentSong.src;
        thumbnail.src = currentSong.thumbnail;
        trackTitle.innerHTML = currentSong.title;
        trackDescription.innerHTML = currentSong.artist;
        leftTime.textContent = "00:00";
        audio.addEventListener("loadedmetadata", function(){
            progress.max = audio.duration;
        });
        updateCurrentSongHighlight(index);
    }

    function restart(){
        audio.currentTime = 0;
        progress.value = 0;
    }

    function stopTrack(){
        audio.currentTime = 0;
        audio.pause();
        updatePlayPauseButton(false);
    }

    function updateVolume(){
        audio.volume = volumeControl.value;
    }

    function updateProgress(){
        const currentTime = audio.currentTime;
        const duration = audio.duration;
        const remainingTime = duration - currentTime;

        progress.value = currentTime;
        currTime.textContent = formatTime(currentTime);
        leftTime.textContent = `-${remainingTime >= 0 ? formatTime(remainingTime) : "00:00"}`;
    }

    function formatTime(time){
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${padZero(minutes)}:${padZero(seconds)}`;
    }

    function padZero(number){
        return (number < 10 ? "0" : "") + number;
    }

    function updateCurrentSongHighlight(index){
        const songItems = document.querySelectorAll(".item-container");
        songItems.forEach((element) => {
            element.classList.remove("current-song");
        });

        const currentSongElement = document.querySelector(`.item-container[data-index="${index}"]`);
        if (currentSongElement) {
            currentSongElement.classList.add("current-song");
        }
    }

    function renderSongList(){
        songList.innerHTML = "";
        songs.forEach((song, index) => {
            const itemContainer = document.createElement("div");
            const itemImg = document.createElement("div");
            const imgElement = document.createElement("img");
            const trackDataContainer = document.createElement("div");
            const trackTitle = document.createElement("p");
            const trackDescription = document.createElement("p");
            const trackDurationContainer = document.createElement("div");
            const trackDuration = document.createElement("p");
            const trackYear = document.createElement("p");

            itemContainer.classList.add("item-container");
            itemContainer.setAttribute("data-index", index);
            itemImg.classList.add("item-img");
            trackDataContainer.classList.add("track-data-container");
            trackTitle.classList.add("track-title");
            trackDescription.classList.add("track-artist");
            trackDurationContainer.classList.add("track-duration-container");
            trackDuration.classList.add("track-duration");
            trackYear.classList.add("track-year");

            itemContainer.addEventListener("click", () => {
                currentSongIndex = index;
                loadSong(currentSongIndex);
                audio.play();
                updatePlayPauseButton(true); 
            });

            imgElement.src = "icons/outline.svg";
            trackTitle.textContent = song.title;
            trackDescription.textContent = song.artist || "Unknown artist";
            trackDuration.textContent = song.duration;
            trackYear.textContent = song.year || "Unknown Year";

            itemImg.appendChild(imgElement);
            trackDataContainer.appendChild(trackTitle);
            trackDataContainer.appendChild(trackDescription);
            trackDurationContainer.appendChild(trackDuration);
            trackDurationContainer.appendChild(trackYear);

            itemContainer.appendChild(itemImg);
            itemContainer.appendChild(trackDataContainer);
            itemContainer.appendChild(trackDurationContainer);

            songList.appendChild(itemContainer);
        });

        updateCurrentSongHighlight(currentSongIndex);
    }

    renderSongList();
});
