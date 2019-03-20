<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Brand;
use App\User;

class BrandController extends Controller {
  public function __construct() {
    $this->middleware('auth');
  }

  public function index(Request $request) {
    $id = \Auth::id();
    $user = User::where('id', $id)->first();

    $data = array(
      'page' => $request->input('page')
    );

    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => config('setting.apiUrl')."/brand/all",
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
    $brands = json_decode($response);

    curl_close($curl);

    return array($brands->success, $brands->data);
  }

  public function create(Request $request) {
    $user = User::where('id', \Auth::id())->first();

    $data = array(
      'name' => $request->input("name")
    );

    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => config('setting.apiUrl')."/brand/create",
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 30000,
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

  public function update(Request $request, $id) {
    $user = User::where('id', \Auth::id())->first();

    $data = array(
      'name' => $request->input('name')
    );

    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => config('setting.apiUrl')."/brand/update/".$id,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 30000,
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

  public function delete($id) {
    $user = User::where('id', \Auth::id())->first();

    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => config('setting.apiUrl')."/brand/delete/".$id,
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
      CURLOPT_URL => config('setting.apiUrl')."/brand/search",
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
    $brands = json_decode($response);

    curl_close($curl);

    // print_r($brands->data);

    return array($brands->success, $brands->data);
  }

  public function getbrand($id) {
      $user = User::where('id', \Auth::id())->first();

      $curl = curl_init();

      curl_setopt_array($curl, array(
          CURLOPT_URL => config('setting.apiUrl')."/brand/get/".$id,
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_TIMEOUT => 30000,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_HTTPHEADER => array(
              // Set here requred headers
              "authorization: bearer ".$user->remember_token,
          ),
      ));

      $response = curl_exec($curl);
      $brand = json_decode($response);

      curl_close($curl);

      return array($brand->success, $brand->data);
  }
}