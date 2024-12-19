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
