function visibility() {
    let icon = document.getElementById("show-icon");
    if (icon.textContent == "visibility_off") {
        icon.innerHTML = "visibility";
        $('#btn-save').hide();
        $('#lib-table').hide();

    } else {
        icon.innerHTML = "visibility_off";
        $('#btn-save').show();
        $('#lib-table').show();

    }
};

$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/api/Lib/all",
        type: "GET",
        datatype: "JSON",
        success: function(response) {
            printTable(response);
            $('#lib-table').show();

        }
    });

});

$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function(response) {
            printCategories(response);
        }
    });

});

function getLibs() {
    $.ajax({
        url: "http://localhost:8080/api/Lib/all",
        type: "GET",
        datatype: "JSON",
        success: function(response) {
            printTable(response);
        }
    });
}

function printTable(response) {

    let data = response;
    let table = "";
    for (i = 0; i < data.length; i++) {
        table += "<tr class='table-info'>";
        table += "<th>" + data[i].target + "</th>";
        table += "<th>" + data[i].capacity + "</th>";
        table += "<th>" + data[i].name + "</th>";
        table += "<th>" + data[i].description + "</th>";
        table += "<th>" + data[i].category.name + "</th>";
        table += "<th>" + "<button type='button' id='btn-view' class='btn btn-info btn-sm'><span class='material-icons'>visibility</span></button><button type='button' id='btn-update' class='btn btn-warning btn-sm'><span class='material-icons'>update</span></button><button type='button' id='btn-delete' class='btn btn-danger btn-sm'><span class='material-icons'>delete</span></button>" + "</th>";
        table += "</tr>";
    }
    $("#result").empty();
    $("#result").append(table);
}

function printCategories(response) {
    let data = response;
    let select = "<select id='category-id' class='form-select' aria-label='Default select example'>";
    select += "<option selected>" + "Choose a cotegory" + "</option>";
    for (i = 0; i < data.length; i++) {
        select += "<option value='" + data[i].id + "'>" + data[i].name + "</option>";
    }
    select += "</select>";
    $("#category-id-save").empty();
    $("#category-id-save").append(select);
}


function saveInfo() {
    let myData = {
        target: $('#target').val(),
        capacity: parseInt($('#capacity').val()),
        category: { id: parseInt($('#category-id').val()) },
        name: $('#name').val(),
        description: $('#description').val()
    };
    let dataToSend = JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'url': 'http://localhost:8080/api/Lib/save',
        'type': 'POST',
        'data': dataToSend,
        'datatype': 'JSON',
        success: function(response) {
            $('#result').empty();
            $('#target').val();
            $('#capacity').val();
            $('#category-id').val();
            $('#name').val();
            $('#description').val();
            getLibs();
        },
    });

    $('#save-modal').modal('hide');
    $("#result").empty();



}


$(document).on("click", "#btn-save", function() {
    $('#target').val('');
    $('#capacity').val('');
    $('#category-id').val('');
    $('#name').val('');
    $('#description').val('');
    $('.modal-title').text('New Library');
    $('#save-modal').modal('show');
});

$(document).on("click", "#btn-update", function() {
    $('#target').val('');
    $('#capacity').val('');
    $('#category-id').val('');
    $('#name').val('');
    $('#description').val('');
    $('.modal-title').text('Update Library');
    $('#save-modal').modal('show');
    const update = document.querySelector("#save");
    update.addEventListener("click", function(event) {
        //updateInfo()

    })
});


$(document).on("click", "#btn-delete", function() {
    $('#modalTitleDelete').text('Are you sure ?');
    $('#delete-lib-modal').modal('show');
    const confirm = document.querySelector("#btn-confirm");
    confirm.addEventListener("click", function(event) {
        //deleteInfo(id);
    })
});


$(document).on("click", "#btn-view", function() {
    $("#detail-modal").modal('show');

});