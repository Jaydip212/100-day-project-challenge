document.addEventListener("DOMContentLoaded", loadNotes);

const addNoteButton = document.getElementById("addNote");
const notesContainer = document.getElementById("notesContainer");

addNoteButton.addEventListener("click", addNote);

function addNote() {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");

    const textArea = document.createElement("textarea");
    textArea.placeholder = "Write your note here...";
    textArea.addEventListener("input", saveNotes);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "❌";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.addEventListener("click", () => {
        noteDiv.remove();
        saveNotes();
    });

    noteDiv.appendChild(textArea);
    noteDiv.appendChild(deleteBtn);
    notesContainer.appendChild(noteDiv);

    saveNotes();
}

function saveNotes() {
    const notes = [];
    document.querySelectorAll(".note textarea").forEach(note => {
        notes.push(note.value);
    });
    localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    savedNotes.forEach(text => {
        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note");

        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.addEventListener("input", saveNotes);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "❌";
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.addEventListener("click", () => {          
            noteDiv.remove();
            saveNotes();
        });

        noteDiv.appendChild(textArea);
        noteDiv.appendChild(deleteBtn);
        notesContainer.appendChild(noteDiv);
    });
}

