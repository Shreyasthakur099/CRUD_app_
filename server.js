const express = require("express");
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();


app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

dotenv.config({path:'config.env'});
const PORT = process.env.PORT || 8080;

//log requests
app.use(morgan('tiny'));

//mongodb connection
connectDB();


//set view engine
app.set("view engine", "ejs")
// app.set("views", path.resolve(__dirname,"views/ejs"))

//load assets
app.use('/css',express.static(path.resolve(__dirname ,"assets/css" )))
app.use('/img',express.static(path.resolve(__dirname ,"assets/img" )))
app.use('/js',express.static(path.resolve(__dirname ,"assets/js" )))

app.listen(PORT,() =>{console.log(`server is running on http://localhost:${PORT}`)});

//load routers
app.use('/', require('./server/routes/router'));