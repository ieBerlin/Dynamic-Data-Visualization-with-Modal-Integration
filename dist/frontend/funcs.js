import initialData from "./initialData.js";
import { toggleModal } from "./modal.js";
import { tableRender } from "./modal-contents.js";
export let system_data = initialData.data;
export function updateSystemData(data) {
    const element = document.getElementsByClassName("djs-overlay")[0];
    element.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleModal(true);
        tableRender();
    });
    system_data = data;
}
export function getCurrentData() {
    return [...system_data];
}
//# sourceMappingURL=funcs.js.map