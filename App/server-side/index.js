const express = require('express');
const mariadb = require('mariadb/callback');
const getConfig = require('./config');
const configureEndpoints = require('./configureEndpoints'); 

const app = express();
const port = 5000;
const config = getConfig();

// Connect to our database using the credentials defined in our .env file.
const db = mariadb.createConnection({
    host: config.dbHost, 
    user: config.dbUsername, 
    password: config.dbPassword,
    database: config.dbDatabase
});
db.connect(err => {
    if (err) {
        throw Error(err);
    } else {
        console.log(`Connected to database (Connection ID: ${connection.threadId})`);
        Database.setConnection(connection)
    }   
});

// Setup our API routes.
configureEndpoints(app, db);

// Listen for connections.
app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`);
});
