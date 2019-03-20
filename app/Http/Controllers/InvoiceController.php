<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use App\Invoice;
use App\User;

class InvoiceController extends Controller {
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
      CURLOPT_URL => config('setting.apiUrl')."/invoice/all",
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
    $invoices = json_decode($response);

    curl_close($curl);

    // print_r($invoices);
    return array($invoices->success, $invoices->data);
  }

  public function loadSubInvoice($param) {
    $id = \Auth::id();
    $user = User::where('id', $id)->first();

    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => config('setting.apiUrl')."/invoice/".$param."/all",
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
    $invoices = json_decode($response);

    curl_close($curl);

    // print_r($invoices);
    return array($invoices->success, $invoices->data);
  }

  public function create(Request $request) {
    $user = User::where('id', \Auth::id())->first();

    $data = array(
      'id_user' => $request->input('id_user'),
      'id_product' => $request->input('id_product'),
      'amount' => $request->input('amount')
    );

    // print_r(http_build_query($data));

    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => config('setting.apiUrl')."/invoice/create",
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

    // print_r($message);
    return array($message->success, $message->data);
  }

  public function update(Request $request, $id) {
    $user = User::where('id', \Auth::id())->first();

    $data = array(
      'id_user' => $request->input('id_user'),
      'id_product' => $request->input('id_product'),
      'amount' => $request->input('amount')
    );

    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => config('setting.apiUrl')."/invoice/update/".$id,
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

    return array($message->success, $message->data);
  }

  public function delete(Request $request, $id) {
    $user = User::where('id', \Auth::id())->first();

    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => config('setting.apiUrl')."/invoice/delete/".$id,
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

    // print_r($invoice);
    return array($message->success, $message->data);
  }

  public function search(Request $request) {
    $user = User::where('id', \Auth::id())->first();

    $data = array(
      'keyword' => $request->input('keyword')
    );

    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => config('setting.apiUrl')."/invoice/search/",
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
    $invoices = json_decode($response);

    return array($invoices->success, $invoices->data);
  }

  public function getinvoice($id) {
    $user = User::where('id', \Auth::id())->first();

    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => config('setting.apiUrl')."/invoice/get/".$id,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 30000,
      CURLOPT_CUSTOMREQUEST => "GET",
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_HTTPHEADER => array(
          // Set here requred headers
          "authorization: bearer ".$user->remember_token,
      ),
    ));

    $response = curl_exec($curl);
    $invoice = json_decode($response);

    // print_r($invoice->data[0]);
    return array($invoice->success, $invoice->data);
  }
}