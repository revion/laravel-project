var baseUrl = "http://localhost:8000"
var paramUrl = "/product"
var regex = /[^(a-zA-Z0-9\s)]|[(\(\))]/g //ALPHANUMERIC

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
    var table = "<table border='1' width='100%'><thead><th>No.</th><th>Product Type</th><th>Product Name</th><th>Stock</th><th>Price</th><th>Action</th></thead><tbody>"
    if(data[1].data.length > 0) {
      $.each(data[1].data, function(index, value) {
        let editFunct = "onUpdateModal(&quot;"+value.id+"&quot;)"
        let delFunct = "onDeleteModal(&quot;"+value.id+"&quot;)"

        table += "<tr>"
        table += "<td>"+(index+1)+"</td>"
        table += "<td>"+value.type_name+"</td>"
        table += "<td>"+value.product_name+"</td>"
        table += "<td>"+value.stock+"</td>"
        table += "<td>"+value.price+"</td>"
        table += "<td><div class='d-flex flex-row justify-content-start'>"
        table += "<button data-toggle='modal' data-target='#modal' onclick='"+editFunct+"'>Edit</button>"
        table += "<button data-toggle='modal' data-target='#modal' onclick='"+delFunct+"'>Delete</button>"
        table += "</div></td></tr>"
      })
    table += "</tbody></table>"
    } else {
      table += "<tr>"
      table += "<td colspan='6'>"
      table += "<h4 class='text-center'>No data available</h4>"
      table += "</td>"
      table += "</tr>"
    }
    $("#product-layout").empty().html(table)

    var page = "<ul class='pagination justify-content-center' style='margin:20px'>"
    // console.log(data[1].current_page)
    for(let i = 0; i < data[1].last_page; i++) {
      let loadPage = "onLoadPage(&quot;"+(i + 1)+"&quot;)"

      if(data[1].current_page == (i + 1)) {
        page += "<li class='page-item active'><button class='page-link'>"+(i + 1)+"</button></li>"
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
    var table = "<table border='1' width='100%'><thead><th>No.</th><th>Product Type</th><th>Product Name</th><th>Stock</th><th>Price</th><th>Action</th></thead><tbody>"
    if(data[1].data.length > 0) {
      $.each(data[1].data, function(index, value) {
        let editFunct = "onUpdateModal(&quot;"+value.id+"&quot;)"
        let delFunct = "onDeleteModal(&quot;"+value.id+"&quot;)"

        table += "<tr>"
        table += "<td>"+(index+1)+"</td>"
        table += "<td>"+value.type_name+"</td>"
        table += "<td>"+value.product_name+"</td>"
        table += "<td>"+value.stock+"</td>"
        table += "<td>"+value.price+"</td>"
        table += "<td><div class='d-flex flex-row justify-content-start'>"
        table += "<button data-toggle='modal' data-target='#modal' onclick='"+editFunct+"'>Edit</button>"
        table += "<button data-toggle='modal' data-target='#modal' onclick='"+delFunct+"'>Delete</button>"
        table += "</div></td></tr>"
      })
    table += "</tbody></table>"
    } else {
      table += "<tr>"
      table += "<td colspan='6'>"
      table += "<h4 class='text-center'>No data available</h4>"
      table += "</td>"
      table += "</tr>"
    }
    $("#product-layout").empty().html(table)

    var page = "<ul class='pagination justify-content-center' style='margin:20px'>"
    // console.log(data[1].current_page)
    for(let i = 0; i < data[1].last_page; i++) {
      let loadPage = "onLoadPage(&quot;"+(i + 1)+"&quot;)"

      if(data[1].current_page == (i + 1)) {
        page += "<li class='page-item active'><button class='page-link'>"+(i + 1)+"</button></li>"
      } else {
        page += "<li class='page-item'><button class='page-link' onclick='"+loadPage+"'>"+(i + 1)+"</button></li>"
      }
    }

    page += "</ul>"
    $('#page').empty().html(page)
  })
}

function loadOption(param) {
  var option = "<option value='none'>Choose "+param+"</option>"

  $.ajax({
    url: baseUrl + paramUrl + "/" + param + "/all",
    method: 'post',
    success: function(data) {
      $.each(data[1], function(index,value){
        option += "<option value='"+value.id+"'>"+value.name+"</option>"
      })

      if(param == "brand") {
        $("#brand-option").empty().html(option)
      } else if(param == "type") {
        $("#type-option").empty().html(option)
      }
    }
  })
}

