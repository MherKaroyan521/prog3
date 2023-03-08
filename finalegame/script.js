



// let matrix = []
let socket = io()
var side = 10;
// var grasses = [];
// var grassEaterArr = [];
// var predatorArr = [];
// var mushroomArr = []
let color1 = [
    ["#acacac","#FAFBF2", "#E7F2A1", "#FC7D77", "#A9C8F8","black","pink"],
    ["#acacac","green", "yellow", "red", "blue","black","pink"],
    ["#acacac","#13FF00", "#E4FF00", "#FF3200", "#00B9FF","black","pink"],
    ["#acacac","#C5FF00", "#FFFB00", "#FD4747", "#004CC0","black","pink"],
    ["green", "FFE800", "red", "blue","black","pink","#FAFBF2", "#E7F2A1", "#FABEB2", "#A9C8F8","#13FF00", "#E4FF00", "#FF3200", "#00B9FF","#C5FF00", "#FFFB00", "#FD4747", "#004CC0","black"]
]

let colorNumber = 1

function winter(){
    colorNumber = 0
}
function spring(){
    colorNumber = 1
}
function summer(){
    colorNumber = 2
}
function autumn(){
    colorNumber = 3
}
function randomColor(){
    colorNumber = 4
}



let count = [0,0,0,0,0,0,0]
function setup() {
    
   

    frameRate(1);
    createCanvas(side * 25, side * 25);
    background('#acacac');
}
function update(matrix) {
    count = [0,0,0,0,0,0,0]
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
                if(colorNumber == 4){
                    if(matrix[y][x] == 0){
                        fill("#acacac");
                        rect(x * side, y * side, side, side);
                    }else{
                        count[matrix[y][x]]++
                        let colorColor = Math.floor(random(0,(color1[colorNumber].length)))
                        console.log(colorColor)
                        fill(color1[colorNumber][colorColor]);
                        rect(x * side, y * side, side, side);
                    }
                }else{
                    count[matrix[y][x]]++

                    fill(color1[colorNumber][matrix[y][x]]);
                    rect(x * side, y * side, side, side);
                }
        }
    }





} 
function DOM(){

    document.getElementById("grass").innerHTML = "Խոտ " + count[1];
    document.getElementById("grasseter").innerHTML = "Խոտակեր " + count[2];
    document.getElementById("predator").innerHTML = "Ամենակեր " + count[3];
    document.getElementById("mushroom").innerHTML = "Սունկ " + count[4];
    document.getElementById("rock").innerHTML = "Քար " + count[5];
    document.getElementById("tntblock").innerHTML = "Tntblock " + count[6]; 


    if(colorNumber == 4){
        document.getElementById("grasscolor").style.backgroundColor = random(color1[colorNumber]);
        document.getElementById("grassetercolor").style.backgroundColor = random(color1[colorNumber]);
        document.getElementById("predatorcolor").style.backgroundColor = random(color1[colorNumber]);
        document.getElementById("mushroomcolor").style.backgroundColor = random(color1[colorNumber]);
        document.getElementById("rockcolor").style.backgroundColor = random(color1[colorNumber]);
        document.getElementById("tntblockcolor").style.backgroundColor = random(color1[colorNumber]);
    }else{
        document.getElementById("grasscolor").style.backgroundColor = color1[colorNumber][1];
        document.getElementById("grassetercolor").style.backgroundColor = color1[colorNumber][2];
        document.getElementById("predatorcolor").style.backgroundColor = color1[colorNumber][3];
        document.getElementById("mushroomcolor").style.backgroundColor = color1[colorNumber][4];
        document.getElementById("rockcolor").style.backgroundColor = color1[colorNumber][5];
        document.getElementById("tntblockcolor").style.backgroundColor = color1[colorNumber][6];
    }
    
    
    
}

setInterval(DOM, 500)
socket.on("send message", update)
