const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-btn");

const quizScreen = document.getElementById("quiz-screen");
const quizSection = document.getElementById("quiz");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultsSection = document.getElementById("results");
const scoreTextElement = document.getElementById("score-text");
const totalQuestionsElement = document.getElementById("total-questions");
const restartButton = document.getElementById("restart-btn");
const feedbackMessageElement = document.getElementById("feedback-message");

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const questions = [
    {
        question: "Quando um número é divisível por 2?",
        answers: [
            { text: "Quando é maior do que 10", correct: false },
            { text: "Quando ele é par", correct: true },
            { text: "Quando possui vírgula", correct: false },
            { text: "Quando é menor do que 10", correct: false }
        ]
    },
    {
        question: "Quando um número é divisível por 3?",
        answers: [
            { text: "Quando também é divisível por 7", correct: false },
            { text: "Quando termina em 2", correct: false },
            { text: "Quando a soma dos seus algarismos também é divisível por 3", correct: true },
            { text: "Quando não possui o número 9", correct: false }
        ]
    },
    {
        question: "Quando um número é divisível por 5?",
        answers: [
            { text: "Quando é divisível por 2", correct: false },
            { text: "Quando termina em 0 ou 5", correct: true },
            { text: "Quando termina em 4 ou 8", correct: false },
            { text: "Quando começa com 2", correct: false }
        ]
    },
    {
        question: "Quando um número é divisível por 9?",
        answers: [
            { text: "Quando possui o número 3", correct: false },
            { text: "Quando a soma de seus algarismos é divisível por 4", correct: false },
            { text: "Quando a soma de seus algarismos também é divisível por 9", correct: true },
            { text: "Quando não termina em 3", correct: false }
        ]
    },
    {
        question: "Um número é divisível por 10, 100, ou 1000 quando: ?",
        answers: [
            { text: "Não possui o número 0", correct: false },
            { text: "A soma dos seus algarismos é igual a 15", correct: false },
            { text: "Termina em 0, 00 e 000, respectivamente", correct: true },
            { text: "Não termina em 0", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add("hidden");
    resultsSection.classList.add("hidden");
    quizSection.classList.remove("hidden");
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    const shuffledAnswers = shuffleArray(currentQuestion.answers);

    shuffledAnswers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add("hidden");
    feedbackMessageElement.classList.add("hidden");
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    feedbackMessageElement.classList.remove("hidden", "correct", "incorrect");

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
        feedbackMessageElement.innerHTML = "Resposta correta! 🎉";
        feedbackMessageElement.classList.add("correct");
    } else {
        selectedBtn.classList.add("incorrect");
        feedbackMessageElement.innerHTML = "Resposta incorreta! 😔";
        feedbackMessageElement.classList.add("incorrect");

        Array.from(answerButtonsElement.children).forEach(button => {
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
            }
        });
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
    });
    nextButton.classList.remove("hidden");
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    // Esconde a seção de perguntas
    quizSection.classList.add("hidden");
    // Exibe a seção de resultados
    resultsSection.classList.remove("hidden");
    
    scoreTextElement.textContent = score;
    totalQuestionsElement.textContent = questions.length;
}

startButton.addEventListener("click", startQuiz);

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
});

restartButton.addEventListener("click", startQuiz);