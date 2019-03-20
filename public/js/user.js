var baseUrl = "http://localhost:8000"
var paramUrl = "/user"
// var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g //EMAIL

$(document).ready(function(){
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });

  $('.alert').hide()

  onLoad()
})
///////////////////////////////////////FORMAT UTILITES///////////////////////////////////////
// function onLoadModal(title_modal, body_modal, footer_modal) {
//   $(".modal-title").empty().html(title_modal)
//   $(".modal-body").empty().html(body_modal)
//   $(".alert").hide()
//   $(".modal-footer").empty().html(footer_modal)
// }

// function hideAlert() {
//   $("[data-hide]").click(function(){
//     $("."+$(this).attr("data-hide")).hide()
//   })
// }

// function backAfterDone(param_1, param_2) {
//   if(param_1) {
//     let message = param_2
//     message += "<button class='close' data-hide='alert'>&times;</button>"
//     $("#modal").modal("toggle")
//     $("#user-do-success").empty().show().removeClass("alert-danger").addClass("alert-success").html(message)
//     hideAlert()
//     onLoad()
//   }
// }

// function errorAlert(message) {
//   message += "<button class='close' data-hide='alert'>&times;</button>"
//   $("#user-add-error").empty().show().html(message)
//   hideAlert()
// }
///////////////////////////////////////LOADER HTML///////////////////////////////////////////
function onLoad() {
  $.ajax({
    url: baseUrl + paramUrl + '/get',
    method: 'post',
    data: {
      'page': 1
    },
    dataType: 'json'
  }).done(function(data){
    // console.log(data[1].data[0].amount)
    let content = ""
    if(data[1].data.length > 0) {
      content += "<table border='1' width='100%'>"
      content += "<thead>"
      content += "<th>#</th>"
      content += "<th>Product Name</th>"
      content += "<th>Amount</th>"
      content += "<th>Price/piece</th>"
      content += "<th>Total price</th>"
      content += "</thead>"
      content += "<tbody>"
      $.each(data[1].data, function(index, value){
        content += "<tr>"
        content += "<td>"+(index+1)+"</td>"
        content += "<td>"+value.product_name+"</td>"
        content += "<td>"+value.amount+"</td>"
        content += "<td>"+value.each_price+"</td>"
        content += "<td>"+value.total_price+"</td>"
        content += "</tr>"
      })
      content += "</tbody>"
      content += "</table>"
    } else {
      content += "<h5 class='text-center'>No transactions detected</h5>"
    }
    $('#user-layout').empty().html(content)

    var page = ""
    if(data[1].last_page != data[1].from) {
      page = "<ul class='pagination justify-content-center' style='margin:20px'>"

      for(let i = 0; i < data[1].last_page; i++) {
        let loadPage = "onLoadPage(&quot;"+(i + 1)+"&quot;)"

        if(data[1].current_page == (i + 1)) {
          page += "<li class='page-item active'><button class='page-link' onclick='"+loadPage+"'>"+(i + 1)+"</button></li>"    
        } else {
          page += "<li class='page-item'><button class='page-link' onclick='"+loadPage+"'>"+(i + 1)+"</button></li>"
        }
      }

      page += "</ul>"
    }
    $('#page').empty().html(page)
  })
}

function onLoadPage(selected_page) {
  $.ajax({
    url: baseUrl + paramUrl + '/get',
    method: 'post',
    data: {
      'page': selected_page
    },
    dataType: 'json'
  }).done(function(data){
    // console.log(data[1].data[0].amount)
    let content = ""
    if(data[1].data.length > 0) {
      content += "<table border='1' width='100%'>"
      content += "<thead>"
      content += "<th>#</th>"
      content += "<th>Product Name</th>"
      content += "<th>Amount</th>"
      content += "<th>Price/piece</th>"
      content += "<th>Total price</th>"
      content += "</thead>"
      content += "<tbody>"
      $.each(data[1].data, function(index, value){
        content += "<tr>"
        content += "<td>"+(index+1)+"</td>"
        content += "<td>"+value.product_name+"</td>"
        content += "<td>"+value.amount+"</td>"
        content += "<td>"+value.each_price+"</td>"
        content += "<td>"+value.total_price+"</td>"
        content += "</tr>"
      })
      content += "</tbody>"
      content += "</table>"
    } else {
      content += "<h5 class='text-center'>No transactions detected</h5>"
    }
    $('#user-layout').empty().html(content)

    var page = ""
    if(data[1].last_page != data[1].from) {
      page = "<ul class='pagination justify-content-center' style='margin:20px'>"

      for(let i = 0; i < data[1].last_page; i++) {
        let loadPage = "onLoadPage(&quot;"+(i + 1)+"&quot;)"

        if(data[1].current_page == (i + 1)) {
          page += "<li class='page-item active'><button class='page-link' onclick='"+loadPage+"'>"+(i + 1)+"</button></li>"    
        } else {
          page += "<li class='page-item'><button class='page-link' onclick='"+loadPage+"'>"+(i + 1)+"</button></li>"
        }
      }

      page += "</ul>"
    }
    $('#page').empty().html(page)
  })
}
// function onCreateModal() {
//   let title = "Add New User"

