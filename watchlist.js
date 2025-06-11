import { getAllWatchlists, createWatchlist, deleteWatchlist } from './fireStore.js';
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";

const auth = getAuth();

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    await loadWatchlists();
});

document.querySelector('button').addEventListener('click', async () => {
    const input = document.getElementById("newWatchlistName");
    const name = input.value.trim();
    if (!name) return alert("Enter a watchlist name");

    await createWatchlist(name);
    input.value = "";
    await loadWatchlists();
});

async function loadWatchlists() {
    const lists = await getAllWatchlists();
    const container = document.getElementById("watchlistsContainer");

    if (lists.length === 0) {
        container.innerHTML = "<p>No watchlists found.</p>";
        return;
    }

    container.innerHTML = lists.map(name => `
        <div class="watchlist-entry">
            <a href="watchlistDetails.html?playlist=${encodeURIComponent(name)}">${name}</a>
            <button class="delete-watchlist" data-watchlist-name="${name}">Delete</button>
        </div>
    `).join("");

    document.querySelectorAll('.delete-watchlist').forEach(button => {
        button.addEventListener('click', async (event) => {
            const watchlistName = event.target.dataset.watchlistName;
            if (confirm(`Are you sure you want to delete the watchlist "${watchlistName}"?`)) {
                try {
                    await deleteWatchlist(watchlistName);
                    // Reload the watchlist list after deletion
                    loadWatchlists();
                } catch (error) {
                    alert("Failed to delete watchlist.");
                    console.error("Error deleting watchlist:", error);
                }
            }
        });
    });
}