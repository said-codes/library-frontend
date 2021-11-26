function visibility() {
    let icon = document.getElementById("show-icon");
    if (icon.textContent == "visibility_off") {
        icon.innerHTML = "visibility";
        $('#btn-save').hide();
        $('#reservation-table').hide();

    } else {
        icon.innerHTML = "visibility_off";
        $('#btn-save').show();
        $('#reservation-table').show();

    }
};

$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/api/Reservation/all",
        type: "GET",
        datatype: "JSON",
        success: function(response) {
            printTable(response);

        }
    });

});

$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function(response) {
            printClients(response);
        }
    });

});
$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/api/Lib/all",
        type: "GET",
        datatype: "JSON",
        success: function(response) {
            printLibs(response);
        }
    });

});

function getReservation() {
    $.ajax({
        url: "http://localhost:8080/api/Reservation/all",
        type: "GET",
        datatype: "JSON",
        success: function(response) {
            printTable(response);
        }
    });
}

function printClients(response) {
    let data = response;
    let select = "<select id='client-id-select' class='form-select' aria-label='Default select example'>";
    select += "<option selected>" + "Choose your name" + "</option>";

    for (i = 0; i < data.length; i++) {
        select += "<option value='" + data[i].idClient + "'>" + data[i].name + "</option>";
    }
    select += "</select>";
    $("#client-id-reservation").empty();
    $("#client-id-reservation").append(select);
    $("#client-id-reservation-update").empty();
    $("#client-id-reservation-update").append(select);

}

function printLibs(response) {
    let data = response;
    let select = "<select id='lib-id-select' class='form-select' aria-label='Default select example'>";
    select += "<option selected>" + "Choose a Library" + "</option>";

    for (i = 0; i < data.length; i++) {
        select += "<option value='" + data[i].id + "'>" + data[i].name + "</option>";
    }
    select += "</select>";
    $("#lib-id-reservation").empty();
    $("#lib-id-reservation").append(select);
    $("#lib-id-reservation-update").empty();
    $("#lib-id-reservation-update").append(select);
}

function printTable(response) {

    let data = response;
    let table = "";
    for (i = 0; i < data.length; i++) {
        table += "<tr class='table-info'>";
        table += "<th>" + data[i].startDate + "</th>";
        table += "<th>" + data[i].devolutionDate + "</th>";
        table += "<th>" + data[i].client.name + "</th>";
        table += "<th>" + data[i].lib.name + "</th>";
        table += "<th>" + data[i].lib.category.name + "</th>";
        table += "<th>" + "<button type='button' id='btn-view' class='btn btn-info btn-sm'><span class='material-icons'>visibility</span></button> <button type='button' id='btn-update' class='btn btn-warning btn-sm'><span class='material-icons'>update</span></button> <button type='button' id='btn-delete' class='btn btn-danger btn-sm'><span class='material-icons'>delete</span></button><button type='button' id='btn-grade' class='btn btn-primary btn-sm' onClick='showScore(" + data[i].id + ")'>" + "<span class='material-icons'> add_task </span></button></th>";
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
        startDate: Date.parse($('#start-date').val()),
        devolutionDate: Date.parse($("#devolution-date").val()),
        client: { idClient: parseInt($('#client-id-select').val()) },
        lib: { id: parseInt($('#lib-id-select').val()) },
    };
    let dataToSend = JSON.stringify(myData);
    console.log(myData)
    console.log(dataToSend);

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'url': 'http://localhost:8080/api/Reservation/save',
        'type': 'POST',
        'data': dataToSend,
        'datatype': 'JSON',
        success: function(response) {
            $('#result').empty();
            $('#start-date').val();
            $('#devolution-date').val();
            $('#client-id-select').val();
            $('#lib-id-select').val();
            alert('Your reservation was created successfully!', 'success');
            getReservation();
        },
    });
    $('#message').val('');
    $('#client-id-select').val('');
    $('#lib-id-select').val('');
    $("#result").empty();

}

function saveScore(reservation) {
    let reservationId = reservation;
    let myData = {
        score: parseInt($('#score').val()),
        message: $("#message-score").val(),
        reservation: { id: reservationId },
    };
    let dataToSend = JSON.stringify(myData);
    console.log(myData)
    console.log(dataToSend);

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'url': 'http://localhost:8080/api/Score/save',
        'type': 'POST',
        'data': dataToSend,
        'datatype': 'JSON',
        success: function(response) {
            $('#result').empty();
            $('#score').val();
            $('#message-score').val();
            alert('Your score was created successfully!', 'success');
            getReservation();
        },
    });
    $('#score').val('');
    $('#message-score').val('');
    $("#save-score-modal").modal('hide');
    $("#result").empty();

}


$(document).on("click", "#btn-update", function() {
    $('#save-modal').modal('show');
    const update = document.querySelector("#save");
    update.addEventListener("click", function(event) {
        //updateInfo();

    })
});


$(document).on("click", "#btn-delete", function() {
    $('#delete-message-modal').modal('show');
    const confirm = document.querySelector("#btn-confirm");
    confirm.addEventListener("click", function(event) {
        //deleteInfo(id);
    })
});

$(document).on("click", "#btn-view", function() {
    $("#detail-modal").modal('show');
});

function showScore(id) {
    $("#save-score-modal").modal('show');
    $(document).on("click", "#save-score", function() {
        saveScore(id);
    });


}