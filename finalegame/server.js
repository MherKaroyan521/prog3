
var express = require('express');
var app = express();
var server = require('http').createServer(app)
var io = require('socket.io')(server);



app.use(express.static("."));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

server.listen(3000);

matrix = []

grasses = [];
grassEaterArr = [];
predatorArr = [];
mushroomArr = [];
tntblockArr = [];
randomlifeArr = [];

let Grass = require("./grass")
let GrassEater = require("./grasseter")
let Mushroom = require("./mushroom")
let Predator = require("./predator")
let TntBlock = require("./tntblock")
let RandomLife = require("./randomlife")


function random(min = 0,max)
{
    var z = Math.floor(Math.random()*(max-min+1)) + min;
    return z;
}



function matrixGenerator(matrixSize, grassCount, grassEaterCount, predatorCount, mushroomCount, rockCount, tntBlockCount, randomLifeCount) {
    matrix = []

    grasses = [];
    grassEaterArr = [];
    predatorArr = [];
    mushroomArr = [];
    tntblockArr = [];
    randomlifeArr = [];
    
    for (let i = 0; i < matrixSize; i++) {
       matrix[i] = []
       for (let o = 0; o < matrixSize; o++) {
           matrix[i][o] = 0;
       }
   }
   for (let i = 0; i < grassCount; i++) {
       let x = Math.floor(random(0,matrixSize-1));
       let y = Math.floor(random(0,matrixSize-1));
       matrix[y][x] = 1;
   }
   for (let i = 0; i < grassEaterCount; i++) {
       let x = Math.floor(random(0,matrixSize-1));
       let y = Math.floor(random(0,matrixSize-1));
       matrix[y][x] = 2;
   }
   for (let i = 0; i < predatorCount; i++) {
       let x = Math.floor(random(0,matrixSize-1));
       let y = Math.floor(random(0,matrixSize-1));
       matrix[y][x] = 3;
   }
   for (let i = 0; i < mushroomCount; i++) {
       let x = Math.floor(random(0,matrixSize-1));
       let y = Math.floor(random(0,matrixSize-1));
       matrix[y][x] = 4;
   }
   for (let i = 0; i < rockCount; i++) {
       let x = Math.floor(random(0,matrixSize-1));
       let y = Math.floor(random(0,matrixSize-1));
       matrix[y][x] = 5;
   }
   for (let i = 0; i < tntBlockCount; i++) {
       let x = Math.floor(random(0,matrixSize-1));
       let y = Math.floor(random(0,matrixSize-1));
       matrix[y][x] = 6;
   }
   for (let i = 0; i < randomLifeCount; i++) {
       let x = Math.floor(random(0,matrixSize-1));
       let y = Math.floor(random(0,matrixSize-1));
       matrix[y][x] = 7;
   }

   for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                let grassObject = new Grass(x, y);
                grasses.push(grassObject)
            } else if (matrix[y][x] == 2) {
                let grassEatObject = new GrassEater(x, y);
                grassEaterArr.push(grassEatObject)
            } else if (matrix[y][x] == 3) {
                let predatorObject = new Predator(x, y);
                predatorArr.push(predatorObject)
            } else if (matrix[y][x] == 4) {
                let mushroomObject = new Mushroom(x, y);
                mushroomArr.push(mushroomObject)
            } else if (matrix[y][x] == 6) {
                let tntblockObject = new TntBlock(x, y);
                tntblockArr.push(tntblockObject)
            } else if (matrix[y][x] == 7) {
                let randomlifeObject = new RandomLife(x, y);
                randomlifeArr.push(randomlifeObject)
            }

        }
    }
    io.emit("send message",matrix)
}

matrixGenerator(25, 100, 40, 10, 10, 10, 4, 3)

io.on("connection", (socket) => {
    socket.on("matrix", (matrixRestart, grass, grasseter, predator, mushroom, rock, tntblock, randomlife) => {
        if(matrixRestart == 1){
            matrixGenerator(25, grass, grasseter, predator, mushroom, rock, tntblock,randomlife)
        }
    });
  });




function generate(){
    matrixGenerator(20, 10, 20, 10, 10, 10, 10)    
}

   






function gameMove(){
   for (let i in grasses) {
      grasses[i].mul();
  }
   for (let i in grassEaterArr) {
      grassEaterArr[i].eat();
  }
  for (let i in predatorArr) {
      predatorArr[i].eat()
  }
  for (let i in mushroomArr) {
      mushroomArr[i].mul()
  }
  for (let i in tntblockArr) {
      tntblockArr[i].move()
  }
  for (let i in randomlifeArr) {
      randomlifeArr[i].move()
  }
  io.emit("send message",matrix)

}
setInterval(gameMove, 500)
io.on("matrix",generate)