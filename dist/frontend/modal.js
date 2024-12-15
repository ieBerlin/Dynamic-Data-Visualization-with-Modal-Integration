import { buttonsRender, histogramRender, tableRender, } from "./modal-contents.js";
const modal = document.getElementById("main-modal");
export function toggleModal(value) {
    if (value) {
        modal.showModal();
    }
    else {
        const modalContent = document.getElementById("main-modal-content");
        const canvas = document.getElementById("myCanvas");
        modalContent.style.visibility = "hidden";
        canvas.style.visibility = "hidden";
        modal.close();
    }
}
setModalType("show-data-type-button");
toggleModal(true);
document
    .getElementById("main-modal-toggle-button")
    .addEventListener("click", () => {
    toggleModal(false);
});
export function setModalType(modalType) {
    switch (modalType) {
        case "display-table":
            tableRender();
            break;
        case "tfjs-diagrams":
            histogramRender();
            break;
        case "show-data-type-button":
            buttonsRender();
            break;
    }
}
//# sourceMappingURL=modal.js.map