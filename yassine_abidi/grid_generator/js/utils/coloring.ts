import { randomRGB } from "../env/declarations";

export function generateRBG(RGBarray : number[])
{
    RGBarray[0] = Math.floor(Math.random() * 256);
    RGBarray[1] = Math.floor(Math.random() * 256);
    RGBarray[2] = Math.floor(Math.random() * 256);
}

export function colorifySelectedDivs(coordinates : number[], randomRGB : number[], divcount : number)
{
    let elemcol : number | undefined;
    let elemrow : number;
    let checkString : string | null;

    for (let i = 1; i <= 25; i++) {
        const elem = document.getElementById(i.toString());
        if (elem)
        {
            checkString = elem.getAttribute("column");
            if (checkString)
                elemcol = parseInt(checkString)
            checkString = elem.getAttribute("id");
            if (checkString && elemcol)
            {
                elemrow = Math.ceil(parseInt(checkString) / 5)
                if (elemrow >= Math.ceil(coordinates[0]) && elemrow <= Math.ceil(coordinates[2]) && elemcol >= Math.ceil(coordinates[1]) && elemcol <= Math.ceil(coordinates[3])) 
                {
                    elem.style.border = '1px dotted #FFF';
                    elem.style.backgroundColor = `rgba(${randomRGB[0]}, ${randomRGB[1]}, ${randomRGB[2]}, 0.2)`;
                    if (elemrow == Math.ceil(coordinates[0]) && elemcol == Math.ceil(coordinates[1]))
                        elem.textContent = `div ${divcount}`
                }
            }
        }
    }
}