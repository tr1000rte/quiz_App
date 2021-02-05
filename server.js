const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const app = express();
const bodyparser = require('body-parser');
const path = require('path')
const mongoose = require('mongoose')

dotenv.config({ path: 'config.env' });
const port = process.env.PORT || 8080;

//log request
app.use(morgan('tiny'));

//mongo connection
const mongoUrl = 'mongodb+srv://zxc1000zxcv:zxc1000zxcv@quizcluster.aupoh.mongodb.net/Quiz?retryWrites=true&w=majority'

const connectDB =  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, () => {
    console.log('Connect to DB');
})

//body-parser set
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

//set view engine
app.set("view engine", "ejs");
// app.set("views", path.resolve(__dirname, "views/ejs"))

//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/image', express.static(path.resolve(__dirname, "assets/image")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

//load routers
app.use('/', require('./server/routes/router'))

app.listen(port, () => {console.log((`server is running on http://localhost:${port}`));})