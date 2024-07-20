import express from 'express';

const app = express();

app.get('/api/jokes', (req, res) => {
    const jokes = [
        { id: 1, joke: 'Why was the math book sad? Because it had too many problems.' },
        { id: 2, joke: 'Why did the tomato turn red? Because it saw the salad dressing!' },
        { id: 3, joke: 'What do you call a fake noodle? An impasta.' },
        { id: 4, joke: 'Why did the scarecrow win an award? Because he was outstanding in his field.' },
        { id: 5, joke: 'Why don\'t scientists trust atoms? Because they make up everything.' }
    ];
    res.send(jokes);
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}/api/jokes`)
})