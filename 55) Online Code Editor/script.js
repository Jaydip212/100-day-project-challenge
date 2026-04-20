// ✅ FINAL SCRIPT FOR OTP LOGIN FLOW (WITH MULTIPLE LANGUAGE TABS + FIXED LOGOUT)

// ==== AUTH TAB SWITCH ====
const loginTab = document.getElementById('login-tab');
const signupTab = document.getElementById('signup-tab');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

loginTab.addEventListener('click', () => {
  loginTab.classList.add('text-blue-500', 'border-blue-500');
  loginTab.classList.remove('border-gray-600');
  signupTab.classList.remove('text-blue-500', 'border-blue-500');
  signupTab.classList.add('border-gray-600');
  loginForm.classList.remove('hidden');
  signupForm.classList.add('hidden');
});

signupTab.addEventListener('click', () => {
  signupTab.classList.add('text-blue-500', 'border-blue-500');
  signupTab.classList.remove('border-gray-600');
  loginTab.classList.remove('text-blue-500', 'border-blue-500');
  loginTab.classList.add('border-gray-600');
  signupForm.classList.remove('hidden');
  loginForm.classList.add('hidden');
});

// ==== OTP LOGIN ====
const authContainer = document.getElementById('auth-container');
const editorContainer = document.getElementById('editor-container');
const sendOTPBtn = document.getElementById('send-otp-btn');
const otpSection = document.getElementById('otp-section');
const otpInput = document.getElementById('otp-input');
const userEmailSpan = document.getElementById('user-email');
const retryOTPBtn = document.getElementById('retry-otp-btn');
const logoutBtn = document.getElementById('logout-btn');
const loginEmailInput = document.querySelector('#login-form input[type="email"]');
const loginPasswordInput = document.querySelector('#login-form input[type="password"]');
const signupNameInput = document.querySelector('#signup-form input[type="text"]');
const signupEmailInput = document.querySelector('#signup-form input[type="email"]');
const signupPhoneInput = document.querySelector('#signup-form input[type="tel"]');
const signupPasswordInput = document.querySelector('#signup-form input[type="password"]');

let generatedOTP = null;

sendOTPBtn.addEventListener('click', () => {
  const emailValue = loginEmailInput.value.trim();
  const passwordValue = loginPasswordInput.value.trim();

  if (!emailValue || !passwordValue) {
    showToast('Please enter both email and password');
    return;
  }

  generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
  console.log('Generated OTP:', generatedOTP);
  showToast(`OTP sent: ${generatedOTP}`);

  otpSection.classList.remove('hidden');
  otpInput.value = '';
  otpInput.focus();
  sendOTPBtn.disabled = true;
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const enteredOTP = otpInput.value.trim();

  if (enteredOTP === generatedOTP) {
    showToast('Login successful');
    authContainer.classList.add('hidden');
    editorContainer.classList.remove('hidden');
    const emailValue = loginEmailInput.value.trim();
    userEmailSpan.textContent = emailValue;
  } else {
    showToast('Invalid OTP');
  }
});

retryOTPBtn.addEventListener('click', () => {
  generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
  console.log('Resent OTP:', generatedOTP);
  showToast(`OTP resent: ${generatedOTP}`);
  otpInput.value = '';
  otpInput.focus();
  sendOTPBtn.disabled = false;
});

logoutBtn.addEventListener('click', () => {
  showToast('Logged out');
  editorContainer.classList.add('hidden');
  authContainer.classList.remove('hidden');
  otpSection.classList.add('hidden');
  sendOTPBtn.disabled = false;
  loginForm.reset();
  otpInput.value = '';
  userEmailSpan.textContent = '';
});

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// ==== MULTI-LANGUAGE CODE EDITOR ====
const editor = document.getElementById('code-editor');
const preview = document.getElementById('preview-frame');
const languageTabs = document.querySelectorAll('.language-tab');

let currentLanguage = 'html';
const code = {
  html: '<!-- Write your HTML here -->',
  css: '/* Write your CSS here */',
  js: '// Write your JavaScript here',
  python: '# Write your Python code here\nprint("Hello, World!")',
  java: '// Write your Java code here\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}',
  cpp: '// Write your C++ code here\n#include <iostream>\nint main() {\n  std::cout << "Hello, World!" << std::endl;\n  return 0;\n}',
  c: '// Write your C code here\n#include <stdio.h>\nint main() {\n  printf("Hello, World!\\n");\n  return 0;\n}',
  php: '<?php\n// Write your PHP code here\necho "Hello, World!";\n?>',
  ruby: '# Write your Ruby code here\nputs "Hello, World!"',
  swift: '// Write your Swift code here\nprint("Hello, World!")',
  kotlin: '// Write your Kotlin code here\nfun main() {\n  println("Hello, World!")\n}',
  go: '// Write your Go code here\npackage main\n\nimport "fmt"\n\nfunc main() {\n  fmt.Println("Hello, World!")\n}',
  rust: '// Write your Rust code here\nfn main() {\n  println!("Hello, World!");\n}',
  typescript: '// Write your TypeScript code here\nconsole.log("Hello, World!");'
};

editor.value = code[currentLanguage];

languageTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    code[currentLanguage] = editor.value;
    languageTabs.forEach(t => t.classList.remove('bg-blue-600'));
    tab.classList.add('bg-blue-600');
    currentLanguage = tab.dataset.language;
    editor.value = code[currentLanguage];
    updatePreview();
  });
});

editor.addEventListener('input', () => {
  code[currentLanguage] = editor.value;
  updatePreview();
});

function updatePreview() {
  if (['html', 'css', 'js'].includes(currentLanguage)) {
    const combinedCode = `
      <html>
        <head><style>${code.css}</style></head>
        <body>
          ${code.html}
          <script>${code.js}<\/script>
        </body>
      </html>`;
    const previewDoc = preview.contentDocument;
    previewDoc.open();
    previewDoc.write(combinedCode);
    previewDoc.close();
  } else {
    const previewDoc = preview.contentDocument;
    previewDoc.open();
    previewDoc.write(`<pre style="padding:20px;white-space:pre-wrap;font-family:monospace;">${code[currentLanguage]}</pre>`);
    previewDoc.close();
  }
}

// Handle signup form submission
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = signupNameInput.value.trim();
  const email = signupEmailInput.value.trim();
  const phone = signupPhoneInput.value.trim();
  const password = signupPasswordInput.value.trim();

  if (!name || !email || !phone || !password) {
    showToast('Please fill in all fields');
    return;
  }

  // Validate email format
  if (!isValidEmail(email)) {
    showToast('Please enter a valid email address');
    return;
  }

  // Validate phone number format
  if (!isValidPhone(phone)) {
    showToast('Please enter a valid phone number');
    return;
  }

  // Validate password strength
  if (!isValidPassword(password)) {
    showToast('Password must be at least 8 characters long and contain a number');
    return;
  }

  // Simulate successful signup
  showToast('Signup successful! Please login.');
  
  // Switch to login tab
  loginTab.click();
  
  // Clear signup form
  signupForm.reset();
});

// Helper functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  return phoneRegex.test(phone);
}

function isValidPassword(password) {
  return password.length >= 8 && /\d/.test(password);
}
