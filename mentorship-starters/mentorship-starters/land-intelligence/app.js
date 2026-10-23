const DATA_URL = "./data/land-intelligence.json";

const formatNaira = (value) => {
  if (value === null || value === undefined || value === "") return "-";
  const number = Number(value);
  if (Number.isNaN(number)) return String(value);
  return `₦${number.toLocaleString("en-NG")}`;
};

const normalizeName = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

const state = {
  locations: [],
  map: null,
  markersByTown: new Map(),
  layerGroup: null,
  selectedTown: null,
};

const els = {
  form: document.querySelector("#search-form"),
  input: document.querySelector("#search-input"),
  status: document.querySelector("#status"),
  townList: document.querySelector("#town-list"),
  details: document.querySelector("#details"),
  clearButton: document.querySelector("#clear-selection"),
};

function setStatus(message, tone = "") {
  els.status.textContent = message;
  els.status.className = `status${tone ? ` ${tone}` : ""}`;
}

function renderTownList() {
  els.townList.innerHTML = "";

  // When a town is selected, keep only that row so details can use the panel space.
  const visible = state.selectedTown
    ? state.locations.filter((location) => location.town === state.selectedTown)
    : state.locations;

  const heading = document.querySelector(".block-head h2");
  if (heading) {
    heading.textContent = state.selectedTown ? "Selected" : "Locations";
  }

  document.querySelector(".panel")?.classList.toggle("is-selected", Boolean(state.selectedTown));

  for (const location of visible) {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = location.town;
    button.dataset.town = location.town;
    if (state.selectedTown === location.town) {
      button.classList.add("active");
    }
    button.addEventListener("click", () => {
      if (state.selectedTown === location.town) {
        clearSelection();
        return;
      }
      selectLocation(location.town);
    });
    item.appendChild(button);
    els.townList.appendChild(item);
  }
}

function renderDetails(location) {
  if (!location) {
    els.details.innerHTML = '<p class="empty-details">Select a location to view details.</p>';
    return;
  }

  const marketRange = location.currentMarketRange
    ? `<div>
        <dt>Current market range</dt>
        <dd>${location.currentMarketRange}</dd>
      </div>`
    : "";

  els.details.innerHTML = `
    <dl>
      ${marketRange}
      <div>
        <dt>Indicative market level</dt>
        <dd>${formatNaira(location.indicativeMarketLevel)} / sqm</dd>
      </div>
      <div>
        <dt>Current land price / sqm</dt>
        <dd>${formatNaira(location.currentLandPricePerSqm)}</dd>
      </div>
      <div>
        <dt>Supporting source</dt>
        <dd>${location.supportingSource || "-"}</dd>
      </div>
      <div>
        <dt>Date searched</dt>
        <dd>${location.dateSearched || "-"}</dd>
      </div>
      <div>
        <dt>Development ${location.earlierYear || 2016}</dt>
        <dd>${location.earlierDevelopment ?? "-"}</dd>
      </div>
      <div>
        <dt>Development ${location.recentYear || 2026}</dt>
        <dd>${location.recentDevelopment ?? "-"}</dd>
      </div>
      <div>
        <dt>Development change</dt>
        <dd>${location.developmentChange ?? "-"}</dd>
      </div>
      <div>
        <dt>Development change level</dt>
        <dd>${location.developmentChangeLevel || "-"}</dd>
      </div>
      <div>
        <dt>Notes</dt>
        <dd>${location.notes || "-"}</dd>
      </div>
    </dl>
  `;
}

function popupHtml(location) {
  return `
    <strong>${location.town}</strong><br />
    Market: ${formatNaira(location.indicativeMarketLevel)} / sqm<br />
    Change: ${location.developmentChangeLevel || "-"}
  `;
}

function fitAllMarkers() {
  if (!state.locations.length) return;
  const bounds = L.latLngBounds(
    state.locations.map((location) => [location.lat, location.lng]),
  );
  state.map.fitBounds(bounds.pad(0.2));
}

function clearSelection() {
  state.selectedTown = null;
  renderTownList();
  renderDetails(null);
  state.markersByTown.forEach((marker) => marker.closePopup());
  fitAllMarkers();
  setStatus("");
}

