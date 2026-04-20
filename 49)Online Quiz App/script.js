const questions = [
    {
        question: "The in operator is used to check if a value exists within an iterable object container such as a list. Evaluate to True if it finds a variable in the specified sequence and False otherwise.?",
        options: ["True", "False", ],
        answer: "True"
    },
    {
        question: "Which operator has higher precedence in the following list?",
        options: [" % (Modulus)", "& (BitWise AND)", "** (Exponent)", "> (Comparison)"],
        answer: "** (Exponent)"
    },
    {
        question: "The union() method returns a new set with all items from both sets by removing duplicates?",
        options: ["True", "False", ],
        answer: "True"
    }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = new Array(questions.length);

function loadQuestion() {
    const questionElement = document.querySelector('.question');
    const optionsElement = document.querySelector('.options');
    const questionNumber = document.querySelector('.question-number');
    
    questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    questionElement.textContent = questions[currentQuestion].question;
    
    optionsElement.innerHTML = '';
    questions[currentQuestion].options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(option, index);
        if(userAnswers[currentQuestion] === option) {
            optionElement.classList.add('selected');
        }
        optionsElement.appendChild(optionElement);
    });

    document.getElementById('prev-btn').disabled = currentQuestion === 0;
    document.getElementById('next-btn').textContent = 
        currentQuestion === questions.length - 1 ? 'Submit' : 'Next';
}

function selectOption(selectedOption, index) {
    const options = document.querySelectorAll('.options div');
    options.forEach(option => option.classList.remove('selected'));
    options[index].classList.add('selected');
    userAnswers[currentQuestion] = selectedOption;
}

function previousQuestion() {
    if(currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function nextQuestion() {
    if(currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    score = 0;
    userAnswers.forEach((answer, index) => {
        if(answer === questions[index].answer) score++;
    });

    document.querySelector('.quiz-container').innerHTML = `
        <div class="result">
            <h2>Quiz Completed!</h2>
            <p>Your Score: ${score}/${questions.length}</p>
            <button onclick="location.reload()">Try Again</button>
        </div>
    `;
}

// Initial load
loadQuestion();