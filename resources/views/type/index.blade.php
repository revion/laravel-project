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

        <div class="alert alert-success alert-dismissible fade show" id="type-do-success">
        </div>
        
        <div class="container-fluid">
            <div class="d-flex flex-row justify-content-between">
                <button class="btn btn-inline btn-primary" data-toggle="modal" data-target="#modal" onclick="onCreateModal()">
                    Add Type
                </button>
                <div class="d-flex flex-row justify-content-end">
                    <input type="text" name="keyword" placeholder="Search Type" onkeyup="onSearch()" />
                </div>
            </div>
            <div id="type-layout">
            </div>
        </div>
        <div id="page">
        </div>
        @include('layout.footer')
    </body>
</html>