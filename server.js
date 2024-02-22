const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files (including your HTML) from the 'public' directory
app.use(express.static('public'));

// Define a route handler for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
 
app.get('/leaderboard', async (req, res) => {
    console.log('Leaderboard request received');

    try {
        const client = new MongoClient("mongodb+srv://weebybungeegon:e42t4r0HZmx53J9t@cluster0.tclywox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
            useUnifiedTopology: true
        });

        await client.connect();

        // Specify your MongoDB database and collection
        const database = client.db('Kriya_Leaderboard');
        const collection = database.collection('Team_scoreboard');

        // Fetch data from MongoDB
        const jsonData = await collection.find().toArray();
        
        // Send the JSON data as the response
        res.json(jsonData);
    } catch (error) {
        console.error('Error reading data from MongoDB:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        // Close the MongoDB connection when done
        if (client) {
            await client.close();
        }
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
