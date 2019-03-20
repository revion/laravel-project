    @include('layout.header')
    <div class="container">
      @if(\Session::has('errors'))    
        <div class="alert alert-danger alert-dismissible">
          {{ \Session::get('errors') }}
          <button class="close" data-dismiss="alert">&times;</button>
        </div>
      @endif
      <form method="POST" action={{ route('register') }}>
        {{ csrf_field() }}
        <div class="form-group">
          <label class="form-control sr-only" for="inputName">Name</label>
          <input class="form-control" name="name" type="text" placeholder="Name" />
        </div>    
        <div class="form-group">
          <label class="form-control sr-only" for="inputEmail">Email Address</label>
          <input class="form-control" name="email" type="text" placeholder="Email Address" />
        </div>
        <div class="form-group">
          <label class="form-control sr-only" for="inputPass">Email Address</label>
          <input class="form-control" name="password" type="password" placeholder="Password" />
        </div>
        <div class="form-group">
          <button class="btn btn-primary form-control" type="submit">Submit</button>
        </div>
      </form>
    </div>
    @include('layout.footer')
  </body>
</html>