    @include('layout.header')
    <div class="container">
      @if(\Session::has('errors'))    
        <div class="alert alert-danger alert-dismissible">
          {{ \Session::get('errors') }}
          <button class="close" data-dismiss="alert">&times;</button>
        </div>
      @endif
      <form method="POST" action={{ route('login') }}>
        {{ csrf_field() }}
        <div class="form-group">
          <label class="form-control sr-only" for="inputEmail">Email Address</label>
          <input class="form-control" name="email" type="text" placeholder="Email Address" />
        </div>
        <div class="form-group">
          <label class="form-control sr-only" for="inputPass">Email Address</label>
          <input class="form-control" name="password" type="password" placeholder="Password" />
        </div>
        <div class="form-group">
          <button class="btn btn-primary form-control" type="submit">Login</button>
        </div>
      </form>
      <a class="text-center" href={{ route("register") }}>Don't have one? Register here</a>
    </div>
    @include('layout.footer')
  </body>
</html>