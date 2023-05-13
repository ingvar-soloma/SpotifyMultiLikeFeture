chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "getElements") {
        const likeButtons = document.querySelectorAll('[data-testid="add-button"][aria-checked="true"][tabindex="-1"]');
        const dislikeButtons = document.querySelectorAll('[data-testid="add-button"][aria-checked="false"][tabindex="-1"]');
        sendResponse({ likeButtons: Array.from(likeButtons).length, dislikeButtons: Array.from(dislikeButtons).length });
    }
});
