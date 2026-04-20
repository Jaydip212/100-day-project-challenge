const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');

function addMessage(message, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(userMessage) {
    userMessage = userMessage.toLowerCase();

    // Simple NLP with keyword matching
    const responses = {
        'hello': 'Hello! How can I help you today?',
        'hi': 'Hello! How can I help you today?',
        'how are you': "I'm just a chatbot, but thanks for asking!",
        'thank you': "You're welcome!",
        'bye': 'Goodbye! Have a great day!',
        'weather': "I'm sorry, I don't have access to real-time weather data.",
        'name': "I'm an AI chatbot. Created By jaydip!"
    };

    for (const [keyword, response] of Object.entries(responses)) {
        if (userMessage.includes(keyword)) {
            return response;
        }
    }
    return 'I didn\'t understand that. Could you please rephrase?';
}

function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    addMessage(message, true);
    userInput.value = '';

    setTimeout(() => {
        const botResponse = getBotResponse(message);
        addMessage(botResponse, false);
    }, 1000);
}

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Initial bot message
addMessage('Hello! How can I help you today?', false);