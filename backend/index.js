const express = require('express');
const cors = require('cors');
const rootRouter = require('./routes/index');

require("dotenv").config();
const MongoDBURL = process.env.MONGODB_URL;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1' , rootRouter);

mongoose.connect(MongoDBURL);

app.listen(3000 , ()=> {
    console.log('server listening on port 3000');
})