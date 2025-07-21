import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, collection, addDoc, updateDoc, getDocs, getDoc, doc, query, where } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAbH8aVGZl-dIHdw2ZJueRbu4Too3t-DNA",
  authDomain: "kindraiser-7ee73.firebaseapp.com",
  projectId: "kindraiser-7ee73",
  storageBucket: "kindraiser-7ee73.appspot.com",
  messagingSenderId: "146191388840",
  appId: "1:146191388840:web:b47e0bbb6934045665329d",
  measurementId: "G-5LHFQYF0P5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const logoutBtn = document.getElementById("logoutBtn");
const openModalBtn = document.getElementById("openProjectModal");
const closeModalBtn = document.getElementById("closeProjectModal");
const projectModal = document.getElementById("projectModal");
const projectForm = document.getElementById("projectForm");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const goalInput = document.getElementById("goal");
const editIdInput = document.getElementById("editProjectId");
const createdContainer = document.getElementById("createdProjects");
const modalTitle = document.getElementById("modalTitle");

let currentUser;

onAuthStateChanged(auth, user => {
  if (user) {
    currentUser = user;
    userName.textContent = user.displayName || "User";
    userEmail.textContent = user.email;
    loadProjects();
  } else {
    window.location.href = "login.html";
  }
});

logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
});

openModalBtn.addEventListener("click", () => {
  projectModal.style.display = "flex";
  projectForm.reset();
  editIdInput.value = "";
  modalTitle.textContent = "Create Project";
});

closeModalBtn.addEventListener("click", () => {
  projectModal.style.display = "none";
});

projectForm.addEventListener("submit", async e => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const description = descInput.value.trim();
  const goal = parseInt(goalInput.value);

  if (!title || !description || isNaN(goal)) return;

  const data = {
    title,
    description,
    goal,
    userId: currentUser.uid,
    createdAt: Date.now()
  };

  if (editIdInput.value) {
    const ref = doc(db, "projects", editIdInput.value);
    await updateDoc(ref, data);
  } else {
    await addDoc(collection(db, "projects"), data);
  }

  projectModal.style.display = "none";
  projectForm.reset();
  editIdInput.value = "";
  loadProjects();
});

async function loadProjects() {
  createdContainer.innerHTML = "";
  const q = query(collection(db, "projects"), where("userId", "==", currentUser.uid));
  const snapshot = await getDocs(q);

  snapshot.forEach(docSnap => {
    const project = docSnap.data();
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h4>${project.title}</h4>
      <p>${project.description}</p>
      <p><strong>₹${project.goal}</strong></p>
      <button onclick="editProject('${docSnap.id}')">Edit</button>
    `;
    createdContainer.appendChild(card);
  });
}

window.editProject = async function (id) {
  const docRef = doc(db, "projects", id);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return;

  const data = snap.data();
  titleInput.value = data.title;
  descInput.value = data.description;
  goalInput.value = data.goal;
  editIdInput.value = id;
  modalTitle.textContent = "Edit Project";
  projectModal.style.display = "flex";
};




