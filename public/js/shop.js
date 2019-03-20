var baseUrl = "http://localhost:8000"
var paramUrl = "/shop"

$(document).ready(function(){
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  })

  $(".alert").hide()

  if(location.href == baseUrl + "/shop") {
    onLoad()
  }
})

function hideAlert() {
  $("[data-hide]").click(function(){
    $("."+$(this).attr("data-hide")).hide()
  })
}

function errorAlert(message) {
  message += "<button class='close' data-hide='alert'>&times;</button>"
  $('#error-report').empty().removeClass("alert-success").addClass("alert-danger").show('slow').html(message)
  hideAlert()
}

function onLoad() {
  $.ajax({
    url: baseUrl + paramUrl + "/all",
    method: 'post',
    data: {
      'page': 1
    },
    dataType: 'json',
    success: function(data) {
      // console.log(data[1].data[0].product_name)
      var content = "<div class='row'>"
      if(!data[0]) {
        content += "<div class='col'>"
        content += "<h4 class='text-center'>No data available</h4>"
        content += "</div>"
      } else {
        $.each(data[1].data, function(index, value) {
          content += "<div class='col-4'>"
          content += "<p class='text-center'><img src='' class='img' /></p>"
          // content += "<a href='"+baseUrl+paramUrl+"/product/"+value.id+"'>"
          // content += "<h5 class='text-center product-name'>"+value.product_name+"</h5>"
          // content += "</a>"
          content += "<h5 class='text-center'>"
          content += "<button class='btn btn-link product-name' data-toggle='modal' data-target='#modal' onclick='onLoadProduct(&quot;"+value.id+"&quot;)'>"+value.product_name+"</button>"
          content += "</h5>"
          content += "<h6 class='text-center type-name'>"+value.type_name+"</h6>"
          content += "<h5 class='text-center price'>"+value.price+"</h5>"
          content += "</div>"
        })
      }
      content += "</div>"

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

      $("#content").empty().html(content + page)
    }
  })
}

function onLoadPage(selected_page) {
  $.ajax({
    url: baseUrl + paramUrl + "/all",
    method: 'post',
    data: {
      'page': selected_page
    },
    dataType: 'json',
    success: function(data) {
      // console.log(data[1].data[0].product_name)
      var content = "<div class='row'>"
      if(!data[0]) {
        content += "<div class='col'>"
        content += "<h4 class='text-center'>No data available</h4>"
        content += "</div>"
      } else {
        $.each(data[1].data, function(index, value) {
          content += "<div class='col-4'>"
          content += "<p class='text-center'><img src='' class='img' /></p>"
          content += "<h5 class='text-center'>"
          content += "<button class='btn btn-link product-name' data-toggle='modal' data-target='#modal' onclick='onLoadProduct(&quot;"+value.id+"&quot;)'>"+value.product_name+"</button>"
          content += "</h5>"
          content += "<h6 class='text-center type-name'>"+value.type_name+"</h6>"
          content += "<h5 class='text-center price'>"+value.price+"</h5>"
          content += "</div>"
        })
      }
      content += "</div>"

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

      $("#content").empty().html(content + page)
    }
  })
}

function onLoadProduct(id) {
  $.ajax({
    url: baseUrl + paramUrl + "/get/" + id,
    method: 'post',
    success: function(data) {
      var title = "Buy "+data[1].product_name+"?"
      var content = "<div class='alert alert-dimissible fade show' id='error-report'></div><div class='row'>"
      var footer = ""
      if(!data[0]) {
        content += "<div class='col'>"
        content += "<h4 class='text-center'>No data available</h4>"
        content += "</div>"

        footer += "<button class='close' data-dismiss='modal'>Close</button>"
      } else {
        content += "<div class='col-4'>"
        content += "<p class='text-center'><img src='' class='img-bigger' /></p>"
        content += "</div>"
        content += "<div class='col-8'>"
        content += "<h5>"+data[1].product_name+"</h5>"
        content += "<small class='type-name'>"+data[1].type_name+"</small>"
        content += "<h5 class='price'>"+data[1].price+"</h5>"
        content += "<input type='number' name='amount' min='1' value='1'><span>pc(s)</span>"
        content += "</div>"

        footer += "<button class='btn btn-success' onclick='buy(&quot;"+id+"&quot;)'>Buy</button>"
        footer += "<button class='btn btn-danger' data-dismiss='modal'>Close</button>"
      }
      content += "</div>"

      $(".modal-title").empty().html(title)
      $(".modal-body").empty().html(content)
      $(".modal-footer").empty().html(footer)
      $(".alert").hide()
    }
  })
}

