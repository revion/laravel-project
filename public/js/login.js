$(document).ready(function(){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    })

    onLoadLogin()

    $("#login").click(function(){
        login()
    })
})

function onLoadLogin() {
    $("input[name='email']").focus();
    $(".alert").hide()
}

function hideAlert() {
    $("[data-hide]").click(function(){
        $("."+$(this).attr("data-hide")).hide()
    })
}

function login() {
    var mail = $("input[name='email']").val()
    var pass = $("input[name='password']").val()

    if($.trim(mail) == null || $.trim(mail).length < 1) {
        $("#login-error").empty().addClass("alert-danger alert-dismissible fade show").show().html("<strong>Email</strong> field is required field!<button class='close' data-hide='alert'>&times;</button>")
        $("input[name='email']").focus()
        hideAlert()
        return false
    }

    if($.trim(pass) == null || $.trim(pass).length < 1) {
        $("#login-error").empty().addClass("alert-danger alert-dismissible fade show").show().html("<strong>Password</strong> field is required field!<button class='close' data-hide='alert'>&times;</button>")
        $("input[name='password']").focus()
        hideAlert()
        return false
    }

    $.ajax({
        url: 'http://localhost:8000/login',
        method: 'post',
        data: {
            'email': mail,
            'password': pass
        },
        dataType: 'json'
    })
}