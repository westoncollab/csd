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

    app.get('/subjects', (req, res) => {
        db.query("SELECT subjectName FROM subjects").then(rows => {
            res.json({
                subjects: rows
            })
        })
    });
}
