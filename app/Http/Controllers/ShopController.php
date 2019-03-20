<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ShopController extends Controller {
  public function index(Request $request) {
    $data = array(
      'page' => $request->input('page')
    );

    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => config('setting.apiUrl')."/shop/all",
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_TIMEOUT => 30000,
      CURLOPT_CUSTOMREQUEST => "POST",
      CURLOPT_POSTFIELDS => http_build_query($data),
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    ));

    $response = curl_exec($curl);
    $lists = json_decode($response);

    curl_close($curl);

    // print_r($lists);
    return array($lists->success, $lists->data);
  }

  public function show($id) {
    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => config('setting.apiUrl')."/shop/get/".$id,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_TIMEOUT => 30000,
      CURLOPT_CUSTOMREQUEST => "POST",
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    ));

    $response = curl_exec($curl);
    $product = json_decode($response);

    curl_close($curl);

    // print_r($lists);
    return array($product->success, $product->data);
  }

  public function buy(Request $request) {
    $user = DB::table('users')->where('id', \Auth::id())->first();

    if(!$user) {
      return array(false);
    }

    $data = array(
      'id_product' => $request->id_product,
      'amount' => $request->amount
    );

    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => config('setting.apiUrl')."/shop/buy",
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
    $message = json_decode($response);

    curl_close($curl);

    // print_r($message);
    return array($message->success, $message->data);
  }

  public function cart() {
    $user = DB::select('SELECT * FROM users WHERE id = :id', ['id' => \Auth::id()]);

    // print_r($user[0]->remember_token);
    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => config('setting.apiUrl')."/shop/cart",
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_TIMEOUT => 30000,
      CURLOPT_CUSTOMREQUEST => "POST",
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_HTTPHEADER => array(
        // Set here requred headers
        "authorization: bearer ".$user[0]->remember_token,
      ),
    ));

    $response = curl_exec($curl);
    $carts = json_decode($response);

    curl_close($curl);

    // print_r($carts);
    return array($carts->success, $carts->data);
  }

  public function payment() {
    $user = DB::select('SELECT * FROM users WHERE id = :id', ['id' => \Auth::id()]);

    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => config('setting.apiUrl')."/shop/pay",
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_TIMEOUT => 30000,
      CURLOPT_CUSTOMREQUEST => "POST",
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_HTTPHEADER => array(
        // Set here requred headers
        "authorization: bearer ".$user[0]->remember_token,
      ),
    ));

    $response = curl_exec($curl);
    $message = json_decode($response);

    curl_close($curl);

    // print_r($message->data);
    return array($message->success, $message->data);
  }

  public function filter(Request $request) {
    $user = User::where('id', \Auth::id())->first();

    $data = array(
      'id' => $request->id
    );

    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => config('setting.apiUrl')."/shop/filter",
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
    print_r($response);
    exit();
    $lists = json_decode($response);

    return array($lists->success, $lists->data);
  }
}