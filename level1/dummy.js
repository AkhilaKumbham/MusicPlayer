document.addEventListener("DOMContentLoaded", function () {
    // List of songs array (each object represents a track)
    const songs = [
        {
            title: "Drive breakbeat",
            duration: "1:49",
            thumbnail: "./assets/assets/icons/music-icon.svg",
            src: "./data/track1.mp3",
            artist: "Rockot",
            year: 2023,
        },
        {
            title: "Titanium",
            duration: "1:46",
            thumbnail: "./assets/assets/icons/music-icon.svg",
            src: "./data/track2.mp3",
            artist: "AlisiaBeats",
            year: 2023,
        },
        {
            title: "Science Documentary",
            duration: "2:07",
            thumbnail: "./assets/assets/icons/music-icon.svg",
            src: "./data/track3.mp3",
            artist: "Lexin_Music",
            year: 2023,
        },
        {
            title: "Once in Paris",
            duration: "2:12",
            thumbnail: "./assets/assets/icons/music-icon.svg",
            src: "./data/track4.mp3",
            artist: "pumpupthemind",
            year: 2023,
        },
    ];

    // Access HTML elements
    const songList = document.getElementById("song-List");
    const thumbnail = document.getElementById("thumbnail");
    const playPauseBtn = document.getElementById("play-pause");
    const restartBtn = document.getElementById("restart");
    const stopBtn = document.getElementById("stop");
    const progress = document.getElementById("progress");
    const currTime = document.getElementById("current-time");
    const leftTime = document.getElementById("time-left");
    const volumeControl = document.getElementById("volume");
    const trackTitle = document.getElementById("player-title");
    const trackDescription = document.getElementById("player-description");

    // Store the index of the track being played
    let currentSongIndex = 0;

    // Audio element construction
    let audio = new Audio();

    // Load the first song
    loadSong(currentSongIndex);

    // Update play/pause button icon
    const updatePlayPauseButton = (isPlaying) => {
        playPauseBtn.innerHTML = isPlaying
            ? `<img src="./assets/assets/icons/pause-button.svg">`
            : `<img src="./assets/assets/icons/play-button.svg">`;
    };

    // Function to play or pause the current song
    function playPause() {
        if (audio.paused) {
            audio.play();
            updatePlayPauseButton(true);
        } else {
            audio.pause();
            updatePlayPauseButton(false);
        }
    }

    // Highlight the currently playing song
    function updateCurrentSongHighlight() {
        const titleElements = document.querySelectorAll(".track-title");
        titleElements.forEach((element) => {
            element.classList.remove("current-song");
        });
        // Highlight the current song
        const currentSongTitleElement = document.querySelector(
            `.item-container[data-index="${currentSongIndex}"] .track-title`
        );
        if (currentSongTitleElement) {
            currentSongTitleElement.classList.add("current-song");
        }
    }

    // Load a new song into the player
    function loadSong(index) {
        const currentSong = songs[index];
        audio.src = currentSong.src;
        thumbnail.src = currentSong.thumbnail;
        trackTitle.innerHTML = currentSong.title;
        trackDescription.innerHTML = currentSong.artist;
        leftTime.textContent = "00:00";
        audio.addEventListener("loadedmetadata", function () {
            progress.max = audio.duration;
        });
        updateCurrentSongHighlight();
    }

    // Render the list of songs in the left menu
    function renderSongList() {
        songList.innerHTML = "";
        songs.forEach((song, index) => {
            const itemContainer = document.createElement("div");
            const itemImg = document.createElement("div");
            const imgElement = document.createElement("img");
            const trackDataContainer = document.createElement("div");
            const trackTitle = document.createElement("p");
            const trackArtist = document.createElement("p");
            const trackDurationContainer = document.createElement("div");
            const trackDuration = document.createElement("p");
            const trackYear = document.createElement("p");

            // Add the classes and attributes
            itemContainer.classList.add("item-container");
            itemContainer.setAttribute("data-index", index);
            itemImg.classList.add("item-img");
            trackDataContainer.classList.add("track-data-container");
            trackTitle.classList.add("track-title");
            trackArtist.classList.add("track-artist");
            trackDurationContainer.classList.add("track-duration-container");
            trackDuration.classList.add("track-duration");
            trackYear.classList.add("track-year");

            // Set attributes and content for each element
            itemContainer.addEventListener("click", () => {
                currentSongIndex = index;
                loadSong(currentSongIndex); // Load the selected song
                audio.play(); // Automatically play the audio
                updatePlayPauseButton(true);
            });

            imgElement.src = "./assets/assets/icons/outline.svg";
            trackTitle.textContent = song.title;
            trackArtist.textContent = song.artist || "Unknown Artist";
            trackDuration.textContent = song.duration;
            trackYear.textContent = song.year || "Unknown Year";

            // Append all the elements
            itemImg.appendChild(imgElement);
            trackDataContainer.appendChild(trackTitle);
            trackDataContainer.appendChild(trackArtist);
            trackDurationContainer.appendChild(trackDuration);
            trackDurationContainer.appendChild(trackYear);
            itemContainer.appendChild(itemImg);
            itemContainer.appendChild(trackDataContainer);
            itemContainer.appendChild(trackDurationContainer);
            songList.appendChild(itemContainer);
            updateCurrentSongHighlight();
        });
    }

    renderSongList();
});