function loadOptionWithId(id_param, param) {
  var option = "<option value='none'>Choose "+param+"</option>"

  $.ajax({
    url: baseUrl + paramUrl + "/" + param + "/all",
    method: 'post',
    success: function(data) {
      // console.log(data[1])
      $.each(data[1], function(index,value){
        if(id_param == value.id) {
          option += "<option value='"+value.id+"' selected>"+value.name+"</option>"
        }

        option += "<option value='"+value.id+"'>"+value.name+"</option>"
      })

      if(param == "brand") {
        $("#brand-option").empty().html(option)
      } else if(param == "type") {
        $("#type-option").empty().html(option)
      }
    }
  })
}

function onCreateModal() {
  let title = "Add New Product"

  let form = "<div class='alert alert-danger alert-dimissible fade show' id='product-add-error'></div>"

  form += "<div class='form-group'>"
  form += "<select class='form-control' id='brand-option'>"
  form += "</select></div>"

  form += "<div class='form-group'>"
  form += "<select class='form-control' id='type-option'>"
  form += "</select></div>"

  form += "<div class='form-group'>"
  form += "<input class='form-control' type='text' name='name' placeholder='Product Name' />"
  form += "</div>"

  form += "<div class='form-group'>"
  form += "<input class='form-control' type='text' name='stock' placeholder='Product Stock' />"
  form += "<small>Min 1</small>"
  form += "</div>"

  form += "<div class='form-group'>"
  form += "<input class='form-control' type='text' name='price' placeholder='Product Price' />"
  form += "<small>Min 1</small>"
  form += "</div>"

  let footer = "<button class='btn btn-inline btn-primary' onclick='create_one()'>Create</button>"
  footer += "<button type='button' class='btn btn-danger' data-dismiss='modal'>Close</button>"

  onLoadModal(title, form, footer)
  loadOption("brand")
  loadOption("type")
}

function onUpdateModal(id) {
  $.ajax({
    url: baseUrl + paramUrl + "/get/" + id,
    method: "get",
  }).done(function(data){
    // console.log(data[1].name)
    let title = "Edit Product"

    let form = "<div class='alert alert-danger alert-dimissible fade show' id='product-add-error'></div>"

    form += "<div class='form-group'>"
    form += "<select class='form-control' id='brand-option'>"
    form += "</select></div>"        

    form += "<div class='form-group'>"
    form += "<select class='form-control' id='type-option'>"
    form += "</select></div>"

    form +="<div class='form-group'>"
    form += "<input class='form-control' type='text' name='name' placeholder='Product Name' value='"+data[1].name+"' />"
    form += "</div>"

    form +="<div class='form-group'>"
    form += "<input class='form-control' type='number' name='stock' placeholder='Product Stock' value='"+data[1].stock+"' />"
    form += "</div>"

    form += "<div class='form-group'>"
    form += "<input class='form-control' type='number' name='price' placeholder='Product Price' value='"+data[1].price+"' />"
    form += "</div>"

    let footer = "<button class='btn btn-inline btn-primary' onclick='update_one(&quot;"+id+"&quot;)'>Update</button>"
    footer += "<button type='button' class='btn btn-danger' data-dismiss='modal'>Close</button>"

    onLoadModal(title, form, footer)
    loadOptionWithId(data[1].id_brand, "brand")
    loadOptionWithId(data[1].id_type, "type")
  })
}

