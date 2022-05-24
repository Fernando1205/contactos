inpName = document.querySelector('#name');
inpLastname = document.querySelector('#lastname');
inpEmail = document.querySelector('#email');
inpPhone = document.querySelector('#phone');
modal = $('#createContact');

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
                    `<button class="btn btn-outline-dark btn-sm"><i class="fa-solid fa-pen-to-square"></i></button>
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

const btnSubmit = document.querySelector('#btnSubmit');

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
            table.ajax.reload(null, false);
        })
        .catch((e) => console.log(e))
})

function successAlert(msg) {
    Swal.fire('¡Exito!', msg, 'success')
}

function warningAlert() {
    Swal.fire('¡Error!', 'Ha ocurrido un error', 'warning')
}

function resetModal() {
    document.querySelector('#name').value = "";
    document.querySelector('#lastname').value = "";
    document.querySelector('#email').value = "";
    document.querySelector('#phone').value = "";
    modal.modal('hide');
}

$('#custom-table tbody').on('click', 'button', function() {
    var data = table.row($(this).parents('tr')).data();
    console.log(data);
    alert(data._id + "' Nombre is: " + data.name);
});