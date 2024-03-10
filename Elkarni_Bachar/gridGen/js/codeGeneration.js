/* 
    !PS: The paragraph tag holding the code uses an attribute called data-type which can hold either the value "html" or "css" and that's how I determine which code to show. 
*/

const showCode = () => {
    smokeScreen.style.display = "flex";
    codeTextPanel.setAttribute("data-type", "css")
    genCode();
    codeSwitchBtn.innerText = "Show HTML"
    codeInnerPanel.children[0].innerText = "CSS code";
}

const genCode = () => {
    const type = codeTextPanel.getAttribute("data-type");
    if (type == "css")
        genCssCode()
    else if (type == "html")
        genHTMLCode()
}

const genCssCode = () => {
    codeTextPanel.innerHTML = ""
    let cssBaseTemplate = `display: grid;\ngrid-template-columns: ${showcase.style.gridTemplateColumns || "repeat(5,1fr)"};\ngrid-template-rows: ${showcase.style.gridTemplateRows || "repeat(5,1fr)"};\n`;
    let css = ""
    const GridChildren = showcase.childNodes;
    GridChildren.forEach((child) => {
        css +=
            (`#${child.id} {
    grid-area: ${child.style.gridArea};
}`);
    })
    codeTextPanel.innerHTML = `<pre>${cssBaseTemplate + css}</pre>`;
}

const genHTMLCode = () => {
    codeTextPanel.innerHTML = ""
    let text = "";
    const htmlElement = document.createElement("pre")
    const GridChildren = showcase.childNodes;
    GridChildren.forEach((child) => {
        text = child.outerHTML
        // Remove the style attribute from the HTML string
        text = text.replace(/ style="[^"]*"/g, '');
        // Directly add the formatted text with newlines
        htmlElement.textContent += text.replace(/(?<!p)>/g, ">\n");
    })
    codeTextPanel.appendChild(htmlElement);
}

const switchCode = () => {
    const type = codeTextPanel.getAttribute("data-type");
    codeTextPanel.setAttribute("data-type", type == "css" ? "html" : "css");
    genCode();
    codeSwitchBtn.innerText = type !== "css" ? "Show HTML" : "Show CSS";
    codeInnerPanel.children[0].innerText = type == "css" ? "HTML code" : "CSS code"
}

const closeSmokeScreen = () => {
    smokeScreen.style.display = "none";
    codeTextPanel.innerHTML = ""
}

const copyCode = () => {
    const textToCopy = codeTextPanel.innerText;
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            alert('Text copied to clipboard.');
        })
        .catch(err => {
            console.error('Unable to copy text to clipboard.', err);
        });
}