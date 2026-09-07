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
    var run = document.getElementById('run').value.trim();
    var nombre = document.getElementById('nombre').value.trim();
    var apellidos = document.getElementById('apellidos').value.trim();
    var correo = document.getElementById('correo').value.trim();
    var region = document.getElementById('region').value;
    var comuna = document.getElementById('comuna').value;
    var direccion = document.getElementById('direccion').value.trim();
    var clave = document.getElementById('clave').value;
    if (!run || !nombre || !apellidos || !correo || !direccion || !clave) {
        alert('Todos los campos obligatorios deben ser completados.');
        return;
    }
    if (!validarRut(run)) {
        alert('El RUN no es válido. Ingresa sin puntos ni guión con dígito verificador.');
        document.getElementById('run').focus();
        return;
    }
    if (nombre.length > 50) {
        alert('El nombre no puede superar los 50 caracteres.');
        return;
    }
    if (apellidos.length > 100) {
        alert('Los apellidos no pueden superar los 100 caracteres.');
        return;
    }
    if (correo.length > 100) {
        alert('El correo no puede superar los 100 caracteres.');
        return;
    }
    var regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regexEmail.test(correo)) {
        alert('El correo no tiene un formato válido.');
        return;
    }
    if (clave.length < 4 || clave.length > 10) {
        alert('La contraseña debe tener entre 4 y 10 caracteres.');
        return;
    }
    var exito = registrarUsuario({ run: run, nombre: nombre, apellidos: apellidos, correo: correo, region: region, comuna: comuna, direccion: direccion, clave: clave });
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


 