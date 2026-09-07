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

function registrarUsuario(datos) {
    const usuarios = obtenerUsuariosRegistrados();
    const existe = usuarios.find(function (u) { return u.correo === datos.correo; });
    if (existe) return false;
    datos.rol = 'cliente';
    usuarios.push(datos);
    localStorage.setItem('sonidoVivoUsuarios', JSON.stringify(usuarios));
    return true;
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

function manejarRegistro(event) {
    event.preventDefault();
    const run = document.getElementById('run').value.trim();
    const nombre = document.getElementById('nombre').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const region = document.getElementById('region').value;
    const comuna = document.getElementById('comuna').value;
    const direccion = document.getElementById('direccion').value.trim();
    const clave = document.getElementById('clave').value;
    if (!run || !nombre || !apellidos || !correo || !region || !comuna || !direccion || !clave) {
        alert('Todos los campos son obligatorios.');
        return;
    }
    if (run.length < 7 || run.length > 9) {
        alert('El RUN debe tener entre 7 y 9 caracteres.');
        return;
    }
    const exito = registrarUsuario({ run, nombre, apellidos, correo, region, comuna, direccion, clave });
    if (!exito) {
        alert('Ya existe una cuenta con ese correo.');
        return;
    }
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    window.location.href = 'login.html';
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
    const formLogin = document.getElementById('form-login');
    if (formLogin) formLogin.addEventListener('submit', manejarLogin);

    const formRegistro = document.getElementById('form-registro');
    if (formRegistro) formRegistro.addEventListener('submit', manejarRegistro);

    actualizarNavSesion();
});


 