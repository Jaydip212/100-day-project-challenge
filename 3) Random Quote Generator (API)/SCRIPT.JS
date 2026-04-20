async function fetchQuote() {
    try {
        let response = await fetch("https://api.quotable.io/random");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        let data = await response.json();
        document.getElementById("quote").innerHTML = `"${data.content}" <br> - <strong>${data.author}</strong>`;
    } catch (error) {
        document.getElementById("quote").innerText = "Failed to load quote. Please try again.";
        console.error("Error fetching quote:", error);
    }
}


fetchQuote();