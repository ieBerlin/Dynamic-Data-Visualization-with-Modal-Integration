import { buttonsRender, histogramRender, lineChartRender, tableRender, } from "./modal-contents.js";
const modal = document.getElementById("main-modal");
export function toggleModal(value) {
    if (value) {
        modal.showModal();
    }
    else {
        const mainModalContent = document.getElementById("main-content");
        mainModalContent.innerHTML = "";
        modal.close();
    }
}
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
        case "line-chart-diagram":
            lineChartRender();
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