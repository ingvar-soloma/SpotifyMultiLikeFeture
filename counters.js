chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "getElements") {
        const likeButtons = document.querySelectorAll('[data-testid="add-button"][aria-checked="true"][tabindex="-1"]');
        const dislikeButtons = document.querySelectorAll('[data-testid="add-button"][aria-checked="false"][tabindex="-1"]');
        const songsWithoutLikeList = Array.from(dislikeButtons).map(button => {
            const songElement = button.closest('[data-testid="tracklist-row"]');
            const songId = songElement.querySelector('[data-encore-id="type"]').textContent;
            const songNameElement = songElement.querySelector('.standalone-ellipsis-one-line');
            const songName = songNameElement ? songNameElement.textContent : '';
            return { id: songId, name: songName };
        });
        sendResponse({ likeButtons: likeButtons.length, dislikeButtons: dislikeButtons.length, songsWithoutLikeList });
    }
});

