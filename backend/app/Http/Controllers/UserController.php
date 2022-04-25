<?php

namespace App\Http\Controllers;

use App\Models\User;

class UserController extends Controller
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

		return [
			"message" => "Registered successfully!",
			"token" => auth()->login($user)
		];
	}

	/**
	 * Middleware:
	 * - auth.jwt
	 */
	public function logout()
	{
		auth()->logout();

		return [
			"message" => "Logged out successfully!"
		];
	}

	/**
	 * Middleware:
	 * - auth.jwt
	 */
	public function show()
	{
		return User::find(auth()->user()->id);
	}

	/**
	 * Middleware:
	 * - auth.jwt
	 */
	public function update()
	{
		User::find(auth()->user()->id)->update(request()->data);

		return [
			"message" => "User updated successfully!"
		];
	}
}