//   let form = "<div class='alert alert-danger alert-dimissible fade show' id='user-add-error'></div>"
//   form +="<div class='form-group'>"
//   form += "<label class='form-control sr-only' for='inputTypeName'></label>"
//   form += "<input class='form-control' type='text' name='name' placeholder='User Name' />"
//   form += "</div>"

//   let footer = "<button class='btn btn-inline btn-primary' onclick='create_one()'>Create</button>"
//   footer += "<button type='button' class='btn btn-danger' data-dismiss='modal'>Close</button>"

//   onLoadModal(title, form, footer)
// }

// function onUpdateModal(id) {
//   $.ajax({
//     url: baseUrl + paramUrl + "/get/" + id,
//     method: "get",
//   }).done(function(data){
//     let title = "Edit User"

//     let form = "<div class='alert alert-danger alert-dimissible fade show' id='user-add-error'></div>"
//     form +="<div class='form-group'>"
//     form += "<label class='form-control sr-only' for='inputTypeName'></label>"
//     form += "<input class='form-control' type='text' name='name' placeholder='User Name' value='"+data[1].name+"' />"
//     form += "</div>"

//     let footer = "<button class='btn btn-inline btn-primary' onclick='update_one(&quot;"+data+"&quot;, &quot;"+id+"&quot;)'>Update</button>"
//     footer += "<button type='button' class='btn btn-danger' data-dismiss='modal'>Close</button>"

//     onLoadModal(title, form, footer)
//   })
// }

// function onDeleteModal(id) {
//   $.ajax({
//     url: baseUrl + paramUrl + "/get/"+id,
//     method: "get",
//   }).done(function(data){
//     let title = "<strong>Attention!</strong>"

//     let form = "<p><h4>You are deleting data <strong>"+data[1].name+"</strong>. Are you sure?</h4></p>"
//     form += "<p class='text-right'><small>(Once done, data is <strong>lost</strong>!)</small></p>"

//     let footer = "<button class='btn btn-inline btn-danger' onclick='delete_one(&quot;"+id+"&quot;)'>Delete</button>"
//     footer += "<button type='button' class='btn btn-success' data-dismiss='modal'>Cancel</button>"

//     onLoadModal(title, form, footer)
//   })
// }

/////////////////////////////////////DATABASE MANIPULATION///////////////////////////////////
function onSearch() {
  var keyword = $("input[name='keyword']").val()

  if($.trim(keyword) == "") {
    onLoad()
    return false;
  }

  $.ajax({
    url: baseUrl + paramUrl + '/search',
    method: 'post',
    data: {
      'page': 1,
      'keyword': keyword
    },
    dataType: 'json',
    success: function(data) {
      // console.log('asd')
      let content = ""

      if(!data[0]) {
        content += "<h5 class='text-center'>No transactions detected</h5>"
      } else {
        content += "<table border='1' width='100%'>"
        content += "<thead>"
        content += "<th>#</th>"
        content += "<th>Product Name</th>"
        content += "<th>Amount</th>"
        content += "<th>Price/piece</th>"
        content += "<th>Total price</th>"
        content += "</thead>"
        content += "<tbody>"
        $.each(data[1].data, function(index, value){
          content += "<tr>"
          content += "<td>"+(index+1)+"</td>"
          content += "<td>"+value.product_name+"</td>"
          content += "<td>"+value.amount+"</td>"
          content += "<td>"+value.each_price+"</td>"
          content += "<td>"+value.total_price+"</td>"
          content += "</tr>"
        })
        content += "</tbody>"
        content += "</table>"
      }
      $('#user-layout').empty().html(content)

      var page = ""
      if(data[1].last_page != data[1].from) {
        page = "<ul class='pagination justify-content-center' style='margin:20px'>"

        for(let i = 0; i < data[1].last_page; i++) {
          let loadPage = "onLoadPageSearch(&quot;"+(i + 1)+"&quot;)"

          if(data[1].current_page == (i + 1)) {
            page += "<li class='page-item active'><button class='page-link' onclick='"+loadPage+"'>"+(i + 1)+"</button></li>"    
          } else {
            page += "<li class='page-item'><button class='page-link' onclick='"+loadPage+"'>"+(i + 1)+"</button></li>"
          }
        }

        page += "</ul>"
      }
      $('#page').empty().html(page)
    }
  })
}

