import { DMiNer_error } from "../common/Settings.js";
import { createButtonsWrapper } from "./modal-contents.js";
const mainModalContent = document.getElementById("Dataviz_area");
setInterval(() => {
    const buttonsContainer = document.getElementById("buttons-container");
    if (mainModalContent && mainModalContent.style.visibility === "hidden") {
        buttonsContainer?.remove();
    }
}, 200);
function Has_key(object, key) {
    return key in object;
}
function Project(object, axis, ...keys) {
    return keys.reduce((accumulator, key) => {
        if (Has_key(object, key))
            return { ...accumulator, [axis]: object[key] };
        else
            return accumulator;
    }, {});
}
export default class Dataviz {
    static Setup(dataviz, data, name, features, types, enumerations, callbackFunction) {
        const f = features;
        types.forEach((type) => console.warn(type === "enum" ? "type énuméré" : type));
        if (callbackFunction) {
            callbackFunction();
        }
        else {
            Dataviz.select_chart(dataviz, data, name, features, types, enumerations);
        }
    }
    static select_chart(dataviz, data, name, features, types, enumerations) {
        dataviz.dataviz_handler(false);
        dataviz.dataviz_area.innerHTML = "";
        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.position = "relative";
        container.style.zIndex = "10000";
        container.style.height = "100%";
        container.style.width = "100%";
        container.style.justifyContent = "center";
        container.style.gap = "20px";
        container.style.marginTop = "20px";
        container.style.alignItems = "center";
        container.style.backgroundColor = "#93c5fd";
        const btnHistogram = document.createElement("button");
        btnHistogram.id = "btnHistogram";
        btnHistogram.textContent = "HISTOGRAM";
        btnHistogram.style.backgroundColor = "#4CAF50";
        btnHistogram.style.color = "white";
        btnHistogram.style.fontSize = "18px";
        btnHistogram.style.fontWeight = "bold";
        btnHistogram.style.padding = "12px 24px";
        btnHistogram.style.border = "none";
        btnHistogram.style.borderRadius = "5px";
        btnHistogram.style.cursor = "pointer";
        btnHistogram.style.transition =
            "background-color 0.3s ease, transform 0.3s ease";
        btnHistogram.style.height = "auto";
        btnHistogram.addEventListener("click", () => {
            dataviz.dataviz_handler(true);
            setTimeout(() => {
                Dataviz._Histogram(dataviz, data, name, features, types, enumerations);
                dataviz.dataviz_handler(false);
            }, 700);
        });
        const btnCharts = document.createElement("button");
        btnCharts.id = "btnCharts";
        btnCharts.textContent = "CHARTS";
        btnCharts.style.backgroundColor = "#4CAF50";
        btnCharts.style.color = "white";
        btnCharts.style.fontSize = "18px";
        btnCharts.style.fontWeight = "bold";
        btnCharts.style.padding = "12px 24px";
        btnCharts.style.border = "none";
        btnCharts.style.borderRadius = "5px";
        btnCharts.style.cursor = "pointer";
        btnCharts.style.transition =
            "background-color 0.3s ease, transform 0.3s ease";
        btnCharts.style.height = "auto";
        btnCharts.addEventListener("click", () => {
            dataviz.dataviz_handler(true);
            setTimeout(() => {
                Dataviz._Linechart(dataviz, data, name, features, types, enumerations);
                dataviz.dataviz_handler(false);
            }, 700);
        });
        container.appendChild(btnHistogram);
        container.appendChild(btnCharts);
        dataviz.dataviz_area.appendChild(container);
    }
    static _Linechart(dataviz, data, name, features, types, enumerations) {
        try {
            const line = data.map((datum) => {
                return {
                    ...Project(datum, "x", features[1]),
                    ...Project(datum, "y", features[3]),
                };
            });
            line.sort((p1, p2) => {
                return p1.x < p2.x ? -1 : 1;
            });
            const data_ = { values: [line], series: [name] };
            dataviz.dataviz_handler(false);
            const min_y = Math.min(...enumerations.get(features[3]));
            const max_y = Math.max(...enumerations.get(features[3]));
            const buttonsWrapper = createButtonsWrapper();
            buttonsWrapper.id = "line-chart-buttons";
            mainModalContent.insertAdjacentElement("beforebegin", buttonsWrapper);
            const languageButton = document.getElementById("btnLanguage");
            const versionButton = document.getElementById("btnVersion");
            const medalButton = document.getElementById("btnMedal");
            languageButton?.addEventListener("click", () => {
                // Step 1: Get unique programming languages
                const labels = [
                    ...new Set(data.map((item) => item["Programming language"])),
                ];
                // Step 2: Map data to x and y values using Project function
                const lineProgrammingLanguage = data.map((datum) => {
                    return {
                        ...Project(datum, "x", features[0]), // Assuming "Programming language" is in features[0]
                        ...Project(datum, "y", features[3]), // Assuming "Developer annual salary" is in features[3]
                    };
                });
                // Step 3: Group by 'x' (Programming language)
                const groupedData = lineProgrammingLanguage.reduce((acc, item) => {
                    if (!acc[item.x]) {
                        acc[item.x] = [];
                    }
                    acc[item.x].push(item.y);
                    return acc;
                }, {});
                // Step 4: Calculate averages for each programming language
                const averages = Object.keys(groupedData).map((x, index) => {
                    const yValues = groupedData[x];
                    const totalY = yValues.reduce((sum, y) => sum + y, 0);
                    const averageY = Math.floor(totalY / yValues.length);
                    return { x: index + 1, y: averageY };
                });
                // Step 5: Prepare data for the chart
                const dataForChart = {
                    values: [averages],
                    series: ["Programming language"],
                };
                // Step 6: Render the chart using tfvis
                tfvis.render.linechart(dataviz.dataviz_area, dataForChart, {
                    yAxisDomain: [min_y, max_y],
                    xLabel: "Programming language",
                    xType: "ordinal",
                    yLabel: "Annual salary ($ US)",
                    zoomToFit: true,
                });
            });
            versionButton?.addEventListener("click", () => {
                const line = data.map((datum) => {
                    return {
                        ...Project(datum, "x", features[1]),
                        ...Project(datum, "y", features[3]),
                    };
                });
                const groupedAverages = line.reduce((acc, item) => {
                    // If the x value doesn't exist in the accumulator, initialize an empty array
                    if (!acc[item.x]) {
                        acc[item.x] = { totalY: 0, count: 0 };
                    }
                    // Add the y value to the total and increment the count
                    acc[item.x].totalY += item.y;
                    acc[item.x].count++;
                    return acc;
                }, {});
                // Step 3: Calculate the average for each group
                const averages = Object.keys(groupedAverages).map((x) => {
                    const { totalY, count } = groupedAverages[x];
                    return { x: parseInt(x), y: totalY / count }; // Calculate average
                });
                const dataForChart = { values: [averages], series: [name] };
                tfvis.render.linechart(dataviz.dataviz_area, dataForChart, {
                    yAxisDomain: [min_y, max_y],
                    xLabel: "Version",
                    xType: "ordinal",
                    yLabel: "Average salary ($ US)",
                    zoomToFit: true,
                });
            });
            medalButton?.addEventListener("click", () => {
                const lineProgrammingLanguage = data.map((datum) => {
                    return {
                        ...Project(datum, "x", features[2]), // Assuming "Programming language" is in features[0]
                        ...Project(datum, "y", features[3]), // Assuming "Developer annual salary" is in features[3]
                    };
                });
                // Step 3: Group by 'x' (Programming language)
                const groupedData = lineProgrammingLanguage.reduce((acc, item) => {
                    if (!acc[item.x]) {
                        acc[item.x] = [];
                    }
                    acc[item.x].push(item.y);
                    return acc;
                }, {});
                // Step 4: Calculate averages for each programming language
                const averages = Object.keys(groupedData).map((x, index) => {
                    const yValues = groupedData[x];
                    const totalY = yValues.reduce((sum, y) => sum + y, 0);
                    const averageY = totalY / yValues.length;
                    return { x: index + 1, y: averageY };
                });
                // Step 5: Prepare data for the chart
                const dataForChart = {
                    values: [averages],
                    series: ["Developer medal"],
                };
                tfvis.render.linechart(dataviz.dataviz_area, dataForChart, {
                    yAxisDomain: [min_y, max_y],
                    xLabel: "Developer medal",
                    xType: "ordinal",
                    yLabel: "Annual salary ($ US)",
                    zoomToFit: true,
                });
            });
            // Step 1: Get unique programming languages
            const labels = [
                ...new Set(data.map((item) => item["Programming language"])),
            ];
            // Step 2: Map data to x and y values using Project function
            const lineProgrammingLanguage = data.map((datum) => {
                return {
                    ...Project(datum, "x", features[0]), // Assuming "Programming language" is in features[0]
                    ...Project(datum, "y", features[3]), // Assuming "Developer annual salary" is in features[3]
                };
            });
            // Step 3: Group by 'x' (Programming language)
            const groupedData = lineProgrammingLanguage.reduce((acc, item) => {
                if (!acc[item.x]) {
                    acc[item.x] = [];
                }
                acc[item.x].push(item.y);
                return acc;
            }, {});
            // Step 4: Calculate averages for each programming language
            const averages = Object.keys(groupedData).map((x, index) => {
                const yValues = groupedData[x];
                const totalY = yValues.reduce((sum, y) => sum + y, 0);
                const averageY = Math.floor(totalY / yValues.length);
                return { x: index + 1, y: averageY };
            });
            // Step 5: Prepare data for the chart
            const dataForChart = {
                values: [averages],
                series: ["Programming language"],
            };
            // Step 6: Render the chart using tfvis
            tfvis.render.linechart(dataviz.dataviz_area, dataForChart, {
                yAxisDomain: [min_y, max_y],
                xLabel: "Programming language",
                xType: "ordinal",
                yLabel: "Annual salary ($ US)",
                zoomToFit: true,
            });
        }
        catch (error) {
            throw new Error(DMiNer_error.No_possible_visualization);
        }
    }
    static _Histogram(dataviz, data, name, features, types, enumerations) {
        try {
            const min_y = Math.min(...enumerations.get(features[3]));
            const max_y = Math.max(...enumerations.get(features[3]));
            const buttonsWrapper = createButtonsWrapper();
            buttonsWrapper.id = "histogram-buttons";
            mainModalContent.insertAdjacentElement("beforebegin", buttonsWrapper);
            const languageButton = document.getElementById("btnLanguage");
            const versionButton = document.getElementById("btnVersion");
            const medalButton = document.getElementById("btnMedal");
            languageButton?.addEventListener("click", () => {
                const groupedData = data.reduce((acc, datum) => {
                    const medal = datum["Programming language"];
                    const salary = datum[features[3]]; // Developer annual salary
                    if (!acc[medal]) {
                        acc[medal] = [];
                    }
                    acc[medal].push(salary);
                    return acc;
                }, {});
                const expectedData = Object.entries(groupedData);
                const dataForChart = {
                    values: expectedData.map((data, index) => ({
                        index: index + 1,
                        value: data[1].reduce((sum, value) => sum + value, 0) / data[1].length,
                    })),
                    series: ["Version"],
                };
                tfvis.render.barchart(dataviz.dataviz_area, dataForChart.values, {
                    xLabel: "Programming language",
                    yLabel: "Annual salary ($ US)",
                    height: 600,
                    width: 800,
                    zoomToFit: true,
                });
            });
            versionButton?.addEventListener("click", () => {
                const groupedData = data.reduce((acc, datum) => {
                    const medal = datum["Version"];
                    const salary = datum[features[3]]; // Developer annual salary
                    if (!acc[medal]) {
                        acc[medal] = [];
                    }
                    acc[medal].push(salary);
                    return acc;
                }, {});
                const expectedData = Object.entries(groupedData);
                const dataForChart = {
                    values: expectedData.map((data, index) => ({
                        index: index + 1,
                        value: data[1].reduce((sum, value) => sum + value, 0) / data[1].length,
                    })),
                    series: ["Version"],
                };
                tfvis.render.barchart(dataviz.dataviz_area, dataForChart.values, {
                    xLabel: "Version",
                    yLabel: "Annual salary ($ US)",
                    height: 600,
                    width: 800,
                    zoomToFit: true,
                });
            });
            medalButton?.addEventListener("click", () => {
                const labels = [
                    ...new Set(data.map((item) => item["Developer medal"])),
                ];
                const groupedData = data.reduce((acc, datum) => {
                    const medal = datum["Developer medal"];
                    const salary = datum[features[3]]; // Developer annual salary
                    if (!acc[medal]) {
                        acc[medal] = [];
                    }
                    acc[medal].push(salary);
                    return acc;
                }, {});
                const expectedData = Object.entries(groupedData);
                const dataForChart = {
                    values: expectedData.map((data, index) => ({
                        index: index + 1,
                        value: data[1].reduce((sum, value) => sum + value, 0) / data[1].length,
                    })),
                    series: ["Developer medal"],
                };
                tfvis.render.barchart(dataviz.dataviz_area, dataForChart.values, {
                    xLabel: "Developer medal",
                    yLabel: "Annual salary ($ US)",
                    height: 600,
                    width: 800,
                    zoomToFit: true,
                });
            });
            tfvis.render.barchart(dataviz.dataviz_area, {
                values: [{ index: "Data", y: [] }],
                series: [name],
            }, {
                xLabel: features[1],
                yLabel: "Annual salary ($ US)",
                zoomToFit: true,
            });
        }
        catch (error) {
            throw new Error(DMiNer_error.No_possible_visualization);
        }
    }
}
//# sourceMappingURL=Dataviz.js.map