import initialData from "./initialData.js";
import { setModalType } from "./modal.js";
const modalContent = document.getElementById("main-modal-content");
const canvas = document.getElementById("myCanvas");
export function histogramRender() {
    canvas.style.visibility = "visible";
    modalContent.style.visibility = "hidden";
    const data = initialData.data;
    const versionsCount = [];
    const programmingLanguageCount = {};
    const medalCount = {};
    const salaries = Array.from(new Set(data.map((item) => item["Developer annual salary ($ US)"]))).sort((a, b) => a - b);
    salaries.forEach((salary) => {
        const salaryData = data.filter((item) => item["Developer annual salary ($ US)"] === salary);
        const versionSet = new Set(salaryData.map((item) => item.Version));
        versionsCount.push(versionSet.size);
        const languageSet = new Set(salaryData.map((item) => item["Programming language"]));
        languageSet.forEach((language) => {
            programmingLanguageCount[language] =
                (programmingLanguageCount[language] || 0) + 1;
        });
        const medalSet = new Set(salaryData.map((item) => item["Developer medal"]));
        medalSet.forEach((medal) => {
            medalCount[medal] = (medalCount[medal] || 0) + 1;
        });
    });
    const ctx = canvas.getContext("2d");
    const updateChart = (xLabels, yData, xTitle, yTitle) => {
        const myHistogram = new Chart(ctx, {
            type: "bar",
            data: {
                labels: xLabels,
                datasets: [
                    {
                        label: "Unique Count",
                        data: yData,
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true, // Ensures the chart resizes with the canvas
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: xTitle,
                        },
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: yTitle,
                        },
                    },
                },
            },
        });
        return myHistogram;
    };
    let myHistogram = updateChart(salaries, versionsCount, "Developer Annual Salary ($ US)", "Number of Unique Versions");
    const btnLanguage = document.getElementById("btnLanguage");
    btnLanguage.addEventListener("click", () => {
        const languageLabels = Object.keys(programmingLanguageCount);
        const languageCounts = languageLabels.map((language) => programmingLanguageCount[language]);
        myHistogram.destroy(); // Destroy the old chart
        myHistogram = updateChart(languageLabels, languageCounts, "Programming Language", "Number of Developers");
    });
    const btnVersion = document.getElementById("btnVersion");
    btnVersion.addEventListener("click", () => {
        myHistogram.destroy(); // Destroy the old chart
        myHistogram = updateChart(salaries, versionsCount, "Developer Annual Salary ($ US)", "Number of Unique Versions");
    });
    const btnMedal = document.getElementById("btnMedal");
    btnMedal.addEventListener("click", () => {
        const medalLabels = Object.keys(medalCount);
        const medalCounts = medalLabels.map((medal) => medalCount[medal]);
        myHistogram.destroy(); // Destroy the old chart
        myHistogram = updateChart(medalLabels, medalCounts, "Developer Medal", "Number of Developers");
    });
}
export function tableRender() {
    modalContent.style.visibility = "visible";
    let tableRows = ""; // Initialize an empty string to accumulate rows
    // Assuming 'initialData' contains the data for the table
    initialData.data.forEach((element, index) => {
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
    modalContent.innerHTML = `
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
export function buttonsRender() {
    canvas.style.visibility = "hidden";
    modalContent.style.visibility = "visible";
    modalContent.innerHTML = `
  <div style="display: flex; justify-content: center; gap: 20px; margin-top: 20px; align-items: center;">
    <button id="btnHistogram" style="background-color: #4CAF50; color: white; font-size: 18px; font-weight: bold; padding: 12px 24px; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.3s ease, transform 0.3s ease; height: auto;">
      HISTOGRAM
    </button>
    <button id="btnCharts" style="background-color: #4CAF50; color: white; font-size: 18px; font-weight: bold; padding: 12px 24px; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.3s ease, transform 0.3s ease; height: auto;">
      CHARTS
    </button>
</div>

`;
    document.getElementById("btnHistogram").addEventListener("click", () => {
        setModalType("tfjs-diagrams");
    });
    document.getElementById("btnCharts").addEventListener("click", () => {
        setModalType("tfjs-diagrams");
    });
}
//# sourceMappingURL=modal-contents.js.map