const express = require('express');
const path = require('path');
const XLSX = require('xlsx');
const app = express();
const port = 3000;

// Serve static files (including your HTML) from the 'public' directory
app.use(express.static('public'));

// Define a route handler for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/leaderboard', (req, res) => {
    try {
        const workbook = XLSX.readFile('testdata.xlsx');
        const sheetName = workbook.SheetNames[0];
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        res.json(jsonData);
    } catch (error) {
        console.error('Error reading Excel file:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
