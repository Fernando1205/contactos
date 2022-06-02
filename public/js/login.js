const btnLogin = document.querySelector('#btnLogin');
const txtEmail = document.querySelector('#email');
const txtPass = document.querySelector('#password');

var emailCheck = false;
var passCheck = false;

btnLogin.addEventListener('click', function(e) {

    e.preventDefault();

    fetch('http://127.0.0.1:3001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                email: txtEmail.value,
                password: txtPass.value
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log(data);
                document.querySelector(`#emailError`).style.display = 'none';
                successAlert(data.message);
            } else {
                showErrors(data.errors);
            }
        })
        .catch(error => console.log(error));

})

// Validación inputs formulario
document.querySelector('#email').addEventListener('keyup', function() {

    let email = String(this.value).toLocaleLowerCase();
    const emailRe = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (this.value !== '' && email.match(emailRe)) {
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
        emailCheck = true;
    } else {
        this.classList.add('is-invalid');
        emailCheck = false;
    }

    activeBtnLogin();
});

document.querySelector('#password').addEventListener('keyup', function() {

    if (this.value !== '' && this.value.length > 5) {
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
        passCheck = true;
    } else {
        this.classList.add('is-invalid');
        passCheck = false;
    }

    activeBtnLogin();
});
// Validación inputs formulario

// Activa botón login
function activeBtnLogin() {
    if (emailCheck && passCheck) {
        btnLogin.removeAttribute('disabled');
    } else {
        btnLogin.setAttribute('disabled', true);
    }
}

function showErrors(errors) {
    document.querySelector(`#emailError`).style.display = 'block';
    document.querySelector(`#emailError`).innerHTML = 'El email o contraseña no son validos';
}