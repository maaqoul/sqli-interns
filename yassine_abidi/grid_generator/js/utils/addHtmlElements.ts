export function addHtmlcss(coordinates : number[], divcount : number, htmlCode : Element, cssCode : Element) {
    let pElement = document.createElement('p');
    let sepElemnt = document.createElement('p')


    pElement.textContent = `.div${divcount} { grid-area: ${Math.ceil(coordinates[0])} / ${Math.ceil(coordinates[1])} / ${Math.ceil(coordinates[2]) + 1} / ${Math.ceil(coordinates[3]) + 1}; }`;
    sepElemnt.innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp&lt;div class="div${divcount}"&gt; &lt;/div&gt;`

    htmlCode.appendChild(pElement);
    cssCode.appendChild(sepElemnt);
}

export function fillDivsContainer(divsContainer : Element)
{
    for (let i = 1; i <= 5; i++) {
        for (let j = 1; j <= 5; j++) {
            const div = document.createElement('div');
            div.id = ((i - 1) * 5 + j).toString();
            div.setAttribute('column', j.toString());
             divsContainer.appendChild(div);
        }
    }
}