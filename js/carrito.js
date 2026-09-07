function renderCarrito() {
    const contenedor = document.getElementById('lista-carrito');
    if (!contenedor) return;

    const ids = JSON.parse(localStorage.getItem('carrito')) || [];
    contenedor.innerHTML = '';
    document.getElementById('total-carrito').textContent = '';

    if (ids.length === 0) {
        contenedor.innerHTML = '<p>El carrito está vacío. <a href="catalogo.html">Ir al catálogo</a></p>';
        return;
    }

    let total = 0;
    ids.forEach(function (id, index) {
        const prod = productos.filter(function (p) { return p.id === id; })[0];
        if (!prod) return;

        total += prod.precio;
        const item = document.createElement('div');
        item.className = 'carrito-item';
        item.innerHTML =
            '<img src="' + prod.imagen + '" alt="' + prod.nombre + '" ' +
            '<div>' +
            '<h3>' + prod.nombre + '</h3>' +
            '<p class="precio">' + formatearPrecio(prod.precio) + '</p>' +
            '<button onclick="quitarDelCarrito(' + index + ')">Quitar</button>' +
            '</div>';
        contenedor.appendChild(item)
    });

    document.getElementById('total-carrito').textContent =
        'Total: ' + formatearPrecio(total);
}

function quitarDelCarrito(index) {
    const ids = JSON.parse(localStorage.getItem('carrito')) || [];
    ids.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(ids));
    renderCarrito();
}

function vaciarCarrito() {
    localStorage.removeItem('carrito');
    renderCarrito();
}

function formatearPrecio(valor) {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' })
        .format(valor);
}

function agregarCarrito(id) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert('Producto agregado al carrito');
}

document.addEventListener('DOMContentLoaded', function () {
    renderCarrito();
});