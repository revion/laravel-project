<!DOCTYPE html>
<html>
    <head>
        <title>User List - {{ config("app.name") }}</title>
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
        <link rel="stylesheet" href={{ asset("css/shoes.css") }}>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
        <script src={{ asset("js/user.js") }}></script>
    </head>
    <body>
        @include('layout.header')
        <!-- The Modal -->
        <div class="modal fade" id="modal">
            <div class="modal-dialog">
                <div class="modal-content">

                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title"></h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                </div>

                <!-- Modal footer -->
                <div class="modal-footer">
                </div>

                </div>
            </div>
        </div>

        <div class="alert alert-success alert-dismissible fade show" id="user-do-success">
        </div>
        
        <div class="container-fluid">
            <div class="d-flex flex-row justify-content-between">
                <button class="btn btn-inline btn-primary" data-toggle="modal" data-target="#modal" onclick="onCreateModal()">
                    Add User
                </button>
                <div class="d-flex flex-row justify-content-end">
                    <input type="text" name="keyword" placeholder="Search User" onkeyup="onSearch()" />
                </div>
            </div>
            <div id="user-layout">
            </div>
        </div>
        <div id="page">
        </div>
        @include('layout.footer')
    </body>
</html>