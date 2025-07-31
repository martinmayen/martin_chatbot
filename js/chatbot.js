const chatBody = document.getElementById("chat-body");
const input = document.getElementById("user-input");
const darkToggle = document.getElementById("toggle-dark");

const responses = {
  hello: "Hi there! Welcome to Martin Hotel.",
  wifi: "Yes, we offer free WiFi to all guests.",
  price: "Our rooms start at UGX 80,000 per night.",
  breakfast: "Breakfast is included in all bookings.",
  location: "We’re located in Muyenga, Kampala.",
  thanks: "You're welcome!",
  reset: "Returning to main menu...",
  bye: "Goodbye! We hope to see you again.",
};

function sendMessage() {
  const msg = input.value.trim();
  if (!msg) return;
  appendMessage(msg, "user");
  input.value = "";
  showTyping();
  setTimeout(() => {
    const response = getResponse(msg);
    appendMessage(response, "bot");
    saveChat(msg, response);
  }, 800);
}

function toggleChatbot() {
  const chatbot = document.getElementById('chatbot-container');
  chatbot.style.display = chatbot.style.display === 'none' ? 'flex' : 'none';
}
function getResponse(input) {
  input = input.toLowerCase();
  for (let keyword in responses) {
    if (input.includes(keyword)) return responses[keyword];
  }
  return "Sorry, I didn’t understand that. Please try again.";
}

function appendMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.className = "chat-message " + (sender === "user" ? "user-message" : "bot-message");
  msgDiv.innerText = text;
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function showTyping() {
  const dots = document.createElement("div");
  dots.className = "chat-message bot-message";
  dots.innerHTML = `<span class="typing-dots"></span><span class="typing-dots"></span><span class="typing-dots"></span>`;
  chatBody.appendChild(dots);
  chatBody.scrollTop = chatBody.scrollHeight;
  setTimeout(() => dots.remove(), 700);
}

function handleQuickReply(text) {
  input.value = text;
  sendMessage();
}

darkToggle.onclick = () => {
  document.body.classList.toggle("dark");
};

function saveChat(user, bot) {
  const history = JSON.parse(localStorage.getItem("chatHistory")) || [];
  history.push({ user, bot });
  localStorage.setItem("chatHistory", JSON.stringify(history));
}

window.onload = () => {
  const history = JSON.parse(localStorage.getItem("chatHistory")) || [];
  history.forEach(chat => {
    appendMessage(chat.user, "user");
    appendMessage(chat.bot, "bot");
  });
};
