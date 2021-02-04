const sketchBody = document.getElementById("sketch");
const slider = document.getElementById("range");
const drawInfo = document.getElementById("enableinfo");
const colorButton = document.getElementById("rgb");
const colorInput = document.getElementById("colorInput");
const gridvalue = document.getElementById("gridsize");
let chosencolor = "black";
let flag = 0;
let colorFlag = 1;
let gridSize = parseInt(slider.value);
drawgrid(gridSize);
pixels = document.querySelectorAll(".pixel");
drawInfo.style.color = "red";

// Draw gird again ig GridSize changes and remove Drawing mode;
slider.onchange = function () {
  let sliderValue = parseInt(this.value);
  removeGrid(sketchBody);
  gridSize = sliderValue;
  drawgrid(sliderValue);
  pixels = document.querySelectorAll(".pixel");
  if (flag === 1) {
    flag = 0;
    setDrawAttribute(pixels);
    drawInfo.textContent = "Drawing Mode is Off";
  }
  gridvalue.textContent = `${this.value} x ${this.value}`;
};
colorInput.addEventListener("change", (e) => {
  chosencolor = e.target.value;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "d") {
    if (flag === 0) {
      flag = 1;
      setDrawAttribute(pixels);
      drawInfo.style.color = "#35D900";
      drawInfo.textContent = "Drawing Mode is on 🌈: press 'd' to disable";
    } else {
      flag = 0;
      removeDrawAttribute(pixels);
      drawInfo.style.color = "red";
      drawInfo.textContent = "Drawing mode is Off 🚫: press 'd' to enable";
    }
  } else return;
});

colorButton.addEventListener("click", (e) => {
  if (colorFlag === 0) {
    colorFlag = 1;
    e.target.textContent = "Use Chosen Color";
  } else {
    colorFlag = 0;
    e.target.textContent = "Use Random colors";
    chosencolor = colorInput.value;
  }
});

// Function for rawing grid
function drawgrid(gridSize) {
  for (let i = 0; i < gridSize; i++) {
    const pixelColumns = document.createElement("div");
    pixelColumns.height = "500px";
    pixelColumns.width = `${500 / gridSize}px`;
    for (let i = 0; i < gridSize; i++) {
      let boxes = document.createElement("div");
      boxes.className = "pixel";
      boxes.style.width = `${500 / gridSize - 2}px`;
      boxes.style.height = `${500 / gridSize - 2}px`;
      boxes.style.border = "1px solid #151515";
      pixelColumns.appendChild(boxes);
    }
    sketchBody.appendChild(pixelColumns);
  }
}

// function to draw each box with color
function drawEach(pixel) {
  if (colorFlag === 0) {
    pixel.style.backgroundColor = chosencolor;
  } else {
    let [r, g, b] = randomRGB();
    pixel.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
  }
}

// adding drawEach funtion to each box as attribute
function setDrawAttribute(pixels) {
  pixels.forEach((pixel) => {
    pixel.setAttribute("onmouseover", "drawEach(this)");
  });
}

// Resetting grid
function removeGrid(sketchBody) {
  while (sketchBody.firstChild) {
    sketchBody.removeChild(sketchBody.firstChild);
  }
}

// Function to remove DrawEach funcion from each of the box
function removeDrawAttribute(pixels) {
  pixels.forEach((pixel) => {
    pixel.removeAttribute("onmouseover");
  });
}

function randomRGB() {
  let [R, G, B] = [
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
  ];
  return [R, G, B];
}

// enableButton.addEventListener("click", (e) => {
// //   if (flag === 0) {
// //     flag = 1;
// //     setDrawAttribute(pixels);
// //     e.target.textContent = "Disable Drawing ";
// //   } else {
// //     flag = 0;
// //     removeDrawAttribute(pixels);
// //     e.target.textContent = "Enable Drawing";
// //   }
// });
