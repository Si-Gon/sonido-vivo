const CLAVE_USUARIOS = 'sonidoVivoUsuarios';

function obtenerUsuarios() {
    const data = localStorage.getItem(CLAVE_USUARIOS);
    return data ? JSON.parse(data) : [];
}

function guardarUsuarios(lista) {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(lista));
}

function renderTablaUsuarios() {
    const lista = obtenerUsuarios();
    const tbody = document.getElementById('tbody-usuarios');
    tbody.innerHTML = '';

    if (lista.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4">Todavía no hay usuarios registrados en este navegador.</td></tr>';
        return;
    }

    lista.forEach(function (u) {
        const fila = document.createElement('tr');
        fila.innerHTML =
            '<td>' + (u.nombre || '(sin nombre)') + '</td>' +
            '<td>' + u.correo + '</td>' +
            '<td>' +
            '<select onchange="cambiarRol(\'' + u.correo + '\', this.value)">' +
            '<option value="cliente"' + (u.rol === 'cliente' ? ' selected' : '') + '>Cliente</option>' +
            '<option value="admin"' + (u.rol === 'admin' ? ' selected' : '') + '>Admin</option>' +
            '</select>' +
            '</td>' +
            '<td><button type="button" onclick="eliminarUsuario(\'' + u.correo + '\')">Eliminar</button></td>';
        tbody.appendChild(fila);
    });
}

function cambiarRol(correo, nuevoRol) {
    const lista = obtenerUsuarios();
    const usuario = lista.find(function (u) { return u.correo === correo; });
    if (usuario) {
        usuario.rol = nuevoRol;
        guardarUsuarios(lista);
    }
    renderTablaUsuarios();
}

function eliminarUsuario(correo) {
    if (!confirm('¿Seguro que quieres eliminar a ' + correo + '?')) return;

    let lista = obtenerUsuarios();
    lista = lista.filter(function (u) { return u.correo !== correo; });
    guardarUsuarios(lista);
    renderTablaUsuarios();
}

document.addEventListener('DOMContentLoaded', renderTablaUsuarios);