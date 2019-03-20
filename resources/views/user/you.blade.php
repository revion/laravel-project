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

    <div class="container-fluid">
      <div class="d-flex flex-row justify-content-between">
        <h4 class="text-left">Your transaction history</h4>
        <input type="text" name="keyword" placeholder="Search history" onkeyup="onSearch()">
      </div>
      <hr>

      <div id="user-layout">
      </div>

      <div id="page">
      </div>

    </div>
    @include('layout.footer')
  </body>
</html>