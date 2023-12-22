document.addEventListener("DOMContentLoaded", function () {
    // Get the result text and score text elements
    const resultTextElement = document.getElementById("resultText");
    const scoreTextElement = document.getElementById("scoreText");

    // Get the user's score and username from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const userScore = urlParams.get("score");
    // const username = urlParams.get("username");


    // Display the result text based on the user's score
    let resultText = "";
    if (userScore >= 8) {
        resultText = "Congratulations! You did an excellent job!";
    } else if (userScore >= 5) {
        resultText = "Good job! You're making progress!";
    } else {
        resultText = "Keep practicing. You'll improve!";
    }

    // Display the result and score text
    resultTextElement.textContent = resultText;
    scoreTextElement.textContent = `Your Score: ${userScore}/20`;

    // Function to redirect to the leaderboard page
    function viewLeaderboard() {
        // Redirect to the leaderboard page
        window.location.href = "/leaderboard";
    }

    // Attach click event listener to the "View Leaderboard" button
    const viewLeaderboardButton = document.getElementById("viewLeaderboardButton");
    if (viewLeaderboardButton) {
        viewLeaderboardButton.addEventListener("click", viewLeaderboard);
    }


});
