document.addEventListener('DOMContentLoaded', function () {
    const mapElement = document.getElementById('map');

    if (mapElement) {
        // Coordenadas: Av. Valparaíso, Viña del Mar
        const lat = -33.0245;
        const lng = -71.5518;

        // Inicializar el mapa
        const map = L.map('map').setView([lat, lng], 14);

        // Cargar capas de OpenStreetMap
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap'
        }).addTo(map);

        // Marcador de la tienda en Viña del Mar
        L.marker([lat, lng]).addTo(map)
            .bindPopup('<b>Sonido Vivo</b><br>Sucursal Viña del Mar.')
            .openPopup();
    }
});