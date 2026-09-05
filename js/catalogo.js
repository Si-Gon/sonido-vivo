// Sonido Vivo - Catálogo desde el arreglo 'productos' (js/productos.js)

function formatearPrecio(valor) {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' })
        .format(valor);
}

function renderCatalogo() {
    const contenedor = document.getElementById('lista-productos');
    if (!contenedor) return;

    contenedor.innerHTML = '';                     

    productos.forEach(function (prod) {            
        const card = document.createElement('div');
        card.className = 'producto-card';

        card.innerHTML =
            '<img src="' + prod.imagen + '" alt="' + prod.nombre + '" ' +
            'onerror="this.src=\'imagenes/sin-foto.jpg\'">' +
            '<h3>' + prod.nombre + '</h3>' +
            '<p class="marca">' + prod.marca + ' ' + prod.modelo + '</p>' +
            '<p class="precio">' + formatearPrecio(prod.precio) + '</p>' +
            '<button onclick="verDetalle(' + prod.id + ')">Ver detalle</button>';
        contenedor.appendChild(card);
    });
}

function verDetalle(id) {
    localStorage.setItem('productoSeleccionado', id);
    window.location.href = 'detalle.html';
}

document.addEventListener('DOMContentLoaded', function () {
    renderCatalogo();
});