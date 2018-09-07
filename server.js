const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
require("isomorphic-fetch");
const app = express();
const mongoInit = require('./api/db/mongoInit');
const api = require('./api');

const port = process.env.PORT || 5000;

app.use(bodyParser.json());


// if (process.env.NODE_ENV === 'production') {
//   // Serve any static files
//   app.use(express.static(path.join(__dirname, 'client/build')));
//   // Handle React routing, return all requests to React app
//   app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//   });
// }

async function start() {
    try {
        const db = await mongoInit();
        console.log('Connected to MongoDB');
        
        // API calls
        app.use('/api', api({ db }));

        // Serve any static files
        app.use(express.static(path.join(__dirname, 'client/build')));
        // Handle React routing, return all requests to React app
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
        });

        app.listen(port, () => console.log(`Listening on port ${port}`));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

start();

