import { getCurrentData } from "./initialData.js";
import { setModalType } from "./modal.js";
const mainModalContent = document.getElementById("main-content");
export function lineChartRender() {
    mainModalContent.innerHTML = "";
    const canvas = document.createElement("canvas");
    canvas.id = "myLineCanvas";
    const buttonsWrapper = document.createElement("div");
    buttonsWrapper.innerHTML = `<div style="text-align: center; ">
                    <div style="text-align: center;">
                        <button id="btnLineLanguage" style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; margin: 0px 5px ;cursor: pointer;">
                          Langage de programmation
                        </button>
                        <button id="btnLineVersion" style="background-color: #008CBA; color: white; padding: 10px 20px; border: none; border-radius: 5px;margin: 0px 5px ; cursor: pointer;">
                          Version
                        </button>
                        <button id="btnLineMedal" style="background-color: #f44336; color: white; padding: 10px 20px; border: none; border-radius: 5px; margin: 0px 5px ; cursor: pointer;">
                          Médaille
                        </button>
                    </div>
                </div>`;
    mainModalContent.appendChild(buttonsWrapper);
    mainModalContent.appendChild(canvas);
    const data = getCurrentData();
    function updateLineChart(labels, data, xAxisLabel, yAxisLabel) {
        const ctx = canvas.getContext("2d");
        return new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: yAxisLabel,
                        data: data,
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        enabled: true,
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: xAxisLabel,
                        },
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: yAxisLabel,
                        },
                    },
                },
            },
        });
    }
    let myLineChart;
    const calculateAverage = (items, category) => {
        const uniqueCategories = [
            ...new Set(items.map((item) => item[category])),
        ];
        return uniqueCategories.map((unique) => {
            const filtered = items.filter((item) => item[category] === unique);
            const totalSalary = filtered.reduce((sum, item) => sum + item["Developer annual salary ($ US)"], 0);
            return totalSalary / filtered.length;
        });
    };
    document.getElementById("btnLineLanguage")?.addEventListener("click", () => {
        const labels = [
            ...new Set(data.map((item) => item["Programming language"])),
        ];
        const averages = calculateAverage(data, "Programming language");
        if (myLineChart)
            myLineChart.destroy();
        myLineChart = updateLineChart(labels, averages, "Langage de programmation", "Salaire moyen ($ US)");
    });
    document.getElementById("btnLineVersion")?.addEventListener("click", () => {
        const labels = [...new Set(data.map((item) => item.Version))].sort((a, b) => a - b);
        const averages = calculateAverage(data, "Version");
        if (myLineChart)
            myLineChart.destroy();
        myLineChart = updateLineChart(labels, averages, "Version", "Salaire moyen ($ US)");
    });
    document.getElementById("btnLineMedal")?.addEventListener("click", () => {
        const labels = [...new Set(data.map((item) => item["Developer medal"]))];
        const averages = calculateAverage(data, "Developer medal");
        if (myLineChart)
            myLineChart.destroy();
        myLineChart = updateLineChart(labels, averages, "Médaille", "Salaire moyen ($ US)");
    });
}
export function histogramRender() {
    mainModalContent.innerHTML = "";
    const canvas = document.createElement("canvas");
    canvas.id = "myCanvas";
    const buttonsWrapper = document.createElement("div");
    buttonsWrapper.innerHTML = `<div style="text-align: center; margin-top: 20px;">
                  <div style="text-align: center;">
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
  
              </div>`;
    mainModalContent.appendChild(buttonsWrapper);
    mainModalContent.appendChild(canvas);
    const data = getCurrentData();
    function updateChart(labels, data, xAxisLabel, yAxisLabel) {
        const ctx = canvas.getContext("2d");
        return new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: yAxisLabel,
                        data: data,
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        enabled: true,
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: xAxisLabel,
                        },
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: yAxisLabel,
                        },
                    },
                },
            },
        });
    }
    let myHistogram;
    const calculateAverage = (items, category) => {
        const uniqueCategories = [
            ...new Set(items.map((item) => item[category])),
        ];
        return uniqueCategories.map((unique) => {
            const filtered = items.filter((item) => item[category] === unique);
            const totalSalary = filtered.reduce((sum, item) => sum + item["Developer annual salary ($ US)"], 0);
            return totalSalary / filtered.length;
        });
    };
    document.getElementById("btnLanguage")?.addEventListener("click", () => {
        const labels = [
            ...new Set(data.map((item) => item["Programming language"])),
        ];
        const averages = calculateAverage(data, "Programming language");
        if (myHistogram)
            myHistogram.destroy();
        myHistogram = updateChart(labels, averages, "Langage de programmation", "Salaire moyen ($ US)");
    });
    document.getElementById("btnVersion")?.addEventListener("click", () => {
        const labels = [...new Set(data.map((item) => item.Version))].sort((a, b) => a - b);
        const averages = calculateAverage(data, "Version");
        if (myHistogram)
            myHistogram.destroy();
        myHistogram = updateChart(labels, averages, "Version", "Salaire moyen ($ US)");
    });
    document.getElementById("btnMedal")?.addEventListener("click", () => {
        const labels = [...new Set(data.map((item) => item["Developer medal"]))];
        const averages = calculateAverage(data, "Developer medal");
        if (myHistogram)
            myHistogram.destroy();
        myHistogram = updateChart(labels, averages, "Médaille", "Salaire moyen ($ US)");
    });
}
export function tableRender() {
    mainModalContent.innerHTML = "";
    let tableRows = ""; // Initialize an empty string to accumulate rows
    // Assuming 'initialData' contains the data for the table
    getCurrentData().forEach((element, index) => {
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
export function buttonsRender() {
    mainModalContent.innerHTML = "";
    mainModalContent.innerHTML = `
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
        setModalType("line-chart-diagram");
    });
}
//# sourceMappingURL=modal-contents.js.map