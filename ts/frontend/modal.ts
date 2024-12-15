import {
  buttonsRender,
  histogramRender,
  tableRender,
} from "./modal-contents.js";

type ModalType =
  | undefined
  | "display-table"
  | "tfjs-diagrams"
  | "show-data-type-button";
const modal = document.getElementById("main-modal")! as HTMLDialogElement;

export function toggleModal(value: boolean) {
  if (value) {
    modal.showModal();
  } else {
    const modalContent = document.getElementById(
      "main-modal-content"
    )! as HTMLDivElement;
    const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    modalContent.style.visibility = "hidden";
    canvas.style.visibility = "hidden";
    modal.close();
  }
}
setModalType("show-data-type-button");
toggleModal(true);
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

    case "tfjs-diagrams":
      histogramRender();
      break;
    case "show-data-type-button":
      buttonsRender();
      break;
  }
}
