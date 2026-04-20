async function searchWord() {
    const word = document.getElementById("word-input").value;
    const resultDiv = document.getElementById("result");

    if (!word) {
        alert("Please enter a word!");
        return;
    }

    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Word not found!");

        const data = await response.json();
        const meaning = data[0].meanings[0].definitions[0].definition;
        const phonetics = data[0].phonetics[0]?.text || "No phonetics available";
        const example = data[0].meanings[0].definitions[0].example || "No example available";

        resultDiv.innerHTML = `
            <h2>${word} <span>(${phonetics})</span></h2>
            <p><strong>Definition:</strong> ${meaning}</p>
            <p><strong>Example:</strong> ${example}</p>
        `;
    } catch (error) {
        resultDiv.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    }
}