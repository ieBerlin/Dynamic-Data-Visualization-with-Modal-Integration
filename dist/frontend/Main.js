/** webpack */
// import DmnJS from "dmn-js";
// import DMN_diagram from "./DMN_diagram";
// import Decision_maker from "./Decision_maker";
import { Trace } from "../common/Settings.js";
import Decision_maker from "./Decision_maker.js";
import DMN_diagram from "./DMN_diagram.js";
import { getCurrentData } from "./funcs.js";
class DMiNer {
    static Change_screen(screen) {
        // if (Trace)
        //     console.assert(window.document.readyState !== 'loading');
        const screens = window.document.getElementsByClassName("Screen");
        for (let i = 0; i < screens.length; i++)
            screens.item(i).setAttribute("style", "visibility: hidden;");
        window.document
            .getElementById(screen)
            .setAttribute("style", "visibility: visible;");
    }
    static Dataviz(stop = false) {
        DMiNer.Change_screen(stop ? "LiveDMN" : "Dataviz_area");
    }
    static Test_case(file_name, file_content = null) {
        window.history.replaceState({ file_name: file_name, file_content: file_content }, "");
        DMiNer.Change_screen("LiveDMN");
    }
}
DMiNer.Disable_drag_and_drop = () => {
    // 'preventDefault' in 'dragover' is MANDATORY to later control 'drop':
    window.document.body.addEventListener("dragover", (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
    }, false);
    window.document.body.addEventListener("drop", (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
    }, false);
};
// For DMN files:
DMiNer.File_reader = new FileReader();
DMiNer.Enable_load_file = () => {
    DMiNer.File_reader.onerror = (error) => {
        throw new Error("Error loading DMN file: " + error);
    };
    // Get DMN file from local file system:
    DMiNer.File_reader.onload = (progress_event) => {
        if (Trace)
            console.assert(progress_event.target === DMiNer.File_reader, "'DMiNer.File_reader.onload' >> 'progress_event.target === DMiNer.File_reader', untrue.");
        if (Trace)
            console.assert("file_name" in window.history.state, "'DMiNer.File_reader.onload' >> '\"file_name\" in window.history.state', untrue.");
        DMiNer.Test_case(window.history.state.file_name, DMiNer.File_reader.result);
        window.document.body.dispatchEvent(new Event(DMiNer.Reload));
    };
};
DMiNer.Reload = "Reload";
DMiNer.Test_cases = new Map();
window.addEventListener("contextmenu", (me) => {
    // if (Trace)
    //     console.assert(window.document.readyState !== 'loading');
    me.preventDefault();
    DMiNer.HTML_input_element.click();
});
window.addEventListener("DOMContentLoaded", async (_) => {
    DMiNer.Dataviz_area = window.document.getElementById("Dataviz_area");
    DMiNer.DAT_GUI = new dat.GUI({ name: "DMiNer" });
    DMiNer.DAT_GUI.add(DMN_diagram, "Download");
    DMiNer.DAT_GUI.add(Decision_maker, "Dtype", Decision_maker.Dtypes);
    const randomize = DMiNer.DAT_GUI.addFolder("randomize");
    randomize.add(DMN_diagram, "RandomSize", 50, 5000, 5); //.onChange((size: number) => DMN_diagram.RandomSize = size);
    randomize.open();
    const train = DMiNer.DAT_GUI.addFolder("train");
    train.add(Decision_maker, "BatchSize", 50, 5000, 5);
    train.add(Decision_maker, "Epochs", 50, 5000, 5);
    train.open();
    const setup = DMiNer.DAT_GUI.addFolder("setup");
    setup.add(Decision_maker, "Activation", Decision_maker.Activations);
    setup.add(Decision_maker, "Initializer", Decision_maker.Initializers);
    // 'listen()' allows GUI update:
    setup.add(Decision_maker, "Loss", Decision_maker.Losses).listen(); //.onChange(()=>{alert('Loss');});
    setup.add(Decision_maker, "Optimizer", Decision_maker.Optimizers).listen();
    setup.add(Decision_maker, "Units", 32, 256, 32);
    setup.open();
    DMiNer.HTML_input_element = window.document.createElement("input");
    DMiNer.HTML_input_element.type = "file";
    DMiNer.HTML_input_element.onchange = (event) => {
        if (event.target.files.length > 0) {
            DMiNer.Test_case(event.target.files[0].name);
            // Load XML:
            DMiNer.File_reader.readAsText(event.target.files[0]);
        }
    };
    DMiNer.TC14_ = window.document.getElementById("TC14_");
    DMiNer.Viewer = new DmnJS({
        container: window.document.getElementById("LiveDMN"), // See "LiveDMN" as id. in 'LiveDMN.com.html'...
    });
    DMiNer.Disable_drag_and_drop();
    DMiNer.Enable_load_file();
    window.document.body.addEventListener(DMiNer.Reload, () => {
        // if (Trace)
        //     console.assert("file_name" in window.history.state, "'DMiNer.Reload' >> '\"file_name\" in window.history.state', untrue.");
        let diagram = DMiNer.Test_cases.get(window.history.state.file_name);
        if (!diagram) {
            diagram = new DMN_diagram(window.history.state.file_name, DMiNer.Viewer, {
                dataviz_area: DMiNer.Dataviz_area,
                dataviz_handler: DMiNer.Dataviz,
            });
            DMiNer.Test_cases.set(window.history.state.file_name, diagram);
        }
        else
            diagram.view();
        diagram.name.then((name) => (DMiNer.TC14_.innerHTML = name));
    });
    const collection = window.document.getElementsByClassName("TC");
    collection.item(0).addEventListener("click", (event) => {
        // DMiNer.Test_case(
        //   "./TEST_CASES/Developer_annual_salary/Developer_annual_salary.dmn"
        // );
        window.document.body.dispatchEvent(new Event(DMiNer.Reload));
    });
    collection.item(1).addEventListener("click", (event) => {
        DMiNer.Test_case("./TEST_CASES/Get_barcode_country/Get_barcode_country.dmn");
        window.document.body.dispatchEvent(new Event(DMiNer.Reload));
    });
    collection.item(2).addEventListener("click", (event) => {
        DMiNer.Test_case("./TEST_CASES/Trisotech/Car_Damage_Responsibility/Car Damage Responsibility.dmn");
        window.document.body.dispatchEvent(new Event(DMiNer.Reload));
    });
    collection.item(3).addEventListener("click", (event) => {
        DMiNer.Test_case("./TEST_CASES/Trisotech/Determine_the_Repair_Location/Determine the Repair Location.dmn");
        window.document.body.dispatchEvent(new Event(DMiNer.Reload));
    });
    window.document
        .getElementById("Information")
        .addEventListener("mouseenter", (event) => DMiNer.Change_screen("Information_"), false);
    window.document
        .getElementById("Information")
        .addEventListener("mouseleave", (event) => DMiNer.Change_screen("LiveDMN"), false);
    window.document
        .getElementById("Bug")
        .addEventListener("mouseenter", (event) => DMiNer.Change_screen("Bug_"), false);
    window.document
        .getElementById("Bug")
        .addEventListener("mouseleave", (event) => DMiNer.Change_screen("LiveDMN"), false);
    window.document
        .getElementById("Dataviz_icon")
        .addEventListener("mouseenter", (event) => DMiNer.Change_screen("Dataviz_area"), false);
    window.document
        .getElementById("Dataviz_icon")
        .addEventListener("mouseleave", (event) => DMiNer.Change_screen("LiveDMN"), false);
    DMiNer.Test_case("./TEST_CASES/Developer_annual_salary/Developer_annual_salary.dmn");
    window.document.body.dispatchEvent(new Event(DMiNer.Reload));
    // https://nudger.fr/opendata
    // DMiNer.Set_current_test_case("./TEST_CASES/Get_barcode_country/Get_barcode_country.dmn");
    // file_content: await (new DMN_diagram("./TEST_CASES/Trisotech/Car_Damage_Responsibility/Car Damage Responsibility.dmn", DMiNer.Viewer, DMiNer.DAT_GUI)).XML,
    // file_name: "./TEST_CASES/Trisotech/Car_Damage_Responsibility/Car Damage Responsibility.dmn"
    // file_content: await (new DMN_diagram("./TEST_CASES/Trisotech/Determine_the_Repair_Location/Determine the Repair Location.dmn", DMiNer.Viewer, DMiNer.DAT_GUI)).XML,
    // file_name: "./TEST_CASES/Trisotech/Determine_the_Repair_Location/Determine the Repair Location.dmn"
    // file_content: await (new DMN_diagram("./TEST_CASES/Trisotech/DMN_Specification_Chapter_11_Example/DMN Specification Chapter 11 Example.dmn", DMiNer.Viewer, DMiNer.DAT_GUI)).XML,
    // file_name: "./TEST_CASES/Trisotech/DMN_Specification_Chapter_11_Example/DMN Specification Chapter 11 Example.dmn"
    // file_content: await (new DMN_diagram("./TEST_CASES/Trisotech/EU-Rent_Pricing/EU-Rent Pricing.dmn", DMiNer.Viewer, DMiNer.DAT_GUI)).XML,
    // file_name: "./TEST_CASES/Trisotech/EU-Rent_Pricing/EU-Rent Pricing.dmn"
    // file_content: await (new DMN_diagram("./TEST_CASES/Trisotech/Instrument_Rating_Category/Instrument Rating Category.dmn", DMiNer.Viewer, DMiNer.DAT_GUI)).XML,
    // file_name: "./TEST_CASES/Trisotech/Instrument_Rating_Category/Instrument Rating Category.dmn"
    // file_content: await (new DMN_diagram("./TEST_CASES/Trisotech/LACE_Scoring/LACE Scoring.dmn", DMiNer.Viewer, DMiNer.DAT_GUI)).XML,
    // file_name: "./TEST_CASES/Trisotech/LACE_Scoring/LACE Scoring.dmn"
    // file_content: await (new DMN_diagram("./TEST_CASES/Trisotech/Loan_Pre_Qualification/Loan Pre-Qualification.dmn", DMiNer.Viewer, DMiNer.DAT_GUI)).XML,
    // file_name: "./TEST_CASES/Trisotech/Loan_Pre_Qualification/Loan Pre-Qualification.dmn"
    // file_content: await (new DMN_diagram("./TEST_CASES/Trisotech/Vacation_Approval/Vacation Approval.dmn", DMiNer.Viewer, DMiNer.DAT_GUI)).XML,
    // file_name: "./TEST_CASES/Trisotech/Vacation_Approval/Vacation Approval.dmn"
    // file_content: await (new DMN_diagram("./TEST_CASES/TEST_interval.dmn", DMiNer.Viewer, DMiNer.DAT_GUI)).XML,
    // file_name: "./TEST_CASES/TEST_interval.dmn"
    const p = getCurrentData().map((z) => {
        delete z["_DMiNer_ UNIQUE hit rule(s)"];
        return JSON.stringify(z);
    });
    //    window.alert("hello world!")
    // window.alert(p);
});
//# sourceMappingURL=Main.js.map