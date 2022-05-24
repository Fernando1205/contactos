const btnSubmit = document.querySelector('#btnSubmit');
const btnUpdate = document.querySelector('#btnUpdate');


// Inputs de formulario
inpName = document.querySelector('#name');
inpLastname = document.querySelector('#lastname');
inpEmail = document.querySelector('#email');
inpPhone = document.querySelector('#phone');

// Boton modal crear
btnCreate = document.querySelector('#modalShow');

// Modal
modal = $('#createContact');
titleModal = document.querySelector('#createContactLabel');

// Funcion mostrar modal
btnCreate.addEventListener('click', (e) => {
    resetModal();
    modal.modal('show');
    titleModal.innerHTML = 'Crear nuevo contacto';
    btnSubmit.style.display = 'block';
    btnUpdate.style.display = 'none';
});

// Muestra datatable con datos de api
var table = $('#custom-table').DataTable({
    ajax: {
        "url": "/list",
        "dataSrc": ""
    },
    columns: [
        { data: "_id" },
        { data: "name" },
        { data: "lastname" },
        { data: "email" },
        { data: "phone" },
        {
            data: "_id",
            render: function(data, type, row, meta) {
                return type === 'display' ?
                    `<button class="btn btn-outline-dark btn-sm editBtn"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="btn btn-outline-dark btn-sm"><i class="fa-solid fa-trash"></i></button>` :
                    data;
            }
        }
    ],
    language: {
        "decimal": "",
        "emptyTable": "No hay información",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
        "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
        "infoFiltered": "(Filtrado de _MAX_ total entradas)",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "Mostrar _MENU_ Entradas",
        "loadingRecords": "Cargando...",
        "processing": "Procesando...",
        "search": "Buscar:",
        "zeroRecords": "Sin resultados encontrados",
        "paginate": {
            "first": "Primero",
            "last": "Ultimo",
            "next": "Siguiente",
            "previous": "Anterior"
        }
    },
});

// Funcion para guardar contacto
btnSubmit.addEventListener('click', (e) => {

    e.preventDefault();

    fetch('http://127.0.0.1:3001', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                name: inpName.value,
                lastname: inpLastname.value,
                email: inpEmail.value,
                phone: inpPhone.value
            })
        })
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            } else {
                warningAlert();
                throw new Error('Ocurrio un error');
            }
        })
        .then((data) => {
            successAlert(data.message);
            resetModal();
            modal.modal('hide');
            table.ajax.reload(null, false);
        })
        .catch((e) => console.log(e))
})

function resetModal() {
    document.querySelector('#name').value = "";
    document.querySelector('#lastname').value = "";
    document.querySelector('#email').value = "";
    document.querySelector('#phone').value = "";
}

// Muestra los datos a editar en el modal
$('#custom-table tbody').on('click', '.editBtn', function() {
    // Obtiene los datos de la fila seleccionada
    var data = table.row($(this).parents('tr')).data();

    // Muestra modal y cambia titulo
    modal.modal('show');
    titleModal.innerHTML = 'Editar contacto';

    const { _id, name, lastname, email, phone } = data;
    inpName.value = name;
    inpLastname.value = lastname;
    inpEmail.value = email;
    inpPhone.value = phone
    btnSubmit.style.display = 'none';
    btnUpdate.style.display = 'block';
    btnUpdate.dataset._id = _id;
});

// Funcion para guardar contacto
$('body').on('click', '#btnUpdate', (e) => {

    e.preventDefault();
    let _id = e.target.dataset._id;

    fetch(`http://127.0.0.1:3001/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                name: inpName.value,
                lastname: inpLastname.value,
                email: inpEmail.value,
                phone: inpPhone.value
            })
        })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                warningAlert();
                throw new Error('Ocurrio un error');
            }
        })
        .then((data) => {
            successAlert(data.message);
            resetModal();
            modal.modal('hide');
            table.ajax.reload(null, false);
        })
        .catch((e) => console.log(e))
})

// SWEETALERTS
function successAlert(msg) {
    Swal.fire('¡Exito!', msg, 'success')
}

function warningAlert() {
    Swal.fire('¡Error!', 'Ha ocurrido un error', 'warning')
}
// SWEETALERTS