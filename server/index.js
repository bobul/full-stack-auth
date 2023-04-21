require('dotenv').config();
const express = require('express'); // basic structure of express project
const cors = require('cors'); // import cors
const cookieParser = require('cookie-parser'); // import cookie parser
const mongoose = require('mongoose');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    optionSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}));
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
    } catch(e) {
        console.log(e);
    }
}

start();