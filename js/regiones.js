const datosUbicacion = {
    "Región Metropolitana": ["Santiago", "Providencia", "Las Condes", "Maipú", "Puente Alto", "Ñuñoa"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "Concón"],
    "Bío Bío": ["Concepción", "Talcahuano", "San Pedro de la Paz", "Chiguayante", "Chillán"],
    "Antofagasta": ["Antofagasta", "Calama", "Tocopilla"]
};

document.addEventListener('DOMContentLoaded', function () {
    const selectRegion = document.getElementById('region');
    const selectComuna = document.getElementById('comuna');

    if (selectRegion && selectComuna) {
        // Cargar regiones al inicio
        for (let region in datosUbicacion) {
            let opcion = document.createElement('option');
            opcion.value = region;
            opcion.textContent = region;
            selectRegion.appendChild(opcion);
        }

        // Escuchar el cambio en el selector de región
        selectRegion.addEventListener('change', function () {
            const regionSeleccionada = this.value;
            selectComuna.innerHTML = '<option value="">Seleccione Comuna</option>';

            if (regionSeleccionada && datosUbicacion[regionSeleccionada]) {
                datosUbicacion[regionSeleccionada].forEach(function (comuna) {
                    let opcion = document.createElement('option');
                    opcion.value = comuna;
                    opcion.textContent = comuna;
                    selectComuna.appendChild(opcion);
                });
            }
        });
    }
});