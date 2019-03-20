<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use App\User;

class ProductController extends Controller {
  public function __construct() {
    $this->middleware('auth');
  }

  public function index(Request $request) {
    $user = User::where('id', \Auth::id())->first();

    $data = array(
      'page' => $request->input('page')
    );

    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => config('setting.apiUrl').'/product/all',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_TIMEOUT => 30000,
      CURLOPT_CUSTOMREQUEST => "POST",
      CURLOPT_POSTFIELDS => http_build_query($data),
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_HTTPHEADER => array(
        // Set here requred headers
        "authorization: bearer ".$user->remember_token,
      ),
    ));

    $response = curl_exec($curl);
    $products = json_decode($response);

    curl_close($curl);

    return array($products->success, $products->data);
  }

  public function loadSubProduct($param) {
    $user = User::where('id', \Auth::id())->first();

    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => config('setting.apiUrl')."/product/".$param."/all",
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_TIMEOUT => 30000,
      CURLOPT_CUSTOMREQUEST => "POST",
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_HTTPHEADER => array(
        // Set here requred headers
        "authorization: bearer ".$user->remember_token,
      ),
    ));

    $response = curl_exec($curl);
    $products = json_decode($response);

    curl_close($curl);

    // print_r($products);
    return array($products->success, $products->data);
  }

  public function create(Request $request) {
    $user = User::where('id', \Auth::id())->first();

    $data = array(
      'id_brand' => $request->input('id_brand'),
      'id_type' => $request->input('id_type'),
      'name' => $request->input("name"),
      'stock' => $request->input('stock'),
      'price' => $request->input('price')
    );

    // print_r(http_build_query($data));

    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => config('setting.apiUrl')."/product/create",
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 30000,
      CURLOPT_CUSTOMREQUEST => "POST",
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_POSTFIELDS => http_build_query($data),
      CURLOPT_HTTPHEADER => array(
        // Set here requred headers
        "authorization: bearer ".$user->remember_token,
      ),
    ));

    $response = curl_exec($curl);
    $name_product = json_decode($response);

    curl_close($curl);

    // print_r($name_product);
    return array($name_product->success, $name_product->data);
  }

  public function update(Request $request, $id) {
    $user = User::where('id', \Auth::id())->first();

    $data = array(
      'id_brand' => $request->input('id_brand'),
      'id_type' => $request->input('id_type'),
      'name' => $request->input("name"),
      'stock' => $request->input('stock'),
      'price' => $request->input('price')
    );

    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => config('setting.apiUrl')."/product/update/".$id,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 30000,
      CURLOPT_CUSTOMREQUEST => "POST",
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_POSTFIELDS => http_build_query($data),
      CURLOPT_HTTPHEADER => array(
        // Set here requred headers
        "authorization: bearer ".$user->remember_token,
      ),
    ));

    $response = curl_exec($curl);
    $message = json_decode($response);

    curl_close($curl);

    return array($message->success, $message->data);
  }

  public function delete(Request $request, $id) {
    $user = User::where('id', \Auth::id())->first();

    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => config('setting.apiUrl')."/product/delete/".$id,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 30000,
      CURLOPT_CUSTOMREQUEST => "POST",
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_HTTPHEADER => array(
        // Set here requred headers
        "authorization: bearer ".$user->remember_token,
      ),
    ));

    $response = curl_exec($curl);
    $message = json_decode($response);

    curl_close($curl);

    return array($message->success, $message->data);
  }

  public function search(Request $request) {
    $user = User::where('id', \Auth::id())->first();

    $data = array(
      'page' => $request->input('page'),
      'keyword' => $request->input('keyword')
    );

    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => config('setting.apiUrl')."/product/search",
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_TIMEOUT => 30000,
      CURLOPT_CUSTOMREQUEST => "POST",
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_POSTFIELDS => http_build_query($data),
      CURLOPT_HTTPHEADER => array(
        // Set here requred headers
        "authorization: bearer ".$user->remember_token,
      ),
    ));

    $response = curl_exec($curl);
    $products = json_decode($response);

    curl_close($curl);

    // print_r($products->data->data);

    return array($products->success, $products->data);
  }

  public function getproduct($id) {
    $user = User::where('id', \Auth::id())->first();

    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => config('setting.apiUrl')."/product/get/".$id,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_TIMEOUT => 30000,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_HTTPHEADER => array(
        // Set here requred headers
        "authorization: bearer ".$user->remember_token,
      ),
    ));

    $response = curl_exec($curl);
    $products = json_decode($response);

    curl_close($curl);

    // print_r($products->data);
    return array($products->success, $products->data);
  }
}