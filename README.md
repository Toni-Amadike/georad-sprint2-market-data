GeoRAD Sprint 2 – Spatial Questions to Market Data
What Problem the Notebook Solves
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
