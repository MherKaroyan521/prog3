module.exports = class LiveCreator{
    constructor(x, y){
        this.x = x;
        this.y = y; 
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
        var found = [];
        for (var i in this.directions) {
            var newX = this.directions[i][0];
            var newY = this.directions[i][1];
            if (newX >= 0 && newX < matrix[0].length && newY >= 0 && newY < matrix.length)
                if (matrix[newY][newX] == ch) {
                    found.push(this.directions[i]);
                }
        }
        return found;
    }
    random(ch){
        let found = this.chooseCell(ch);
        let result = Math.floor(Math.random()*found.length);
        return found[result];
    }
}