document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");
    let message = document.getElementById("message");

    emailError.textContent = "";
    passwordError.textContent = "";
    message.textContent = "";

    if (email === "") {
        emailError.textContent = "Email is required!";
    } else if (!email.includes("@") || !email.includes(".")) {
        emailError.textContent = "Enter a valid email!";
    }

    if (password === "") {
        passwordError.textContent = "Password is required!";
    } else if (password.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters!";
    }

    if (email !== "" && password !== "" && password.length >= 6 && email.includes("@")) {
        message.textContent = "Login Successful!";
        message.style.color = "green";
    }
});