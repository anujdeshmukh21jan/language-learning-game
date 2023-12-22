const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8080;

const db_config = require('./db_config');

const connection = mysql.createConnection(db_config);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/questions', (req, res) => {
    res.sendFile(__dirname + '/public/questions.html');
});

app.get('/result', (req, res) => {
    res.sendFile(__dirname + '/public/result.html');
});

app.get('/leaderboard', (req, res) => {
    res.sendFile(__dirname + '/public/leaderboard.html');
});

// server.js
app.post('/submitQuiz', (req, res) => {
    const { username, score } = req.body;

    // Use the correct property names here
    db.query("INSERT INTO quiz_results (username, userScore) VALUES (?, ?)", [username, score], (err, results) => {
        if (err) {
            console.error('Error inserting data into the quiz_results table:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        console.log('Data inserted successfully');
        res.status(200).json({ message: 'Quiz result submitted successfully' });
    });
});


// Endpoint to retrieve leaderboard data
app.get('/getLeaderboard', (req, res) => {
    // Retrieve data from the quiz_results table (order by score in descending order)
    const sql = 'SELECT username, score FROM quiz_results ORDER BY score';
    
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving data from the quiz_results table:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        console.log('Leaderboard data retrieved successfully');
        res.status(200).json({ leaderboard: results });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
