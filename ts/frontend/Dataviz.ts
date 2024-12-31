declare const tfvis: any;

import { DMiNer_error, Trace } from "../common/Settings.js";
import { createButtonsWrapper, sideBarKeysDiv } from "./modal-contents.js";
const mainModalContent = document.getElementById("Dataviz_area")!;

setInterval(() => {
  const oldWrapper = document.getElementById("keys-container");
  const buttonsContainer = document.getElementById("buttons-container");
  if (mainModalContent && mainModalContent.style.visibility === "hidden") {
    buttonsContainer?.remove();
    oldWrapper?.remove();
  }
}, 200);
function Has_key<T extends Object>(
  object: T,
  key: PropertyKey
): key is keyof T {
  return key in object;
}

function Project(object: Object, axis: "x" | "y", ...keys: Array<string>) {
  return keys.reduce((accumulator, key) => {
    if (Has_key(object, key)) return { ...accumulator, [axis]: object[key] };
    else return accumulator;
  }, {});
}

export default class Dataviz {
  static Setup(
    dataviz: {
      dataviz_area: HTMLDivElement;
      dataviz_handler: (stop: boolean) => void;
    },
    data: Readonly<Array<Object>>,
    name: string,
    features: Readonly<Array<string>>,
    types: Readonly<Array<string>>,
    enumerations: Readonly<
      Map<string, Array<boolean | number | string> | null>
    >,
    callbackFunction?: () => void
  ): never | void {
    const f = features;
    types.forEach((type) =>
      console.warn(type === "enum" ? "type énuméré" : type)
    );
    if (callbackFunction) {
      callbackFunction();
    } else {
      Dataviz.select_chart(dataviz, data, name, features, types, enumerations);
    }
  }

