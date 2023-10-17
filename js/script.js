const questions = [
    {
        question: "¿Cuál es el animal más grande del mundo?",
        answers: [
            {text: "Tiburón", correct: false},
            {text: "Ballena azul", correct: true},
            {text: "Elefante", correct: false},
            {text: "Jirafa", correct: false},
        ]
    },
    {
        question: "¿Cuál es la capital de Francia?",
        answers: [
            {text: "Londres", correct: false},
            {text: "Madrid", correct: false},
            {text: "París", correct: true},
            {text: "Roma", correct: false},
        ]
    },
    {
        question: "¿Cuál es el planeta más cercano al Sol en nuestro sistema solar?",
        answers: [
            {text: "Marte", correct: false},
            {text: "Venus", correct: false},
            {text: "Júpiter", correct: false},
            {text: "Mercurio", correct: true},
        ]
    },
    {
        question: "¿Cuál es el proceso natural por el cual las plantas convierten la luz solar en energía?",
        answers: [
            {text: "Fotosíntesis", correct: true},
            {text: "Respiración", correct: false},
            {text: "Digestión", correct: false},
            {text: "Transpiración", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
