
let LiveCreator = require("./LifeParent")


module.exports = class Mushroom extends LiveCreator{
    constructor(x, y){
        super(x, y);
        this.multiply = 0;
    }


    mul () {
        this.multiply++;

        var chooseObject = this.random(0);
 
        if(chooseObject && this.multiply >= 4){
            var newX = chooseObject[0];
            var newY = chooseObject[1];
            matrix[newY][newX] = 4;
 
            var newMushroom = new Mushroom(newX, newY);
            mushroomArr.push(newMushroom);
            this.multiply = 0;
        }
    }


}

