document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirmPassword");
    let isValid = true;

    function showError(input, message) {
        let errorElement = input.nextElementSibling;
        errorElement.innerText = message;
        errorElement.style.display = "block";
        input.style.border = "2px solid red";
    }

    function clearError(input) {
        let errorElement = input.nextElementSibling;
        errorElement.innerText = "";
        errorElement.style.display = "none";
        input.style.border = "2px solid green";
    }

    // Name validation (should not be empty)
    if (name.value.trim() === "") {
        showError(name, "Name is required!");
        isValid = false;
    } else {
        clearError(name);
    }

    // Email validation (valid email format)
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email.value)) {
        showError(email, "Enter a valid email address!");
        isValid = false;
    } else {
        clearError(email);
    }

    // Password validation (minimum 6 characters)
    if (password.value.length < 6) {
        showError(password, "Password must be at least 6 characters!");
        isValid = false;
    } else {
        clearError(password);
    }

    // Confirm password validation (should match password)
    if (confirmPassword.value !== password.value || confirmPassword.value === "") {
        showError(confirmPassword, "Passwords do not match!");
        isValid = false;
    } else {
        clearError(confirmPassword);
    }

    // If all validations pass, show success message
    if (isValid) {
        alert("Registration Successful!");
    }
});