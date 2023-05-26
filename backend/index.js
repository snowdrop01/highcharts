const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
app.use(cors());

const PORT = 8000;
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("connection successfull");
    });

const userroutes = require('./routes/user');

app.use('/',userroutes);

app.listen(PORT, () => {
    console.log(`App is listening on port http://localhost:${PORT}`);
});