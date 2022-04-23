<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
	private $password_regex = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-__+.]).{8,}$/";

	public function __construct()
	{
		$this->middleware("auth.jwt")->only(["show", "update"]);

		$this->validate("login", [
			"email" => ["required", "email"],
			"password" => ["required"]
		]);

		$this->validate("register", [
			"name" => ["required", "max:255", "string"],
			"photo" => ["required", "max:255", "url"],
			"email" => ["required", "max:255", "unique:users", "email"],
			"password" => ["required", "max:255", "regex:$this->password_regex"]
		]);

		$this->validate("update", [
			"name" => ["max:255", "string"],
			"photo" => ["max:255", "url"],
			"email" => ["max:255", "unique:users", "email"],
			"password" => ["max:255", "regex:$this->password_regex"]
		]);
	}

	public function login(Request $request)
	{
		if ($token = auth()->attempt($request->data)) {
			return [
				"token" => $token
			];
		} else {
			return error([
				"type" => "Login Error",
				"message" => "Invalid login credentials"
			]);
		}
	}

	public function register(Request $request)
	{
		$user = User::create($request->data);
		$user->save();

		return [
			"message" => "Registration successful!"
		];
	}

	public function show(Request $request)
	{
		return User::find(auth()->user()->id);
	}

	public function update(Request $request)
	{
		$user = User::find(auth()->user()->id);
		$user->update($request->data);
		$user->save();

		$fields = count($request->data);
		return [
			"message" => $fields . " field" . ($fields > 1 ? "s" : "") . " updated",
		];
	}
}
