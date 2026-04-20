document.addEventListener("DOMContentLoaded", loadNotes);

document.getElementById("add-note").addEventListener("click", function () {
    const noteText = document.getElementById("note-input").value;

    if (noteText.trim() === "") {
        alert("Please enter a note!");
        return;
    }

    const note = { text: noteText };
    addNoteToList(note);
    saveNote(note);

    document.getElementById("note-input").value = "";
});

function addNoteToList(note) {
    const div = document.createElement("div");
    div.classList.add("note");
    div.innerHTML = `${note.text} 
        <button class="delete-btn">X</button>`;
    document.getElementById("notes-container").appendChild(div);

    div.querySelector(".delete-btn").addEventListener("click", function () {
        div.remove();
        removeNote(note);
    });
}

function saveNote(note) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.forEach(note => addNoteToList(note));
}

function removeNote(note) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = notes.filter(n => n.text !== note.text);
    localStorage.setItem("notes", JSON.stringify(notes));
}