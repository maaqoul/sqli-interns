export function addEventListenerToALLInputs(columnGapValue : number, rowGapValue : number, divsContainer : Element, htmlCode : Element, cssCode : Element)
    {
        const columnGapInput = document.getElementById("cgap");
        if (columnGapInput instanceof HTMLInputElement)
        {
            columnGapInput.addEventListener("change", function() {
                columnGapValue = parseInt(columnGapInput.value);
                (divsContainer as HTMLElement).style.columnGap = columnGapValue + "px";
            });
        }
        const rowGapInput = document.getElementById("rgap");
        if (rowGapInput)
        {
            rowGapInput.addEventListener("change", function() {
                rowGapValue = parseInt((rowGapInput as HTMLInputElement).value);
                (divsContainer as HTMLElement).style.rowGap = rowGapValue + "px";
            });
        }

        const resetButton = document.getElementById("resetButton");
        if (resetButton)
        {
            resetButton.addEventListener("click", function() {
                window.location.reload();
            });
        }

        const codefooter = document.getElementById("codefooter");
        if (codefooter)
        {
            codefooter.addEventListener("click", function() {
                let popup = document.getElementById("popup");
                if (popup)
                    popup.style.display = "None"
                window.location.reload();
            });
        }

        const generate = document.getElementById("generate");
        if (generate)
        {
            generate.addEventListener("click", function() {
                let element : Element | null;
                let parent : Element = document.createElement('p');

                parent.innerHTML = `<code>.parent {<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbspdisplay: grid;<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbspgrid-template-columns: repeat(5, 1fr);<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbspgrid-template-rows: repeat(5, 1fr);<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbspgrid-column-gap: ${columnGapValue}px;<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbspgrid-row-gap: ${rowGapValue}px;<br>
                }</code>`;

                element = document.getElementById("pcode");
                if (element)
                {
                    element.appendChild(parent)
                    element.appendChild(htmlCode)
                }
                element = document.getElementById("popup");
                if (element)
                    (element as HTMLElement).style.display = "Block"

            
                let footParagraph = document.createElement('p');
                footParagraph.innerText = '</div>';
                element = document.getElementById("code2");
                if (element)
                {
                    element.appendChild(cssCode)
                    element.appendChild(footParagraph)
                }
            });
        }

        const html = document.getElementById("html");
        if (html)
        {
            let element : Element | null;
            html.addEventListener("click", function() {
                if (html.innerText == "see html")
                {
                    element = document.getElementById("code");
                    if (element)
                        (element as HTMLElement).style.display = "none";
                    element = document.getElementById("code2")
                    if (element)
                        (element as HTMLElement).style.display = "block"
                    html.innerText = "see css"
                }
                else
                {
                    element = document.getElementById("code");
                    if (element)
                        (element as HTMLElement).style.display = "block"
                    element = document.getElementById("code2")
                    if (element)
                        (element as HTMLElement).style.display = "none"
                    html.innerText = "see html"
                }
            });
        }
    }
    