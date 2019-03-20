var baseUrl = "http://localhost:8000"
var paramUrl = "/type"

$(document).ready(function(){
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });

  $(".alert").hide()

  onLoad()
})
///////////////////////////////////////FORMAT UTILITES///////////////////////////////////////
function onLoadModal(title_modal, body_modal, footer_modal) {
  $(".modal-title").empty().html(title_modal)
  $(".modal-body").empty().html(body_modal)
  $(".alert").hide()
  $(".modal-footer").empty().html(footer_modal)
}

function hideAlert() {
  $("[data-hide]").click(function(){
    $("."+$(this).attr("data-hide")).hide()
  })
}

function backAfterDone(param_1, param_2) {
  if(param_1) {
    let message = param_2
    message += "<button class='close' data-hide='alert'>&times;</button>"
    $("#modal").modal("toggle")
    $("#product-do-success").empty().show().removeClass("alert-danger").addClass("alert-success").html(message)
    hideAlert()
    onLoad()
  }
}

function errorAlert(message) {
  message += "<button class='close' data-hide='alert'>&times;</button>"
  $("#product-add-error").empty().show().html(message)
  hideAlert()
}
///////////////////////////////////////LOADER HTML///////////////////////////////////////////
function onLoad() {
  $.ajax({
    url: baseUrl + paramUrl + "/all",
    method: 'post',
    data: {
      'page': 1
    },
    dataType: 'json'
  }).done(function(data){
    var table = "<table border='1' width='100%'><thead><th>No.</th><th>Name Type</th><th>Action</th></thead><tbody>"
    if(data.data.data.length > 0) {
      $.each(data.data.data, function(index, value) {
        let editFunct = "onUpdateModal(&quot;"+value.id+"&quot;)"
        let delFunct = "onDeleteModal(&quot;"+value.id+"&quot;)"

        table += "<tr>"
        table += "<td>"+(index+1)+"</td>"
        table += "<td>"+value.name+"</td>"
        table += "<td><div class='d-flex flex-row justify-content-start'>"
        table += "<button data-toggle='modal' data-target='#modal' onclick='"+editFunct+"'>Edit</button>"
        table += "<button data-toggle='modal' data-target='#modal' onclick='"+delFunct+"'>Delete</button>"
        table += "</div></td></tr>"
      })
      table += "</tbody></table>"
    } else {
      table += "<tr>"
      table += "<td colspan='3'>"
      table += "<h4 class='text-center'>No data available</h4>"
      table += "</td>"
      table += "</tr>"
    }
    $("#type-layout").empty().html(table)

    var page = "<ul class='pagination justify-content-center' style='margin:20px'>"

    for(let i = 0; i < data.data.last_page; i++) {
      let loadPage = "onLoadPage(&quot;"+(i + 1)+"&quot;)"

      if(data.data.current_page == (i + 1)) {
        page += "<li class='page-item active'><button class='page-link' onclick='"+loadPage+"'>"+(i + 1)+"</button></li>"    
      } else {
        page += "<li class='page-item'><button class='page-link' onclick='"+loadPage+"'>"+(i + 1)+"</button></li>"
      }
    }

    page += "</ul>"
    $('#page').empty().html(page)
  })
}

function onLoadPage(selected_page) {
  $.ajax({
    url: baseUrl + paramUrl + "/all",
    method: 'post',
    data: {
      'page': selected_page
    },
    dataType: 'json'
  }).done(function(data){
    var table = "<table border='1' width='100%'><thead><th>No.</th><th>Name Type</th><th>Action</th></thead><tbody>"
    if(data.data.data.length > 0) {
      $.each(data.data.data, function(index, value) {
        let editFunct = "onUpdateModal(&quot;"+value.id+"&quot;)"
        let delFunct = "onDeleteModal(&quot;"+value.id+"&quot;)"

        table += "<tr>"
        table += "<td>"+(index+1)+"</td>"
        table += "<td>"+value.name+"</td>"
        table += "<td><div class='d-flex flex-row justify-content-start'>"
        table += "<button data-toggle='modal' data-target='#modal' onclick='"+editFunct+"'>Edit</button>"
        table += "<button data-toggle='modal' data-target='#modal' onclick='"+delFunct+"'>Delete</button>"
        table += "</div></td></tr>"
      })
      table += "</tbody></table>"
    } else {
      table += "<tr>"
      table += "<td colspan='3'>"
      table += "<h4 class='text-center'>No data available</h4>"
      table += "</td>"
      table += "</tr>"
    }
    $("#type-layout").empty().html(table)

    var page = "<ul class='pagination justify-content-center' style='margin:20px'>"

    for(let i = 0; i < data.data.last_page; i++) {
      let loadPage = "onLoadPage(&quot;"+(i + 1)+"&quot;)"

      if(data.data.current_page == (i + 1)) {
        page += "<li class='page-item active'><button class='page-link' onclick='"+loadPage+"'>"+(i + 1)+"</button></li>"    
      } else {
        page += "<li class='page-item'><button class='page-link' onclick='"+loadPage+"'>"+(i + 1)+"</button></li>"
      }
    }

    page += "</ul>"
    $('#page').empty().html(page)
  })
}

