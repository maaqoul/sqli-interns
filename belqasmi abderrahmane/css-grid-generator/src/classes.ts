type MyHTMLElement = HTMLDivElement | HTMLSpanElement | string;

function removeAllChildNodes(node: HTMLElement | null) {
    if (node){
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }
}

class Grid {
    private _child: HTMLElement | null;
    private _parent: HTMLElement | null;
    constructor() {
        this._parent = document.getElementById("grid-parent");
        this._child = document.getElementById("grid-child");
    }
    //Parent methods
    setParentStyle(key: string, value: string) {
        let style = this._parent!.getAttribute('style') || '';
        this._parent!.setAttribute('style', style + `${key}: ${value};`);
    }
    appendToParent(...div: MyHTMLElement[]){
        this._parent?.append(...div);
    }
    clearParent(){
        removeAllChildNodes(this._parent);
    }
    //Child methods
    setChildStyle(key: string, value: string) {
        let style = this._child!.getAttribute('style') || '';
        this._child!.setAttribute('style', style + `${key}: ${value};`); 
    }
    appendToChild(...div: MyHTMLElement[]){
        this._child?.append(...div);
    }
    clearChild(){
        removeAllChildNodes(this._child);
    }
}

class CodeContent {
    private _cssContent: HTMLElement | null;
    private _htmlContent: HTMLElement | null;
    constructor(){
        this._cssContent = document.getElementById('text-css-content');
        this._htmlContent = document.getElementById('text-html-content');
    }
    //cssContent methods
    appendToCss(...div: MyHTMLElement[]){
        this._cssContent?.append(...div);
    }
    clearCssContent(){
        removeAllChildNodes(this._cssContent);
    }
    setCssContentVisibility(style: string){
        this._cssContent!.style['display']  = style;
    }
    //htmlContent methods
    appendToHtml(...div: MyHTMLElement[]){
        this._htmlContent?.append(...div);
    }
    clearHtmlContent(){
        removeAllChildNodes(this._htmlContent);
    }
    setHtmlContentVisibility(style: string){
        this._htmlContent!.style['display']  = style;
    }
}

export const grid: Grid = new Grid();
export const codeContent: CodeContent = new CodeContent();