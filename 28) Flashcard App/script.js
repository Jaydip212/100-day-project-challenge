document.addEventListener("DOMContentLoaded", loadFlashcards);

const showFormBtn = document.getElementById("show-form-btn");
const addFlashcardForm = document.getElementById("add-flashcard-form");
const addCardBtn = document.getElementById("add-card-btn");
const flashcardsContainer = document.getElementById("flashcards-container");

showFormBtn.addEventListener("click", () => {
    addFlashcardForm.classList.toggle("hidden");
});

addCardBtn.addEventListener("click", () => {
    const question = document.getElementById("question").value;
    const answer = document.getElementById("answer").value;

    if (question && answer) {
        const flashcard = { question, answer };
        saveFlashcard(flashcard);
        addFlashcardToDOM(flashcard);
        document.getElementById("question").value = "";
        document.getElementById("answer").value = "";
    } else {
        alert("Please enter both question and answer!");
    }
});

function saveFlashcard(flashcard) {
    let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];
    flashcards.push(flashcard);
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
}

function loadFlashcards() {
    let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];
    flashcards.forEach(addFlashcardToDOM);
}

function addFlashcardToDOM(flashcard) {
    const card = document.createElement("div");
    card.classList.add("flashcard");
    card.innerHTML = `<p>${flashcard.question}</p>`;

    let isFlipped = false;
    card.addEventListener("click", () => {
        isFlipped = !isFlipped;
        card.innerHTML = isFlipped ? `<p>${flashcard.answer}</p>` : `<p>${flashcard.question}</p>`;
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
        card.remove();
        deleteFlashcard(flashcard);
    });

    card.appendChild(deleteBtn);
    flashcardsContainer.appendChild(card);
}

function deleteFlashcard(flashcardToDelete) {
    let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];
    flashcards = flashcards.filter(flashcard => flashcard.question !== flashcardToDelete.question);
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
}