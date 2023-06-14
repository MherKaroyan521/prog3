let socket = io();
var side = 10;
let select = 0;
let pause1 = 0;

let selector;

let color1 = [
    ["#acacac","#FAFBF2", "#E7F2A1", "#FC7D77", "#A9C8F8","black","pink","orange"],
    ["#acacac","green", "yellow", "red", "blue","black","pink", "orange"],
    ["#acacac","#13FF00", "#E4FF00", "#FF3200", "#00B9FF","black","pink", "orange"],
    ["#acacac","#C5FF00", "#FFFB00", "#FD4747", "#004CC0","black","pink", "orange"],
    ["green", "FFE800", "red", "blue","black","pink","#FAFBF2", "#E7F2A1", "#FABEB2", "#A9C8F8","#13FF00", "#E4FF00", "#FF3200", "#00B9FF","#C5FF00", "#FFFB00", "#FD4747", "#004CC0","black","orange"]
]

let colorNumber = 1;

let matrixRestart = 0;

let grassCount;
let grasseterCount;
let mushroomCount;
let predatorCount;
let rockCount;
let tntblockCount;
let randomlifeCount;

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
function restart(){
    matrixRestart = 1
    grassCount = document.getElementById("grassCount").value
    grasseterCount = document.getElementById("grasseterCount").value
    mushroomCount = document.getElementById("mushroomCount").value
    predatorCount = document.getElementById("predatorCount").value
    rockCount = document.getElementById("rockCount").value
    tntblockCount = document.getElementById("tntblockCount").value
    randomlifeCount = document.getElementById("rabdomlifeCount").value
}


let count = [0,0,0,0,0,0,0]
function setup() {
    
   

    frameRate(1);
    createCanvas(side * 25, side * 25);
    background('#acacac');
}
function update(matrix) {
    count = [0,0,0,0,0,0,0,0]
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
                if(colorNumber == 4){
                    if(matrix[y][x] == 0){
                        fill("#acacac");
                        rect(x * side, y * side, side, side);
                    }else{
                        let colorColor = Math.floor(random(0,(color1[colorNumber].length)))
                        fill(color1[colorNumber][colorColor]);
                        rect(x * side, y * side, side, side);
                    }
                }else{

                    fill(color1[colorNumber][matrix[y][x]]);
                    rect(x * side, y * side, side, side);
                }
                count[matrix[y][x]]++
        }
    }
    socket. emit("matrix", matrixRestart, grassCount, grasseterCount, mushroomCount, predatorCount, rockCount, tntblockCount,randomlifeCount);
    matrixRestart = 0




} 
function DOM(){

    document.getElementById("grass").innerHTML = "Խոտ " + count[1];
    document.getElementById("grasseter").innerHTML = "Խոտակեր " + count[2];
    document.getElementById("predator").innerHTML = "Ամենակեր " + count[3];
    document.getElementById("mushroom").innerHTML = "Սունկ " + count[4];
    document.getElementById("rock").innerHTML = "Քար " + count[5];
    document.getElementById("tntblock").innerHTML = "Tntblock " + count[6]; 
    document.getElementById("randomlife").innerHTML = "Randomlife " + count[7];


    if(colorNumber == 4){
        document.getElementById("grasscolor").style.backgroundColor = random(color1[colorNumber]);
        document.getElementById("grassetercolor").style.backgroundColor = random(color1[colorNumber]);
        document.getElementById("predatorcolor").style.backgroundColor = random(color1[colorNumber]);
        document.getElementById("mushroomcolor").style.backgroundColor = random(color1[colorNumber]);
        document.getElementById("rockcolor").style.backgroundColor = random(color1[colorNumber]);
        document.getElementById("tntblockcolor").style.backgroundColor = random(color1[colorNumber]);
        document.getElementById("randomlifecolor").style.backgroundColor = random(color1[colorNumber]);
    }else{
        document.getElementById("grasscolor").style.backgroundColor = color1[colorNumber][1];
        document.getElementById("grassetercolor").style.backgroundColor = color1[colorNumber][2];
        document.getElementById("predatorcolor").style.backgroundColor = color1[colorNumber][3];
        document.getElementById("mushroomcolor").style.backgroundColor = color1[colorNumber][4];
        document.getElementById("rockcolor").style.backgroundColor = color1[colorNumber][5];
        document.getElementById("tntblockcolor").style.backgroundColor = color1[colorNumber][6];
        document.getElementById("randomlifecolor").style.backgroundColor = color1[colorNumber][7];
    }
    
    
    
}

socket.emit("matrix", 1);

setInterval(DOM, 500)
// setInterval(
//     select = document.getElementById("select").value,
//     500
// )
socket.on("send message", update)
