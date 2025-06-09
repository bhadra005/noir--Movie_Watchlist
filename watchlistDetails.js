import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";
import { collection, getDocs, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";
import { db } from "./fireBase.js";

const auth = getAuth();

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const urlParams = new URLSearchParams(window.location.search);
        const playlistName = urlParams.get("playlist");

        if (!playlistName) {
            document.getElementById("watchlist-container").innerHTML = "<p> No Watchlist selected. </p>";
            return;
        }

        const watchlistRef = collection(db,"users",user.uid, "watchlists", playlistName, "movies");

        try {
            const querySnapshot = await getDocs(watchlistRef);
            if (querySnapshot.empty) {
                document.getElementById("watchlist-container").innerHTML = `<p> No movies found in '${playlistName}'.</p>`;
                return;
            }
            let movieHTML = "";
            querySnapshot.forEach((docSnap) => {
                const movie = docSnap.data();
                movieHTML += `
                    <div class="movie-card">
                        <img src="${movie.poster}" alt="${movie.title}" />
                        <h3>${movie.title}</h3>
                        <button onclick="removeMovie('${playlistName}', '${docSnap.id}')">Remove</button>
                    </div>
                `;
            });

            document.getElementById("watchlist-container").innerHTML = movieHTML;
        }
        catch (error) {
            console.error("Error getting watchlist:", error);
            document.getElementById("watchlist-container").innerHTML = "<p> Error loading watchlist. </p>";
        }
    }
    else{
        window.location.href = "login.html";
    }
});

window.removeMovie = async function (playlistName, docId) {
    const user = auth.currentUser;
    if (!user) return;

    const movieRef = doc(db, "users", user.uid, "watchlists", playlistName, "movies", docId);
    try {
        await deleteDoc(movieRef);
        alert("Movie removed.");
        window.location.reload();
    } catch (err) {
        console.error("Failed to delete:", err);
        alert("Could not delete movie. Try again.");
    }
} 