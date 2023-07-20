///--------- PROPERTIES HANDLE ---------///

///--------- CANVAS VARIABLE ---------///
const canvas = document.getElementById("canv");
const ctx = canvas.getContext("2d");

const canvasView = document.querySelector(".canvas-view");

const bckgColorValue = document.getElementById("bckg-value"); // COLLOR INPUT FIELD FOR BACKGROUND
const colorPreviewElement = document.getElementById("bckg-preview"); // COLLOR INPUT FIELD FOR BACKGROUND

const circleColorValue = document.getElementById("clr-value"); // COLLOR INPUT FIELD FOR CIRCLE
const circleColorPreview = document.getElementById("clr-preview"); // COLLOR INPUT FIELD FOR CIRCLE

const downloadButton = document.getElementById("download-btn");

const randomButton = document.getElementById("roll-random");

const radiusRangeInput = document.getElementById("radius-value");
const circleNumRangeInput = document.getElementById("number-value");

let bckgColor = colorPreviewElement.value.toString();
let circleColor = circleColorPreview.value.toString();

canvas.width = canvasView.clientWidth;
canvas.height = canvasView.clientHeight;

window.onload = () => {
    bckgColorValue.value = bckgColor.substring(1);
    circleColorValue.value = circleColor.substring(1);
}

window.onresize = () => {
    canvas.width = canvasView.clientWidth;
    canvas.height = canvasView.clientHeight;
}

downloadButton.addEventListener("click", () => {

});



///--------- CANVAS DRAWING ---------///

let randomX;
let randomY;
let randomR;

let xPositions = [];
let yPositions = [];
let radius = [];

let circle;

function generateRandom(min, max) {
    // find diff
    let difference = max - min;
    // generate random number 
    let rand = Math.random();
    // multiply with difference 
    rand = Math.floor( rand * difference);
    // add with min value 
    rand = rand + min;
    return rand;
}

class Circle {
    constructor(x, y, r, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        ctx.fill();
    }
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function render(numberOfObjects, r, color) { // Function for rendering objects on screen
    for (let i = 0; i < numberOfObjects; i++) { // Render loop
        randomR = Math.floor((Math.random() * r) + 40); 
        randomX = generateRandom(randomR, canvas.width - randomR);
        randomY = generateRandom(randomR, canvas.height - randomR);

        radius[i] = randomR;
        xPositions[i] = randomX;
        yPositions[i] = randomY;
    
        circle = new Circle(randomX, randomY, randomR, color);
        
        circle.draw();
    } 
}

function reRender(numberOfObjects, color) {
    for (let i = 0; i < numberOfObjects; i++) { // Render loop
        circle = new Circle(xPositions[i], yPositions[i], radius[i], color);
    
        circle.draw();
    }
}

function reRenderRadius(numberOfObjects, r, color) {
    for (let i = 0; i < numberOfObjects; i++) { // Render loop
        circle = new Circle(xPositions[i], yPositions[i], r, color);
    
        circle.draw();
    }
}

randomButton.addEventListener("click", () => {
    clear();
    render(circleNumRangeInput.value, radiusRangeInput.value, circleColor);
})


///--------- CIRCLE COLOR RERENDER ---------///


circleColorPreview.oninput = () => { 
    circleColor = circleColorPreview.value.toString().toUpperCase();
    circleColorValue.value = circleColor.substring(1);
    clear();
    reRender(circleNumRangeInput.value, circleColor);
}

colorPreviewElement.oninput = () => {
    let bckgColor = colorPreviewElement.value.toString().toUpperCase();
    bckgColorValue.value = bckgColor.substring(1);
    canvas.style.backgroundColor = bckgColor;
}

circleNumRangeInput.oninput = () => {
    console.log(circleNumRangeInput.value);
    clear();
    render(circleNumRangeInput.value, radiusRangeInput.value, circleColor);
} 

radiusRangeInput.oninput = () => {
    console.log(radiusRangeInput.value);
    clear();
    reRenderRadius(circleNumRangeInput.value, radiusRangeInput.value, circleColor);
}

render(circleNumRangeInput.value, radiusRangeInput.value, circleColor);

console.log("X: ", xPositions);
console.log("Y: ", yPositions);
console.log("R: ", radius);