  private static select_chart(
    dataviz: {
      dataviz_area: HTMLDivElement;
      dataviz_handler: (stop: boolean) => void;
    },
    data: Readonly<Array<Object>>,
    name: string,
    features: Readonly<Array<string>>,
    types: Readonly<Array<string>>,
    enumerations: Readonly<Map<string, Array<boolean | number | string> | null>>
  ) {
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

  private static _Linechart(
    dataviz: {
      dataviz_area: HTMLDivElement;
      dataviz_handler: (stop: boolean) => void;
    },
    data: Readonly<Array<Object>>,
    name: string,
    features: Readonly<Array<string>>,
    types: Readonly<Array<string>>,
    enumerations: Readonly<Map<string, Array<boolean | number | string> | null>>
  ): never | void {
    try {
      const line = data.map((datum) => {
        return {
          ...Project(datum, "x", features[1]),
          ...Project(datum, "y", features[3]),
        };
      });

      line.sort((p1: any, p2: any) => {
        return p1.x < p2.x ? -1 : 1;
      });

      const data_ = { values: [line], series: [name] };

      dataviz.dataviz_handler(false);

      const min_y = Math.min(
        ...(enumerations.get(features[3]) as Array<number>)
      );
      const max_y = Math.max(
        ...(enumerations.get(features[3]) as Array<number>)
      );

      const buttonsWrapper = createButtonsWrapper();
      buttonsWrapper.id = "line-chart-buttons";
      mainModalContent.insertAdjacentElement("beforebegin", buttonsWrapper);

      const languageButton = document.getElementById("btnLanguage");
      const versionButton = document.getElementById("btnVersion");
      const medalButton = document.getElementById("btnMedal");

      const renderButtonContent = (
        chartData: Array<Object>,
        xFeature: string,
        yFeature: string,
        xLabel: string,
        seriesLabel: string,
        yLabel: string
      ) => {
        const groupedData = chartData.reduce((acc, item: any) => {
          if (!acc[item.x]) {
            acc[item.x] = [];
          }
          acc[item.x].push(item.y);
          return acc;
        }, {});

        const averages = Object.keys(groupedData).map((x, index) => {
          const yValues = groupedData[x];
          const totalY = yValues.reduce((sum: number, y: number) => sum + y, 0);
          const averageY = totalY / yValues.length;
          return { x: index + 1, y: averageY, label: x };
        });

        const dataForChart = {
          values: [averages],
          series: [seriesLabel],
        };

        tfvis.render.linechart(dataviz.dataviz_area, dataForChart, {
          yAxisDomain: [min_y, max_y],
          xLabel: xLabel,
          xType: "ordinal",
          yLabel: yLabel,
          zoomToFit: true,
        });

        if (averages.length) {
          sideBarKeysDiv(averages);
        }
      };

      languageButton?.addEventListener("click", () => {
        const chartData = data.map((datum) => ({
          ...Project(datum, "x", features[0]),
          ...Project(datum, "y", features[3]),
        }));
        renderButtonContent(
          chartData,
          features[0],
          features[3],
          "Programming language",
          "Programming language",
          "Annual salary ($ US)"
        );
      });

      versionButton?.addEventListener("click", () => {
        const chartData = data.map((datum) => ({
          ...Project(datum, "x", features[1]),
          ...Project(datum, "y", features[3]),
        }));
        renderButtonContent(
          chartData,
          features[1],
          features[3],
          "Version",
          "Version",
          "Average salary ($ US)"
        );
      });

      medalButton?.addEventListener("click", () => {
        const chartData = data.map((datum) => ({
          ...Project(datum, "x", features[2]),
          ...Project(datum, "y", features[3]),
        }));
        renderButtonContent(
          chartData,
          features[2],
          features[3],
          "Developer medal",
          "Developer medal",
          "Annual salary ($ US)"
        );
      });

      // Initial chart rendering
      const chartData = data.map((datum) => ({
        ...Project(datum, "x", features[0]),
        ...Project(datum, "y", features[3]),
      }));
      renderButtonContent(
        chartData,
        features[0],
        features[3],
        "Programming language",
        "Programming language",
        "Annual salary ($ US)"
      );
    } catch (error: unknown) {
      throw new Error(DMiNer_error.No_possible_visualization);
    }
  }

  private static _Histogram(
    dataviz: {
      dataviz_area: HTMLDivElement;
      dataviz_handler: (stop: boolean) => void;
    },
    data: Readonly<Array<Object>>,
    name: string,
    features: Readonly<Array<string>>,
    types: Readonly<Array<string>>,
    enumerations: Readonly<Map<string, Array<boolean | number | string> | null>>
  ): never | void {
    try {
      const min_y = Math.min(
        ...(enumerations.get(features[3]) as Array<number>)
      );
      const max_y = Math.max(
        ...(enumerations.get(features[3]) as Array<number>)
      );
      const buttonsWrapper = createButtonsWrapper();
      buttonsWrapper.id = "histogram-buttons";
      mainModalContent.insertAdjacentElement("beforebegin", buttonsWrapper);

      const languageButton = document.getElementById("btnLanguage");
      const versionButton = document.getElementById("btnVersion");
      const medalButton = document.getElementById("btnMedal");

      const renderChart = (
        groupByKey: string,
        xLabel: string,
        seriesLabel: string
      ) => {
        const groupedData = data.reduce((acc, datum) => {
          const key = datum[groupByKey];
          const value = datum[features[3]];
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(value);
          return acc;
        }, {} as Record<string, number[]>);

        const expectedData = Object.entries(groupedData);
        const dataForChart = {
          values: expectedData.map((data, index) => ({
            label: data[0],
            index: index + 1,
            value:
              data[1].reduce((sum, value) => sum + value, 0) / data[1].length,
          })),
          series: [seriesLabel],
        };

        tfvis.render.barchart(dataviz.dataviz_area, dataForChart.values, {
          xLabel: xLabel,
          yLabel: "Annual salary ($ US)",
          height: 600,
          width: 800,
          zoomToFit: true,
        });

        if (dataForChart.values.length) {
          sideBarKeysDiv(dataForChart.values);
        }
      };

      languageButton?.addEventListener("click", () => {
        renderChart(
          "Programming language",
          "Programming language",
          "Programming language"
        );
      });

      versionButton?.addEventListener("click", () => {
        renderChart("Version", "Version", "Version");
      });

      medalButton?.addEventListener("click", () => {
        renderChart("Developer medal", "Developer medal", "Developer medal");
      });

      // Initial chart render
      renderChart(
        "Programming language",
        "Programming language",
        "Programming language"
      );
    } catch (error: unknown) {
      throw new Error(DMiNer_error.No_possible_visualization);
    }
  }
}
