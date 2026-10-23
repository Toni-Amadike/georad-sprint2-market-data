# GeoRAD Sprint 2 – Spatial Questions to Market Data
What Problem the Notebook Solves:
The notebook demonstrates how spatial locations can be connected to real-world market information. It investigates the current indicative land price per square metre for five selected locations in **Mosan-Okunola LCDA, Lagos State**.
## Inputs
The notebook takes:
* A GeoJSON file containing the selected locations from Sprint 1.
* A SerpApi API key for retrieving Google search/AI Overview results.
The five locations are Abesan 2, Abesan 1, Mosan / Akinoggun, Gowon Estate, and Okunola.
## Workflow
The notebook:
* Uploads and reads the Sprint 1 GeoJSON.
* Extracts the names of the selected locations.
* Generates a land-price question for each location.
* Uses SerpApi to retrieve Google AI Overview information.
* Extracts an indicative land price per square metre and a supporting source.
* Organizes the results into a structured dataset.
## Output
The workflow produces a market dataset containing:
*Town*
*Current Land Price/sqm*
*Supporting Source*
*Date Searched*
The dataset is exported as both *CSV* and *JSON* files.
## Issues and Limitations
The land prices obtained are indicative *asking prices* from online property information, not official valuations or confirmed transaction prices. Prices can vary depending on the exact location, plot size, land use, accessibility, and listing date. Google AI Overview results may also change over time. Automatic extraction may therefore require manual verification.
# Sprint 3: From Market Data to Market Intelligence
## Problem
This project examines differences in current land asking-price levels across five towns in Mosan-Okunola LCDA: Abesan 1, Abesan 2, Gowon Estate, Mosan / Akinoggun, and Okunola. The aim was to transform the raw market data collected during Sprint 2 into an indicative market intelligence dataset that allows the five towns to be compared.
## Data
The analysis used the Sprint 2 market dataset, containing the town name, current land price per square metre (₦/sqm), supporting source, and date searched. The market data was combined with the five-town geographic dataset to support spatial comparison and visualization.
## Analysis Method
The dataset was checked for town names, price units, and missing or unusual values. The market-price observations were then linked to the corresponding towns and summarized to produce an indicative market level for each location. The results were compared across the five towns using a bar chart and represented spatially using a market map.
## How the Indicative Market Level Was Produced
The Indicative Market Level represents the recorded asking-price observation for each town. Because the dataset contains one observation per town (n = 1), the mean and median are identical for every town. Therefore, the available asking-price observation was retained as the indicative market level rather than presenting it as a statistically established market average or formal property valuation.
The resulting indicative levels were:
* Abesan 1 — ₦211,000/sqm
* Abesan 2 — ₦133,000/sqm
* Gowon Estate — ₦215,000/sqm
* Mosan / Akinoggun — ₦75,000/sqm
* Okunola — ₦231,000/sqm
## Observations
The recorded asking-price levels vary across the five towns. Okunola has the highest observed asking-price level at ₦231,000/sqm, followed by Gowon Estate at ₦215,000/sqm and Abesan 1 at ₦211,000/sqm. Abesan 2 records ₦133,000/sqm, while Mosan / Akinoggun records the lowest observed level at ₦75,000/sqm.
These differences provide an indicative comparison of the collected market observations rather than a definitive ranking of the overall land market.
## Limitations
The main limitation is that only one market-price observation is available for each town. This is not enough to establish a reliable market-price range or measure price variation within each town. The prices are also asking prices and may differ from actual transaction prices. A larger dataset containing multiple listings or transaction records per town, together with property characteristics such as plot size, location, accessibility, and land-use type, would provide a stronger basis for market analysis.
# Sprint 4: Satellite Imagery to Spatial Intelligence
## Spatial Question
How can satellite imagery and the Normalized Difference Built-up Index (NDBI) be used to assess changes in a development indicator between 2016 and 2026 across selected locations in Mosan-Okunola LCDA, Lagos State?
The analysis compares an NDBI-based development indicator for the two periods and measures the change for each selected location.
## Locations
The study was carried out in five selected locations within Mosan-Okunola LCDA, Lagos State, Nigeria:
* Abesan 1
* Abesan 2
* Gowon Estate
* Mosan / Akinoggun
* Okunola
## Imagery and Data
The analysis used *Landsat 8/9 Surface Reflectance imagery* accessed through Google Earth Engine.
The imagery was used to calculate the *Normalized Difference Built-up Index (NDBI)* for 2016 and 2026. Cloud masking and annual image composites were applied before calculating the index.
The analysis was implemented using:
* Google Earth Engine
* Google Colab
* Python
* Landsat 8/9 Surface Reflectance imagery
* NDBI
## Workflow
The main workflow was:
* Define the five study locations.
* Load Landsat 8/9 Surface Reflectance imagery.
* Apply cloud masking.
* Create imagery composites for 2016 and 2026.
* Calculate NDBI.
* Apply the selected NDBI threshold.
* Estimate the percentage of pixels meeting the development indicator within each location.
* Compare the 2016 and 2026 values.
* Calculate Development Change.
* Classify the resulting change.
* Produce a table and visualisation of the results.
* Perform a threshold sensitivity experiment using an NDBI threshold of 0.05.
* Validate the final calculations and classifications.
The **main analysis used an NDBI threshold of 0.0**. The 0.05 threshold was used separately as a sensitivity experiment.
## How Development Change Was Measured
Development Change was calculated as:
*Development Change = Recent Development (%) − Earlier Development (%)*
Therefore:
* **Earlier Development (%)** = NDBI-based development indicator for 2016
* **Recent Development (%)** = NDBI-based development indicator for 2026
* **Development Change** = 2026 value − 2016 value
The main results were:
| Location          | 2016 Development (%) | 2026 Development (%) | Development Change (pp) |
| Abesan 2          |                71.13 |                69.63 |                   -1.50 |
| Okunola           |                91.18 |                86.06 |                   -5.12 |
| Mosan / Akinoggun |                76.37 |                71.23 |                   -5.15 |
| Gowon Estate      |                93.66 |                80.67 |                  -13.00 |
| Abesan 1          |                87.64 |                72.89 |                  -14.75 |

