const choiceButtons = Array.from(document.querySelectorAll(".choice"));
const myScoreNum = document.querySelector("#myScoreNumber");
const comScoreNum = document.querySelector("#comScoreNumber");
const scorePopPara = document.querySelector("#scorePopPara");
const playerMoveEl = document.querySelector("#playerMove");
const computerMoveEl = document.querySelector("#computerMove");
const resetButton = document.querySelector("#resetButton");

let playerScore = 0;
let computerScore = 0;

const rules = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper"
};

function updateScoreBoard() {
    myScoreNum.textContent = playerScore;
    comScoreNum.textContent = computerScore;
}

function updateResultText(result, playerChoice, computerChoice) {
    const messages = {
        win: `You win! ${playerChoice} beats ${computerChoice}`,
        lose: `You lost. ${computerChoice} beats ${playerChoice}`,
        draw: "It's a draw. Try again!"
    };

    scorePopPara.textContent = messages[result];
    scorePopPara.style.color = result === "lose" ? "#fda4af" : result === "win" ? "#86efac" : "#c7d2fe";
    playerMoveEl.textContent = `You: ${playerChoice}`;
    computerMoveEl.textContent = `Comp: ${computerChoice}`;
}

function getComputerChoice() {
    const choices = Object.keys(rules);
    return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(playerChoice) {
    const computerChoice = getComputerChoice();

    if (playerChoice === computerChoice) {
        updateResultText("draw", playerChoice, computerChoice);
        return;
    }

    const playerWins = rules[playerChoice] === computerChoice;
    if (playerWins) {
        playerScore += 1;
        updateResultText("win", playerChoice, computerChoice);
    } else {
        computerScore += 1;
        updateResultText("lose", playerChoice, computerChoice);
    }

    updateScoreBoard();
}

choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const choice = button.dataset.choice;
        playRound(choice);
    });
});

resetButton.addEventListener("click", () => {
    playerScore = 0;
    computerScore = 0;
    updateScoreBoard();
    scorePopPara.textContent = "Play your move to start the round.";
    scorePopPara.style.color = "";
    playerMoveEl.textContent = "You: —";
    computerMoveEl.textContent = "Comp: —";
});

updateScoreBoard();
