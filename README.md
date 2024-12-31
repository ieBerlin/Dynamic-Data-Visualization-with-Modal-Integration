# Dynamic Data Visualization with Modal Integration

## Overview
This project is a dynamic and interactive data visualization system that integrates modal components for displaying data tables and providing user interactivity. The system is designed to handle real-time data updates and present the data in customizable graphical formats.

---

## Features
- **Dynamic Modal**: A reusable modal component for displaying data tables dynamically.
- **Real-Time Visualizations**: Supports both line charts and histograms with seamless chart-type switching.
- **Dataset Updates**: Includes drag-and-drop functionality for real-time updates to the dataset.
- **Modular Architecture**: Organized codebase with reusable components and functions.

---

## Project Structure
The project is divided into several key files to ensure maintainability and scalability:

### 1. `modal.ts`
- Manages the opening and closing of the modal element.
- Toggles the visibility of the modal based on conditions.

### 2. `modal-content.ts`
- Contains reusable components for building the user interface, such as:
  - `tableRender`: Renders the data table within the modal.
  - `createButtonsWrapper`: Creates buttons for selecting data types for visualization.
  - `sideBarKeysDiv`: Displays sidebar labels for graphical representations.

### 3. `initialData.ts`
- Sets up the initial dataset for visualizations.

### 4. `funcs.ts`
- Provides essential functions, such as:
  - `getCurrentData`: Fetches real-time dataset values.
  - `updateSystemData`: Updates the dataset after drag-and-drop operations.

### 5. `Dataviz.ts`
- Handles data visualization with the following functionalities:
  - `selectChart`: Allows users to choose between line charts and histograms.
  - `Linechart`: Renders line charts based on the dataset.
  - `Histogram`: Displays bar charts based on the dataset.

---

## How to Use
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dynamic-data-visualization.git
   ```

2. Navigate to the project directory and open the code in VS Code:
   ```bash
   cd dynamic-data-visualization
   code .
   ```

3. Install dependencies and launch the create server feature:
   ```bash
   npm install
   npm start
   ```

4. Navigate to:
   ```
   http://127.0.0.1:5501/LiveDMN.com.html
   ```

---

## Contributions
Contributions are welcome! If you'd like to add features or improve the project, please:
1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push:
   ```bash
   git commit -m "Add feature description"
   git push origin feature-name
   ```
4. Open a pull request on GitHub.

---

## License
This project is licensed under the [MIT License](LICENSE). Made by Alaa Eddine Ourmassi.
