function generateQR() {
    let qrText = document.getElementById("qrText").value;
    let qrImage = document.getElementById("qrImage");

    if (qrText.trim() === "") {
        alert("Please enter text or a URL!");
        return;
    }

    let apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrText)}`;
    qrImage.src = apiUrl;
    qrImage.style.display = "block";
}