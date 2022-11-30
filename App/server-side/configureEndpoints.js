module.exports = function configureEndpoints(app, db) {

    app.get('/', (req, res) => {
        console.log('request recieved!');
        res.send('Hello world!');
    }); 

    app.get('/health', (req, res) => {
        res.json({
            database: {
                threadId: db.threadId 
            }
        });
    });
}
