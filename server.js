const express = require("express") //importing the libraray
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const PORT = process.env.PORT || 3001;
const app = express() //instantiating the server

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// parse incoming JSON data
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

const fs = require('fs');
const path = require('path');

const {animals} = require("./data/animals.json")

app.listen(PORT, ()=>{
    console.log(`API server now on ${PORT} port`)
})

console.log(__dirname + "-------------------> current dir")