function onCreateModal() {
  let title = "Add New Modal"

  let form = "<div class='alert alert-danger alert-dimissible fade show' id='type-add-error'></div>"
  form +="<div class='form-group'>"
  form += "<label class='form-control sr-only' for='inputTypeName'></label>"
  form += "<input class='form-control' type='text' name='name' placeholder='Type Name' />"
  form += "</div>"

  let footer = "<button class='btn btn-inline btn-primary' onclick='create_one()'>Create</button>"
  footer += "<button type='button' class='btn btn-danger' data-dismiss='modal'>Close</button>"

  onLoadModal(title, form, footer)
}

function onUpdateModal(id) {
  $.ajax({
    url: baseUrl + paramUrl + "/get/" + id,
    method: "get",
  }).done(function(data){
    let title = "Edit Type"

    let form = "<div class='alert alert-danger alert-dimissible fade show' id='type-add-error'></div>"
    form +="<div class='form-group'>"
    form += "<label class='form-control sr-only' for='inputTypeName'></label>"
    form += "<input class='form-control' type='text' name='name' placeholder='Type Name' />"
    form += "</div>"

    let footer = "<button class='btn btn-inline btn-primary' onclick='update_one(&quot;"+data+"&quot;, &quot;"+id+"&quot;)'>Update</button>"
    footer += "<button type='button' class='btn btn-danger' data-dismiss='modal'>Close</button>"

    onLoadModal(title, form, footer)
    $("input[name='name']").val(data)
  })
}

function onDeleteModal(id) {
  $.ajax({
    url: baseUrl + paramUrl + "/get/"+id,
    method: "get",
  }).done(function(data){
    let title = "<strong>Attention!</strong>"

    let form = "<p><h4>You are deleting data <strong>"+data+"</strong>. Are you sure?</h4></p>"
    form += "<p class='text-right'><small>(Once done, data is <strong>lost</strong>!)</small></p>"

    let footer = "<button class='btn btn-inline btn-danger' onclick='delete_one(&quot;"+id+"&quot;)'>Delete</button>"
    footer += "<button type='button' class='btn btn-success' data-dismiss='modal'>Cancel</button>"

    onLoadModal(title, form, footer)
  })
}

/////////////////////////////////////DATABASE MANIPULATION///////////////////////////////////
function onSearch() {
  var keyword = $("input[name='keyword']").val()

  if($.trim(keyword) == "") {
    onLoad()
    return false;
  }

  $.ajax({
    url: baseUrl + paramUrl + "/search",
    method: 'post',
    data: {
      'page': 1,
      'keyword': keyword
    },
    dataType: 'json'
  }).done(function(data){
    var table = "<table border='1' width='100%'><thead><th>No.</th><th>Name Type</th><th>Action</th></thead><tbody>"
    if(data.data.data == "No data with keyword: "+keyword) {
      let message = data.data.data
      message += "<button class='close' data-hide='alert'>&times;</button>"
      $("#type-do-success").empty().show().removeClass("alert-success").addClass("alert-danger").html(message)
      hideAlert()
      table += "<tr>"
      table += "<td colspan='3'>"
      table += "<h4 class='text-center'>No data available</h4>"
      table += "</td>"
      table += "</tr>"
      table += "</tbody></table>"
    } else {
      $.each(data.data.data.data, function(index, value) {
        let editFunct = "onUpdateModal(&quot;"+value.id+"&quot;)"
        let delFunct = "onDeleteModal(&quot;"+value.id+"&quot;)"

        table += "<tr>"
        table += "<td>"+(index+1)+"</td>"
        table += "<td>"+value.name+"</td>"
        table += "<td><div class='d-flex flex-row justify-content-start'>"
        table += "<button data-toggle='modal' data-target='#modal' onclick='"+editFunct+"'>Edit</button>"
        table += "<button data-toggle='modal' data-target='#modal' onclick='"+delFunct+"'>Delete</button>"
        table += "</div></td></tr>"
      })
      table += "</tbody></table>"
    }
    $("#type-layout").empty().html(table)

    var page = "<ul class='pagination justify-content-center' style='margin:20px'>"

    for(let i = 0; i < data.data.data.last_page; i++) {
      let loadPage = "onLoadPageSearch(&quot;"+(i + 1)+"&quot;)"

      if(data.data.data.current_page == (i + 1)) {
        page += "<li class='page-item active'><button class='page-link' onclick='"+loadPage+"'>"+(i + 1)+"</button></li>"    
      } else {
        page += "<li class='page-item'><button class='page-link' onclick='"+loadPage+"'>"+(i + 1)+"</button></li>"
      }
    }

    page += "</ul>"
    $('#page').empty().html(page)
    $("#type-do-success").hide()
  })
}

