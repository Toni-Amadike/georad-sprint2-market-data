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
