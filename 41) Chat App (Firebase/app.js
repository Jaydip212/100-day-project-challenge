// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBvxAZnVOUiXXEHVSAOAMQJoNKHXpZAQlQ",
    authDomain: "chat-app-firebase-b2d6f.firebaseapp.com",
    databaseURL: "https://chat-app-firebase-b2d6f.firebaseio.com",
    projectId: "chat-app-firebase-b2d6f",
    storageBucket: "chat-app-firebase-b2d6f.appspot.com",
    messagingSenderId: "1033574781599",
    appId: "1:1033574781599:web:3d0a5d3d2d2d2d2d2d2d2d"
};

// Initialize Firebase and handle initialization errors
try {
    firebase.initializeApp(firebaseConfig);
} catch (error) {
    console.error("Firebase initialization error:", error);
    document.getElementById('error-message').textContent = "Failed to connect to chat server";
}

const database = firebase.database();
const errorMessageDiv = document.getElementById('error-message');

// Test database connection
database.ref('.info/connected').on('value', (snap) => {
    if (snap.val() === true) {
        console.log('Connected to Firebase');
        errorMessageDiv.textContent = '';
    } else {
        console.log('Disconnected from Firebase');
        errorMessageDiv.textContent = 'Connecting to chat server...';
    }
}, (error) => {
    console.error('Database connection error:', error);
    errorMessageDiv.textContent = 'Error connecting to chat server';
});

// DOM Elements
const loginContainer = document.getElementById('login-container');
const chatBox = document.getElementById('chat-box');
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const usernameInput = document.getElementById('username-input');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userNameDisplay = document.getElementById('user-name');

let currentUser = null;

// Login functionality
loginBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username) {
        currentUser = username;
        userNameDisplay.textContent = username;
        loginContainer.classList.add('hidden');
        chatBox.classList.remove('hidden');
        logoutBtn.classList.remove('hidden');
        errorMessageDiv.textContent = '';
        
        // Add user join message to chat
        const joinMessage = {
            username: 'System',
            message: `${username} joined the chat`,
            timestamp: Date.now(),
            type: 'system'
        };
        
        database.ref('messages').push(joinMessage)
            .catch(error => {
                console.error('Error sending join message:', error);
                errorMessageDiv.textContent = 'Error sending message';
            });
    }
});

// Logout functionality
logoutBtn.addEventListener('click', () => {
    if (currentUser) {
        const leaveMessage = {
            username: 'System',
            message: `${currentUser} left the chat`,
            timestamp: Date.now(),
            type: 'system'
        };
        
        database.ref('messages').push(leaveMessage)
            .then(() => {
                currentUser = null;
                userNameDisplay.textContent = 'Not logged in';
                loginContainer.classList.remove('hidden');
                chatBox.classList.add('hidden');
                logoutBtn.classList.add('hidden');
                usernameInput.value = '';
                errorMessageDiv.textContent = '';
            })
            .catch(error => {
                console.error('Error sending leave message:', error);
                errorMessageDiv.textContent = 'Error during logout';
            });
    }
});

// Send message functionality
function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText && currentUser) {
        const message = {
            username: currentUser,
            message: messageText,
            timestamp: Date.now()
        };
        
        database.ref('messages').push(message)
            .then(() => {
                messageInput.value = '';
                errorMessageDiv.textContent = '';
            })
            .catch(error => {
                console.error('Error sending message:', error);
                errorMessageDiv.textContent = 'Error sending message';
            });
    }
}

sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Listen for new messages
database.ref('messages').on('child_added', (snapshot) => {
    try {
        const message = snapshot.val();
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        
        if (message.type === 'system') {
            messageElement.style.backgroundColor = '#f0f0f0';
            messageElement.style.color = '#666';
            messageElement.style.textAlign = 'center';
            messageElement.style.fontStyle = 'italic';
            messageElement.textContent = message.message;
        } else {
            const usernameElement = document.createElement('div');
            usernameElement.classList.add('username');
            usernameElement.textContent = message.username;
            
            messageElement.appendChild(usernameElement);
            messageElement.classList.add(message.username === currentUser ? 'sent' : 'received');
            
            const messageTextElement = document.createElement('div');
            messageTextElement.textContent = message.message;
            messageElement.appendChild(messageTextElement);
        }
        
        messagesDiv.appendChild(messageElement);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    } catch (error) {
        console.error('Error displaying message:', error);
    }
}, (error) => {
    console.error('Error loading messages:', error);
    errorMessageDiv.textContent = 'Error loading messages';
});
