// Algoritmo Módulo 11 para validar RUN chileno
function validarRut(rut) {
    let valor = rut.replace(/\./g, '').replace(/-/g, '').trim().toUpperCase();
    if (valor.length < 8) return false;

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
    const formRegistro = document.querySelector('form');

    if (formRegistro) {
        formRegistro.addEventListener('submit', function (e) {
            e.preventDefault();

            const rutInput = document.getElementById('rut');
            const emailInput = document.getElementById('correo');

            // Validar RUN si existe el campo
            if (rutInput && !validarRut(rutInput.value)) {
                alert('El RUN ingresado no es válido. Formato correcto: 12345678-9');
                rutInput.focus();
                return;
            }

            // Validar Email con expresión regular
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput && !regexEmail.test(emailInput.value)) {
                alert('Por favor, ingresa un correo electrónico válido.');
                emailInput.focus();
                return;
            }

            alert('¡Registro validado e ingresado correctamente!');
            formRegistro.reset();
        });
    }
});