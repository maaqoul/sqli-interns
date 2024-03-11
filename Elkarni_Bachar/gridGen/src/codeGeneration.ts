/* 
    !PS: The paragraph tag holding the code uses an attribute called data-type which can hold either the value "html" or "css" and that's how I determine which code to show. 
*/

const showCode = () => {
  smokeScreen!.style.display = "flex";
  codeTextPanel!.setAttribute("data-type", "css");
  genCode();
  codeSwitchBtn!.innerText = "Show HTML";
  (codeInnerPanel!.children[0] as HTMLElement).innerText = "CSS code";
};

const genCode = () => {
  const type = codeTextPanel!.getAttribute("data-type");
  if (type == "css") genCssCode();
  else if (type == "html") genHTMLCode();
};

const genCssCode = () => {
  codeTextPanel!.innerHTML = "";
  let css = `display: grid;\ngrid-template-columns: ${
    showcase!.style.gridTemplateColumns || "repeat(5,1fr)"
  };\ngrid-template-rows: ${
    showcase!.style.gridTemplateRows || "repeat(5,1fr)"
  };\n`;
  css += showcase!.style.columnGap
    ? `column-gap: ${showcase!.style.columnGap};\n`
    : "";
  css += showcase!.style.rowGap ? `row-gap: ${showcase!.style.rowGap};\n` : "";
  const GridChildren = showcase!.childNodes;

  const processNodes = (node: ChildNode, index: number, nodeList: NodeListOf<ChildNode>) => {
  if (node instanceof HTMLElement) {
    css += `#${node.id} {
    grid-area: ${node.style.gridArea};
}`;
  }
};
  GridChildren.forEach(processNodes);
  codeTextPanel!.innerHTML = `<pre>${css}</pre>`;
};

const genHTMLCode = () => {
  codeTextPanel!.innerHTML = "";
  let text = "";
  const htmlElement = document.createElement("pre");
  const GridChildren = showcase!.childNodes;
  GridChildren.forEach((child) => {
    text = (child as HTMLElement).outerHTML;
    // Remove the style attribute from the HTML string
    text = text.replace(/ style="[^"]*"/g, "");
    // Directly add the formatted text with newlines
    htmlElement.textContent += text.replace(/(?<!p)>/g, ">\n");
  });
  codeTextPanel!.appendChild(htmlElement);
};

const switchCode = () => {
  const type = codeTextPanel!.getAttribute("data-type");
  codeTextPanel!.setAttribute("data-type", type == "css" ? "html" : "css");
  genCode();
  codeSwitchBtn!.innerText = type !== "css" ? "Show HTML" : "Show CSS";
  (codeInnerPanel!.children[0] as HTMLElement).innerText =
    type == "css" ? "HTML code" : "CSS code";
};

const closeSmokeScreen = () => {
  smokeScreen!.style.display = "none";
  codeTextPanel!.innerHTML = "";
};

const copyCode = () => {
  const textToCopy = codeTextPanel!.innerText;
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      alert("Text copied to clipboard.");
    })
    .catch((err) => {
      console.error("Unable to copy text to clipboard.", err);
    });
};
