const express = require("express") //importing the libraray
const app = express() //instantiating the server

app.listen(3000, ()=>{
    console.log("API server now on 3000 port")
})