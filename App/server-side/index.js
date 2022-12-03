const cors = require('cors');
const express = require('express');
const mariadb = require('mariadb');
const usersRoute = require('./src/routes/users.route');
const testResultsRoute = require('./src/routes/test-results.route');
const getConfig = require('./config');
const configureEndpoints = require('./configureEndpoints');

const app = express();
const port = 5000;
const config = getConfig();

// For CORS Allow Origin
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mariadb.createConnection({
    host: config.dbHost,
    user: config.dbUsername,
    password: config.dbPassword,
    database: config.dbDatabase
}).then((db) => {
    console.log(`Connected to database (Connection ID: ${db.threadId})`);

    configureEndpoints(app, db);
    usersRoute(app, db);
    testResultsRoute(app, db);

    app.listen(port, () => {
        console.log(`Now listening on port http://localhost:${port}`);
    });
})
