let LiveCreator = require("./LifeParent");

module.exports = class GrassEater extends LiveCreator{
    constructor(x,y){
        super(x,y);
        this.energy = 8;
    }
    getNewCoordinates(){
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
    }
     
    getRandInt(min,max){
        var z = Math.floor(Math.random()*(max-min+1)) + min;
        return z;
    }
    mul () {
        this.getNewCoordinates();
        var chooseObject = this.random(0);
 
        if(chooseObject){
            var newX = chooseObject[0];
            var newY = chooseObject[1];
            matrix[newY][newX] = 2;
 
            var newGrassEater = new GrassEater(newX, newY);
            grassEaterArr.push(newGrassEater);
            this.energy = 10;
        }
    }

    eat() {
        this.getNewCoordinates();
        var emptyCells1 = this.random(1);
        var emptyCells2 = this.random(4);
        var cells = [emptyCells1,emptyCells2];
        var randomfound = this.getRandInt(0,cells.length-1);

        var newCell = cells[randomfound];
        if(newCell) {
            
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            if(this.energy > 15) {
                this.mul();
            }
                
            for (var i in mushroomArr) {
                if (newX == mushroomArr[i].x && newY == mushroomArr[i].y) {
                    mushroomArr.splice(i, 1);
                    this.energy -= 3;
                        
                    break;
                }
            } 
            
            for (var i in grasses) {
                    
                if (newX == grasses[i].x && newY == grasses[i].y) {
                    grasses.splice(i, 1);
                    this.energy += 5;
                    break;
                }
            }

            if (this.energy < 0){
                this.die();
            }
        } else {
            this.move();
        }
    }
    move() {
        this.getNewCoordinates();
        
        this.energy--;
        if (this.energy < 0){
            this.die();
        }
        var newCell = this.random(0);
        
        if(newCell && this.energy >= 0) {
            matrix[this.y][this.x] = 2;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }
        if (this.energy < 0){
            this.die();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }

}