const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons'); 

let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    quizScore = 0; // Reset score on start
    document.getElementById('right-answer').innerText = `Score: ${quizScore}`;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
    });
    
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
    
    if (correct) {
        quizScore++;
    }
    document.getElementById('right-answer').innerText = `Score: ${quizScore}`;
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'Which one of these JavaScript frameworks is the most popular?',
        answers: [
            { text: 'Angular', correct: false },
            { text: 'React', correct: true },
            { text: 'Vue', correct: false },
            { text: 'Svelte', correct: false }
        ]
    },
    {
        question: 'Which one of these is a JavaScript library?',
        answers: [
            { text: 'React', correct: false },
            { text: 'Vue', correct: false },
            { text: 'jQuery', correct: true },
            { text: 'Svelte', correct: false }
        ]
    },
    {
        question: 'Which one of these is a JavaScript framework?',
        answers: [
            { text: 'React', correct: true },
            { text: 'Vue', correct: false },
            { text: 'jQuery', correct: false },
            { text: 'Svelte', correct: false }
        ]
    },
    {
        question: 'Which one of these is a JavaScript compiler?',
        answers: [
            { text: 'React', correct: false },
            { text: 'Vue', correct: false },
            { text: 'jQuery', correct: false },
            { text: 'Babel', correct: true }
        ]
    },
    {
        question: 'Which one of these is a JavaScript bundler?',
        answers: [
            { text: 'React', correct: false },
            { text: 'Vue', correct: false },
            { text: 'Webpack', correct: true },
            { text: 'Babel', correct: false }
        ]
    }
];
