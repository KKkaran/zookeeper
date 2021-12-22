const express = require("express") //importing the libraray
const res = require("express/lib/response")
const PORT = process.env.PORT || 3001;
const app = express() //instantiating the server
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
const fs = require('fs');
const path = require('path');

const {animals} = require("./data/animals.json")
function filterByQuery(query,animalsArray){

    let personalityTraitsArray = [];
    // Note that we save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        // Save personalityTraits as a dedicated array.
        // If personalityTraits is a string, place it into a new array and save.
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        // Loop through each trait in the personalityTraits array:
        personalityTraitsArray.forEach(trait => {
        // Check the trait against each animal in the filteredResults array.
        // Remember, it is initially a copy of the animalsArray,
        // but here we're updating it for each trait in the .forEach() loop.
        // For each trait being targeted by the filter, the filteredResults
        // array will then contain only the entries that contain the trait,
        // so at the end we'll have an array of animals that have every one 
        // of the traits when the .forEach() loop is finished.
        filteredResults = filteredResults.filter(
            animal => animal.personalityTraits.indexOf(trait) !== -1
        );
        });
    }
    if(query.diet){
        filteredResults = filteredResults.filter(anima => anima.diet === query.diet)
    }
    if(query.name){
        filteredResults = filteredResults.filter(anima => anima.name === query.name)
    }
    if(query.species){
        filteredResults = filteredResults.filter(anima => anima.species === query.species)
    }
    return filteredResults
}
function findById(id,animal){

    let anima = animal.filter(ani=> ani.id === id)
    return anima;

}
function createNewAnimal(body, animalsArray) {
    console.log(body);
    // our function's main code will go here!
    animalsArray.push(body)
    fs.writeFileSync(
        path.join(__dirname, './data/animals.json'),
        JSON.stringify({ animals: animalsArray }, null, 2)
      );
    // return finished code to post route for response
    return body;
  }
app.get("/api/animals",(req,res)=>{
    let results = animals;
    if(req.query){
        console.log(req.query)
        results = filterByQuery(req.query,results)
    }
    res.json(results)
})
//route using params
app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
      if(result) res.json(result)
      else res.send(404)
  });

app.post('/api/animals', (req, res) => {
    // req.body is where our incoming content will be
    req.body.id = animals.length.toString();
    const animal = createNewAnimal(req.body, animals);
    res.json(req.body);

});

app.listen(PORT, ()=>{
    console.log(`API server now on ${PORT} port`)
})

console.log(__dirname + "-------------------> current dir")