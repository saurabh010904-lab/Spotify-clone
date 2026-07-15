// ===========================================
// SPOTIFY CLONE
// script.js
// Developed by Saurabh Raj
// ===========================================

// ==============================
// DOM ELEMENTS
// ==============================

const loader = document.getElementById("loader");
const playBtn = document.getElementById("playBtn");
const progressBar = document.getElementById("progressBar");
const volumeSlider = document.getElementById("volumeSlider");
const searchInput = document.querySelector(".search-bar input");
const topbar = document.querySelector(".topbar");
const menuItems = document.querySelectorAll(".sidebar li");
const likeButtons = document.querySelectorAll(".fa-heart");
const cards = document.querySelectorAll(".music-card");

// ==============================
// LOADER
// ==============================

window.addEventListener("load", () => {

    if (!loader) return;

    setTimeout(() => {

        loader.style.opacity = "0";
        loader.style.visibility = "hidden";

        setTimeout(() => {

            loader.remove();

        }, 500);

    }, 1200);

});

// ==============================
// SEARCH FILTER
// ==============================

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const keyword = this.value.toLowerCase();

        cards.forEach(card => {

            const text = card.innerText.toLowerCase();

            card.style.display = text.includes(keyword)
                ? ""
                : "none";

        });

    });

}

// ==============================
// ACTIVE SIDEBAR MENU
// ==============================

menuItems.forEach(item => {

    item.addEventListener("click", () => {

        menuItems.forEach(menu => {

            menu.classList.remove("active");

        });

        item.classList.add("active");

    });

});

// ==============================
// STICKY NAVBAR
// ==============================

window.addEventListener("scroll", () => {

    if (!topbar) return;

    if (window.scrollY > 30) {

        topbar.style.background = "rgba(0,0,0,.95)";

    } else {

        topbar.style.background = "rgba(18,18,18,.92)";

    }

});

// ==============================
// LIKE BUTTON
// ==============================

likeButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        btn.classList.toggle("fa-solid");
        btn.classList.toggle("fa-regular");

        btn.style.color =
            btn.classList.contains("fa-solid")
                ? "#1DB954"
                : "#ffffff";

    });

});
// ===========================================
// MUSIC PLAYER
// ===========================================

let isPlaying = false;
let currentTime = 0;
let duration = 225; // 3:45

let timer = null;

const currentTimeText =
    document.querySelector(".progress span:first-child");

const totalTimeText =
    document.querySelector(".progress span:last-child");

// ===========================================
// PLAY / PAUSE
// ===========================================

if (playBtn) {

    playBtn.addEventListener("click", () => {

        isPlaying = !isPlaying;

        playBtn.innerHTML = isPlaying
            ? '<i class="fa-solid fa-pause"></i>'
            : '<i class="fa-solid fa-play"></i>';

        if (isPlaying) {

            startProgress();

        } else {

            stopProgress();

        }

    });

}

// ===========================================
// START PROGRESS
// ===========================================

function startProgress() {

    clearInterval(timer);

    timer = setInterval(() => {

        if (currentTime >= duration) {

            stopProgress();

            isPlaying = false;

            playBtn.innerHTML =
                '<i class="fa-solid fa-play"></i>';

            return;

        }

        currentTime++;

        updateProgress();

    }, 1000);

}

// ===========================================
// STOP PROGRESS
// ===========================================

function stopProgress() {

    clearInterval(timer);

}

// ===========================================
// UPDATE PROGRESS
// ===========================================

function updateProgress() {

    if (!progressBar) return;

    progressBar.value =
        (currentTime / duration) * 100;

    if (currentTimeText)
        currentTimeText.textContent =
            formatTime(currentTime);

    if (totalTimeText)
        totalTimeText.textContent =
            formatTime(duration);

}

// ===========================================
// FORMAT TIME
// ===========================================

