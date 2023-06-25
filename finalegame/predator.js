let LiveCreator = require("./LifeParent");

module.exports = class Predator extends LiveCreator{
    constructor(x, y){
        super(x, y);
        this.energy = 20;
    }
    getNewCordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
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
    mul() {
        this.getNewCordinates();
        let exact = this.random(0);

        if (exact && this.energy > 20) {
            let x = exact[0];
            let y = exact[1];

            let pre = new Predator(x, y);
            matrix[y][x] = 3;
            predatorArr.push(pre);

            this.energy = 10;
        }
    }
    eat() {
        this.getNewCordinates();
        var emptyCells1 = this.random(1);
        var emptyCells2 = this.random(2);
        var cells = [emptyCells1,emptyCells2];
        var randomfound = this.getRandInt(0,cells.length-1);
        var exact = cells[randomfound];

        if (exact) {
            this.energy += 5;
            let x = exact[0];
            let y = exact[1];
    
            for (let i = 0; i < grasses.length; i++) {
                if (grasses[i].x == x && grasses[i].y == y) {
                        grasses.splice(i, 1);
                        break;
                }
                else {
                    for (let i = 0; i < grassEaterArr.length; i++) {
                        if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                                grassEaterArr.splice(i, 1);
                                break;
                        }
                    }
                }
            }
    
    
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
    
            this.x = x;
            this.y = y;
    
            if (this.energy > 20) {
                    this.mul();
            }
        } else {
                this.move();
        }
        
    }
    move() {
        this.getNewCordinates();
        let exact = this.random(0);

        if (exact) {

            let x = exact[0];
            let y = exact[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.energy--;

            if (this.energy < 0) {
                this.die();
            }
        } else {
            this.energy--;
            if (this.energy < 0) {
                this.die();
            }
        }
    }
    die() {
        for (let i = 0; i < predatorArr.length; i++) {
            if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
                predatorArr.splice(i, 1);
            }
        }
        matrix[this.y][this.x] = 0;
    }
}