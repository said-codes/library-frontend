function visibility() {
    let icon = document.getElementById("show-icon");
    if (icon.textContent == "visibility_off") {
        icon.innerHTML = "visibility";
        $('#admin-table').hide();

    } else {
        icon.innerHTML = "visibility_off";
        $('#admin-table').show();

    }
};

$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/api/Admin/all",
        type: "GET",
        datatype: "JSON",
        success: function(response) {
            printTable(response);

        }
    });

});

function getAdmins() {
    $.ajax({
        url: "http://localhost:8080/api/Admin/all",
        type: "GET",
        datatype: "JSON",
        success: function(response) {
            console.log(response)
            printTable(response);
        }
    });
}

function printTable(response) {
    let data = response;
    let table = "";
    for (i = 0; i < data.length; i++) {
        table += "<tr class='table-info'>";
        table += "<th>" + data[i].name + "</th>";
        table += "<th>" + data[i].email + "</th>";
        table += "<th>" + "<button type='button' id='btn-view' class='btn btn-info btn-sm'><span class='material-icons'>visibility</span></button> <button type='button' id='btn-update' class='btn btn-warning btn-sm'><span class='material-icons'>update</span></button> <button type='button' id='btn-delete' class='btn btn-danger btn-sm'><span class='material-icons'>delete</span></button>" + "</th>";
        table += "</tr>";
    }
    $("#result").empty();
    $("#result").append(table);
}


//alert
let alertPlaceholder = document.getElementById('liveAlertPlaceholder')

function alert(message, type) {
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

    alertPlaceholder.append(wrapper)
}


function saveInfo() {
    let myData = {
        name: $('#name-admin').val(),
        email: $('#email-admin').val(),
        password: $('#password-admin').val(),
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'url': 'http://localhost:8080/api/Admin/save',
        'type': 'POST',
        'data': dataToSend,
        'datatype': 'JSON',
        success: function(response) {
            $('#result').empty();
            $('#name-admin').val();
            $('#email-admin').val();
            $('#password-admin').val();
            getAdmins();
            alert('The admin user have successfullly registered!', 'success');

        },
    });
    $('#name-admin').val('');
    $('#email-admin').val('');
    $('#password-admin').val('');
    $("#result").empty();
}

$(document).on("click", "#btn-update", function() {
    $('.modal-title').text('Update Admin User');
    $('#save-modal').modal('show');
    const update = document.querySelector("#save");
    update.addEventListener("click", function(event) {
        //update()


    })
});


$(document).on("click", "#btn-delete", function() {
    $('#modal-delete-title').text('Are you sure ?');
    $('#delete-admin-modal').modal('show');
    const confirm = document.querySelector("#btn-confirm");
    confirm.addEventListener("click", function(event) {
        //delete()
    })
});


$(document).on("click", "#btn-view", function() {
    $("#detail-modal").modal('show');

});