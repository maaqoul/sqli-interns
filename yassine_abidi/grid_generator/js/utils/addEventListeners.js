export function addEventListenerToALLInputs(columnGapValue, rowGapValue, divsContainer, htmlCode, cssCode) {
    var columnGapInput = document.getElementById("cgap");
    if (columnGapInput instanceof HTMLInputElement) {
        columnGapInput.addEventListener("change", function () {
            columnGapValue = parseInt(columnGapInput.value);
            divsContainer.style.columnGap = columnGapValue + "px";
        });
    }
    var rowGapInput = document.getElementById("rgap");
    if (rowGapInput) {
        rowGapInput.addEventListener("change", function () {
            rowGapValue = parseInt(rowGapInput.value);
            divsContainer.style.rowGap = rowGapValue + "px";
        });
    }
    var resetButton = document.getElementById("resetButton");
    if (resetButton) {
        resetButton.addEventListener("click", function () {
            window.location.reload();
        });
    }
    var codefooter = document.getElementById("codefooter");
    if (codefooter) {
        codefooter.addEventListener("click", function () {
            var popup = document.getElementById("popup");
            if (popup)
                popup.style.display = "None";
            window.location.reload();
        });
    }
    var generate = document.getElementById("generate");
    if (generate) {
        generate.addEventListener("click", function () {
            var element;
            var parent = document.createElement('p');
            parent.innerHTML = "<code>.parent {<br>\n                    &nbsp;&nbsp;&nbsp;&nbsp;&nbspdisplay: grid;<br>\n                    &nbsp;&nbsp;&nbsp;&nbsp;&nbspgrid-template-columns: repeat(5, 1fr);<br>\n                    &nbsp;&nbsp;&nbsp;&nbsp;&nbspgrid-template-rows: repeat(5, 1fr);<br>\n                    &nbsp;&nbsp;&nbsp;&nbsp;&nbspgrid-column-gap: ".concat(columnGapValue, "px;<br>\n                    &nbsp;&nbsp;&nbsp;&nbsp;&nbspgrid-row-gap: ").concat(rowGapValue, "px;<br>\n                }</code>");
            element = document.getElementById("pcode");
            if (element) {
                element.appendChild(parent);
                element.appendChild(htmlCode);
            }
            element = document.getElementById("popup");
            if (element)
                element.style.display = "Block";
            var footParagraph = document.createElement('p');
            footParagraph.innerText = '</div>';
            element = document.getElementById("code2");
            if (element) {
                element.appendChild(cssCode);
                element.appendChild(footParagraph);
            }
        });
    }
    var html = document.getElementById("html");
    if (html) {
        var element_1;
        html.addEventListener("click", function () {
            if (html.innerText == "see html") {
                element_1 = document.getElementById("code");
                if (element_1)
                    element_1.style.display = "none";
                element_1 = document.getElementById("code2");
                if (element_1)
                    element_1.style.display = "block";
                html.innerText = "see css";
            }
            else {
                element_1 = document.getElementById("code");
                if (element_1)
                    element_1.style.display = "block";
                element_1 = document.getElementById("code2");
                if (element_1)
                    element_1.style.display = "none";
                html.innerText = "see html";
            }
        });
    }
}
