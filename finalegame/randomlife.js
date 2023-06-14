let LiveCreator = require("./LifeParent");

let Grass = require("./grass")
let GrassEater = require("./grasseter")
let Mushroom = require("./mushroom")
let Predator = require("./predator")

module.exports = class RandomLife extends LiveCreator{
    constructor(x, y){
        super(x, y);
        this.time = 0;
        this.move1 = 0;
        this.randomLifeSelector = [0,0,0,0,0,0,1,1,1,2,2,3,4,4]
    }


    getNewCordinates(ch) {
        if(ch == 0){
            this.directions = [
                [this.x - 1, this.y - 1], // 4,3
                [this.x    , this.y - 1],
                [this.x + 1, this.y - 1],
                [this.x - 1, this.y    ],
                [this.x + 1, this.y    ],
                [this.x - 1, this.y + 1],
                [this.x    , this.y + 1],
                [this.x + 1, this.y + 1]
            ];
        }else if(ch == 1){
            this.directions = [
                [this.x - 1, this.y - 1],
                [this.x    , this.y - 1],
                [this.x + 1, this.y - 1],
                [this.x - 1, this.y    ],
                [this.x + 1, this.y    ],
                [this.x - 1, this.y + 1],
                [this.x    , this.y + 1],
                [this.x + 1, this.y + 1],
                [this.x - 2, this.y - 2],
                [this.x - 1, this.y - 2],
                [this.x - 2, this.y - 1],
                [this.x    , this.y - 2],
                [this.x + 2, this.y - 2],
                [this.x + 2, this.y - 1],
                [this.x + 1, this.y - 2],
                [this.x + 2, this.y    ],
                [this.x + 2, this.y + 2],
                [this.x + 1, this.y + 2],
                [this.x + 2, this.y + 1],
                [this.x    , this.y + 2],
                [this.x - 2, this.y + 2],
                [this.x - 1, this.y + 2],
                [this.x - 2, this.y + 1],
                [this.x - 2, this.y    ]
            ];
        }else if(ch == 2){
            this.directions = [];
            let x1 = 0;
            let y1 = 0;
            for(let x = this.x; x < matrix[0].length-1; x++){
                x1++
                this.directions.push([this.x + x1, this.y    ])
            }
            x1 = 0;
            for(let x = this.x; x >= 1; x--){
                x1++
                this.directions.push([this.x - x1, this.y    ])
            }
            x1 = 0;
            for(let y = this.y; y < matrix.length-1; y++){
                y1++
                this.directions.push([this.x    , this.y + y1])   
            }
            y1 = 0
            for(let y = this.y; y >= 1; y--){
                y1++
                this.directions.push([this.x    , this.y - y1])               
            }

        }
    }
    move() {
        this.move1++
        this.time += Math.round(Math.random()*6)
        this.getNewCordinates(0)

        var newCell = this.random(0);
        if(this.move1 == 3 && newCell){
            
        // console.log(this.directions)


            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0;
            this.x = newX
            this.y = newY
            this.move1 = 0;
            
             
            
        }
        else if  (this.time >= 30){
            this.life()
        }
         
        
    }
    choose(){
        this.getNewCordinates(Math.round(Math.random()*2))
        var found = [];
        for (var i in this.directions) {
            var newX = this.directions[i][0];
            var newY = this.directions[i][1];
            // console.log([newX, newY])
            if (newX >= 0 && newX < matrix[0].length && newY >= 0 && newY < matrix.length)
                if (matrix[newY][newX] != 5 && matrix[newY][newX] != 7 && matrix[newY][newX] != 6 && newY != undefined && newX != undefined) {
                    found.push(this.directions[i]);
                }
        }
        return found; 
    }
    life(){
        let lifeCell = this.choose()
        let cell = [undefined, grasses, grassEaterArr, predatorArr, mushroomArr, undefined]

        for(let j = 0; j < lifeCell.length; j++){
            let X = lifeCell[j][0]
            let Y = lifeCell[j][1]
            let numb = matrix[Y][X]

            if(matrix[Y][X] != 0){
                for (let z = 1; z < cell[numb].length; z++) {
                
                    if (X == cell[numb][z].x && Y == cell[numb][z].y) {
                        
    
                        cell[numb].splice(z, 1);
                        matrix[Y][X] = 0
                        break;
                    }
                      
                }
            }
            
        }  
        for(let j = 0; j < lifeCell.length; j++){
            let X = lifeCell[j][0]
            let Y = lifeCell[j][1]
            let numb = this.randomLifeSelector[Math.floor(Math.random()*this.randomLifeSelector.length)]
            matrix[Y][X] = numb;
            if (numb == 1) {
                let grassObject = new Grass(X, Y);
                cell[1].push(grassObject)
            }else if(numb == 2){
                let grassEatObject = new GrassEater(X, Y);
                cell[2].push(grassEatObject)
            }else if(numb == 3){
                let predatorObject = new Predator(X, Y);
                cell[3].push(predatorObject)
            }else if(numb == 4){
                let mushroomObject = new Mushroom(X, Y);
                cell[4].push(mushroomObject)
            }
            
        }    



        grasses = cell[1]
        grassEaterArr = cell[2]
        predatorArr = cell[3]
        mushroomArr = cell[4]
     
        this.time = 0;
    }


}