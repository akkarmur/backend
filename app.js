const express = require('express')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use("/",require('./routes/login'))

app.use("/",require('./routes/signup'))

// app.use("/",require('./routes/index'))
 
app.listen(3000)
