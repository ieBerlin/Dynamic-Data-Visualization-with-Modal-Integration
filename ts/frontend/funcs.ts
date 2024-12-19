import initialData from "./initialData.js";
import { toggleModal } from "./modal.js";
import { tableRender } from "./modal-contents.js";

export type ItemType = {
    "Programming language": string;
    Version: number;
    "Developer medal": string;
    "Developer annual salary ($ US)": number;
    "_DMiNer_ UNIQUE hit rule(s)"?: number;
  };
export let system_data: ItemType[] = initialData.data;
export function updateSystemData(data: ItemType[]) {
  const element = document.getElementsByClassName("djs-overlay")[0];
  element.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleModal(true);
    tableRender();
  });

  system_data = data;
}
export function getCurrentData(): ItemType[] {
  return [...system_data];
}
