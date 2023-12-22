document.addEventListener("DOMContentLoaded", function () {
    // Get the leaderboard table element
    const leaderboardTable = document.getElementById("leaderboardTable");

    // Fetch leaderboard data from the server
    fetchLeaderboardData();

    // Function to fetch leaderboard data from the server
    function fetchLeaderboardData() {
        fetch("/api/leaderboard") // Assuming you have an API endpoint for fetching leaderboard data
            .then(response => response.json())
            .then(data => displayLeaderboard(data))
            .catch(error => console.error("Error fetching leaderboard data:", error));
    }

    // Function to display leaderboard data in the table
    function displayLeaderboard(data) {
        // Clear existing rows
        leaderboardTable.innerHTML = "";

        // Add header row
        const headerRow = leaderboardTable.insertRow(0);
        headerRow.insertCell(0).textContent = "Rank";
        headerRow.insertCell(1).textContent = "Username";
        headerRow.insertCell(2).textContent = "Score";

        // Add data rows
        data.forEach((row, index) => {
            const tableRow = leaderboardTable.insertRow(index + 1);
            tableRow.insertCell(0).textContent = index + 1;
            tableRow.insertCell(1).textContent = row.username;
            tableRow.insertCell(2).textContent = row.userScore;
        });
    }
});
