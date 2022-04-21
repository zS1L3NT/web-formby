<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\CustomValidator;

class UsersController extends Controller
{
	private $password_regex = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-__+.]).{8,}$/";

	public function __construct()
	{
		$this->middleware("auth.jwt")->only(["show, update"]);
	}

	public function login(Request $request)
	{
		$validator = new CustomValidator($request, [
			"email" => ["required", "email"],
			"password" => ["required"]
		]);

		if ($validator->fails()) {
			return $validator->errors();
		}

		if ($token = auth()->attempt($validator->data())) {
			return [
				"token" => $token
			];
		} else {
			return response(
				[
					"errors" => [
						[
							"type" => "Login Error",
							"message" => "Invalid credentials"
						]
					]
				],
				400
			);
		}
	}

	public function register(Request $request)
	{
		$validator = new CustomValidator($request, [
			"name" => ["required", "max:255", "string"],
			"photo" => ["required", "max:255", "url"],
			"email" => ["required", "max:255", "unique:users", "email"],
			"password" => ["required", "max:255", "regex:$this->password_regex"]
		]);

		if ($validator->fails()) {
			return $validator->errors();
		}

		$user = User::create($validator->data());
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
		$validator = new CustomValidator($request, [
			"name" => ["max:255", "string"],
			"photo" => ["max:255", "url"],
			"email" => ["max:255", "unique:users", "email"],
			"password" => ["max:255", "regex:$this->password_regex"]
		]);

		if ($validator->fails()) {
			return $validator->errors();
		}

		$user = User::find(auth()->user()->id);
		$user->update($validator->data());
		$user->save();

		$fields = count($validator->data());
		return [
			"message" => $fields . " field" . ($fields > 1 ? "s" : "") . " updated",
		];
	}
}
