function generatePassword() {
    const length = document.getElementById("length").value;
    const includeNumbers = document.getElementById("includeNumbers").checked;
    const includeSymbols = document.getElementById("includeSymbols").checked;
    const includeUppercase = document.getElementById("includeUppercase").checked;
    
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    
    let allChars = lowercaseChars;
    if (includeNumbers) allChars += numberChars;
    if (includeSymbols) allChars += symbolChars;
    if (includeUppercase) allChars += uppercaseChars;
    
    let password = "";
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }
    
    document.getElementById("password").value = password;
}

function copyPassword() {
    let passwordField = document.getElementById("password");
    passwordField.select();
    document.execCommand("copy");
    alert("Password Copied!");
}

function updateLength() {
    document.getElementById("lengthValue").innerText = document.getElementById("length").value;
}