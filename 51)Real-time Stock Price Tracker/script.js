document.getElementById("fetchStock").addEventListener("click", async function() {
    let stockSymbol = document.getElementById("stockSymbol").value.toUpperCase();
    if (!stockSymbol) {
        alert("Please enter a stock symbol!");
        return;
    }

    let apiKey = "YOUR_API_KEY";  // Replace with your API key
    let apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${apiKey}`;

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        let stockData = data["Global Quote"];

        if (!stockData) {
            alert("Invalid Stock Symbol!");
            return;
        }

        document.getElementById("companyName").textContent = stockSymbol;
        document.getElementById("stockPrice").textContent = `$${stockData["05. price"]}`;
        document.getElementById("stockChange").textContent = `${stockData["09. change"]} (${stockData["10. change percent"]})`;
        document.getElementById("lastUpdated").textContent = new Date().toLocaleTimeString();
    } catch (error) {
        console.error("Error fetching stock data:", error);
        alert("Failed to fetch stock data!");
    }
});