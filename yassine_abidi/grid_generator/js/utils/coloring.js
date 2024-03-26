export function generateRBG(RGBarray) {
    RGBarray[0] = Math.floor(Math.random() * 256);
    RGBarray[1] = Math.floor(Math.random() * 256);
    RGBarray[2] = Math.floor(Math.random() * 256);
}
export function colorifySelectedDivs(coordinates, randomRGB, divcount) {
    var elemcol;
    var elemrow;
    var checkString;
    for (var i = 1; i <= 25; i++) {
        var elem = document.getElementById(i.toString());
        if (elem) {
            checkString = elem.getAttribute("column");
            if (checkString)
                elemcol = parseInt(checkString);
            checkString = elem.getAttribute("id");
            if (checkString && elemcol) {
                elemrow = Math.ceil(parseInt(checkString) / 5);
                if (elemrow >= Math.ceil(coordinates[0]) && elemrow <= Math.ceil(coordinates[2]) && elemcol >= Math.ceil(coordinates[1]) && elemcol <= Math.ceil(coordinates[3])) {
                    elem.style.border = '1px dotted #FFF';
                    elem.style.backgroundColor = "rgba(".concat(randomRGB[0], ", ").concat(randomRGB[1], ", ").concat(randomRGB[2], ", 0.2)");
                    if (elemrow == Math.ceil(coordinates[0]) && elemcol == Math.ceil(coordinates[1]))
                        elem.textContent = "div ".concat(divcount);
                }
            }
        }
    }
}
