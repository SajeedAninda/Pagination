const express = require('express')
let cors = require("cors");
const app = express()
require('dotenv').config()
app.use(cors());
app.use(express.json());


const port = process.env.PORT || 5000;


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sajaninda:OHJawuylsfxy94rV@cluster0.ruhvmdy.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        let commentsCollection = client.db("PaginationCommentsDB").collection("comments");

        app.get("/comments", async (req, res) => {
            let pageQuery = parseInt(req.query.page);
            let pageNumber = pageQuery;
            let perPageData = 30;
            let skip = pageNumber * perPageData;
            const result = await commentsCollection.find().skip(skip).limit(perPageData).toArray();
            res.send(result);
        })

        app.get("/commentsCount", async (req, res) => {
            let count = await commentsCollection.estimatedDocumentCount();
            res.send({count});
        })









    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})