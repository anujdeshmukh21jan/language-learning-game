// Function to generate a random integer between min (inclusive) and max (exclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Set of 10 random questions
const randomQuestions = [
    {
        question: "Q.1 I spoke to ____.",
        options: ["she", "her"],
        correctAnswer: "her",
        difficulty: "easy",
    },

    {
        question: "Q.2 Where ____ you come from?",
        options: ["do", "are"],
        correctAnswer: "are",
        difficulty: "easy",        
    },
    {
        question: "Q.3 What time does she ___ up?",
        options: ["get", "gets"],
        correctAnswer: "get",
        difficulty: "easy",        
    },
    {
        question: "Q.4 Where ___ he live?",
        options: ["do", "does"],
        correctAnswer: "does",
        difficulty: "easy",
    },
    {
        question: "Q.5 'I am not ____ this film.'",
        options: ["liking", "enjoying"],
        correctAnswer: "liking",
        difficulty: "medium",      
    },
    {
        question: "Q.6 I am seeing her ____ three o'clock.",
        options: ["in", "at", "on"],
        correctAnswer: "at",
        difficulty: "medium",      
    },
    {
        question: "Q.7 Easter is ___ March this year.",
        options: ["on", "at", "in"],
        correctAnswer: "in",
        difficulty: "hard",       
    },
    {
        question: "Q.8 She's ____ work all day today.",
        options: ["at", "on"],
        correctAnswer: "at",
        difficulty: "hard",        
    },
    {
        question: "Q.9 I go ___ by bus.",
        options: ["home", "to home"],
        correctAnswer: "home",
        difficulty: "hard",
    },
    {
        question: "Q.10 'Do you like it?'",
        options: ["'Yes, I like.'", "'Yes, I do.'"],
        correctAnswer: "'Yes, I do.'",
        difficulty: "hard",
      
    },
];

let currentQuestionIndex = 0;
let userAnswers = [];
let userScore = 0;

// Function to start the quiz
function startQuiz() {
    window.location.href = '/questions';
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded event fired");


    // Function to display questions
    function displayQuestions() {
        const questionContainer = document.getElementById("questionContainer");

        if (questionContainer) {
            questionContainer.innerHTML = `
                <h1>Questions</h1>
                ${randomQuestions
                    .map(
                        (question, index) => `
                            <div class="question">
                                <p>${question.question}</p>
                                ${question.options
                                    .map(
                                        (option, optionIndex) => `
                                            <label>
                                                <input type="radio" name="answer_${index}" value="${option}">
                                                ${String.fromCharCode(65 + optionIndex)}) ${option}
                                            </label>`
                                    )
                                    .join("")}
                            </div>`
                    )
                    .join("")}
                <button type="button" onclick="submitQuiz()">Grade Me!</button>
            `;
        } else {
            console.error("Could not find the questionContainer element.");
        }
    }

    window.submitQuiz = function () {

        // Debugging: Log a message to check if this part is reached
        console.log("Attempting to get username input element");

        // Get username and userScore

        // const usernameInput = document.getElementById("UserName");
        // console.log(document.getElementById("UserName"));

        // if (!usernameInput) {
        //     console.error("Username input element not found");
        //     return;
        // }

        // // Calculate and display the result
        calculateResult();
        // const userScore = calculateResult(); // Assuming you have a function to calculate the score
        // const username = usernameInput.value;
    
        // // Send data to the server
        // sendDataToServer(username, userScore);

        // Redirect to the result page
        window.location.href = `/result?score=${userScore}`;
    }
    


    // Function to calculate the quiz result
    window.calculateResult = function () {
        randomQuestions.forEach((question, index) => {
            const selectedOption = document.querySelector(`input[name="answer_${index}"]:checked`);
            if (selectedOption) {
                const userAnswer = selectedOption.value;
                if (question.correctAnswer === userAnswer) {
                    // Correct answer
                    userScore += getQuestionScore(question.difficulty);
                }
            }
        });
    }

    // Function to get the score based on the question difficulty
    function getQuestionScore(difficulty) {
        switch (difficulty) {
            case "easy":
                return 1;
            case "medium":
                return 2;
            case "hard":
                return 3;
            default:
                return 0;
        }
    }

    // // Function to send data to the server
    // function sendDataToServer(username, userScore) {
    //     const xhr = new XMLHttpRequest();
    //     xhr.open("POST", "/submitQuiz", true);
    //     xhr.setRequestHeader("Content-Type", "application/json");

    //     const data = {
    //         username: username,
    //         score: userScore,
    //     };

    //     xhr.send(JSON.stringify(data));
    // }


    // Initial call to display the questions
    displayQuestions();
});