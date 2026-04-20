const choices = ["rock", "paper", "scissors"];
const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");
const resultElem = document.getElementById("result");

let playerScore = 0;
let computerScore = 0;

document.querySelectorAll(".choice").forEach(button => {
    button.addEventListener("click", () => {
        const playerChoice = button.id;
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        determineWinner(playerChoice, computerChoice);
    });
});

function determineWinner(player, computer) {
    if (player === computer) {
        resultElem.textContent = `It's a Tie! You both chose ${player}`;
    } else if (
        (player === "rock" && computer === "scissors") ||
        (player === "scissors" && computer === "paper") ||
        (player === "paper" && computer === "rock")
    ) {
        playerScore++;
        playerScoreElem.textContent = playerScore;
        resultElem.textContent = `You Win! ${player} beats ${computer}`;
    } else {
        computerScore++;
        computerScoreElem.textContent = computerScore;
        resultElem.textContent = `You Lose! ${computer} beats ${player}`;
    }
}