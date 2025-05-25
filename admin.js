import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDr15b_aZBAgxBquT7hqQQe9HTjFr-Akdg",
  authDomain: "livechat-6ef78.firebaseapp.com",
  databaseURL: "https://livechat-6ef78-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "livechat-6ef78",
  storageBucket: "livechat-6ef78.appspot.com",
  messagingSenderId: "116999451226",
  appId: "1:116999451226:web:cefd2e6b93610384c49e63"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const chatRef = ref(db, "chat");

const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");

onChildAdded(chatRef, (data) => {
  const msg = data.val();
  const div = document.createElement("div");
  div.classList.add("message", msg.sender === "admin" ? "admin" : "user");
  div.textContent = msg.text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = messageInput.value;
  if (text.trim()) {
    push(chatRef, {
      sender: "admin",
      text: text
    });
    messageInput.value = "";
  }
});