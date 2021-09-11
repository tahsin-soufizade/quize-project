const startButton = document.querySelector('.start-btn');
const nextButton = document.querySelector('.next-btn');
const quizeContainer = document.querySelector('.quize');
const questionElement = document.querySelector('.question');
const answerButtons = document.querySelector('.answer-buttons');

let shuffledQuestions, currentQuestionIndex;

// alert elements
const alertWrapper = document.querySelector('.alert-wrapper');
const alertText = document.querySelector('.alert-text');

// events
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

// start game
function startGame() {
    startButton.classList.add('hide');
    quizeContainer.classList.remove('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    setNextQuestion();
}

// set next qusestion
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}


// show question and answers
function showQuestion(question) {
    questionElement.innerHTML = question.question;
    question.answer.forEach(answer => {
        const button = document.createElement('button');
        button.classList.add('btn');
        button.innerHTML = answer.text;

        answerButtons.append(button);

        // set data to correct button
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener('click', selectAnswer);
    });
}

// select answer button
function selectAnswer(e) {
    const selectedButton = e.target;
    [...answerButtons.children].forEach(button => {
        // remove click event from all answer Buttons
        button.removeEventListener('click', selectAnswer);

        // set status color to buttons
        setStatusClass(button, button.dataset.correct);

        // set default style in button when clicking
        button.style.setProperty('background', 'hsl(var(--hue), 100%, 50%)');
        button.style.setProperty('border', '2px solid hsl(var(--hue), 100%, 35%)');
    });
    // set color status to body
    setStatusClass(document.body, selectedButton.dataset.correct);

    // check answer and show alert message
    if (selectedButton.dataset.correct) {
        displayAlert('right 😃', 'correct');
    } else {
        displayAlert('😐😐😐', 'wrong');
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerHTML = 'Restart';
        startButton.classList.remove('hide');
    }
}

// set correct or wrong color class
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

// clear old color classes
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
    // set back to default alert wrapper
    alertWrapper.style.height = 0;
    alertWrapper.classList.remove('correct');
    alertWrapper.classList.remove('wrong');
}

// remove old answers
function resetState() {
    clearStatusClass(document.body)
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    nextButton.classList.add('hide')
}

// display alert message
function displayAlert(text, action) {
    const alertHeight = alertText.getBoundingClientRect().height;
    alertWrapper.style.height = `${alertHeight}px`;

    alertWrapper.classList.add(action);
    alertText.innerHTML = text;

    // hide alert message automaticly
    setTimeout(() => {
        alertWrapper.classList.remove(action);
        alertWrapper.style.height = 0;
    }, 2000);
}


const questions = [

    {
        question: 'what is 2 + 2 ?',
        answer: [
            { text: '33', correct: false },
            { text: '190', correct: false },
            { text: '4', correct: true },
            { text: '863', correct: false },
        ]
    },

    {
        question: 'who is a singer?',
        answer: [
            { text: 'Ronaldo', correct: false },
            { text: 'jeyson mumaha', correct: false },
            { text: 'Beal Gates', correct: false },
            { text: 'shakira', correct: true },
        ]
    },

    {
        question: 'which one is programming language?',
        answer: [
            { text: 'HTML', correct: false },
            { text: 'JavaScript', correct: true },
            { text: 'CSS', correct: false },
            { text: 'PhotoShop', correct: false },
        ]
    },

    {
        question: 'do you like this project?',
        answer: [
            { text: 'no', correct: false },
            { text: 'a lot', correct: true },
            { text: 'yes', correct: false },
            { text: 'not at All', correct: false },
        ]
    },
]