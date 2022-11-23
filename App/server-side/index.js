const express = require('express');
const app = express();

const port = 5000;

app.get('/', (req, res) => {
    console.log('request recieved!');
    res.send('Hello world!');
})

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});