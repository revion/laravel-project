<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class AuthController extends Controller {
    public function viewLogin() {
        return view('auth/login');
    }

    public function viewRegister() {
        return view('auth/register');
    }

    public function login(Request $request) {
        $rules = array(
            'email' => 'bail|required|email',
            'password' => 'required'
        );

        $error_message = array(
            'required' => ':attribute input is required',
        );

        $this->validate($request, $rules, $error_message);

        if(!auth()->attempt(['email' => $request->input("email"), 'password' => $request->input("password")])) {
            return redirect()->back()->with('errors', "Email & Password combination are invalid");
        }

        $data = array(
            'email' => $request->input("email"),
            'password' => $request->input("password")
        );

        $curl = curl_init();

        curl_setopt_array($curl, array(
          CURLOPT_URL => config('setting.apiUrl')."/login",
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => "",
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 30000,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_POSTFIELDS => json_encode($data),
          CURLOPT_HTTPHEADER => array(
            // Set here requred headers
            "accept: */*",
            "content-type: application/json"
          ),
        ));

        $response = curl_exec($curl);
        $error = curl_error($curl);

        curl_close($curl);

        if($error) {
          return redirect()->back()->withErrors('Cannot login');
        } else {
          return redirect()->route('dashboard');
        }
    }

    public function register(Request $request) {
        $rules = array(
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required'
        );

        $error_message = array(
            'required' => ':attribute is required',
            'max' => ':attribute exceeds bound of characters',
            'unique' => ':attribute already exists'
        );

        $this->validate($request, $rules, $error_message);

        $data = array(
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password
        );

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => config('setting.apiUrl')."/register",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30000,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_POSTFIELDS => json_encode($data),
            CURLOPT_HTTPHEADER => array(
                // Set here requred headers
                "accept: */*",
                "content-type: application/json"
            ),
        ));

        $response = curl_exec($curl);
        $error = curl_error($curl);

        curl_close($curl);

        if($error) {
            return redirect()->back()->withErrors('Cannot register');
        } else {
            return redirect()->route('index')->with('message', 'Successfully registered');
        }
    }

    public function logout() {
        \Auth::logout();
        return redirect()->route('index');
    }

    public function getapi() {
        $id = \Auth::id();
        $user = User::where('id', $id)->first();
        return $user->remember_token;
    }
}