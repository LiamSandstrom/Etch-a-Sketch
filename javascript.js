const container = document.querySelector(".container");
const input = document.querySelector("#input");
const button = document.querySelector("#div-button");
const colors = document.querySelectorAll(".color-picker");
const currentColorUI = document.querySelector("#current-color");
const squareSize = 15;
const animationTimeStart = 1;

let animationTime = animationTimeStart;
let currentColor = "black";
let currentColorInterval;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
button.addEventListener("click", reSize);
window.addEventListener("keypress", colorInput);

createDivs(16);
initializeColorPickers();

function colorInput(e){
    let input = e.key;
    console.log(input)
    if(input === "Enter"){
        reSize();
        return;
    }
    if(!isNaN(input) && input > 0 && input < 7){
        console.log(input);
        let color = colors[input - 1].value;
        setCurrentColor(color);
    }
}

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

function createDivs(amount){
    let containerSize = amount * squareSize;
    let squareSizePx = squareSize + "px";
    container.style.width = containerSize + "px";
    let totalSquare = amount * amount;

    for(let i = 0; i < totalSquare; i++){
        let square = document.createElement("div");
        square.classList.add("square");
        square.style.width = squareSizePx;
        square.style.height = squareSizePx;

        let background = document.createElement("div");
        let backgroundSizePx = (squareSize -  2) + "px";
        background.style.width = backgroundSizePx;
        background.style.height = backgroundSizePx;
        background.style.opacity = "0%";

        square.append(background);
        background.addEventListener("mouseenter", squareHover);
        container.append(square);
    }
}

function squareHover(e){
        if(currentColor === "random"){
            e.target.style.backgroundColor = `rgb(${randomColor()},${randomColor()}, ${randomColor()})`;
        }
        else{
            e.target.style.backgroundColor = currentColor;
        }
        e.target.classList.add("painted");
    let val = parseFloat(e.target.style.opacity);
    if(val >= 1) return;
    val += 0.125;
    e.target.style.opacity = val;
    console.log(e.target.style.opacity);
}

function randomColor(){
    return Math.floor(Math.random()*255);
}

function initializeColorPickers(){
    for(let color of colors){
        color.addEventListener("click", () => setCurrentColor(color.value));
        if(color.value == "random"){
            setInterval(()=> randomColorTick(color), 1000);
            return;
        }
        color.style.backgroundColor = color.value;
        
    }
}

function setCurrentColor(color){
    console.log(color);
    if(color === "random"){
        currentColor = "random";
        currentColorInterval = setInterval(() => randomColorTick(currentColorUI), 1000);
        return;
    }
    if(currentColor === "random"){
        clearInterval(currentColorInterval);
    }
    currentColor = color;
    currentColorUI.style.backgroundColor = currentColor;
}

async function randomColorTick(target){
    target.style.backgroundColor = `rgb(${randomColor()},${randomColor()}, ${randomColor()})`;
}