$(document).ready(function(){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    })

    onLoadRegister()

    $("#register").click(function(){
        register()
    })
})

function onLoadRegister() {
    $("input[name='name']").focus();
    $(".alert").hide()
}

function hideAlert() {
    $("[data-hide]").click(function(){
        $("."+$(this).attr("data-hide")).hide()
    })
}

function loadAlert(param, value) {
    if($.trim(value) == null || $.trim(value).length < 1) {
        $("#register-error").empty().addClass("alert-danger alert-dismissible fade show").show().html("<strong>"+param+"</strong> field is required field!<button class='close' data-hide='alert'>&times;</button>")
        $("input[name='"+param+"']").focus()
        hideAlert()
        return false
    }
}

function register() {
    let name = $("input[name='name']").val()
    let mail = $("input[name='email']").val()
    let pass = $("input[name='password']").val()

    loadAlert("name", name)

    loadAlert("email", mail)

    loadAlert("password", pass)

    $.ajax({
        url: 'http://localhost:8000/register',
        method: 'post',
        data: {
            'name': name,
            'email': mail,
            'password': pass
        },
        dataType: 'json'
    }).done(function(data){
        console.log(data)
    })
}