function selectLocation(townName, { fromSearch = false } = {}) {
  const location = state.locations.find(
    (item) => normalizeName(item.town) === normalizeName(townName),
  );

  if (!location) {
    setStatus("Town not available.", "error");
    state.selectedTown = null;
    renderTownList();
    renderDetails(null);
    return;
  }

  state.selectedTown = location.town;
  renderTownList();
  renderDetails(location);
  setStatus(
    fromSearch ? `Found ${location.town}.` : `Showing ${location.town}.`,
    "success",
  );

  const marker = state.markersByTown.get(location.town);
  if (marker) {
    state.map.setView([location.lat, location.lng], 13, { animate: true });
    marker.openPopup();
  }
}

function addMarkers() {
  state.layerGroup.clearLayers();
  state.markersByTown.clear();

  for (const location of state.locations) {
    const marker = L.marker([location.lat, location.lng]).bindPopup(
      popupHtml(location),
    );
    marker.on("click", () => selectLocation(location.town));
    marker.addTo(state.layerGroup);
    state.markersByTown.set(location.town, marker);
  }

  fitAllMarkers();
}

function initMap() {
  state.map = L.map("map", {
    scrollWheelZoom: true,
    zoomControl: false,
  }).setView([6.5244, 3.3792], 11);

  // Keep zoom clear of the floating left panel.
  L.control.zoom({ position: "topright" }).addTo(state.map);

  // Same Esri street basemap as Sprint 3 / 4 Colabs (no API key; OSM.org often 403s).
  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    {
      maxZoom: 19,
      attribution: "Tiles &copy; Esri",
    },
  ).addTo(state.map);

  state.layerGroup = L.layerGroup().addTo(state.map);

  // Full-height layouts often need a resize after paint.
  setTimeout(() => state.map.invalidateSize(), 0);
}

async function loadData() {
  if (window.location.protocol === "file:") {
    throw new Error("Serve over localhost to load data.");
  }

  const response = await fetch(DATA_URL);
  if (!response.ok) {
    throw new Error(`Could not load ${DATA_URL}`);
  }

  const payload = await response.json();
  if (!Array.isArray(payload)) {
    throw new Error("land-intelligence.json must be an array of locations.");
  }

  state.locations = payload.map((row) => ({
    town: row.town || row.Town || row.location || row.Location,
    lat: Number(row.lat ?? row.latitude ?? row.Latitude),
    lng: Number(row.lng ?? row.lon ?? row.longitude ?? row.Longitude),
    currentMarketRange: row.currentMarketRange ?? row["Current Market Range"],
    currentLandPricePerSqm:
      row.currentLandPricePerSqm ?? row["Current Land Price/sqm"],
    supportingSource: row.supportingSource ?? row["Supporting Source"],
    dateSearched: row.dateSearched ?? row["Date Searched"],
    indicativeMarketLevel:
      row.indicativeMarketLevel ?? row["Indicative Market Level"],
    earlierYear: row.earlierYear ?? row["Earlier Year"] ?? 2016,
    earlierDevelopment: row.earlierDevelopment ?? row["Earlier Development"],
    recentYear: row.recentYear ?? row["Recent Year"] ?? 2026,
    recentDevelopment: row.recentDevelopment ?? row["Recent Development"],
    developmentChange: row.developmentChange ?? row["Development Change"],
    developmentChangeLevel:
      row.developmentChangeLevel ?? row["Development Change Level"],
    notes: row.notes ?? row.Notes,
  }));

  const invalid = state.locations.find(
    (row) => !row.town || Number.isNaN(row.lat) || Number.isNaN(row.lng),
  );
  if (invalid) {
    throw new Error(
      "Each location needs town, lat, and lng. Check your JSON fields.",
    );
  }
}

function bindEvents() {
  els.form.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = els.input.value.trim();
    if (!query) {
      setStatus("Enter a town name.", "error");
      return;
    }
    selectLocation(query, { fromSearch: true });
  });

  els.clearButton.addEventListener("click", clearSelection);
}

async function boot() {
  initMap();
  bindEvents();
  renderDetails(null);

  try {
    await loadData();
    addMarkers();
    renderTownList();
    setStatus(`${state.locations.length} locations`);
  } catch (error) {
    console.error(error);
    setStatus(
      error instanceof Error ? error.message : "Failed to load database.",
      "error",
    );
  }
}

boot();
