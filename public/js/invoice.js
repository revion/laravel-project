var baseUrl = "http://localhost:8000"
var paramUrl = "/invoice"

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
    $("#invoice-do-success").empty().show().removeClass("alert-danger").addClass("alert-success").html(message)
    hideAlert()
    onLoad()
  }
}

function errorAlert(message) {
  message += "<button class='close' data-hide='alert'>&times;</button>"
  $("#invoice-add-error").empty().show().html(message)
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
      var table = "<table border='1' width='100%'><thead><th>#</th><th>User Email</th><th>Name Product</th><th>Amount</th><th>Paid?</th><th>Action</th></thead><tbody>"
      if(data[1].data.length > 0) {
        $.each(data[1].data, function(index, value) {
          let editFunct = "onUpdateModal(&quot;"+value.id+"&quot;)"
          let delFunct = "onDeleteModal(&quot;"+value.id+"&quot;)"

          table += "<tr>"
          table += "<td>"+(index+1)+"</td>"
          table += "<td>"+value.user_email+"</td>"
          table += "<td>"+value.product_name+"</td>"
          table += "<td>"+value.amount+"</td>"
          if(value.has_bought) {
            table += "<td>Paid off</td>"
          } else {
            table += "<td>Not yet </td>"
          }
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
      $("#invoice-layout").empty().html(table)

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
      var table = "<table border='1' width='100%'><thead><th>#</th><th>User Email</th><th>Name Product</th><th>Amount</th><th>Paid?</th><th>Action</th></thead><tbody>"
      if(data[1].data.length > 0) {
        $.each(data[1].data, function(index, value) {
          let editFunct = "onUpdateModal(&quot;"+value.id+"&quot;)"
          let delFunct = "onDeleteModal(&quot;"+value.id+"&quot;)"

          table += "<tr>"
          table += "<td>"+(index+1)+"</td>"
          table += "<td>"+value.user_email+"</td>"
          table += "<td>"+value.product_name+"</td>"
          table += "<td>"+value.amount+"</td>"
          if(value.has_bought) {
            table += "<td>Paid off</td>"
          } else {
            table += "<td>Not yet </td>"
          }
          table += "<td><div class='d-flex flex-row justify-content-start'>"
          table += "<button data-toggle='modal' data-target='#modal' onclick='"+editFunct+"'>Edit</button>"
          table += "<button data-toggle='modal' data-target='#modal' onclick='"+delFunct+"'>Delete</button>"
          table += "</div></td></tr>"
        })
      } else {
        table += "<tr><td colspan='6'>"
        table += "<h4 class='text-center'>No data available</h4>"
        table += "</td></tr>"
      }
    table += "</tbody></table>"
    $("#invoice-layout").empty().html(table)

    var page = "<ul class='pagination justify-content-center' style='margin:20px'>"

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

      if(param == "user") {
        $("#user-option").empty().html(option)
      } else if(param == "product") {
        $("#product-option").empty().html(option)
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

      if(param == "user") {
        $("#user-option").empty().html(option)
      } else if(param == "product") {
        $("#product-option").empty().html(option)
      }
    }
  })
}

function onCreateModal() {
  let title = "Add New Invoice"

  let form = "<div class='alert alert-danger alert-dimissible fade show' id='invoice-add-error'></div>"

  form += "<div class='form-group'><select class='form-control' id='user-option'>"
  form += "</select></div>"

  form += "<div class='form-group'><select class='form-control' id='product-option'>"
  form += "</select></div>"

  form += "<div class='form-group'>"
  form += "<input class='form-control' type='text' name='amount' placeholder='Amount' />"
  form += "<small>Min: 1</small>"
  form += "</div>"

  let footer = "<button class='btn btn-inline btn-primary' onclick='create_one()'>Create</button>"
  footer += "<button type='button' class='btn btn-danger' data-dismiss='modal'>Close</button>"

  onLoadModal(title, form, footer)
  loadOption("user")
  loadOption("product")
}

function onUpdateModal(id) {
  $.ajax({
    url: baseUrl + paramUrl + "/get/"+id,
    method: "get",
  }).done(function(data){
    // console.log(data[1].name)
    let title = "Edit Invoice"

    let form = "<div class='alert alert-danger alert-dimissible fade show' id='invoice-add-error'></div>"

    form += "<div class='form-group'>"
    form += "<select class='form-control' id='user-option'>"
    form += "</select></div>"        

    form += "<div class='form-group'>"
    form += "<select class='form-control' id='product-option'>"
    form += "</select></div>"

    form += "<div class='form-group'>"
    form += "<input class='form-control' type='text' name='amount' placeholder='Amount' value='"+data[1][0].amount+"' />"
    form += "</div>"

    let footer = "<button class='btn btn-inline btn-primary' onclick='update_one(&quot;"+data[1][0].amount+"&quot;, &quot;"+id+"&quot;)'>Update</button>"
    footer += "<button type='button' class='btn btn-danger' data-dismiss='modal'>Close</button>"

    onLoadModal(title, form, footer)
    loadOptionWithId(data[1][0].id_user, "user")
    loadOptionWithId(data[1][0].id_product, "product")
  })
}

function onDeleteModal(id) {
  $.ajax({
    url: baseUrl + paramUrl + "/get/"+id,
    method: "get",
  }).done(function(data){
    let title = "<strong>Attention!</strong>"

    let form = ""

    if(data[1][0].amount == 1) {
      form += "<p><h5>You are deleting data invoice <strong>"+data[1][0].product_name+"</strong> (<strong>"+data[1][0].amount+"</strong> pc.) which bought by <strong>"+data[1][0].user_email+"</strong>. Are you sure?</h5></p>"
    } else {
      form += "<p><h5>You are deleting data invoice <strong>"+data[1][0].product_name+"</strong> (<strong>"+data[1][0].amount+"</strong> pcs.) which bought by <strong>"+data[1][0].user_email+"</strong>. Are you sure?</h5></p>"
    }
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
    var table = "<table border='1' width='100%'><thead><th>#</th><th>User Email</th><th>Name Product</th><th>Amount</th><th>Paid?</th><th>Action</th></thead><tbody>"
    
    if(!data[0]) {
      let message = data[1]
      message += "<button class='close' data-hide='alert'>&times;</button>"
      $("#invoice-do-success").empty().show().removeClass("alert-success").addClass("alert-danger").html(message)
      hideAlert()
      table += "<tr>"
      table += "<td colspan='6'>"
      table += "<h4 class='text-center'>No data available</h4>"
      table += "</td>"
      table += "</tr>"
      table += "</tbody></table>"
    } else {
      $.each(data[1].data, function(index, value) {
        let editFunct = "onUpdateModal(&quot;"+value.id+"&quot;)"
        let delFunct = "onDeleteModal(&quot;"+value.id+"&quot;)"

        table += "<tr>"
        table += "<td>"+(index+1)+"</td>"
        table += "<td>"+value.user_email+"</td>"
        table += "<td>"+value.product_name+"</td>"
        table += "<td>"+value.amount+"</td>"
        if(value.has_bought) {
          table += "<td>Paid off</td>"
        } else {
          table += "<td>Not yet </td>"
        }
        table += "<td><div class='d-flex flex-row justify-content-start'>"
        table += "<button data-toggle='modal' data-target='#modal' onclick='"+editFunct+"'>Edit</button>"
        table += "<button data-toggle='modal' data-target='#modal' onclick='"+delFunct+"'>Delete</button>"
        table += "</div></td></tr>"
      })
      table += "</tbody></table>"
    }
    $("#invoice-layout").empty().html(table)

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
    $("#invoice-do-success").hide()
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
    var table = "<table border='1' width='100%'><thead><th>#</th><th>User Email</th><th>Name Product</th><th>Amount</th><th>Paid?</th><th>Action</th></thead><tbody>"
    if(!data[0]) {
      let message = data[1]
      message += "<button class='close' data-hide='alert'>&times;</button>"
      $("#invoice-do-success").empty().show().removeClass("alert-success").addClass("alert-danger").html(message)
      hideAlert()
      table += "<tr>"
      table += "<td colspan='6'>"
      table += "<h4 class='text-center'>No data available</h4>"
      table += "</td>"
      table += "</tr>"
    } else {
      $.each(data[1].data, function(index, value) {
        let editFunct = "onUpdateModal(&quot;"+value.id+"&quot;)"
        let delFunct = "onDeleteModal(&quot;"+value.id+"&quot;)"

        table += "<tr>"
        table += "<td>"+(index+1)+"</td>"
        table += "<td>"+value.user_email+"</td>"
        table += "<td>"+value.product_name+"</td>"
        table += "<td>"+value.amount+"</td>"
        if(value.has_bought) {
          table += "<td>Paid off</td>"
        } else {
          table += "<td>Not yet </td>"
        }
        table += "<td><div class='d-flex flex-row justify-content-start'>"
        table += "<button data-toggle='modal' data-target='#modal' onclick='"+editFunct+"'>Edit</button>"
        table += "<button data-toggle='modal' data-target='#modal' onclick='"+delFunct+"'>Delete</button>"
        table += "</div></td></tr>"
      })
    }
    table += "</tbody></table>"

    $("#invoice-layout").empty().html(table)

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
    $("#invoice-do-success").hide()
  })
}

function create_one() {
  var user = $("#user-option").val()
  var product = $("#product-option").val()
  var amount = $("input[name='amount']").val()

  if($.trim(user) == "none") {
    let error = "Choose the right <strong>user</strong> list!"
    errorAlert(error)
    return false
  } else if($.trim(user) == null) {
    let error = "<strong>User</strong> has to be defined!"
    errorAlert(error)
    return false
  } else if($.trim(user) == "") {
    let error = "<strong>User</strong> is a required field!"
    errorAlert(error)
    return false
  }

  if($.trim(product) == "none") {
    let error = "Choose the right <strong>product</strong> list!"
    errorAlert(error)
    return false
  } else if($.trim(product) == null) {
    let error = "<strong>Product</strong> has to be defined!"
    errorAlert(error)
    return false
  } else if($.trim(product) == "") {
    let error = "<strong>Product</strong> is a required field!"
    errorAlert(error)
    return false
  }

  if($.trim(amount) == "") {
    let error = "<strong>Amount</strong> is a required field!"
    errorAlert(error)
    return false
  } else if ($.trim(amount) == null) {
    let error = "<strong>Amount</strong> must be defined!"
    errorAlert(error)
    return false
  } else if($.trim(amount) < 1) {
    let error = "<strong>Minimal</strong> amount input is <strong>1</strong>!"
    errorAlert(error)
    return false
  } else if(!$.isNumeric($.trim(amount))) {
    let error = "<strong>Amount</strong> input must be a <strong>number</strong>!"
    errorAlert(error)
    return false
  }

  $.ajax({
    url: baseUrl + paramUrl + "/create",
    method: 'post',
    data: {
      'id_user': user,
      'id_product': product,
      'amount': amount
    },
    dataType: 'json'
  }).done(function(data){
    backAfterDone(data[0], data[1])
  })
}

function update_one(old_amt, id) {
  var user = $("#user-option").val()
  var product = $("#product-option").val()
  var amount = $("input[name='amount']").val()

  if($.trim(user) == "none") {
    let error = "Choose the right <strong>user</strong> list!"
    errorAlert(error)
    return false
  } else if($.trim(user) == null) {
    let error = "<strong>User</strong> has to be defined!"
    errorAlert(error)
    return false
  } else if($.trim(user) == "") {
    let error = "<strong>User</strong> is a required field!"
    errorAlert(error)
    return false
  }

  if($.trim(product) == "none") {
    let error = "Choose the right <strong>product</strong> list!"
    errorAlert(error)
    return false
  } else if($.trim(product) == null) {
    let error = "<strong>Product</strong> has to be defined!"
    errorAlert(error)
    return false
  } else if($.trim(product) == "") {
    let error = "<strong>Product</strong> is a required field!"
    errorAlert(error)
    return false
  }

  if($.trim(amount) == "") {
    let error = "<strong>Amount</strong> is a required field!"
    errorAlert(error)
    return false
  } else if ($.trim(amount) == null) {
    let error = "<strong>Amount</strong> must be defined!"
    errorAlert(error)
    return false
  } else if($.trim(amount) < 1) {
    let error = "<strong>Minimal amount</strong> input is <strong>1</strong>!"
    errorAlert(error)
    return false
  } else if(!$.isNumeric($.trim(amount))) {
    let error = "<strong>Amount</strong> input must be a <strong>number</strong>!"
    errorAlert(error)
    return false
  } else if($.trim(amount) == old_amt) {
    let error = "Cannot use the <strong>same amount</strong>!"
    errorAlert(error)
    return false
  }

  $.ajax({
      url: baseUrl + paramUrl + "/update/" + id,
      method: 'post',
      data: {
        'id_user': user,
        'id_product': product,
        'amount': amount,
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