document.addEventListener('DOMContentLoaded', function () {
    const mapElement = document.getElementById('map');

    if (mapElement) {

        const lat = -33.0245;
        const lng = -71.5518;

        const map = L.map('map').setView([lat, lng], 14);


        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap'
        }).addTo(map);

        L.marker([lat, lng]).addTo(map)
            .bindPopup('<b>Sonido Vivo</b><br>Sucursal Viña del Mar.')
            .openPopup();
    }
});