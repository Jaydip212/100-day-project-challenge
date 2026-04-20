const apiUrl = `https://tinyurl.com/api-create.php?url=${longUrl}`;

fetch(apiUrl)
    .then(response => response.text())
    .then(shortUrl => {
        document.getElementById("shortenedUrl").innerHTML =
            `Shortened URL: <a href="${shortUrl}" target="_blank">${shortUrl}</a>`;
    })
    .catch(error => {
        alert("Error fetching short URL.");
    });