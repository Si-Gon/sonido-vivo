// Algoritmo Módulo 11 para validar RUN chileno
function validarRut(rut) {
    if (!rut) return false;
    
    // El RUN no debe contener espacios accidentales en ninguna parte
    if (/\s/.test(rut)) return false;

    let valor = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();

    if (valor.length < 8 || valor.length > 9) return false;

    let cuerpo = valor.slice(0, -1);
    let dv = valor.slice(-1);

    if (!/^[0-9]+$/.test(cuerpo)) return false;

    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo.charAt(i)) * multiplo;
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    let dvEsperado = 11 - (suma % 11);
    let dvTexto = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

    return dv === dvTexto;
}

document.addEventListener('DOMContentLoaded', function () {
    const formContacto = document.getElementById('form-contacto');
    const formRegistro = document.querySelector('form:not(#form-contacto)');

    // Regex estricta: Valida estructura exacta y PROHÍBE explícitamente cualquier espacio (\s)
    const regexEmailEstricto = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // 1. VALIDACIÓN ESTRICTA: CONTACTO.HTML
    if (formContacto) {
        formContacto.addEventListener('submit', function (e) {
            e.preventDefault();

            const nombreInput = document.getElementById('nombre');
            const correoInput = document.getElementById('correo');
            const mensajeInput = document.getElementById('mensaje');

            const nombre = nombreInput?.value || '';
            const correo = correoInput?.value || '';
            const mensaje = mensajeInput?.value || '';

            // Verificar si hay campos vacíos o solo espacios
            if (!nombre.trim() || !correo.trim() || !mensaje.trim()) {
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }

            // Verificar que el correo no contenga espacios al inicio, centro o final
            if (!regexEmailEstricto.test(correo)) {
                alert('Por favor, ingresa un correo electrónico válido sin espacios al inicio ni al final.');
                correoInput.focus();
                return;
            }

            alert('¡Mensaje enviado con éxito!');
            formContacto.reset();
        });
    }

    // 2. VALIDACIÓN ESTRICTA: REGISTRO.HTML
    if (formRegistro) {
        formRegistro.addEventListener('submit', function (e) {
            e.preventDefault();

            const rutInput = document.getElementById('rut') || document.getElementById('run') || formRegistro.querySelector('input[name="rut"]') || formRegistro.querySelector('input[name="run"]');
            const emailInput = document.getElementById('correo') || formRegistro.querySelector('input[type="email"]');
            
            const inputs = formRegistro.querySelectorAll('input:not([type="submit"]), select, textarea');
            let hayCampoVacio = false;

            inputs.forEach(input => {
                if (input.value.trim() === '') {
                    hayCampoVacio = true;
                }
            });

            if (hayCampoVacio) {
                alert('Por favor, completa todos los campos del formulario.');
                return;
            }

            if (rutInput) {
                const valorRut = rutInput.value;
                if (!validarRut(valorRut)) {
                    alert('El RUN ingresado no es válido. Asegúrate de que no tenga espacios ni un formato incorrecto.');
                    rutInput.focus();
                    return;
                }
            }

            if (emailInput) {
                const valorCorreo = emailInput.value;
                if (!regexEmailEstricto.test(valorCorreo)) {
                    alert('Por favor, ingresa un correo electrónico válido sin espacios al inicio ni al final.');
                    emailInput.focus();
                    return;
                }
            }

            const nombreInput = document.getElementById('nombre');
            const claveInput = document.getElementById('clave');

            const nombre = nombreInput ? nombreInput.value.trim() : '';
            const correoRegistro = emailInput ? emailInput.value.trim() : '';
            const claveRegistro = claveInput ? claveInput.value : '';

            const usuarios = JSON.parse(localStorage.getItem('sonidoVivoUsuarios') || '[]');
            usuarios.push({
                correo: correoRegistro,
                nombre: nombre,
                clave: claveRegistro,
                rol: 'cliente'
            });
            localStorage.setItem('sonidoVivoUsuarios', JSON.stringify(usuarios));

            iniciarSesion({ correo: correoRegistro, nombre: nombre, rol: 'cliente' });
            window.location.href = 'index.html';
            
            alert('¡Registro validado e ingresado correctamente!');
            formRegistro.reset();
        });
    }
});