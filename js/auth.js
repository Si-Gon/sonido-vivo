const ADMIN_DEMO = {
    correo: 'admin@sonidovivo.cl',
    clave: 'admin123',
    nombre: 'Administrador',
    rol: 'admin'
};
 
function obtenerUsuariosRegistrados() {
    const data = localStorage.getItem('sonidoVivoUsuarios');
    return data ? JSON.parse(data) : [];
}
 
function buscarUsuario(correo, clave) {

    if (correo === ADMIN_DEMO.correo && clave === ADMIN_DEMO.clave) {
        return ADMIN_DEMO;
    }

    const usuarios = obtenerUsuariosRegistrados();
    return usuarios.find(function (u) {
        return u.correo === correo && u.clave === clave;
    }) || null;
}
 
function iniciarSesion(usuario) {

    sessionStorage.setItem('sonidoVivoSesion', JSON.stringify({
        correo: usuario.correo,
        rol: usuario.rol || 'cliente',
        nombre: usuario.nombre
    }));
}
 
function manejarLogin(event) {
    event.preventDefault();
 
    const correo = document.getElementById('correo').value.trim();
    const clave = document.getElementById('clave').value;
    const errorBox = document.getElementById('login-error');
    errorBox.textContent = '';
 
    if (!correo || !clave) {
        errorBox.textContent = 'Debes ingresar correo y contraseña.';
        return;
    }
 
    const usuario = buscarUsuario(correo, clave);
 
    if (!usuario) {
        errorBox.textContent = 'Correo o contraseña incorrectos.';
        return;
    }
 
    iniciarSesion(usuario);
 
    if (usuario.rol === 'admin') {
        window.location.href = 'admin.html';
    } else {
        window.location.href = 'index.html';
    }
}
 
function obtenerSesion() {
    const data = sessionStorage.getItem('sonidoVivoSesion');
    return data ? JSON.parse(data) : null;
}
 
function cerrarSesion() {
    sessionStorage.removeItem('sonidoVivoSesion');
    window.location.href = 'login.html';
}
 
function protegerRutaAdmin() {
    const sesion = obtenerSesion();
    if (!sesion || sesion.rol !== 'admin') {
        window.location.href = 'login.html';
    }
}

function actualizarNavSesion() {
    const sesion = obtenerSesion();
    const linkLogin = document.querySelector('a[href="login.html"]');
    const linkRegistro = document.querySelector('a[href="registro.html"]');
 
    if (!sesion) return; 
 
    if (linkLogin) {
        linkLogin.textContent = 'Hola, ' + sesion.nombre;
        linkLogin.setAttribute('href', '#');
        linkLogin.addEventListener('click', function (event) {
            event.preventDefault();
            cerrarSesion();
        });
    }
    if (linkRegistro) {
        linkRegistro.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-login');
    if (form) {
        form.addEventListener('submit', manejarLogin);
    }
    actualizarNavSesion();
});


 