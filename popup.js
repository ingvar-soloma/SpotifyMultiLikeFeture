document.addEventListener("DOMContentLoaded", function() {
    const likeButton = document.getElementById("likeButton");
    const message = document.getElementById("message");
    const counterContainer = document.getElementsByClassName("counter-container")[0];

    likeButton.addEventListener("click", function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.executeScript(tabs[0].id, { file: "content.js" });
        });
    });

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const tab = tabs[0];
        const body = document.body;

        if (tab && tab.url.includes("spotify.com")) {
            body.classList.remove("disabled");
            message.style.display = "none";
            counterContainer.style.display = "flex";

            chrome.tabs.sendMessage(tab.id, { action: "getElements" }, function(response) {
                const { likeButtons, dislikeButtons} = response;
                likeCounter.innerText = likeButtons.length;
                dislikeCounter.innerText = dislikeButtons.length;
            });

        } else {
            body.classList.add("disabled");
            likeButton.disabled = true;
            message.style.display = "block";
            counterContainer.style.display = "none";
        }
    });
});