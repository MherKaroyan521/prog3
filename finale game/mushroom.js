class Mushroom extends LiveCreator{
    constructor(x, y){
        super(x, y);
        this.multiply = 0;
    }

    chooseCell(ch) {
        return super.chooseCell(ch)
    }

    mul () {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
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

