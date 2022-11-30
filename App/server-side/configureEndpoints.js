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


    app.post('/subject', async(req, res) => {
        const { subjectName } = req.body
        if (!subjectName) {
            res.status(400).send("Variable `subjectName` is not defined.")
        }
        
        const rows = await db.query("SELECT subjectName FROM subjects")
        const subjectNames = rows.map(row => row.subjectName)

        if (!subjectNames.includes(subjectName)) {
            await db.query("INSERT INTO subjects (subjectName) VALUES (?)", [subjectName])
            subjectNames.push(subjectName)
        }
         
        res.status(200).json(subjectNames)
    })
}