function formatTime(seconds) {

    const min = Math.floor(seconds / 60);

    const sec = seconds % 60;

    return `${min}:${sec < 10 ? "0" : ""}${sec}`;

}

// ===========================================
// SEEK BAR
// ===========================================

if (progressBar) {

    progressBar.addEventListener("input", () => {

        currentTime =
            Math.floor(
                (progressBar.value / 100) * duration
            );

        updateProgress();

    });

}

// ===========================================
// VOLUME
// ===========================================

if (volumeSlider) {

    volumeSlider.addEventListener("input", () => {

        console.log(
            "Volume:",
            volumeSlider.value + "%"
        );

    });

}

// ===========================================
// PLAYER BUTTONS
// ===========================================

document.querySelectorAll(".controls button").forEach(btn => {

    btn.addEventListener("click", () => {

        btn.style.transform = "scale(1.15)";

        setTimeout(() => {

            btn.style.transform = "scale(1)";

        }, 150);

    });

});

// ===========================================
// PLAY CARD
// ===========================================

document.querySelectorAll(".play-hover").forEach(btn => {

    btn.addEventListener("click", e => {

        e.stopPropagation();

        if (!isPlaying) {

            playBtn.click();

        }

    });

});
// ===========================================
// LOCAL STORAGE (LIKED SONGS)
// ===========================================

const likedSongs = JSON.parse(
    localStorage.getItem("likedSongs") || "[]"
);

likeButtons.forEach((btn, index) => {

    if (likedSongs.includes(index)) {

        btn.classList.remove("fa-regular");
        btn.classList.add("fa-solid");
        btn.style.color = "#1DB954";

    }

    btn.addEventListener("click", () => {

        let songs = JSON.parse(
            localStorage.getItem("likedSongs") || "[]"
        );

        if (btn.classList.contains("fa-solid")) {

            if (!songs.includes(index)) {

                songs.push(index);

            }

        } else {

            songs = songs.filter(id => id !== index);

        }

        localStorage.setItem(
            "likedSongs",
            JSON.stringify(songs)
        );

    });

});

// ===========================================
// DOUBLE CLICK TO LIKE
// ===========================================

cards.forEach(card => {

    card.addEventListener("dblclick", () => {

        const heart = card.querySelector(".fa-heart");

        if (heart) {

            heart.click();

        }

    });

});

// ===========================================
// KEYBOARD SHORTCUTS
// Space = Play / Pause
// ===========================================

document.addEventListener("keydown", e => {

    if (
        e.code === "Space" &&
        document.activeElement.tagName !== "INPUT"
    ) {

        e.preventDefault();

        playBtn.click();

    }

});

// ===========================================
// CARD CLICK EFFECT
// ===========================================

cards.forEach(card => {

    card.addEventListener("click", () => {

        card.animate(

            [
                {
                    transform: "scale(1)"
                },
                {
                    transform: "scale(.98)"
                },
                {
                    transform: "scale(1)"
                }

            ],

            {
                duration: 250
            }

        );

    });

});

// ===========================================
// SMOOTH SCROLL TO TOP
// ===========================================

document.querySelector(".logo")?.addEventListener("click", e => {

    e.preventDefault();

    document.querySelector(".main-content")
        ?.scrollTo({

            top: 0,

            behavior: "smooth"

        });

});

// ===========================================
// PAGE FADE IN
// ===========================================

document.body.style.opacity = "0";

window.addEventListener("load", () => {

    document.body.style.transition = "opacity .6s ease";

    document.body.style.opacity = "1";

});

// ===========================================
// CONSOLE MESSAGE
// ===========================================

console.log("%cSpotify Clone", "color:#1DB954;font-size:24px;font-weight:bold;");
console.log("%cDeveloped by Saurabh Raj", "color:white;font-size:14px;");
console.log("%cHTML • CSS • JavaScript", "color:#b3b3b3;font-size:13px;");

// ===========================================
// INITIALIZE PLAYER
// ===========================================

updateProgress();