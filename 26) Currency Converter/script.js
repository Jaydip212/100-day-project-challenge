const apikey = "14b1acef281d5cdb3766c73f"; // ExchangeRate-API / OPEN Exchange rates API key
const apiUrl = `https://v6.exchangerate-api.com/v6/${apikey}/latest/USD`;

async function fetchCurrencies() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const currencyOptions = Object.keys(data.conversion_rates);

        const fromCurrency = document.getElementById("from-Currency");
        const toCurrency = document.getElementById("to-Currency");

        currencyOptions.forEach((currency) => {
            let option1 = document.createElement("option");
            option1.value = currency;
            option1.text = currency;
            fromCurrency.appendChild(option1);

            let option2 = document.createElement("option");
            option2.value = currency;
            option2.text = currency;
            toCurrency.appendChild(option2);
    });

    fromCurrency.value ="USD";
    toCurrency.value = "INR";
} catch (error) {
        alert("Failed to fetch currencies. check API key!");
}
}
async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("from-currency").value;
    const toCurrency = document.getElementById("to-currency").value;

    if (!amount || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    try {
        const response = await fetch (apiUrl);
        const data = await response.json();
        const rate = data.conversion_rates[toCurrency]  / data.conversion_rates [fromCurrency];
        const convertedAmount = (amount * rate).toFixed(2);

        document.getElementById("result").innerHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        alert("Error fectching exchange rates!");
        console.error("Fetch error:", error);
    }

}

// initialize currency options on page load 
fetchCurrencies();