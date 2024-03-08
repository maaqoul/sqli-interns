let mainDiv = document.getElementById("mainDiv");
const popup = document.getElementById("popupSection");
var myMap = new Map();
let columns = parseInt(document.getElementById("columnsInput").value);
let rows = parseInt(document.getElementById("rowsInput").value);
let columnsGap = parseInt(document.getElementById("columnsGapInput").value);
let rowsGap = parseInt(document.getElementById("rowsGapInput").value);

let firstDivToColor;
let lastDivToColor;

let numDivs = 1;
let pairs = [];
let code = "";

function createMainDiv() {
  mainDiv.innerHTML = "";
  code = `.parent {
    display: grid;
    grid-template-columns: repeat(${columns}, 1fr);
    grid-template-rows: repeat(${rows}, 1fr);
    grid-column-gap: ${columnsGap}px;
    grid-row-gap: ${rowsGap}px;
  }\n`;
  numDivs = 1;
  columns = parseInt(document.getElementById("columnsInput").value);
  rows = parseInt(document.getElementById("rowsInput").value);
  columnsGap = parseInt(document.getElementById("columnsGapInput").value);
  rowsGap = parseInt(document.getElementById("rowsGapInput").value);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < columns; i++) {
      let div = document.createElement("div");
      div.id = "div" + j + i;
      myMap.set(div.id, [j, i]);
      div.className = "sharedDiv";
      mainDiv.appendChild(div);
    }
  }
  mainDiv.style.display = "grid";
  mainDiv.style.cursor = "all-scroll";
  mainDiv.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  mainDiv.style.gridRowGap = `${rowsGap}px`;
  mainDiv.style.gridColumnGap = `${columnsGap}px`;
}

window.onload = function () {
  createMainDiv();
  mainDiv.addEventListener("mousedown", function (event) {
    const targetDiv = event.target;
    pairs = [];

    if (targetDiv && targetDiv.classList.contains("sharedDiv")) {
      const clickedDivId = targetDiv.id;
      const thisDiv = document.getElementById(clickedDivId);
      thisDiv.textContent = `div${numDivs}`;
      firstDivToColor = myMap.get(clickedDivId);
    }
  });

  mainDiv.addEventListener("mouseup", function (event) {
    const targetDiv = event.target;

    if (targetDiv && targetDiv.classList.contains("sharedDiv")) {
      const clickedDivId = targetDiv.id;

      lastDivToColor = myMap.get(clickedDivId);
      getDivsToColor(firstDivToColor, lastDivToColor);
    }
  });
};

function getDivsToColor() {
  let { maxX, minX } =
    firstDivToColor[0] > lastDivToColor[0]
      ? { maxX: firstDivToColor[0], minX: lastDivToColor[0] }
      : { maxX: lastDivToColor[0], minX: firstDivToColor[0] };
  let { maxY, minY } =
    firstDivToColor[1] > lastDivToColor[1]
      ? { maxY: firstDivToColor[1], minY: lastDivToColor[1] }
      : { maxY: lastDivToColor[1], minY: firstDivToColor[1] };

  for (let i = minX; i <= maxX; i++) {
    for (let j = minY; j <= maxY; j++) {
      pairs.push([i, j]);
    }
  }
  code += `.div${numDivs} {
    grid-area: ${firstDivToColor[0] + 1} / ${firstDivToColor[1] + 1} / ${
    lastDivToColor[0] + 2
  } / ${lastDivToColor[1] + 2};
}\n`;
  numDivs++;
  colorDivsSelected();
}

function colorDivsSelected() {
  const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)}, 0.5)`;

  for (let i = 0; i < pairs.length; i++) {
    const divToColor = document.getElementById(
      `div${pairs[i][0]}${pairs[i][1]}`
    );
    divToColor.style.backgroundColor = color;
  }
}

function getGridsCode() {
  const codeP = document.getElementById("codeP");
  popup.style.display = "block";
  codeP.innerHTML = code;
}

function closePopup() {
  popup.style.display = "none";
}
