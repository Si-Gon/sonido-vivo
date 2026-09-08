const CLAVE_PRODUCTOS_ADMIN = 'sonidoVivoProductosAdmin';

function obtenerProductosAdmin() {
    const data = localStorage.getItem(CLAVE_PRODUCTOS_ADMIN);
    if (!data) {
        localStorage.setItem(CLAVE_PRODUCTOS_ADMIN, JSON.stringify(productos));
        return productos.slice();
    }
    return JSON.parse(data);
}

function guardarProductosAdmin(lista) {
    localStorage.setItem(CLAVE_PRODUCTOS_ADMIN, JSON.stringify(lista));
}

function formatoPrecio(valor) {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);
}

function renderTablaProductos() {
    const lista = obtenerProductosAdmin();
    const tbody = document.getElementById('tbody-productos');
    tbody.innerHTML = '';

    lista.forEach(function (p) {
        const fila = document.createElement('tr');
        fila.innerHTML =
            '<td>' + p.codigo + '</td>' +
            '<td>' + p.nombre + '</td>' +
            '<td>' + p.categoria + '</td>' +
            '<td>' + formatoPrecio(p.precio) + '</td>' +
            '<td>' + p.stock + '</td>' +
            '<td>' +
            '<button type="button" onclick="cargarParaEditar(\'' + p.id + '\')">Editar</button> ' +
            '<button type="button" onclick="eliminarProducto(\'' + p.id + '\')">Eliminar</button>' +
            '</td>';
        tbody.appendChild(fila);
    });
}

function mostrarFormulario(producto) {
    document.getElementById('form-producto').reset();
    document.getElementById('producto-id').value = producto ? producto.id : '';
    document.getElementById('form-producto-titulo').textContent =
        producto ? 'Editar producto' : 'Agregar producto';

    if (producto) {
        document.getElementById('codigo').value = producto.codigo;
        document.getElementById('categoria').value = producto.categoria;
        document.getElementById('nombre-producto').value = producto.nombre;
        document.getElementById('marca').value = producto.marca;
        document.getElementById('modelo').value = producto.modelo;
        document.getElementById('precio').value = producto.precio;
        document.getElementById('stock').value = producto.stock;
        document.getElementById('descripcion').value = producto.descripcion;
        document.getElementById('imagen').value = producto.imagen;
    }

    document.getElementById('contenedor-form-producto').style.display = 'block';
}

function ocultarFormulario() {
    document.getElementById('contenedor-form-producto').style.display = 'none';
    document.getElementById('form-producto').reset();
}

function cargarParaEditar(id) {
    const lista = obtenerProductosAdmin();
    const producto = lista.find(function (p) { return String(p.id) === String(id); });
    if (producto) mostrarFormulario(producto);
}

function eliminarProducto(id) {
    if (!confirm('¿Seguro que quieres eliminar este producto?')) return;

    let lista = obtenerProductosAdmin();
    lista = lista.filter(function (p) { return String(p.id) !== String(id); });
    guardarProductosAdmin(lista);
    renderTablaProductos();
}

function manejarSubmitProducto(event) {
    event.preventDefault();

    const idExistente = document.getElementById('producto-id').value;
    const lista = obtenerProductosAdmin();

    const datos = {
        codigo: document.getElementById('codigo').value.trim(),
        categoria: document.getElementById('categoria').value.trim(),
        nombre: document.getElementById('nombre-producto').value.trim(),
        marca: document.getElementById('marca').value.trim(),
        modelo: document.getElementById('modelo').value.trim(),
        precio: Number(document.getElementById('precio').value),
        stock: Number(document.getElementById('stock').value),
        descripcion: document.getElementById('descripcion').value.trim(),
        imagen: document.getElementById('imagen').value.trim()
    };

    if (idExistente) {
        const indice = lista.findIndex(function (p) { return String(p.id) === String(idExistente); });
        if (indice !== -1) {
            datos.id = lista[indice].id;
            lista[indice] = datos;
        }
    } else {
        datos.id = 'p_' + Date.now();
        lista.push(datos);
    }

    guardarProductosAdmin(lista);
    ocultarFormulario();
    renderTablaProductos();
}

document.addEventListener('DOMContentLoaded', function () {
    renderTablaProductos();

    const form = document.getElementById('form-producto');
    if (form) {
        form.addEventListener('submit', manejarSubmitProducto);
    }

    const btnAgregar = document.getElementById('btn-agregar-producto');
    if (btnAgregar) {
        btnAgregar.addEventListener('click', function () { mostrarFormulario(null); });
    }

    const btnCancelar = document.getElementById('btn-cancelar-producto');
    if (btnCancelar) {
        btnCancelar.addEventListener('click', ocultarFormulario);
    }
});