The changes are expressed in *percentage points (pp)*.
The resulting Development Change values were classified using the classification rule defined in the notebook. Based on the calculated values, all five locations were classified as *Low*.
## Observations
The results show that all five selected locations recorded negative changes in the NDBI-based development indicator between the two periods.
*Abesan 2* recorded the smallest negative change at *-1.50 percentage points*.
*Abesan 1* recorded the largest negative change at *-14.75 percentage points*.
*Gowon Estate* recorded a change of *-13.00 percentage points*.
*Okunola* and *Mosan / Akinoggun* recorded changes of approximately *-5.12* and *-5.15 percentage points*, respectively.
A threshold sensitivity experiment was also carried out by changing the NDBI threshold from *0.0 to 0.05*. This demonstrated that the selected threshold can affect the estimated development percentage.
The results therefore show the importance of considering analytical parameters when interpreting satellite-derived indicators.
## Limitations
* NDBI is a *spectral indicator* and should not be interpreted as a direct inventory of buildings or development.
* NDBI values can also be influenced by *bare or exposed soil*, which may affect the estimated development indicator.
* A change in the NDBI-based indicator does not by itself prove that construction or demolition occurred.
* The results are sensitive to the selected NDBI threshold, as demonstrated by the sensitivity experiment.
* The 2026 imagery represents the available imagery for the analysis period and may not represent a complete calendar year.
* The results should therefore be interpreted as changes in an **NDBI-based development indicator**, rather than definitive measurements of physical development.
## Validation
The final calculations and classifications were checked in the notebook.
* **All calculations valid: True**
* **All classifications valid: True**
# Sprint 5: Land Intelligence — Mosan-Okunola LCDA
## Project Overview
The Land Intelligence application is a web-based prototype developed as part of the GeoRAD Mentorship Programme, Sprint 5: From Signals to Land Intelligence.
The project integrates Market Intelligence and Development Change data for five assigned locations in Mosan-Okunola Local Council Development Area (LCDA), Lagos State, Nigeria.
The application allows users to search for a supported town or ward, view its location on a map, and access its land market and development-change information.
## Key Features
- Interactive base map displaying the supported locations.
- Search functionality for the five assigned locations.
- Location matching and map highlighting.
- Display of Market Intelligence and Development Change information.
- Unavailable-location feedback displaying `Town not available.`
## Database Structure
The integrated database is stored in JSON format at:
`data/land-intelligence.json`
The file contains an array of location records. Each record combines location coordinates, market intelligence information, and development-change results.
### Database Fields
| Field | Description |
| `town` | Town or ward name |
| `lat` | Latitude coordinate |
| `lng` | Longitude coordinate |
| `currentMarketRange` | Indicative current market range, where available |
| `indicativeMarketLevel` | Indicative land market level |
| `currentLandPricePerSqm` | Indicative land asking price per square metre |
| `supportingSource` | Source supporting the market information |
| `dateSearched` | Date the market information was searched |
| `earlierYear` | Earlier year used in the development comparison |
| `earlierDevelopment` | Earlier development indicator |
| `recentYear` | Recent year used in the development comparison |
| `recentDevelopment` | Recent development indicator |
| `developmentChange` | Difference between the development indicators |
| `developmentChangeLevel` | Assigned development-change category |
| `notes` | Additional notes, where available |
The database also includes a `notes` field for contextual information. Some values may be empty where information was not available.
## Data Interpretation and Limitations
The land prices in this prototype are indicative asking-price information gathered from supporting sources. They should not be interpreted as verified transaction prices, formal property valuations, or guaranteed market values.
Development-change indicators represent the results of the preceding analysis. Their interpretation depends on the methodology and data used in that analysis.
The application is a prototype intended to support location-based exploration of land intelligence. Its outputs should be interpreted alongside their supporting sources and the limitations of the underlying data.
## Project Structure
The main application files are organised as follows:
```text
land-intelligence/
├── index.html
├── app.js
├── styles.css
├── README.md
├── data/
│   └── land-intelligence.json
└── notebooks/
```
The `index.html` file provides the application page, `app.js` handles application behaviour, and `styles.css` contains the styling. The integrated database is stored in the `data` folder. The `notebooks` folder contains relevant notebook files, if included in the repository.
## Requirements
- A modern web browser.
- Node.js and npm installed on the computer.
- The project files, including `data/land-intelligence.json`.
## How to Run the Application Locally
1. Download or clone this repository to your computer.
2. Open the project folder named `land-intelligence` in Visual Studio Code.
3. Open the integrated terminal.
4. Confirm that the terminal is in the folder containing `index.html`.
5. Start a local web server by running:
   **Windows PowerShell:**
   ```powershell
   npx.cmd --yes serve .
   ```
   **Other terminals where `npx` is available:**
   ```bash
   npx --yes serve .
   ```
6. Wait for the terminal to display the local server address.
7. Open that address in your web browser.
8. Search for one of the five supported locations and inspect the displayed information.
If the terminal requests permission to install the `serve` package, review the prompt and proceed if appropriate. An internet connection may be required the first time the package is downloaded.
## Testing
The application should be tested to confirm that:
1. The base map loads.
2. Supported locations can be searched.
3. A matching location is displayed on the map.
4. Market Intelligence and Development Change details are available for the selected location.
5. Searching for an unsupported location displays the exact message `Town not available.`
## Sprint Deliverable
This project represents the integration of previous spatial analysis and land intelligence exercises into a simple, searchable web application. It demonstrates how spatial location information, indicative market data, and development-change indicators can be combined into a single prototype.
**Programme:** GeoRAD Mentorship Programme  
**Sprint:** Week 6 — Sprint 5: From Signals to Land Intelligence  
**Study Area:** Mosan-Okunola LCDA, Lagos State, Nigeria
