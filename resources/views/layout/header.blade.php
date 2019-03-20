<!DOCTYPE html>
<html>
  <head>

    @if(url()->current() === route('index'))
      <title>Index - {{ config("app.name") }}</title>

    @elseif(url()->current() === route('login'))
      <title>Login - {{ config("app.name") }}</title>

    @elseif(url()->current() === route('register'))
      <title>Register - {{ config("app.name") }}</title>

    @elseif(url()->current() === route('dashboard'))
      <title>Dashboard - {{ config("app.name") }}</title>

    @elseif(url()->current() === route('profile'))
      <title>{{ \Auth::user()->name }} - {{ config("app.name") }}</title>

    @elseif(url()->current() === route('brand'))
      <title>Brand List - {{ config("app.name") }}</title>

    @elseif(url()->current() === route('type'))
      <title>Type List - {{ config("app.name") }}</title>

    @elseif(url()->current() === route('product'))
      <title>Product List - {{ config("app.name") }}</title>

    @elseif(url()->current() === route('invoice'))
      <title>Invoice List - {{ config("app.name") }}</title>

    @elseif(url()->current() === route('shop'))
      <title>Shop - {{ config("app.name") }}</title>

    @endif

    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href={{ asset("css/shoes.css") }}>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    
    @if(\URL::current() === route('dashboard'))
      <script src={{ asset("js/dashboard.js") }}></script>

    @elseif(\URL::current() === route('profile'))
      <script src={{ asset("js/user.js") }}></script>

    @elseif(\URL::current() === route('brand'))
      <script src={{ asset("js/brand.js") }}></script>

    @elseif(\URL::current() === route('type'))
      <script src={{ asset("js/type.js") }}></script>

    @elseif(\URL::current() === route('product'))
      <script src={{ asset("js/product.js") }}></script>

    @elseif(\URL::current() === route('invoice'))
      <script src={{ asset("js/invoice.js") }}></script>

    @elseif(\URL::current() === route('shop'))
      <script src={{ asset("js/shop.js") }}></script>
      
    @endif
  </head>
  <body>
    <nav class="navbar bg-light">
      @auth
      <div class="d-flex flex-row justify-content-start">
        <a class="nav-brand btn btn-inline btn-link" href={{ route('dashboard') }}>Dashboard</a>
        <a class="btn btn-inline btn-link" href={{ route('shop') }}>Shop</a>
        @if(url()->current() === route('shop'))
          <button class="btn btn-inline btn-link" data-target="#modal" data-toggle="modal" onclick="cart()">Cart</button>
        @endif
      </div>
      <div class="d-flex flex-row justify-content-end">
        <a class="btn btn-inline btn-link" href={{ route('profile') }}>{{ \Auth::user()->name }}</a>
        <a class="btn btn-inline btn-link" href={{ route('logout') }}>Logout</a>
      </div>
      @else
        <div class="d-flex flex-row justify-content-start">
          <a class="nav-brand btn btn-inline btn-link" href={{ route('index') }}>Index</a>
          <a class="btn btn-inline btn-link" href={{ route('shop') }}>Shop</a>
        </div>
        @if(\URL::current() === route('login') || \URL::current() === route('register'))
          <div class="d-flex flex-row justify-content-end">
          </div>
        @else
          <div class="d-flex flex-row justify-content-end">
            <a class="btn btn-inline btn-link" href={{ route('login') }}>Login</a>
            <a class="btn btn-inline btn-link" href={{ route('register') }}>Register</a>
          </div>
        @endif
      @endauth
    </nav>