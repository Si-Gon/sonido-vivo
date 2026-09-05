function renderDetalle() {
    const contenedor = document.getElementById('detalle-producto');
    if (!contenedor) return;

    const id = parseInt(localStorage.getItem('productoSeleccionado'));

    // busca el producto por id en el arreglo (filter devuelve lista; [0] toma el primero)
    const prod = productos.filter(function (p) { return p.id === id; })[0];

    if (!prod) {
        contenedor.innerHTML = '<p>Producto no encontrado. <a href="catalogo.html">Volver al catálogo</a></p>';
        return;
    }

    contenedor.innerHTML =
        '<img src="' + prod.imagen + '" alt="' + prod.nombre + '" ' +
        'onerror="this.src=\'imagenes/sin-foto.jpg\'">' +
        '<h2>' + prod.nombre + '</h2>' +
        '<p><b>Categoría:</b> ' + prod.categoria + '</p>' +
        '<p><b>Marca:</b> ' + prod.marca + ' · Modelo: ' + prod.modelo + '</p>' +
        '<p class="precio">' + formatearPrecio(prod.precio) + '</p>' +
        '<p><b>Código:</b> ' + prod.codigo + ' · Stock: ' + prod.stock + ' unidades</p>' +
        '<p><b>Descripción:</b> ' + prod.descripcion + '</p>'+
        '<button onclick="agregarCarrito(' + prod.id + ')">Agregar al carrito</button>';
    document.title = 'Sonido Vivo - ' + prod.nombre;
}

function formatearPrecio(valor) {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' })
        .format(valor);
}

document.addEventListener('DOMContentLoaded', function () {
    renderDetalle();
});