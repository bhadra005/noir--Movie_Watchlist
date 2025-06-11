import { getAuth, onAuthStateChanged, updatePassword, deleteUser, signOut } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";
import { auth } from './fireBase.js'; 

const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('change', () => {
  document.body.classList.toggle('light-theme', themeToggle.checked);
  localStorage.setItem('theme', themeToggle.checked ? 'dark' : 'light');
});


if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-theme');
  themeToggle.checked = false;
}
else { 
  document.body.classList.add('dark-theme'); 
  themeToggle.checked = true; 
}

document.getElementById('save-preferences').addEventListener('click', () => {
  const lang = document.getElementById('language').value;
  localStorage.setItem('language', lang);
  alert('Preferences saved.');
});


onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById('account-section').style.display = 'block';

    document.getElementById('change-password').addEventListener('click', async () => {
      const newPass = prompt("Enter new password:");
      if (newPass) {
        try {
          await updatePassword(user, newPass);
          alert("Password updated!");
        } catch (err) {
          alert("Failed to update password: " + err.message);
        }
      }
    });

    document.getElementById('delete-account').addEventListener('click', async () => {
      const confirmDelete = confirm("Are you sure you want to delete your account?");
      if (confirmDelete) {
        try {
          await deleteUser(user);
          alert("Account deleted.");
          window.location.href = "login.html";
        } catch (err) {
          alert("Failed to delete account: " + err.message);
        }
      }
    });

    document.getElementById('logout').addEventListener('click', async () => {
      await signOut(auth);
      alert("Logged out.");
      window.location.reload();
    });
  }
});
