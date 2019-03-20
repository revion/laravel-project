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

  <div class="alert alert-success alert-dismissible fade show" id="invoice-do-success">
  </div>

  <div class="container-fluid">
    <div class="d-flex flex-row justify-content-between">
      <button class="btn btn-inline btn-primary" data-toggle="modal" data-target="#modal" onclick="onCreateModal()">
      Add Invoice
      </button>
      <div class="d-flex flex-row justify-content-end">
        <input type="text" name="keyword" placeholder="Search Bill" onkeyup="onSearch()" />
      </div>
    </div>
    <div id="invoice-layout">
    </div>
  </div>
  <div id="page">
  </div>
  @include('layout.footer')
  <script src={{ asset("js/invoice.js") }}></script>
</body>

</html>