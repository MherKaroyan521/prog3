let LiveCreator = require("./LifeParent");


module.exports = class Grass extends LiveCreator{
    constructor(x, y){
        super(x, y);
        this.multiply = 0;
    }


    mul () {
        this.multiply++;
        var chooseObject = this.random(0);
 
        if(chooseObject && this.multiply >= 2){
            var newX = chooseObject[0];
            var newY = chooseObject[1];
            matrix[newY][newX] = 1;
 
            var newGrass = new Grass(newX, newY);
            grasses.push(newGrass);
            this.multiply = 0;
        }
    }


}

