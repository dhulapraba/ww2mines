function toSentenceCase(str) {
    if (!str) return ""; // Return an empty string if the input is empty
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const mockMineData = {
    "Germany": [
        { id: 1, location: "Berlin", coordinates: [52.5200, 13.4050] },
        { id: 2, location: "Hamburg", coordinates: [53.5511, 9.9937] }
    ],
    "France": [
        { id: 3, location: "Paris", coordinates: [48.8566, 2.3522] },
        { id: 4, location: "Lille", coordinates: [50.6292, 3.0573] }
    ]
    // Add more regions as needed
};

const map = L.map('map').setView([51.505, -0.09], 2); // Initial map view

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

document.getElementById('searchBtn').addEventListener('click', () => {
    const country = document.getElementById('countryInput').value;
    locateMines(toSentenceCase(country));
});
function locateMines(country) {
    const mineList = document.getElementById('mineList');
    mineList.innerHTML = ""; // Clear previous results
    const mines = mockMineData[country];

    // Clear previous markers
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    if (mines) {
        mines.forEach(mine => {
            mineList.innerHTML += `<p>Mine ID: ${mine.id}, Location: ${mine.location}</p>`;
            displayOnMap(mine.coordinates);
        });
    } else {
        mineList.innerHTML = "<p>No mine data found for this region.</p>";
    }
}

function displayOnMap(coordinates) {
    const marker = L.marker(coordinates).addTo(map);
    map.setView(coordinates, 10); // Zoom in to the location
}