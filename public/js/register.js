const btnRegister = document.querySelector('#btnRegister');
const txtPass = document.querySelector('#password');
const txtPassConfirm = document.querySelector('#confPassword');

// Inputs de formulario
inpName = document.querySelector('#name');
inpLastname = document.querySelector('#lastname');
inpEmail = document.querySelector('#email');
inpPass = document.querySelector('#password');
inpPassConf = document.querySelector('#confPassword');

// Registro de usuario al API
btnRegister.addEventListener('click', function(e) {

    e.preventDefault();

    fetch('http://127.0.0.1:3001/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                name: inpName.value,
                lastname: inpLastname.value,
                email: inpEmail.value,
                password: inpPass.value,
                confPassword: txtPassConfirm.value
            })
        })
        .then(response => response.json())
        .then((data) => {
            if (data.success) {
                resetForm();
                successAlert(data.message);
            } else {
                showErrors(data.errors);
            }
        })
        .catch(error => {
            console.log(error);
            warningAlert();
        })
})

// Muestra errores en los inputs
function showErrors(errors) {
    errors.forEach(error => {
        document.querySelector(`#${error.param}Error`).style.display = 'block';
        document.querySelector(`#${error.param}Error`).innerHTML = error.msg;
    });
}

// Resetea el formulario
function resetForm() {
    inpName.value = "";
    inpLastname.value = "";
    inpEmail.value = "";
    inpPass.value = "";
    inpPassConf.value = "";
}

// Checa si son iguales las contraseñas
txtPassConfirm.addEventListener('keyup', function() {
    if (this.value == txtPass.value && this.value.length > 5) {
        btnRegister.removeAttribute('disabled');
    } else {
        btnRegister.setAttribute('disabled', true);
    }
});

// Checa si son iguales las contraseñas
txtPass.addEventListener('keyup', function() {
    if (this.value == txtPassConfirm.value && this.value.length > 5) {
        btnRegister.removeAttribute('disabled');
    } else {
        btnRegister.setAttribute('disabled', true);
    }
});