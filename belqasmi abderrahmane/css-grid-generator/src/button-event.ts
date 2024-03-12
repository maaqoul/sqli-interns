import { codeContent } from "./classes";


export const modal = document.getElementById("modal");

function handleCloseModal() {
    modal!.style.display = "none";
}


window.onclick = function(event: MouseEvent) {
    if (event.target == modal) handleCloseModal()
}

document.getElementById('close-btn')!.addEventListener('click',(event) =>{
    event.preventDefault();
    handleCloseModal();
});

document.getElementById('switch-css')!.addEventListener('click',(event) =>{
    event.preventDefault();
    codeContent.setCssContentVisibility('block');
    codeContent.setHtmlContentVisibility('none');
});

document.getElementById('switch-html')!.addEventListener('click',(event) =>{
    event.preventDefault();
    codeContent.setCssContentVisibility('none');
    codeContent.setHtmlContentVisibility('block');
});