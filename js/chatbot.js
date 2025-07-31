document.addEventListener("DOMContentLoaded", () => {
    const chatBody = document.getElementById("chatBody");
    const userInput = document.getElementById("userInput");
    const sendButton = document.getElementById("sendButton");

    // Dictionary of responses for Las Vegas Garden Hotel
    const responses = {
        // Greetings
        "hello|hi|hey": "Hi there! Welcome to Las Vegas Garden Hotel in Kampala. How can I assist you today?",
        "good morning|good afternoon|good evening": "Greetings! Thanks for reaching out. What's on your mind?",
        
        // Hotel Information
        "about hotel|tell me about the hotel": "Las Vegas Garden Hotel is a premier destination in Kampala, offering comfortable rooms, exquisite dining, and excellent service. Located in the heart of the city, we're perfect for business or leisure!",
        "location|where is the hotel": "We're located at Plot 12, Nakasero Road, Kampala, Uganda. Easy to find, right in the city center!",
        "contact|phone number|email": "You can reach us at +256 123 456 789 or email us at info@lasvegasgardenhotel.com.",
        
        // Rooms and Booking
        "rooms|room types": "We offer Standard Rooms, Deluxe Rooms, and Executive Suites. All come with Wi-Fi, AC, and breakfast. Want to know about pricing or availability?",
        "book|booking|reserve": "To book a room, please visit our website at lasvegasgardenhotel.com or call +256 123 456 789. I can also answer questions about room types!",
        "room price|cost of rooms|pricing": "Standard Rooms start at $80/night, Deluxe at $120/night, and Suites at $200/night. Prices may vary based on season. Want to check availability?",
        "check in|check out": "Check-in is at 2:00 PM, and check-out is at 11:00 AM. Early check-in or late check-out can be arranged, subject to availability.",
        "cancel booking|cancellation": "Cancellations are free up to 48 hours before arrival. Please contact us at +256 123 456 789 or info@lasvegasgardenhotel.com for assistance.",
        
        // Amenities
        "amenities|facilities": "We offer free Wi-Fi, a swimming pool, gym, restaurant, bar, and conference rooms. Anything specific you'd like to know about?",
        "wifi|internet": "Free high-speed Wi-Fi is available throughout the hotel for all guests.",
        "parking": "We provide free on-site parking for all hotel guests.",
        "pool|swimming pool": "Our outdoor swimming pool is open from 7:00 AM to 7:00 PM. Towels are provided!",
        "gym|fitness": "Our gym is open 24/7 for guests, equipped with modern cardio and strength machines.",
        
        // Dining
        "restaurant|dining|food": "Our Garden Restaurant serves local and international cuisine from 6:00 AM to 10:00 PM. We also have a bar open until midnight!",
        "breakfast": "Complimentary breakfast is served daily from 6:30 AM to 10:00 AM, with continental and local options.",
        "room service": "Room service is available 24/7. Just call the front desk to place your order!",
        "menu|what food": "Our menu includes Ugandan dishes like matoke, international options like pasta, and vegetarian choices. Want me to suggest something?",
        
        // Events and Meetings
        "events|conference|meetings": "We have conference rooms for up to 100 guests, perfect for meetings or events. Contact us for bookings or details!",
        "wedding|party": "We host weddings and parties with customizable packages. Reach out to our events team at +256 123 456 789 for planning.",
        
        // Local Area
        "kampala|things to do": "Kampala offers great spots like the Uganda Museum, Namugongo Martyrs Shrine, and bustling markets. Want recommendations for nearby attractions?",
        "transport|taxi": "We can arrange airport transfers or local taxis for you. Just let the front desk know!",
        
        // Policies
        "pets|pet policy": "Sorry, pets are not allowed at Las Vegas Garden Hotel, except for service animals.",
        "smoking": "We are a non-smoking hotel, but there’s a designated smoking area outside.",
        
        // Miscellaneous
        "staff|customer service": "Our staff is available 24/7 to ensure your stay is perfect. Need to speak to someone now? Call +256 123 456 789.",
        "feedback|complaint": "We’d love to hear your feedback! Please email info@lasvegasgardenhotel.com or speak to our front desk.",
        "hours|opening hours": "Our front desk is open 24/7, and most facilities like the restaurant and bar have specific hours. Want details on any service?",
        
        // Fallback
        "default": "I'm not sure about that one! Could you rephrase or ask about rooms, dining, or hotel services? I'm here to help!"
    };

    // Function to add a message to the chat
    function addMessage(message, className) {
        const messageDiv = document.createElement("div");
        messageDiv.className = className;
        messageDiv.textContent = message;
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll to bottom
    }

    // Function to get bot response
    function getResponse(userMessage) {
        userMessage = userMessage.toLowerCase().trim();
        for (let key in responses) {
            if (key === "default") continue;
            const keywords = key.split("|");
            if (keywords.some(keyword => userMessage.includes(keyword))) {
                return responses[key];
            }
        }
        return responses["default"];
    }

    // Handle sending messages
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, "user-message");
            const response = getResponse(message);
            setTimeout(() => addMessage(response, "bot-message"), 500); // Simulate typing delay
            userInput.value = "";
        }
    }

    // Event listeners
    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });
});
