import {auth, db} from './fireBase.js';
import{
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";

export async function createWatchlist(name) {
    const user = auth.currentUser;
    if(!user || !name.trim()) return;

    const ref = doc(db, "users", user.uid, "watchlists", name.trim());
    await setDoc(ref, {});
    console.log("Watchlist created:", name);
}

export async function addToWatchlist(name, movie) {
    const user = auth.currentUser;
    if (!user || !name.trim()) return;

    try {
        await addDoc(collection(db, "users", user.uid, "watchlists", name.trim(),"movies"), {
            id: movie.id,
            title: movie.title,
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            overview: movie.overview,
            release_date: movie.release_date,
            rating: movie.vote_average,
            timestamp: Date.now()
        });
        console.log(`Added to ${name}:`, movie.title);
    }
    catch(e) {
        console.error("Error adding movie:", e);
    }
}

export async function getAllWatchlists() {
    const user = auth.currentUser;
    if (!user) return [];

    const snapshot = await getDocs(collection(db, "users", user.uid, "watchlists"));
    return snapshot.docs.map(doc => doc.id);
}

export async function getWatchlist(name) {
    const user = auth.currentUser;
    if (!user || !name.trim()) return [];

    const snapshot = await getDocs(collection(db, "users", user.uid,"watchlists",name.trim(),"movies" ));
    return snapshot.docs.map(doc=> ({docId: doc.id, ...doc.data()}));
}

export async function removeFromWatchlist(name, docId) {
    const user = auth.currentUser;
    if (!user || !name.trim()) return;

    await deleteDoc(doc(db, "users", user.uid, "watchlists", name.trim(), "movies", docId));
    console.log("Movie removed from ", name);
}