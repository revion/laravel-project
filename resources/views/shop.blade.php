    @include('layout.header')

    <div class="alert alert-dismissible fade show" id="buy-report"></div>

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

    <div class="container-fluid">
      <h4 class='text-left'>All products</h4>
      <div id="content">
      </div>

      <div id="page">
      </div>

    </div>

    @include('layout.footer')
  </body>
</html>