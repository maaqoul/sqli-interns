export let divcount: number = 1;

export function incDivcount() {
    divcount++;
}

export let columnGapValue: number = 0;
export let rowGapValue: number = 0;

export function setcolumnGapValue(value : number)
{
    columnGapValue = value;
}

export function setrowGapValue(value : number)
{
    rowGapValue = value;
}

export let firstDivClickedCoordinates: number[] = [];
export let lastDivClickedCoordinates: number[] = [];
export let coordinates: number[] = [];

export let randomRGB: number[] = [];

export let cssCode: Element = document.createElement('div');
export let htmlCode: Element = document.createElement('div');
