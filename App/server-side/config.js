require('dotenv').config();

const DB_PASSWORD_KEY = 'DB_PASSWORD'
const DB_USERNAME_KEY = 'DB_USERNAME'

function validateConfig() {
    let missing = [];
    
    function checkRequired(key) {
        if (!process.env[key]) {
            missing.push(key)
        }
    }

    checkRequired(DB_PASSWORD_KEY);
    checkRequired(DB_USERNAME_KEY);

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: [${missing.join(', ')}]; define these in a file called .env in App/server-side/ and do not source control`);
    }
}

module.exports = function getConfig() {
    validateConfig();
    return {
        dbPassword: process.env[DB_PASSWORD_KEY],
        dbUsername: process.env[DB_USERNAME_KEY],
        dbDatabase: 'WS325813_teston',
        dbHost: 'plesk.remote.ac'
    };
}
 