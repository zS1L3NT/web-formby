<?php

namespace App\Http\Controllers;

use App\Models\User;

class UsersController extends Controller
{
	private $password_regex = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-__+.]).{8,}$/";

	public function __construct()
	{
		$this->middleware("auth.jwt")->only(["logout", "show", "update"]);

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

	public function login()
	{
		if ($token = auth()->attempt(request()->data)) {
			return [
				"message" => "Logged in successfully!",
				"token" => $token
			];
		} else {
			return error([
				"type" => "Login Error",
				"message" => "Invalid login credentials"
			]);
		}
	}

	public function register()
	{
		$user = User::create(request()->data);
		$user->save();

		return [
			"message" => "Registered successfully!",
			"token" => auth()->login($user)
		];
	}

	public function logout()
	{
		auth()->logout();

		return [
			"message" => "Logged out successfully!"
		];
	}

	public function show()
	{
		return User::find(auth()->user()->id);
	}

	public function update()
	{
		$user = User::find(auth()->user()->id);
		$user->update(request()->data);
		$user->save();

		return [
			"message" => "User updated successfully!"
		];
	}
}
