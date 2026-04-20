function calculateBMI() {
    let weight = document.getElementById("weight").value;
    let height = document.getElementById("height").value;

    if (weight === "" || height === "") {
        alert("Please enter both weight and height!");
        return;
    }

    let bmi = (weight / (height * height)).toFixed(2);
    let result = document.getElementById("result");

    if (bmi < 18.5) {
        result.innerText = `BMI: ${bmi} - Underweight`;
        result.style.color = "yellow";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        result.innerText = `BMI: ${bmi} - Normal weight`;
        result.style.color = "green";
    } else if (bmi >= 25 && bmi < 29.9) {
        result.innerText = `BMI: ${bmi} - Overweight`;
        result.style.color = "orange";
    } else {
        result.innerText = `BMI: ${bmi} - Obese`;
        result.style.color = "red";
    }
}