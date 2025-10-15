const express = require('express');
const server = express();
const port = 3000;

const fs = require('fs');
const path = require('path');

//this is our home page, it points to the'public' folder and in general, index.html gets used
server.use(express.static('public')); 

function updateCount(){
    const filePath = 'hits.txt';
    let hits = 0;
        
    if (fs.existsSync(filePath)){
        const data = fs.readFileSync(filePath, 'utf-8');
        hits = parseInt(data);
    }

    hits++;
    fs.writeFileSync(filePath, hits.toString());

    return hits;
}


function getRandomWord(){
    //  1. read the file
    const filePath = 'allwords.txt';

    if (fs.existsSync(filePath)){
        const data = fs.readFileSync(filePath, 'utf-8');
        // 2. break up the lines
        const lines = data.split('\n');
        const randomLine = lines[Math.floor(Math.random() * lines.length)];
        // 3. separate into word / type / definition
        const [word, part, definition] = randomLine.split('\t');

        return {word: word, part: part, definition: definition};
    };
}


server.get('/hits', (req, res) => {
    const hits = updateCount(); 
    res.json({hitCount: hits});
});

//the .get accpets a string and a function paramemeter
server.get('/wordRequest', (req,res) => {
    //function call
    const wordData = getRandomWord();
    //and a response
    res.json(wordData);
})


server.get('/hello', function(req, res){
    res.send('<h1>Hello World!</h1>');
});

server.get('/goodbye', (req, res) => {
    res.send('<h1>bye bye</h1/>');
})

server.listen(port, function(){
    console.log(`Listening on port http://localhost:${port}`);
})