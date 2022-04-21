<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
	private $password_regex = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-__+.]).{8,}$/";

	public function __construct()
	{
		$this->middleware("auth.jwt")->only(["show, update"]);
	}

	public function login(Request $request)
	{
		return validate(
			$request,
			[
				"email" => ["required", "email"],
				"password" => ["required"]
			],
			function ($data) {
				if ($token = auth()->attempt($data)) {
					return [
						"token" => $token
					];
				} else {
					return errors([
						"type" => "Login Error",
						"message" => "Invalid credentials"
					]);
				}
			}
		);
	}

	public function register(Request $request)
	{
		return validate(
			$request,
			[
				"name" => ["required", "max:255", "string"],
				"photo" => ["required", "max:255", "url"],
				"email" => ["required", "max:255", "unique:users", "email"],
				"password" => ["required", "max:255", "regex:$this->password_regex"]
			],
			function (array $data) {
				$user = User::create($data());
				$user->save();

				return [
					"message" => "Registration successful!"
				];
			}
		);
	}

	public function show(Request $request)
	{
		return User::find(auth()->user()->id);
	}

	public function update(Request $request)
	{
		return validate(
			$request,
			[
				"name" => ["max:255", "string"],
				"photo" => ["max:255", "url"],
				"email" => ["max:255", "unique:users", "email"],
				"password" => ["max:255", "regex:$this->password_regex"]
			],
			function (array $data) {
				$user = User::find(auth()->user()->id);
				$user->update($data);
				$user->save();

				$fields = count($data);
				return [
					"message" => $fields . " field" . ($fields > 1 ? "s" : "") . " updated",
				];
			}
		);
	}
}
