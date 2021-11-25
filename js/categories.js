function visibility(){
    let icon = document.getElementById("show-icon");
    if(icon.textContent == "visibility_off"){
      icon.innerHTML="visibility";
      $('#btn-save').hide();
      $('#category-table').hide();
         
    }else{
      icon.innerHTML="visibility_off"; 
      $('#btn-save').show();
      $('#category-table').show();
     
    }
  };
  
  $(document).ready(function (){
    $.ajax({
      url:"http://localhost:8080/api/Category/all",
      type: "GET",
      datatype: "JSON",
      success:function(response){
        printTable(response);
         $('#category-table').show();
        
      }
    });
  
  });
   
  function getCategories(){
    $.ajax({
      url:"http://localhost:8080/api/Category/all",
      type: "GET",
      datatype: "JSON",
      success:function(response){
        printTable(response);
      }
    });
  }
  function printTable(response){
  
    let data = response;
    let table = "";
    for(i=0;i<data.length;i++){      
         table+="<tr class='table-info'>";
         table+="<th>"+data[i].name+"</th>";
         table+="<th>"+data[i].description+"</th>"
         table+="<th>"+"<button type='button' id='btn-view' class='btn btn-info btn-sm'><span class='material-icons'>visibility</span></button> <button type='button' id='btn-update' class='btn btn-warning btn-sm'><span class='material-icons'>update</span></button> <button type='button' id='btn-delete' class='btn btn-danger btn-sm'><span class='material-icons'>delete</span></button>"+"</th>";
         table+="</tr>";      
    }
    $("#result-category").empty();
    $("#result-category").append(table);
  }
  
  
  function saveInfo() {
    let myData = {
      name:$('#name-category').val(),
      description:$('#description-category').val(),
    };
    let dataToSend= JSON.stringify(myData);
    $.ajax({
      headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json' 
      },
      'url': 'http://localhost:8080/api/Category/save',
      'type': 'POST',
      'data': dataToSend,
      'datatype': 'JSON',
      success: function (response) {
        $('#result').empty();
        $('#name-category').val();
        $('#description-category').val();
        getCategories();   
      },
    });
  
    $('#save-category-modal').modal('hide');
    $("#result").empty();
  
   
    
  }
  /*
  function updateInfo () {
    let myData = {
      target:$('#target').val(),
      capacity:parseInt($('#capacity').val()),
      category: { id:parseInt($('#category-id').val())},
      name:$('#name').val(),
      description:$('#description').val()
    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    $.ajax({
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
    },
    'url': 'http://localhost:8080/api/Lib/update',
     'type': 'PUT',
      'contentType': 'application/JSON',
      'data': dataToSend,
      'datatype': 'JSON',
      success: function (response) {
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
   
  };
  */
  
  
  
  $(document).on("click", "#btn-save", function(){	
    $('#name-category').val('');
    $('#description-category').val('');
   
    $('.modal-title').text('New Category');
    $('#save-category-modal').modal('show');
  });
  /*
  function deleteInfo (id) {
    let myData = {
      id: id,
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
    },
    'url': 'http://localhost:8080/api/Lib/delete',
     'type': 'DELETE',
      'contentType': 'application/JSON',
      'data': dataToSend,
      'datatype': 'JSON',
      success: function (response) {
        $('#result').empty();
      },
    });
   $('#deleteModal').modal('hide');
   window.location.reload();
  };
  */
  $(document).on("click", "#btn-update", function(){	
    /*
    let row = $(this).closest("tr");	        
    //let id = parseInt(row.find('td:eq(0)').text());          
    let target = row.find('td:eq(1)').text();
    let capacity = row.find('td:eq(2)').text();
    let name = row.find('td:eq(2)').text();
    let description = row.find('td:eq(2)').text();
    let category = row.find('td:eq(2)').text();
     
    $("#target").text(target);
    $("#capacity").text(capacity);
    $("#name").text(name);
    $("#description").text(description);
    $("#category-id-lib").text(category);
    */
    $('#name-category').val('');
    $('#description-category').val('');
    $('.modal-title').text('Update Category');
    $('#save-category-modal').modal('show');
    const update = document.querySelector("#save");
    update.addEventListener("click", function(event){
      //updateInfo();
  
    })
  });
  
  
  $(document).on("click", "#btn-delete", function(){	
    id = parseInt($(this).closest('tr').find('td:eq(0)').text());
    $('#modalTitleDelete').text('Are you sure ?');
    $('#delete-category-modal').modal('show');
    const confirm = document.querySelector("#btnConfirm");
    confirm.addEventListener("click", function(event){
      deleteInfo(id);
    })
  });
  
  
  $(document).on("click", "#btn-view", function(){	
    /*
    let row = $(this).closest("tr");	        
    //let id = parseInt(row.find('td:eq(0)').text());          
    let target = row.find('td:eq(1)').text();
    let capacity = row.find('td:eq(2)').text();
    let name = row.find('td:eq(2)').text();
    let description = row.find('td:eq(2)').text();
    let category = row.find('td:eq(2)').text();
   
    $("#target-detail").text(target);
    $("#capacity-detail").text(capacity);
    $("#name-detail").text(name);
    $("#description-detail").text(description);
    $("#category-detail").text(category);
    */
    $("#titleModalDetail").text('Category Detail');
    $("#detail-category-modal").modal('show');
   
  });
  
  
  
  