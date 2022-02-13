const fs = require('fs')
const path = require('path')
const http = require('http')
const url = require('url')

let dataPath = path.join(__dirname, 'data')

const server = http.createServer((request, response) => {
    if(request.url == '/jokes' && request.method == "GET"){
        getAllJokes(request, response)
    }
})

server.listen(3000)

function getAllJokes(request, response){
    let dir = fs.readdirSync(dataPath)
    let allJokes = []
    console.log(dir)
    dir.forEach(element => {
        let file = fs.readFileSync(path.join(dataPath, element))
        let jokeJson = Buffer.from(file).toString()
        let joke = JSON.parse(jokeJson)

        allJokes.push(joke)
    });



response.end(JSON.stringify(allJokes))
}