function onDeleteModal(id) {
  $.ajax({
    url: baseUrl + paramUrl + "/get/"+id,
    method: "get",
  }).done(function(data){
    let title = "<strong>Attention!</strong>"

    let form = "<p><h5>You are deleting data <strong>"+data[1].name+"</strong>. Are you sure?</h5></p>"
    form += "<p class='text-right'><small>(Once done, data is <strong>lost</strong>!)</small></p>"

    let footer = "<button class='btn btn-inline btn-danger' onclick='delete_one(&quot;"+id+"&quot;)'>Delete</button>"
    footer += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cancel</button>"

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
    var table = "<table border='1' width='100%'>"
    table += "<thead>"
    table += "<th>No.</th>"
    table += "<th>Product Type</th>"
    table += "<th>Product Name</th>"
    table += "<th>Stock</th>"
    table += "<th>Price</th>"
    table += "<th>Action</th>"
    table += "</thead><tbody>"
    if(!data[0]) {
      let message = data[1]
      message += "<button class='close' data-hide='alert'>&times;</button>"
      $("#product-do-success").empty().show().removeClass("alert-success").addClass("alert-danger").html(message)
      hideAlert()
      table += "<tr>"
      table += "<td colspan='6'>"
      table += "<h4 class='text-center'>No data available</h4>"
      table += "</td>"
      table += "</tr>"
      table += "</tbody></table>"
    } else {
      $.each(data[1].data, function(index, value) {
        let editFunct = "onUpdateModal(&quot;"+data[1].data[index].id+"&quot;)"
        let delFunct = "onDeleteModal(&quot;"+data[1].data[index].id+"&quot;)"

        table += "<tr>"
        table += "<td>"+(index+1)+"</td>"
        table += "<td>"+data[1].data[index].type_name+"</td>"
        table += "<td>"+data[1].data[index].product_name+"</td>"
        table += "<td>"+data[1].data[index].stock+"</td>"
        table += "<td>"+data[1].data[index].price+"</td>"
        table += "<td><div class='d-flex flex-row justify-content-start'>"
        table += "<button data-toggle='modal' data-target='#modal' onclick='"+editFunct+"'>Edit</button>"
        table += "<button data-toggle='modal' data-target='#modal' onclick='"+delFunct+"'>Delete</button>"
        table += "</div></td></tr>"
      })
      table += "</tbody></table>"
    }
    $("#product-layout").empty().html(table)

    var page = "<ul class='pagination justify-content-center' style='margin:20px'>"

    for(let i = 0; i < data[1].last_page; i++) {
      let loadPage = "onLoadPageSearch(&quot;"+(i + 1)+"&quot;)"

      if(data[1].current_page == (i + 1)) {
        page += "<li class='page-item active'><button class='page-link' onclick='"+loadPage+"'>"+(i + 1)+"</button></li>"    
      } else {
        page += "<li class='page-item'><button class='page-link' onclick='"+loadPage+"'>"+(i + 1)+"</button></li>"
      }
    }

    page += "</ul>"
    $('#page').empty().html(page)
    $("#product-do-success").hide()
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
    var table = "<table border='1' width='100%'>"
    table += "<thead>"
    table += "<th>No.</th>"
    table += "<th>Product Type</th>"
    table += "<th>Product Name</th>"
    table += "<th>Stock</th>"
    table += "<th>Price</th>"
    table += "<th>Action</th>"
    table += "</thead><tbody>"
    if(!data[0]) {
      let message = data[1]
      message += "<button class='close' data-hide='alert'>&times;</button>"
      $("#product-do-success").empty().show().removeClass("alert-success").addClass("alert-danger").html(message)
      hideAlert()
      table += "<tr>"
      table += "<td colspan='6'>"
      table += "<h4 class='text-center'>No data available</h4>"
      table += "</td>"
      table += "</tr>"
      table += "</tbody></table>"
    } else {
      $.each(data[1].data, function(index, value) {
        let editFunct = "onUpdateModal(&quot;"+data[1].data[index].id+"&quot;)"
        let delFunct = "onDeleteModal(&quot;"+data[1].data[index].id+"&quot;)"

        table += "<tr>"
        table += "<td>"+(index+1)+"</td>"
        table += "<td>"+data[1].data[index].type_name+"</td>"
        table += "<td>"+data[1].data[index].product_name+"</td>"
        table += "<td>"+data[1].data[index].stock+"</td>"
        table += "<td>"+data[1].data[index].price+"</td>"
        table += "<td><div class='d-flex flex-row justify-content-start'>"
        table += "<button data-toggle='modal' data-target='#modal' onclick='"+editFunct+"'>Edit</button>"
        table += "<button data-toggle='modal' data-target='#modal' onclick='"+delFunct+"'>Delete</button>"
        table += "</div></td></tr>"
      })
      table += "</tbody></table>"
    }
    $("#product-layout").empty().html(table)

    var page = "<ul class='pagination justify-content-center' style='margin:20px'>"

    for(let i = 0; i < data[1].last_page; i++) {
      let loadPage = "onLoadPageSearch(&quot;"+(i + 1)+"&quot;)"

      if(data[1].current_page == (i + 1)) {
        page += "<li class='page-item active'><button class='page-link' onclick='"+loadPage+"'>"+(i + 1)+"</button></li>"    
      } else {
        page += "<li class='page-item'><button class='page-link' onclick='"+loadPage+"'>"+(i + 1)+"</button></li>"
      }
    }

    page += "</ul>"
    $('#page').empty().html(page)
    $("#product-do-success").hide()
  })
}