function buy(id_product) {
  var amount = $('input[name="amount"]').val()

  if($.trim(amount) == "") {
    let error = "You must fill <strong>amount</strong>"
    errorAlert(error)
    return false;
  } else if($.trim(amount) == null) {
    let error = "<strong>Amount</strong> is not defined"
    errorAlert(error)
    return false;
  } else if(!$.isNumeric($.trim(amount))) {
    let error = "<strong>Amount</strong> have to be numeric"
    errorAlert(error)
    return false;
  } else if($.trim(amount) < 1) {
    let error = "Minimal input <strong>amount</strong> is 1"
    errorAlert(error)
    return false;
  }

  $.ajax({
    url: baseUrl + paramUrl + "/buy",
    method: 'post',
    data: {
      'id_product': id_product,
      'amount': amount
    },
    dataType: 'json'
  }).done(function(data){
    /*
     * Not auth
     */
    if(!data[0]) {
      location.href = baseUrl + "/login"
      return false
    }

    if(data[0]){
      let message = data[1] + "<button class='close' data-hide='alert'>&times;</button>"
      $("#buy-report").empty().removeClass("alert-danger").addClass("alert-success").show('slow').html(message)
      hideAlert()
      $("#modal").modal("toggle")
    }
  })
}

function cart() {
  $.ajax({
    url: baseUrl + paramUrl + "/cart",
    method: 'post',
  }).done(function(data){
    // console.log(data[1].total[0].total_price)
    let title = "Bill"
    let content = ""
    let footer = ""

    if(data[1].data.data.length > 0) {
      content = "<table border='1' width='100%'>"
      content += "<thead>"
      content += "<th>#</th>"
      content += "<th>Product Name</th>"
      content += "<th>Amount</th>"
      content += "<th>Price/piece</th>"
      content += "<th>Total</th>"
      content += "</thead>"
      $.each(data[1].data.data, function(index, value){
        // console.log(value.id)
        content += "<tr>"
        content += "<td>"+(index + 1)+"</td>"
        content += "<td>"+value.product_name+"</td>"
        content += "<td>"+value.amount+"</td>"
        content += "<td>"+value.each_price+"</td>"
        content += "<td>"+value.total_price+"</td>"
        content += "</tr>"
      })
      content += "<tr>"
      content += "<td colspan='4' class='text-right'><strong>Total price</strong></td>"
      content += "<td><strong>"+data[1].total[0].total_price+"</strong></td>"
      content += "</tr>"
      content += "</table>"

      footer += "<button class='btn btn-success' onclick='payment()'>Pay</button>"
      footer += "<button class='btn btn-danger' data-dismiss='modal'>Later</button></div>"
    } else {
      content += "<h5 class='text-center'>You did not buy anything</h5>"
      footer += "<button class='btn btn-danger' data-dismiss='modal'>Close</button></div>"
    }

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

    $('.modal-title').empty().html(title)
    $('.modal-body').empty().html(content + page)
    $('.modal-footer').empty().html(footer)
  })
}

function payment() {
  $.ajax({
    url: baseUrl + paramUrl + "/pay",
    method: 'post',
    success: function(data) {
      // console.log(data[1])
      let message = data[1]
      if(!data[0]) {
        message += " <strong>Please check your connection</strong>"
      }

      $('#modal').modal('toggle')
      alert(message)
    }
  })
}

function filter(id_type) {
  $.ajax({
    url: baseUrl + paramUrl + "/filter",
    method: 'post',
    data: {
      'id': id_type
    },
    dataType: 'json'
  }).done(function(data){
    console.log("found")
  })
}