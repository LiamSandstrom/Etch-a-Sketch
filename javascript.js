const container = document.querySelector(".container");
const input = document.querySelector("#input");
const colors = document.querySelectorAll(".color-picker");
const currentColorUI = document.querySelector("#current-color");
const gridText = document.querySelector("#size-text");
const animationTimeStart = 1;
const containerSize = 600;
const startValue = 16;
const opacityAmount = 0.2;

let squareSize;
let animationTime = animationTimeStart;
let currentColor = "black";
let currentColorInterval;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
window.addEventListener("keypress", colorInput);
input.addEventListener("change", reSize);

createDivs(startValue);
input.value = startValue;
updateGridText();
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

function reSize(){
    if(input.value == "" || isNaN(input.value) || input.value > 64) return;
    let val = input.value;
    console.log(val)
    clearDivs();
    createDivs(val);
    updateGridText();
}

function clearDivs(){
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
}

function createDivs(amount){
    squareSize = containerSize / amount;
    container.style.width = containerSize + "px";
    container.style.height = containerSize + "px";
    let squareSizePx = squareSize + "px";
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
    val += opacityAmount;
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
        if(currentColor === "random"){
            return;
        }
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

function updateGridText(){
    let val = input.value;
    gridText.textContent = `${val}x${val}`;
}