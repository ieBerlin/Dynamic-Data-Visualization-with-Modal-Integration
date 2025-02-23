import { getCurrentData, ItemType } from "./funcs.js";

const mainModalContent = document.getElementById(
  "main-content"
) as HTMLDivElement;

export function tableRender() {
  mainModalContent.innerHTML = "";

  let tableRows = ""; // Initialize an empty string to accumulate rows

  // Assuming 'initialData' contains the data for the table
  getCurrentData().forEach((element: ItemType, index) => {
    tableRows += `
          <td>${index + 1}</td>
          <td>${element["Programming language"]}</td>
          <td>${element.Version}</td>
          <td>${element["Developer medal"]}</td>
            <td>${element["Developer annual salary ($ US)"]}</td>
          </tr>
        `;
  });

  // Set the modal content with dynamically generated rows
  mainModalContent.innerHTML = `
        <div style="overflow: auto; font-family: Arial, sans-serif; border: 1px solid #ccc; padding: 10px;">
          <table border="1" style="overflow: auto; width: 100%; border-collapse: collapse; text-align: center;">
            <thead>
            <tr></tr>
              <tr style="background-color: #f0f0f0;">
                <th colspan="4" style="text-align: left;">Developer annual salary</th>
                <th style="text-align: left;">Hit Policy: Unique</th>
              </tr>
              <tr>
                <th style="background-color: #e0e0e0;">When</th>
                <th>Programming language<br>"C++","Java","TypeScript"</th>
                <th>Version<br>[1..20]</th>
                <th>Developer medal<br>"Gold","Silver","Bronze"</th>
                <th>Then<br>Developer annual salary ($ US)<br>60000, 67000, 70000, 71000...</th>
              </tr>
            </thead>
            <tbody style="overflow: auto; max-height: 400px;">
               ${tableRows} <!-- Inject the dynamically generated rows here -->
            </tbody>
          </table>
        </div>
      `;
}

export function createButtonsWrapper(): HTMLDivElement {
  const buttonsWrapper = document.createElement("div");
  buttonsWrapper.innerHTML = `
    <div id="buttons-container" style=" display: flex; justify-content: center; align-items: center; flex-direction: row; text-align: center; position: absolute; right: 50%; transform: translateX(+50%); bottom: 10px; z-index: 1000;">
    <button id="btnLanguage" style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; margin: 5px; cursor: pointer;">
    Langage de programmation
    </button>
    <button id="btnVersion" style="background-color: #008CBA; color: white; padding: 10px 20px; border: none; border-radius: 5px; margin: 5px; cursor: pointer;">
    Version
    </button>
    <button id="btnMedal" style="background-color: #f44336; color: white; padding: 10px 20px; border: none; border-radius: 5px; margin: 5px; cursor: pointer;">
    Médaille
    </button>
</div>

`;
  return buttonsWrapper;
}

export function sideBarKeysDiv(averages: object[]) {
  const oldWrapper = document.getElementById("keys-container");
  if (oldWrapper) {
    oldWrapper.remove();
  }
  const keysDiv = document.createElement("div");
  keysDiv.style.position = "fixed";
  keysDiv.style.top = "0";
  keysDiv.id = "keys-container";
  keysDiv.style.zIndex = "101";
  keysDiv.style.left = "0";
  keysDiv.style.width = "15%";
  keysDiv.style.height = "100%";
  keysDiv.style.overflowY = "auto";
  keysDiv.style.backgroundColor = "#f9f9f9";
  keysDiv.style.borderRight = "1px solid #ddd";

  keysDiv.innerHTML = `
      <ul
        style="
          display: flex; 
          flex-direction: column; 
          gap: 10px; 
          list-style-type: none; 
          padding: 15px; 
          margin: 0; 
        ">
        ${averages
          .map(
            (item: object, index: number) => `
            <li style="
              display: flex; 
              justify-content: space-between; 
              align-items: center; 
              padding: 8px 12px; 
              border-radius: 5px; 
              background-color: #ffffff; 
              border: 1px solid #e0e0e0; 
              transition: background-color 0.3s ease; 
              cursor: pointer;
            " 
            onmouseover="this.style.backgroundColor='#f0f0f0';" 
            onmouseout="this.style.backgroundColor='#ffffff';">
              <span>${index}</span>
              <span>${item.label}</span>
            </li>`
          )
          .join("")}
      </ul>
    `;

  document.body.appendChild(keysDiv);
}
