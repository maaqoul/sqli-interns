export function addHtmlcss(coordinates, divcount, htmlCode, cssCode) {
    var pElement = document.createElement('p');
    var sepElemnt = document.createElement('p');
    pElement.textContent = ".div".concat(divcount, " { grid-area: ").concat(Math.ceil(coordinates[0]), " / ").concat(Math.ceil(coordinates[1]), " / ").concat(Math.ceil(coordinates[2]) + 1, " / ").concat(Math.ceil(coordinates[3]) + 1, "; }");
    sepElemnt.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp&lt;div class=\"div".concat(divcount, "\"&gt; &lt;/div&gt;");
    htmlCode.appendChild(pElement);
    cssCode.appendChild(sepElemnt);
}
export function fillDivsContainer(divsContainer) {
    for (var i = 1; i <= 5; i++) {
        for (var j = 1; j <= 5; j++) {
            var div = document.createElement('div');
            div.id = ((i - 1) * 5 + j).toString();
            div.setAttribute('column', j.toString());
            divsContainer.appendChild(div);
        }
    }
}
