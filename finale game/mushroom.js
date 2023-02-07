class Mushroom{
    constructor(x, y){
        this.x = x; //2 //3
        this.y = y; //1 //3
        this.multiply = 0;
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

    chooseCell() {
        var found = [];
        for (var i in this.directions) {
            var newX = this.directions[i][0];
            var newY = this.directions[i][1];
            if (newX >= 0 && newX < matrix[0].length && newY >= 0 && newY < matrix.length)
                if (matrix[newY][newX] == 0) {
                    found.push(this.directions[i]);
                }
        }
        return found;
    }

    mul () {
        this.multiply++;
        var emptyCells = this.chooseCell();
        var chooseObject = random(emptyCells);
 
        if(chooseObject && this.multiply >= 2){
            var newX = chooseObject[0];
            var newY = chooseObject[1];
            matrix[newY][newX] = 4;
 
            var newMushroom = new Mushroom(newX, newY);
            mushroomArr.push(newMushroom);
            this.multiply = 0;
        }
    }


}
