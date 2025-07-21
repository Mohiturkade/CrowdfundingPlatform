import { auth } from '../firebase/firebase-config.js';
import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

function showMessage(message, type = 'success') {
  const box = document.getElementById("messageBox");
  box.textContent = message;
  box.className = `message ${type}`;
  box.style.display = "block";
}

window.registerUser = async function () {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    showMessage("Registration successful!", "success");

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1500);
  } catch (err) {
    showMessage("Error: " + err.message, "error");
  }
};

document.getElementById("registerBtn").addEventListener("click", registerUser);