function create_one() {
  var brand = $("#brand-option").val()
  var type = $("#type-option").val()
  var name = $("input[name='name']").val()
  var stock = $("input[name='stock']").val()
  var price = $("input[name='price']").val()

  if($.trim(brand) == "none") {
    let error = "Choose the right <strong>brand</strong> option!"
    errorAlert(error)
    return false
  } else if($.trim(brand) == "") {
    let error = "<strong>Brand</strong> is required input!"
    errorAlert(error)
    return false
  } else if($.trim(brand) == null) {
    let error = "<strong>Brand</strong> must be defined!"
    errorAlert(error)
    return false
  }

  if($.trim(type) == "none") {
    let error = "Choose the right <strong>type</strong> option!"
    errorAlert(error)
    return false
  } else if($.trim(type) == "") {
    let error = "<strong>Type</strong> is required input!"
    errorAlert(error)
    return false
  } else if($.trim(type) == null) {
    let error = "<strong>Type</strong> must be defined!"
    errorAlert(error)
    return false
  }

  if($.trim(name) == "") {
    let error = "<strong>Product name</strong> is required input!"
    errorAlert(error)
    return false
  } else if($.trim(name) == null) {
    let error = "<strong>Product name</strong> must be defined!"
    errorAlert(error)
    return false
  } else if(regex.test($.trim(name))) {
    let error = "<strong>Product name can only contain alphanumeric!</strong>"
    errorAlert(error)
    return false
  }

  if($.trim(stock) == "") {
    let error = "<strong>Product stock number</strong> is required input!"
    errorAlert(error)
    return false
  } else if ($.trim(stock) == null) {
    let error = "<strong>Product stock number</strong> must be defined!"
    errorAlert(error)
    return false
  } else if($.trim(stock) < 1) {
    let error = "Minimal stock input is 1!"
    errorAlert(error)
    return false
  } else if(!$.isNumeric($.trim(stock))) {
    let error = "Stock input must be a <strong>number</strong>!"
    errorAlert(error)
    return false
  }

  if($.trim(price) == "") {
    let error = "<strong>Product price</strong> is required input!"
    errorAlert(error)
    return false
  } else if ($.trim(price) == null) {
    let error = "<strong>Product price</strong> must be defined!"
    errorAlert(error)
    return false
  } else if($.trim(price) < 1) {
    let error = "<strong>Minimal price input is 1</strong>!"
    errorAlert(error)
    return false
  } else if(!$.isNumeric($.trim(price))) {
    let error = "Price input must be a <strong>number</strong>!"
    errorAlert(error)
    return false
  }

  $.ajax({
    url: baseUrl + paramUrl + "/create",
    method: 'post',
    data: {
      'id_brand': brand,
      'id_type': type,
      'name': name,
      'stock': stock,
      'price': price
    },
    dataType: 'json'
  }).done(function(data){
    backAfterDone(data[0], data[1])
  })
}

function update_one(id) {
  var brand = $("#brand-option").val()
  var type = $("#type-option").val()
  var name = $("input[name='name']").val()
  var stock = $("input[name='stock']").val()
  var price = $("input[name='price']").val()

  if($.trim(brand) == "none") {
    let error = "Choose the right <strong>brand</strong> option!"
    errorAlert(error)
    return false
  } else if($.trim(brand) == "") {
    let error = "<strong>Brand</strong> is required input!"
    errorAlert(error)
    return false
  } else if($.trim(brand) == null) {
    let error = "<strong>Brand</strong> must be defined!"
    errorAlert(error)
    return false
  }

  if($.trim(type) == "none") {
    let error = "Choose the right <strong>type</strong> option!"
    errorAlert(error)
    return false
  } else if($.trim(type) == "") {
    let error = "<strong>Type</strong> is required input!"
    errorAlert(error)
    return false
  } else if($.trim(type) == null) {
    let error = "<strong>Type</strong> must be defined!"
    errorAlert(error)
    return false
  }

  if($.trim(name) == "") {
    let error = "<strong>Product name</strong> is required input!"
    errorAlert(error)
    return false
  } else if($.trim(name) == null) {
    let error = "<strong>Product name</strong> must be defined!"
    errorAlert(error)
    return false
  } else if(regex.test($.trim(name))) {
    let error = "<strong>Product name can only contain alphanumeric!</strong>"
    errorAlert(error)
    return false
  }

  if($.trim(stock) == "") {
    let error = "<strong>Product stock number</strong> is required input!"
    errorAlert(error)
    return false
  } else if ($.trim(stock) == null) {
    let error = "<strong>Product stock number</strong> must be defined!"
    errorAlert(error)
    return false
  } else if($.trim(stock) < 1) {
    let error = "Minimal stock input is 1!"
    errorAlert(error)
    return false
  } else if(!$.isNumeric($.trim(stock))) {
    let error = "Stock input must be a <strong>number</strong>!"
    errorAlert(error)
    return false
  }

  if($.trim(price) == "") {
    let error = "<strong>Product price</strong> is required input!"
    errorAlert(error)
    return false
  } else if ($.trim(price) == null) {
    let error = "<strong>Product price</strong> must be defined!"
    errorAlert(error)
    return false
  } else if($.trim(price) < 1) {
    let error = "<strong>Minimal price input is 1</strong>!"
    errorAlert(error)
    return false
  } else if(!$.isNumeric($.trim(price))) {
    let error = "Price input must be a <strong>number</strong>!"
    errorAlert(error)
    return false
  }

  $.ajax({
    url: baseUrl + paramUrl + "/update/" + id,
    method: 'post',
    data: {
      'id_brand': brand,
      'id_type': type,
      'name': name,
      'stock': stock,
      'price': price
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