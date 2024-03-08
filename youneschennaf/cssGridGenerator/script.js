document.addEventListener("DOMContentLoaded", () => {
  let start;
  let divCounts = 1;

  const dialog = document.querySelector("dialog");
  const showBtn = document.querySelector(".showCode");
  const codeDiv = document.querySelector(".codeDiv");
  const doneBtn = document.querySelector(".doneBtn");
  const resetBtn = document.querySelector(".resetGrid");
  const gridLayout = document.querySelector(".gridLayout");
  const formSetting = document.querySelector("#formSettings");
  const showCssHtml = document.querySelector(".showHtmlCss");

  const cssContainer = document.createElement("p");
  cssContainer.style.color = "#F76B15";
  const divsCss = document.createElement("p");
  const divsHtml = document.createElement("p");

  const createDivsHtml = (num) => {
    const firstSpan = document.createElement("span");
    firstSpan.innerHTML += `&lt;div class="parent"&gt;<br />`;
    divsHtml.appendChild(firstSpan);
    for (let i = 1; i < num; i++) {
      divsHtml.appendChild(appendDivHtml(i));
    }
    let lastDiv = document.createElement("span");
    lastDiv.innerHTML += `${divCounts === 1 ? "<br />" : ""}&lt;/div&gt;<br />`;
    divsHtml.appendChild(lastDiv);
  };

  showCssHtml.addEventListener("click", () => {
    if (showCssHtml.dataset.current === "css") {
      clearCssContainer();
      clearDivsHtml();
      createDivsHtml(divCounts);
      cssContainer.appendChild(divsHtml);
      showCssHtml.dataset.current = "html";
    } else if (showCssHtml.dataset.current === "html") {
      clearCssContainer();
      clearDivsHtml();
      initialiseContainer();
      cssContainer.appendChild(divsCss);
      showCssHtml.dataset.current = "css";
    }
  });

  resetBtn.addEventListener("click", () => {
    clearGrid();
    initialiseMainGrid();
  });

  doneBtn.addEventListener("click", () => {
    dialog.close();
  });

  showBtn.addEventListener("click", () => {
    dialog.showModal();
    clearCssContainer();
    clearDivsHtml();
    initialiseContainer();
    cssContainer.appendChild(divsCss);
    showCssHtml.dataset.current = "css";
    codeDiv.appendChild(cssContainer);
  });

  const appendDiv = (num, start, end) => {
    const newDiv = document.createElement("code");
    newDiv.innerHTML += `.div${num} { grid-area: ${start[0] + 1} / ${
      start[1] + 1
    } / ${end[0] + 2} / ${end[1] + 2}; }<br />`;
    return newDiv;
  };

  const appendDivHtml = (num) => {
    const newDiv = document.createElement("span");
    newDiv.classList.add("sp");
    newDiv.innerHTML += `&lt;div class="div${num}"&gt; &lt;/div&gt;<br />`;
    return newDiv;
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      dialog.close();
    }
  });

  const generateColor = () => {
    return `rgba(${Math.floor(Math.random() * 256)},${Math.floor(
      Math.random() * 256
    )},${Math.floor(Math.random() * 256)}, 0.75)`;
  };

  const appendGrid = (end) => {
    const color = generateColor();

    if (start[0] > end[0]) {
      let tmp = start[0];
      start[0] = end[0];
      end[0] = tmp;
    }
    if (start[1] > end[1]) {
      let tmp = start[1];
      start[1] = end[1];
      end[1] = tmp;
    }
    divsCss.appendChild(appendDiv(divCounts++, start, end));
    for (let i = start[0]; i <= end[0]; i++) {
      for (let j = start[1]; j <= end[1]; j++) {
        document.querySelector(`.box[pos="${i},${j}"]`).style.backgroundColor =
          color;
      }
    }
  };

  const addBox = (rows, columns) => {
    let count = 1;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const box = document.createElement("div");
        box.classList.add("box", `box${count++}`);
        box.setAttribute("pos", i + "," + j);
        box.addEventListener("mousedown", () => {
          start = [i, j];
        });
        box.addEventListener("mouseup", () => {
          appendGrid([i, j]);
        });
        gridLayout.appendChild(box);
      }
    }
  };

  const clearCssContainer = () => {
    while (cssContainer.firstChild) {
      cssContainer.removeChild(cssContainer.firstChild);
    }

    cssContainer.innerHTML = "";
  };

  const clearDivsHtml = () => {
    while (divsHtml.firstChild) {
      divsHtml.removeChild(divsHtml.firstChild);
    }
    divsHtml.innerHTML = "";
  };

  const clearGrid = () => {
    while (gridLayout.firstChild) {
      gridLayout.removeChild(gridLayout.firstChild);
    }

    clearCssContainer();
    clearDivsHtml();

    while (divsCss.firstChild) {
      divsCss.removeChild(divsCss.firstChild);
    }
    divsCss.innerHTML = "";
    divCounts = 1;
  };

  const createSpan = (text) => {
    const sp = document.createElement("span");
    sp.classList.add("sp");
    sp.textContent = text;
    sp.innerHTML += "<br />";
    return sp;
  };

  const initialiseContainer = () => {
    cssContainer.innerHTML += ".parent {<br />";
    cssContainer.appendChild(createSpan(`display: grid;`));
    cssContainer.appendChild(
      createSpan(
        `grid-template-columns: ${gridLayout.style.gridTemplateColumns};`
      )
    );
    cssContainer.appendChild(
      createSpan(`grid-template-rows: ${gridLayout.style.gridTemplateRows};`)
    );
    cssContainer.appendChild(
      createSpan(`grid-column-gap: ${gridLayout.style.columnGap};`)
    );
    cssContainer.appendChild(
      createSpan(`grid-row-gap: ${gridLayout.style.rowGap};`)
    );
    cssContainer.innerHTML += "}<br /><br />";
  };

  const initialiseMainGrid = () => {
    const formSettingData = new FormData(formSetting);
    const objSetting = {
      columns: parseInt(formSettingData.get("columns")),
      rows: parseInt(formSettingData.get("rows")),
      columnGap: formSettingData.get("columnGap"),
      rowGap: formSettingData.get("rowGap"),
    };

    gridLayout.style.gridTemplateColumns = `repeat(${objSetting["columns"]}, 1fr)`;
    gridLayout.style.gridTemplateRows = `repeat(${objSetting["rows"]}, 1fr)`;
    gridLayout.style.columnGap = `${objSetting["columnGap"]}px`;
    gridLayout.style.rowGap = `${objSetting["rowGap"]}px`;
    initialiseContainer();
    cssContainer.appendChild(divsCss);
    addBox(objSetting["rows"], objSetting["columns"]);
  };

  formSetting.addEventListener("submit", (e) => {
    e.preventDefault();
    clearGrid();
    initialiseMainGrid();
  });

  initialiseMainGrid();
});
