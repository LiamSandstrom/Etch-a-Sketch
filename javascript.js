const container = document.querySelector(".container");
const input = document.querySelector("#input");
const button = document.querySelector("#div-button");
const squareSize = 15;
const animationTimeStart = 1;
let animationTime = animationTimeStart;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
//check if input has anything
//function clear divs
//if it does call createDivs(val)
button.addEventListener("click", reSize);

async function reSize(){
    if(input.value == "" || isNaN(input.value) || input.value > 50) return;
    let val = input.value;
    console.log(val)
    input.value = "";
    await clearDivs();
    await delay(200);
    createDivs(val);
}


async function clearDivs(){
    while(container.firstChild){
        container.removeChild(container.firstChild);
        await delay(animationTime);
    }
}


createDivs(16);
async function createDivs(amount){
    let containerSize = amount * squareSize;
    let squareSizePx = squareSize + "px";
    container.style.width = containerSize + "px";
    let totalSquare = amount * amount;

    for(let i = 0; i < totalSquare; i++){
        let square = document.createElement("div");
        square.classList.add("square");
        let background = document.createElement("div");
        let backgroundSizePx = (squareSize -  2) + "px";
        background.style.width = backgroundSizePx;
        background.style.height = backgroundSizePx;
        background.style.opacity = "0%";

        square.style.width = squareSizePx;
        square.style.height = squareSizePx;

        square.append(background);
        background.addEventListener("mouseenter", squareHover);


        container.append(square);

    }
}

function squareHover(e){
    if(!e.target.classList.contains("painted")){
        e.target.style.backgroundColor = `rgb(${randomColor()},${randomColor()}, ${randomColor()})`;
        e.target.classList.add("painted");
    }
    let val = parseFloat(e.target.style.opacity);
    if(val >= 1) return;
    val += 0.1;
    e.target.style.opacity = val;
    console.log(e.target.style.opacity);
}

function randomColor(){
    return Math.floor(Math.random()*255);
}
