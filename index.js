const { MongoClient } = require('mongodb');
const express = require('express');
var cors = require('cors');
require('dotenv').config();

const ObjcetId = require('mongodb').ObjectId;
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// uri 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5cdlp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// client 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log('client connected');

        const database = client.db('portfolio');
        //porjects DATA 
        const projectsCollection = database.collection('projects');


        //projects METHOD 

        //GET 
        app.get('/projects', async (req, res) => {
            const cursor = projectsCollection.find({});
            const projects = await cursor.toArray();
            res.send(projects);
        });
        app.get('/projects/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjcetId(id) };
            const projects = await projectsCollection.findOne(query);
            res.json(projects);
        })

        //POST 
        app.post('/projects', async (req, res) => {
            const project = req.body;
            const result = await projectsCollection.insertOne(project);
            res.json(result);
        });

        //DELETE 
        app.delete('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjcetId(id) }
            const result = await projectsCollection.deleteOne(query);
            res.json(result);
        })



        //DELETE
        app.delete('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjcetId(id) }
            const result = await orderCollection.deleteOne(query);
            res.json(result);
        })

    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('ROOT OF Ashiks_personal_portfolio SERVER')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});