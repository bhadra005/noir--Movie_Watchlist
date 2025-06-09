import {signIn, signUp} from "./auth.js";

document.addEventListener("DOMContentLoaded", ()=> {

    const loginForm = document.querySelector(".log_in");
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = loginForm.querySelector("#mail").value;
        const password = loginForm.querySelector("#password").value;

        try {
            await signIn(email, password);
            alert("Login succesful!");
            window.location.href = "index.html";
        }
        catch (err) {
            console.error("Login error", err.message);
            alert("Login failed: "+ err.message);
        }
    });

    const signUpForm = document.querySelector(".sign_up");
    signUpForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = signUpForm.querySelector("#s_mail").value;
        const s_password = signUpForm.querySelector("#s_password").value;
        const s_password2 = signUpForm.querySelector("#s_password2").value;

        if (s_password !== s_password2) {
            alert("Password doesn't match");
            return;
        }
        try {
            await signUp(email, s_password);
            alert("Account Created.");
            ShowLogin();
        }
        catch (err) {
            console.error("Signup error: ", err.message);
            alert("Signup failed: "+err.message);
        }
    });
});