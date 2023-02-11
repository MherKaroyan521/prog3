class GrassEater extends LiveCreator{
    constructor(x, y){
        super(x, y);
        this.energy = 10
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
     
    chooseCell(ch) {
        this.getNewCoordinates()
        return super.chooseCell(ch)
    }

    mul () {
        var emptyCells = this.chooseCell(0);
        var chooseObject = random(emptyCells);
 
        if(chooseObject){
            var newX = chooseObject[0];
            var newY = chooseObject[1];
            matrix[newY][newX] = 2;
 
            var newGrassEater = new GrassEater(newX, newY);
            grassEaterArr.push(newGrassEater);
            this.energy = 8;
        }
    }

    eat() {
        
        var emptyCells1 = this.chooseCell(1);
        var emptyCells2 = this.chooseCell(4);
        var cells = [emptyCells1,emptyCells2]
        var randomfound = random(cells)
        var newCell = random(randomfound);
        if(newCell) {
            
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0;
            this.x = newX
            this.y = newY
            if(this.energy > 20) {
                this.mul()
            }
                
                for (var i in mushroomArr) {
                    if (newX == mushroomArr[i].x && newY == mushroomArr[i].y) {
                        mushroomArr.splice(i, 1);
                        this.energy --
                        
                        break;
                    }
                } 
            
                for (var i in grasses) {
                    
                    if (newX == grasses[i].x && newY == grasses[i].y) {
                        grasses.splice(i, 1);
                        this.energy++
                        break;
                    }
                }
                if (this.energy < 0){
                    this.die()
                }
            
            
            
            
        } else {
            this.move()
        }
    }
    move() {
        if (this.energy < 0){
            this.die()
        }
        this.energy--
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        
        if(newCell && this.energy >= 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0;
            this.x = newX
            this.y = newY
        }
        if (this.energy < 0){
            this.die()
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

