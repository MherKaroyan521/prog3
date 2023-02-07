let matrix = []

var side = 10;
var grasses = [];
var grassEaterArr = [];
var predatorArr = [];
var mushroomArr = []

function setup() {
    function matrixGenerator(matrixSize, grassCount, grassEaterCount, predatorCount, mushroomCount, rockCount) {
        for (let i = 0; i < matrixSize; i++) {
            matrix[i] = []
            for (let o = 0; o < matrixSize; o++) {
                matrix[i][o] = 0;
            }
        }
        for (let i = 0; i < grassCount; i++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 1;
        }
        for (let i = 0; i < grassEaterCount; i++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 2;
        }
        for (let i = 0; i < predatorCount; i++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 3;
        }
        for (let i = 0; i < mushroomCount; i++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 4;
        }
        for (let i = 0; i < rockCount; i++) {
            let x = Math.floor(random(matrixSize));
            let y = Math.floor(random(matrixSize));
            matrix[y][x] = 5;
        }
    }
    


    matrixGenerator(30, 300, 10, 10, 10, 10)
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
            }

        }
    }

    frameRate(1);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
}


function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 4) {
                fill("blue");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 5) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
        }
    }

    //for (let i =0; i<8; i++)
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
}


console.log(grasses)
