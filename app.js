const questions = [
    {
        question : "Which is larget animal in the world?",
        answers: [
            {text: "Shark", correct :false},
            {text: "Blue Whale", correct :true},
            {text: "Elephant", correct :false},
            {text: "Giraffe", correct :false},
        ]
    },
    {
        question : "Which is smallest Continent in the world?",
        answers: [
            {text: "Asia", correct :false},
            {text: "Australia", correct :true},
            {text: "Artic", correct :false},
            {text: "Africa", correct :false},
        ]    
    },
    {
        question : "Which is larget desert in the world?",
        answers: [
            {text: "Kalahari", correct :false},
            {text: "Gobi", correct :false},
            {text: "Sahara", correct :false},
            {text: "Antartica", correct :true},
        ]
    },
    {
        question : "Which is smallest country in the world?",
        answers: [
            {text: "Vatican City", correct :true},
            {text: "Bhutan", correct :false},
            {text: "Nepal", correct :false},
            {text: "Shri Lanka", correct :false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
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
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        button.addEventListener("click",selectAnswer);
        if(answers.correct){
            button.dataset.correct = answers.correct;
        }
    });

}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handeleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handeleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();