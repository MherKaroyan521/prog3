let LiveCreator = require("./LifeParent")


module.exports = class TntBlock extends LiveCreator{
    constructor(x, y){
        super(x, y);
        this.time = 0;
        this.move1 = 0
    }
    getNewCoordinates(ch){
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
                [this.x - 1, this.y - 1], // 4,3
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
        }
        
        
    }
    move() {
        this.move1++
        this.time += Math.round(Math.random()*6)
        if(this.move1 = 3){
            this.getNewCoordinates(0)

            var newCell = this.random(0);
        // console.log(this.directions)

            if(newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = matrix[this.y][this.x]
                matrix[this.y][this.x] = 0;
                this.x = newX
                this.y = newY
            }
            
        }
        
        if (this.time >= 10){
            this.explode()
        }
    }
    choose(){
        this.getNewCoordinates(Math.round(Math.random()))
        var found = [];
        for (var i in this.directions) {
            var newX = this.directions[i][0];
            var newY = this.directions[i][1];
            // console.log([newX, newY])
            if (newX >= 0 && newX < matrix[0].length && newY >= 0 && newY < matrix.length)
                if (matrix[newY][newX] != 5 && matrix[newY][newX] != 6 && matrix[newY][newX] != 0 && newY != undefined && newX != undefined) {
                    found.push(this.directions[i]);
            }
        }
        return found; 
    }
    explode(){
        let explodeCell = this.choose()
        let number = []
        let cell = [undefined, grasses, grassEaterArr, predatorArr, mushroomArr]

        for(let j = 0; j < explodeCell.length; j++){
            let X = explodeCell[j][0]
            let Y = explodeCell[j][1]
            let numb = matrix[Y][X]
            number.push(matrix[Y][X])

            for (let z = 1; z < cell[numb].length; z++) {
                if (X == cell[numb][z].x && Y == cell[numb][z].y) {
                    

                    cell[numb].splice(z, 1);
                    matrix[Y][X] = 0
                    break;
                }
            }
        }   

        grasses = cell[1]
        grassEaterArr = cell[2]
        predatorArr = cell[3]
        mushroomArr = cell[4]

     
        this.time = 0
    }  
    
    
    
}