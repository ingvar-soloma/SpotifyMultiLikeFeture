function main() {
    const playlistContainer = document.querySelector('[data-testid="playlist-tracklist"]');
    let likedCount = 0;
    let likeButtons = document.querySelectorAll('[data-testid="add-button"][aria-checked="false"][tabindex="-1"]');

    async function likeAllSongs(likeButtons) {
        for (let index = 0; index < likeButtons.length; index++) {
            likeButtons[index].click();
            likedCount++;

            // Generate random delay between 200 and 500 milliseconds
            const delay = Math.floor(Math.random() * (500 - 200 + 1)) + 200;
            await new Promise(resolve => setTimeout(resolve, delay));

            const nextSong = likeButtons[index + 1];
            if (nextSong) {
                playlistContainer.scrollTo({
                    top: nextSong.offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    }

    async function container() {
        while (true) {
            if (likeButtons.length === 0) {
                console.log('Finished with ' + likedCount + ' songs liked');
                break;
            }

            await likeAllSongs(likeButtons);
            playlistContainer.scrollTo({
                top: playlistContainer.scrollHeight,
                behavior: 'smooth'
            });
            likeButtons = document.querySelectorAll('[data-testid="add-button"][aria-checked="false"][tabindex="-1"]');
        }
    }

    container();
}

main();