function onLoadPageSearch(selected_page) {
  var keyword = $("input[name='keyword']").val()

  if($.trim(keyword) == "") {
    onLoad()
    return false;
  }

  $.ajax({
    url: baseUrl + paramUrl + '/search',
    method: 'post',
    data: {
      'page': selected_page,
      'keyword': keyword
    },
    dataType: 'json',
    success: function(data) {
      // console.log('asd')
      let content = ""

      if(!data[0]) {
        content += "<h5 class='text-center'>No transactions detected</h5>"
      } else {
        content += "<table border='1' width='100%'>"
        content += "<thead>"
        content += "<th>#</th>"
        content += "<th>Product Name</th>"
        content += "<th>Amount</th>"
        content += "<th>Price/piece</th>"
        content += "<th>Total price</th>"
        content += "</thead>"
        content += "<tbody>"
        $.each(data[1].data, function(index, value){
          content += "<tr>"
          content += "<td>"+(index+1)+"</td>"
          content += "<td>"+value.product_name+"</td>"
          content += "<td>"+value.amount+"</td>"
          content += "<td>"+value.each_price+"</td>"
          content += "<td>"+value.total_price+"</td>"
          content += "</tr>"
        })
        content += "</tbody>"
        content += "</table>"
      }
      $('#user-layout').empty().html(content)

      var page = ""
      if(data[1].last_page != data[1].from) {
        page = "<ul class='pagination justify-content-center' style='margin:20px'>"

        for(let i = 0; i < data[1].last_page; i++) {
          let loadPage = "onLoadPageSearch(&quot;"+(i + 1)+"&quot;)"

          if(data[1].current_page == (i + 1)) {
            page += "<li class='page-item active'><button class='page-link' onclick='"+loadPage+"'>"+(i + 1)+"</button></li>"    
          } else {
            page += "<li class='page-item'><button class='page-link' onclick='"+loadPage+"'>"+(i + 1)+"</button></li>"
          }
        }

        page += "</ul>"
      }
      $('#page').empty().html(page)
    }
  })
}

// function create_one() {
//   var name = $("input[name='name']").val()

//   if($.trim(name) == "") {
//     let error = "<strong>User name</strong> is required input!"
//     errorAlert(error)
//     return false
//   } else if($.trim(name) == null) {
//     let error = "<strong>User name</strong> must be defined!"
//     errorAlert(error)
//     return false
//   } else if(regex.test($.trim(name))) {
//     let error = "<strong>User name</strong> must be a alphanumeric!"
//     errorAlert(error)
//     return false
//   }

//   $.ajax({
//     url: baseUrl + paramUrl + "/create",
//     method: 'post',
//     data: {
//       'name': name,
//     },
//     dataType: 'json'
//   }).done(function(data){
//     backAfterDone(data[0], data[1])
//   })
// }

// function update_one(old_name, id) {
//   var name = $("input[name='name']").val()

//   if($.trim(name) == $.trim(old_name)){
//     let error = "<strong>Cannot submit with the old name!</strong>"
//     errorAlert(error)
//     return false
//   } else if ($.trim(name) == "") {
//     let error = "<strong>User name</strong> is required input!"
//     errorAlert(error)
//     return false
//   } else if($.trim(name) == null) {
//     let error = "<strong>User name</strong> must be defined!"
//     errorAlert(error)
//     return false
//   } else if(regex.test($.trim(name))) {
//     let error = "<strong>User name</strong> must be a alphanumeric!"
//     errorAlert(error)
//     return false
//   }

//   $.ajax({
//     url: baseUrl + paramUrl + "/update/" + id,
//     method: 'post',
//     data: {
//       'name': name,
//     },
//     dataType: 'json'
//   }).done(function(data){
//     backAfterDone(data[0], data[1])
//   })
// }

// function delete_one(id) {
//   $.ajax({
//     url: baseUrl + paramUrl + "/delete/" + id,
//     method: 'post'
//   }).done(function(data){
//     backAfterDone(data[0], data[1])
//   })
// }