function onLoadPageSearch(selected_page) {
  var keyword = $("input[name='keyword']").val()

  if($.trim(keyword) == "") {
    onLoad()
    return false;
  }

  $.ajax({
    url: baseUrl + paramUrl + "/search",
    method: 'post',
    data: {
      'page': selected_page,
      'keyword': keyword
    },
    dataType: 'json'
  }).done(function(data){
    var table = "<table border='1' width='100%'><thead><th>No.</th><th>Name Type</th><th>Action</th></thead><tbody>"
    if(data.data.data == "No data with keyword: "+keyword) {
      let message = data.data.data
      message += "<button class='close' data-hide='alert'>&times;</button>"
      $("#type-do-success").empty().show().removeClass("alert-success").addClass("alert-danger").html(message)
      hideAlert()
      table += "<tr>"
      table += "<td colspan='3'>"
      table += "<h4 class='text-center'>No data available</h4>"
      table += "</td>"
      table += "</tr>"
      table += "</tbody></table>"
    } else {
      $.each(data.data.data.data, function(index, value) {
        let editFunct = "onUpdateModal(&quot;"+value.id+"&quot;)"
        let delFunct = "onDeleteModal(&quot;"+value.id+"&quot;)"

        table += "<tr>"
        table += "<td>"+(index+1)+"</td>"
        table += "<td>"+value.name+"</td>"
        table += "<td><div class='d-flex flex-row justify-content-start'>"
        table += "<button data-toggle='modal' data-target='#modal' onclick='"+editFunct+"'>Edit</button>"
        table += "<button data-toggle='modal' data-target='#modal' onclick='"+delFunct+"'>Delete</button>"
        table += "</div></td></tr>"
      })
      table += "</tbody></table>"
    }
    $("#type-layout").empty().html(table)

    var page = "<ul class='pagination justify-content-center' style='margin:20px'>"

    for(let i = 0; i < data.data.data.last_page; i++) {
      let loadPage = "onLoadPageSearch(&quot;"+(i + 1)+"&quot;)"

      if(data.data.data.current_page == (i + 1)) {
        page += "<li class='page-item active'><button class='page-link' onclick='"+loadPage+"'>"+(i + 1)+"</button></li>"    
      } else {
        page += "<li class='page-item'><button class='page-link' onclick='"+loadPage+"'>"+(i + 1)+"</button></li>"
      }
    }

    page += "</ul>"
    $('#page').empty().html(page)
    $("#type-do-success").hide()
  })
}

function create_one() {
  var name = $("input[name='name']").val()

  if($.trim(name) == "" || $.trim(name) == null) {
    let error = "Type Name is required input!"
    error += "<button class='close' data-hide='alert'>&times;</button>"
    $("#type-add-error").empty().show().html(error)
    hideAlert()
    return false
  }

  $.ajax({
    url: baseUrl + paramUrl + "/create",
    method: 'post',
    data: {
      'name': name,
    },
    dataType: 'json'
  }).done(function(data){
    backAfterDone(data[0], data[1])
  })
}

function update_one(old_name, id) {
  var name = $("input[name='name']").val()

  if($.trim(name) == $.trim(old_name)){
      let error = "<strong>Cannot submit with the old name!</strong>"
      errorAlert(error)
      return false;
  } else if ($.trim(name) == "" || $.trim(name) == null) {
      let error = "Type Name is required input!"
      errorAlert(error)
      return false;
  }

  $.ajax({
    url: baseUrl + paramUrl + "/update/" + id,
    method: 'post',
    data: {
      'name': name,
    },
    dataType: 'json'
  }).done(function(data){
    backAfterDone(data[0], data[1])
  })
}

function delete_one(id) {
  var url = baseUrl + paramUrl + "/delete/"+id

  $.ajax({
    url: url,
    method: 'post'
  }).done(function(data){
    backAfterDone(data[0], data[1])
  })
}