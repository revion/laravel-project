<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\User;

class UserController extends Controller {
  public function __construct() {
    $this->middleware('auth');
  }

  public function mycart(Request $request) {
    $user = DB::table('users')->where('id', \Auth::id())->first();

    $data = array([
      'page' => $request->page
    ]);
    // print_r($data);
    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => config('setting.apiUrl')."/user/get",
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
    $lists = \json_decode($response);

    //print_r($lists);
    return array($lists->success, $lists->data);
  }

  public function search(Request $request) {
    $user = User::where('id', \Auth::id())->first();

    // print_r($user->remember_token);
    $data = array(
      'page' => $request->input('page'),
      'keyword' => $request->input('keyword')
    );
    
    // print_r(http_build_query($data));
    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => config('setting.apiUrl')."/user/search",
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
    $lists = json_decode($response);

    curl_close($curl);

    // print_r($lists);
    return array($lists->success, $lists->data);
  }
}