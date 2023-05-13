document.addEventListener("DOMContentLoaded", function () {
    const likeButton = document.getElementById("likeButton");
    const message = document.getElementById("message");
    const spotifySection = document.getElementById("spotify-section");
    const songsListContainer = document.getElementById("songsListContainer");

    const dislikeCounter = document.getElementById("dislikeCounter");
    const likeCounter = document.getElementById("likeCounter");

    // const sectionHeading = document.querySelector(".section-heading");
    // const songSection = document.querySelector(".song-section");


    // sectionHeading.addEventListener("click", function () {
    //     songSection.classList.toggle("hidden");
    // });

    likeButton.addEventListener("click", function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.executeScript(tabs[0].id, { file: "content.js" });
        });
    });


    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const tab = tabs[0];
        const body = document.body;

        if (tab && tab.url.includes("spotify.com")) {
            body.classList.remove("disabled");
            message.style.display = "none";
            spotifySection.style.display = "block";

            chrome.tabs.executeScript(tab.id, { file: "counters.js" }, function () {
                chrome.tabs.sendMessage(tab.id, { action: "getElements" }, function (response) {
                    const { likeButtons, dislikeButtons, songsWithoutLikeList } = response;
                    console.log(likeButtons, dislikeButtons, songsWithoutLikeList);
                    likeCounter.innerText = likeButtons;
                    dislikeCounter.innerText = dislikeButtons;
                    fillSongsWithoutLikeList(songsWithoutLikeList);
                });
            });

        } else {
            body.classList.add("disabled");
            likeButton.disabled = true;
            message.style.display = "block";
            spotifySection.style.display = "none";
        }
    });

    function fillSongsWithoutLikeList(songsWithoutLikeList) {
        songsListContainer.innerHTML = ""; // Clear the existing content

        // Iterate over the songsWithoutLikeList and create list items
        songsWithoutLikeList.forEach(song => {
            const listItem = document.createElement("li");
            listItem.textContent = `${song.id}: ${song.name}`;
            songsListContainer.appendChild(listItem);
        });
    }

    function updateUI() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const tab = tabs[0];

            if (tab && tab.url.includes("spotify.com")) {
                chrome.tabs.executeScript(tab.id, { file: "counters.js" }, function () {
                    chrome.tabs.sendMessage(tab.id, { action: "getElements" }, function (response) {
                        const { likeButtons, dislikeButtons, songsWithoutLikeList } = response;
                        console.log(likeButtons, dislikeButtons, songsWithoutLikeList);
                        likeCounter.innerText = likeButtons;
                        dislikeCounter.innerText = dislikeButtons;
                        fillSongsWithoutLikeList(songsWithoutLikeList);
                    });
                });
            }
        });
    }

    // Initial update
    updateUI();

    // Auto-update every 5 seconds (adjust as needed)
    setInterval(updateUI, 1000);

});
