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

        <div class="container">
            <div class="d-flex flex-column">
                <button class="btn btn-inline btn-primary" id="load-brand">Brand</button>
                <button class="btn btn-inline btn-primary" id="load-type">Type</button>
                <button class="btn btn-inline btn-primary" id="load-product">Product</button>
                <button class="btn btn-inline btn-primary" id="load-invoice">Invoice</button>
            </div>
        </div>
        @include('layout.footer')
    </body>
</html>