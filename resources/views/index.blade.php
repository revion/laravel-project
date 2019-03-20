    @include('layout.header')
      @if(\Session::has('errors'))
      <div class="alert alert-danger alert-dismissible fade show">
        {{ \Session::get('errors') }}
        <button class="close" data-dismiss="alert">&times;</button>
      </div>
      @elseif(\Session::has('message'))
      <div class="alert alert-success alert-dismissible fade show">
        {{ \Session::get('message') }}
        <button class="close" data-dismiss="alert">&times;</button>
      </div>
      @endif
    @include('layout.footer')
  </body>
</html>