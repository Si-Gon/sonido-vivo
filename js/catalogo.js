
function formatearPrecio(valor) {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' })
        .format(valor);
}

function renderCatalogo() {
    var contenedor = document.getElementById('lista-productos');
    if (!contenedor) return;

    contenedor.innerHTML = '';

    productos.forEach(function (prod) {
        var col = document.createElement('div');
        col.className = 'card-grid-item';

        col.innerHTML =
            '<div class="card h-100">' +
            '  <img src="' + prod.imagen + '" class="card-img-top" alt="' + prod.nombre + '">' +
            '  <div class="card-body">' +
            '    <h5 class="card-title">' + prod.nombre + '</h5>' +
            '    <p class="card-text text-muted mb-1">' + prod.marca + ' · ' + prod.modelo + '</p>' +
            '    <p class="card-text fw-bold">' + formatearPrecio(prod.precio) + '</p>' +
            '    <div class="d-grid gap-1">' +
            '      <button class="btn btn-outline-dark btn-sm" onclick="verDetalle(' + prod.id + ')">Ver detalle</button>' +
            '      <button class="btn btn-dark btn-sm" onclick="agregarCarrito(' + prod.id + ')">Agregar</button>' +
            '    </div>' +
            '  </div>' +
            '</div>';

        contenedor.appendChild(col);
    });
}

function verDetalle(id) {
    localStorage.setItem('productoSeleccionado', id);
    window.location.href = 'detalle.html';
}

document.addEventListener('DOMContentLoaded', function () {
    renderCatalogo();
});