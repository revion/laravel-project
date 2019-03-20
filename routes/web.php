<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
})->middleware('guest')->name('index');

Route::get('/logout', 'AuthController@logout')->name('logout');

Route::get('/login', 'AuthController@viewLogin')->middleware('guest')->name('login');
Route::post('/login', 'AuthController@login')->middleware('guest');
Route::get('/register', 'AuthController@viewRegister')->middleware('guest')->name('register');
Route::post('/register', 'AuthController@register')->middleware('guest');

Route::get('/getapi', 'AuthController@getapi')->middleware('auth')->name('getapi');

Route::get('/home', function() {
    return view('home');
})->middleware('auth')->name('dashboard');

Route::get('/brand', function(){
    return view('brand.index');
})->middleware('auth')->name('brand');
Route::post('/brand/all', 'BrandController@index');
Route::post('/brand/create', 'BrandController@create')->name('brand_create');
Route::post('/brand/update/{id}', 'BrandController@update')->name('brand_update');
Route::post('/brand/delete/{id}', 'BrandController@delete')->name('brand_delete');
Route::post('/brand/search', 'BrandController@search')->name('brand_search');
Route::get('/brand/get/{id}', 'BrandController@getbrand')->name('brand_get');

Route::get('/type', function(){
    return view('type.index');
})->middleware('auth')->name('type');
Route::post('/type/all', 'TypeController@index');
Route::post('/type/create', 'TypeController@create')->name('type_create');
Route::post('/type/update/{id}', 'TypeController@update')->name('type_update');
Route::post('/type/delete/{id}', 'TypeController@delete')->name('type_delete');
Route::post('/type/search', 'TypeController@search')->name('type_search');
Route::get('/type/get/{id}', 'TypeController@gettype')->name('type_get');

Route::get('/product', function(){
    return view('product.index');
})->middleware('auth')->name('product');
Route::post('/product/all', 'ProductController@index');
Route::post('/product/{param}/all', 'ProductController@loadSubProduct');
Route::post('/product/create', 'ProductController@create')->name('product_create');
Route::post('/product/update/{id}', 'ProductController@update')->name('product_update');
Route::post('/product/delete/{id}', 'ProductController@delete')->name('product_delete');
Route::post('/product/search', 'ProductController@search')->name('product_search');
Route::get('/product/get/{id}', 'ProductController@getproduct')->name('product_get');

Route::get('/invoice', function(){
    return view('invoice.index');
})->middleware('auth')->name('invoice');
Route::post('/invoice/all', 'InvoiceController@index');
Route::post('/invoice/{param}/all', 'InvoiceController@loadSubInvoice');
Route::post('/invoice/create', 'InvoiceController@create');
Route::post('/invoice/update/{id}', 'InvoiceController@update');
Route::post('/invoice/delete/{id}', 'InvoiceController@delete');
Route::post('/invoice/search', 'InvoiceController@search');
Route::get('/invoice/get/{id}', 'InvoiceController@getinvoice');

Route::get('/shop', function(){
  return view('shop');
})->name('shop');
Route::post('/shop/all', 'ShopController@index');
// Route::get('/shop/product/{id}', 'ShopController@show', function(){
//   return view('shop.index');
// });
Route::post('/shop/get/{id}', 'ShopController@show');
Route::post('/shop/buy', 'ShopController@buy');
Route::post('/shop/cart', 'ShopController@cart')->middleware('auth');
Route::post('/shop/pay', 'ShopController@payment')->middleware('auth');

Route::get('/you', function(){
  return view('user.you');
})->middleware('auth')->name('profile');
Route::post('/user/get', 'UserController@mycart');
Route::post('/user/search', 'UserController@search');