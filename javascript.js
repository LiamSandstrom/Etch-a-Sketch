const container = document.querySelector(".container");
const squareSize = 50;

// function create div
//     sets container width to divs width * amount
//     creates the amount of divs 
//     add divs to container
createDivs(64);

function createDivs(amount){
    //find sqrt
    let containerSize = Math.floor(Math.sqrt(amount)) * squareSize;
    console.log(containerSize);
    let squareSizePx = squareSize + "px";
    container.style.width = containerSize + "px";

    for(let i = 0; i < amount; i++){
        let square = document.createElement("div");
        let background = document.createElement("div");
        background.style.width = squareSizePx;
        background.style.height = squareSizePx;
        square.style.width = squareSizePx;
        square.style.height = squareSizePx;
        square.append(background);
        square.classList.add("square");
        
        background.addEventListener("mouseenter", squareHover);


        container.append(square);
    }
}

function squareHover(e){
    e.target.style.backgroundColor = "black";
}
