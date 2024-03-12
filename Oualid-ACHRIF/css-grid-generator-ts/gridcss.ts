class GridGenerator {
  private columns: HTMLInputElement;
  private rows: HTMLInputElement;
  private gap: HTMLInputElement;
  private result: HTMLElement;
  private code: HTMLTextAreaElement;

  private drag: boolean = false;
  private startRow: number = 0;
  private startCol: number = 0;
  private endRow: number = 0;
  private endCol: number = 0;

  private gridItems: any[] = [];

  constructor() {
    this.columns = document.getElementById("columns") as HTMLInputElement;
    this.rows = document.getElementById("rows") as HTMLInputElement;
    this.gap = document.getElementById("gap") as HTMLInputElement;
    this.result = document.getElementById("result") as HTMLDivElement;
    this.code = document.getElementById("code") as HTMLTextAreaElement;
    console.log(this.columns);
    console.log(parseInt(this.columns.value));

    this.result.addEventListener("mousedown", this.onMouseDown.bind(this));
    document.addEventListener("mousemove", this.onMouseMove.bind(this));
    document.addEventListener("mouseup", this.onMouseUp.bind(this));
    this.result.addEventListener("touchstart", this.onTouchStart.bind(this));
    document.addEventListener("touchmove", this.onTouchMove.bind(this));
    document.addEventListener("touchend", this.onTouchEnd.bind(this));

    this.initEventListeners();
    this.initDivs();
    this.generateCss();
  }

  private initEventListeners() {
    const generateButton = document.getElementById("generate");
    if (generateButton) {
      generateButton.addEventListener("click", () => this.generate());
    }
  }

  initDivs(): void {
    this.result.style.display = "grid";
    this.result.style.gridTemplateColumns = `repeat(4, 1fr)`;
    this.result.style.gridTemplateRows = `repeat(4, 1fr)`;
    this.result.style.gap = `0px`;
    this.result.innerHTML = "";
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        const item = document.createElement("div");
        item.className = "grid-item";
        item.innerText = ``;
        item.dataset.row = row.toString();
        item.dataset.column = col.toString();
        this.result.appendChild(item);
        this.gridItems.push(item);
      }
    }
  }
  // generate css with divs selection 
  generateCss(): string {
    const selectedItems = this.gridItems.filter((item) =>
      item.classList.contains("selected")
    );
    console.log("selectedItems : ", selectedItems);
    if (selectedItems.length === 0) return "";
    let minRow: number = Infinity;
    let minCol: number = Infinity;
    let maxRow: number = 1;
    let maxCol: number = -1;
    selectedItems.forEach((item) => {
      console.log("item.dataset.column:", item.dataset.column);
      const row = parseInt(item.dataset.row, 10);
      const col = parseInt(item.dataset.column, 10);
      minRow = Math.min(minRow, row);
      minCol = Math.min(minCol, col);
      maxRow = Math.max(maxRow, row);
      maxCol = Math.max(maxCol, col);
    });
    const selectedColumns = maxCol - minCol + 1;
    const selectedRows = maxRow - minRow + 1;
    const css = `
    /* Grid Container */
    .container {
        display: grid;
        grid-template-columns: repeat(${selectedColumns}, 1fr);
        grid-template-rows: repeat(${selectedRows}, 1fr);
        gap: 0;
    }`;

    const gridArea = `${minRow + 1} / ${minCol + 1} / ${maxRow + 2} / ${
      maxCol + 2
    }`;
    const selectedAreaCSS = `
    .selected-area { 
        grid-area: ${gridArea}; 
    }`;

    const myCss = `${css}\n${selectedAreaCSS}\n`;
    this.code.value = myCss;

    return myCss;
  }
  // generate css with generate button
  generate(): void {
    this.result.style.display = "grid";
    this.result.style.gridTemplateColumns = `repeat(${this.columns.value}, 1fr)`;
    this.result.style.gridTemplateRows = `repeat(${this.rows.value}, 1fr)`;
    this.result.style.gap = "10px";
    this.result.innerHTML = "";

    const col: number = parseInt(this.columns.value);
    const row: number = parseInt(this.rows.value);
    for (let i = 0; i < col * row; i++) {
      const gridItem = document.createElement("div");
      gridItem.classList.add("grid-items");
      gridItem.innerText = "div " + (i + 1);
      this.result.appendChild(gridItem);
    }
    this.code.value = `/* Grid Container */
    display: grid;
    grid-template-columns: repeat(${col}, 1fr);
    grid-template-rows: repeat(${row}, 1fr);
    gap: ${this.gap.value}px;
    `;
  }
 // mouse events

  onMouseDown(e: MouseEvent): void {
    this.drag = true;
    document.body.style.cursor = "grab";
    document.body.style.userSelect = "none";
    this.startRow = e.pageX - this.result.offsetLeft;
    this.startCol = e.pageY - this.result.offsetTop;
    this.gridItems.forEach((item) => item.classList.remove("selected"));
  }

  onMouseMove(e: MouseEvent): void {
    if (!this.drag) return;
    document.body.style.cursor = "grabbing";
    this.endRow = e.pageX - this.result.offsetLeft;
    this.endCol = e.pageY - this.result.offsetTop;

    const rect = {
      left: Math.min(this.startRow, this.endRow),
      top: Math.min(this.startCol, this.endCol),
      right: Math.max(this.startRow, this.endRow),
      bottom: Math.max(this.startCol, this.endCol),
    };

    this.gridItems.forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      const relativeItemRect = {
        left: itemRect.left - this.result.offsetLeft,
        top: itemRect.top - this.result.offsetTop,
        right: itemRect.right - this.result.offsetLeft,
        bottom: itemRect.bottom - this.result.offsetTop,
      };

      if (
        rect.left < relativeItemRect.right &&
        rect.right > relativeItemRect.left &&
        rect.top < relativeItemRect.bottom &&
        rect.bottom > relativeItemRect.top
      ) {
        item.classList.add("selected");
      }
    });
  }

  onMouseUp(): void {
    if (this.drag) {
      this.generateCss();
      this.drag = false;
    } else {
      const code = document.getElementById("code");
      if (code) {
        code.innerHTML = "";
      }
    }
  }

  // Touch events
  onTouchStart(e: TouchEvent): void {
    e.preventDefault();
    this.drag = true;
    this.startRow = e.touches[0].clientX - this.result.offsetLeft;
    this.startCol = e.touches[0].clientY - this.result.offsetTop;
    this.gridItems.forEach((item) => item.classList.remove("selected"));
  }

  onTouchMove(e: TouchEvent): void {
    if (!this.drag) return;
    e.preventDefault();
    this.endRow = e.touches[0].clientX - this.result.offsetLeft;
    this.endCol = e.touches[0].clientY - this.result.offsetTop;

    const rect = {
      left: Math.min(this.startRow, this.endRow),
      top: Math.min(this.startCol, this.endCol),
      right: Math.max(this.startRow, this.endRow),
      bottom: Math.max(this.startCol, this.endCol),
    };

    this.gridItems.forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      const relativeItemRect = {
        left: itemRect.left - this.result.offsetLeft,
        top: itemRect.top - this.result.offsetTop,
        right: itemRect.right - this.result.offsetLeft,
        bottom: itemRect.bottom - this.result.offsetTop,
      };

      if (
        rect.left < relativeItemRect.right &&
        rect.right > relativeItemRect.left &&
        rect.top < relativeItemRect.bottom &&
        rect.bottom > relativeItemRect.top
      ) {
        item.classList.add("selected");
      }
    });
  }

  onTouchEnd(e: TouchEvent): void {
    if (this.drag) {
      this.generateCss();
      this.drag = false;
    } else {
      const code = document.getElementById("code");
      if (code) {
        code.innerHTML = "";
      }
    }
  }
}
document.addEventListener("DOMContentLoaded", () => {
  new GridGenerator();
});
