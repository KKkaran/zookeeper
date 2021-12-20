const express = require("express") //importing the libraray
const res = require("express/lib/response")
const app = express() //instantiating the server


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
app.get("/api/animals",(req,res)=>{
    
    let results = animals;
    if(req.query){
        console.log(req.query)
        results = filterByQuery(req.query,results)
    }
    res.json(results)
})


app.listen(3000, ()=>{
    console.log("API server now on 3000 port")
})