const REGIONES_COMUNAS = {
    'Región Metropolitana de Santiago': [
        'Santiago', 'Cerrillos', 'Cerro Navia', 'Conchalí', 'El Bosque',
        'Estación Central', 'Huechuraba', 'Independencia', 'La Cisterna',
        'La Florida', 'La Granja', 'La Pintana', 'La Reina', 'Las Condes',
        'Lo Barnechea', 'Lo Espejo', 'Lo Prado', 'Macul', 'Maipú', 'Ñuñoa',
        'Pedro Aguirre Cerda', 'Peñalolén', 'Providencia', 'Pudahuel',
        'Quilicura', 'Quinta Normal', 'Recoleta', 'Renca', 'San Joaquín',
        'San Miguel', 'San Ramón', 'Vitacura', 'Puente Alto', 'San Bernardo',
        'Colina', 'Lampa', 'Til Til', 'Buin', 'Paine', 'Melipilla', 'Talagante'
    ],
    'Región de Antofagasta': [
        'Antofagasta', 'Mejillones', 'Sierra Gorda', 'Taltal', 'Calama',
        'Ollagüe', 'San Pedro de Atacama', 'Tocopilla', 'María Elena'
    ],
    'Región de Valparaíso': [
        'Valparaíso', 'Casablanca', 'Concón', 'Juan Fernández', 'Puchuncaví',
        'Quintero', 'Viña del Mar', 'Isla de Pascua', 'Los Andes',
        'San Felipe', 'La Ligua', 'Quillota', 'La Calera', 'San Antonio',
        'Algarrobo', 'Cartagena', 'El Quisco', 'El Tabo', 'Santo Domingo'
    ],
    'Región del Biobío': [
        'Concepción', 'Coronel', 'Chiguayante', 'Florida', 'Hualqui',
        'Lota', 'Penco', 'San Pedro de la Paz', 'Santa Juana', 'Talcahuano',
        'Tomé', 'Hualpén', 'Los Ángeles', 'Cabrero', 'Laja', 'Mulchén',
        'Nacimiento', 'Arauco', 'Cañete', 'Curanilahue', 'Lebu', 'Los Álamos'
    ]
};
 
function poblarRegiones() {
    const selectRegion = document.getElementById('region');
    if (!selectRegion) return;
 
    selectRegion.innerHTML = '<option value="">Selecciona una región</option>';
 
    Object.keys(REGIONES_COMUNAS).forEach(function (region) {
        const opcion = document.createElement('option');
        opcion.value = region;
        opcion.textContent = region;
        selectRegion.appendChild(opcion);
    });
}
 
function actualizarComunas() {
    const selectRegion = document.getElementById('region');
    const selectComuna = document.getElementById('comuna');
    if (!selectRegion || !selectComuna) return;
 
    const regionElegida = selectRegion.value;
    selectComuna.innerHTML = '<option value="">Selecciona una comuna</option>';
 
    if (!regionElegida) {
        selectComuna.disabled = true;
        return;
    }
 
    selectComuna.disabled = false;
    const comunas = REGIONES_COMUNAS[regionElegida] || [];
    comunas.forEach(function (comuna) {
        const opcion = document.createElement('option');
        opcion.value = comuna;
        opcion.textContent = comuna;
        selectComuna.appendChild(opcion);
    });
}
 
document.addEventListener('DOMContentLoaded', function () {
    poblarRegiones();
    actualizarComunas();
 
    const selectRegion = document.getElementById('region');
    if (selectRegion) {
        selectRegion.addEventListener('change', actualizarComunas);
    }
});