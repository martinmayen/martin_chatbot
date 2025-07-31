const chatbotContainer = document.getElementById("chatbot-container");
const chatLauncher = document.getElementById("chat-launcher");
const closeChat = document.getElementById("close-chat");

// 🫧 Toggle open/close
chatLauncher.onclick = () => chatbotContainer.classList.remove("hidden");
closeChat.onclick = () => chatbotContainer.classList.add("hidden");

const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatArea = document.getElementById("chat-area");
const toggleDark = document.getElementById("toggle-dark");
const typingIndicator = document.getElementById("typing-indicator");
const quickReplies = document.getElementById("quick-replies");

// Responses
const responses = [
  { keywords: ["hello", "hi", "hey"], reply: "Hello there! Welcome to Martin Hotel. 😊" },
  { keywords: ["room", "rooms"], reply: "We offer single, double, and deluxe rooms." },
  { keywords: ["price", "cost"], reply: "Prices start at UGX 80,000 per night." },
  { keywords: ["food", "restaurant"], reply: "We serve Ugandan & continental meals from 7am–10pm." },
  { keywords: ["wifi"], reply: "Yes! Free Wi-Fi is available in all rooms." },
  { keywords: ["pool", "gym", "spa"], reply: "Yes, we have a pool, spa, and gym. Open daily." },
  { keywords: ["book", "booking"], reply: "You can book directly or call us on +256 123 456 789." },
  { keywords: ["bye", "goodbye"], reply: "Goodbye! Hope to see you soon. 👋" },
  { keywords: ["joke", "bored"], reply: "Why did the guest bring a ladder to the hotel? Because the rooms were on another level! 😂" },
  { keywords: ["name", "who are you"], reply: "I’m MartinBot, your virtual hotel assistant." },
  { keywords: ["thanks", "thank you"], reply: "You're welcome! 😊" },
];
const fallback = "Hmm, I’m not sure. Please try asking something else.";

// Submit chat
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = input.value.trim();
  if (!msg) return;
  addMessage("user", msg);
  saveMessage("user", msg);
  input.value = "";
  showTyping();
  setTimeout(() => {
    const reply = getReply(msg);
    addMessage("bot", reply);
    saveMessage("bot", reply);
    hideTyping();
  }, 800);
});

// Add message
function addMessage(sender, text) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;
  div.appendChild(bubble);
  chatArea.appendChild(div);
  chatArea.scrollTop = chatArea.scrollHeight;
}

// Get reply
function getReply(text) {
  text = text.toLowerCase();

  if (["home", "reset", "menu"].includes(text)) {
    clearChat();
    setTimeout(() => {
      addMessage("bot", "🏨 Welcome back to the main menu! How can I help you today?");
      showQuickReplies(); // Reset quick replies
    }, 300);
    return "";
  }

  for (let r of responses) {
    if (r.keywords.some((kw) => text.includes(kw))) return r.reply;
  }

  return fallback;
}

function clearChat() {
  chatArea.innerHTML = "";
  localStorage.removeItem("chat");
}

// Typing indicator
function showTyping() {
  typingIndicator.classList.remove("hidden");
}
function hideTyping() {
  typingIndicator.classList.add("hidden");
}

// Save messages
function saveMessage(sender, text) {
  const messages = JSON.parse(localStorage.getItem("chat")) || [];
  messages.push({ sender, text });
  localStorage.setItem("chat", JSON.stringify(messages));
}

// Load history
window.addEventListener("load", () => {
  const messages = JSON.parse(localStorage.getItem("chat")) || [];
  for (let msg of messages) {
    addMessage(msg.sender, msg.text);
  }
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
  }
});

// Toggle dark
toggleDark.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
});

// Quick replies
const sampleQuickReplies = [
  "What rooms do you have?",
  "Do you have Wi-Fi?",
  "How much does it cost?",
  "Can I book?",
  "Tell me a joke"
];
sampleQuickReplies.forEach(text => {
  const btn = document.createElement("button");
  btn.textContent = text;
  btn.onclick = () => {
    input.value = text;
    form.dispatchEvent(new Event("submit"));
  };
  quickReplies.appendChild(btn);
});
