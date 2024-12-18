import {
  buttonsRender,
  histogramRender,
  lineChartRender,
  tableRender,
} from "./modal-contents.js";

type ModalType =
  | undefined
  | "display-table"
  | "tfjs-diagrams"
  | "show-data-type-button"
  | "line-chart-diagram";
const modal = document.getElementById("main-modal")! as HTMLDialogElement;

export function toggleModal(value: boolean) {
  if (value) {
    modal.showModal();
  } else {
    const mainModalContent = document.getElementById(
      "main-content"
    ) as HTMLDivElement;
    mainModalContent.innerHTML = "";
    modal.close();
  }
}
document
  .getElementById("main-modal-toggle-button")!
  .addEventListener("click", () => {
    toggleModal(false);
  });
export function setModalType(modalType: ModalType) {
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
