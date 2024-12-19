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
//# sourceMappingURL=modal.js.map