<?php

namespace App\Http\Controllers;

use App\Models\User;

class UserController extends Controller
{
	private $password_regex = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-__+.]).{8,}$/";

	public function __construct()
	{
		$this->middleware("auth.jwt")->only(["logout", "current", "show", "update", "updatePassword"]);

		$this->validate("login", [
			"email" => ["required", "email"],
			"password" => ["required"]
		]);

		$this->validate("register", [
			"name" => ["required", "min:1", "max:255", "string"],
			"photo" => ["nullable", "string"],
			"email" => ["required", "max:255", "unique:users", "email"],
			"password" => ["required", "max:255", "regex:$this->password_regex"]
		]);

		$this->validate("update", [
			"name" => ["min:1", "max:255", "string"],
			"photo" => ["nullable", "string"],
			"email" => ["max:255", "unique:users", "email"],
			"password" => ["max:255", "regex:$this->password_regex"]
		]);

		$this->validate("updatePassword", [
			"old_password" => ["required", "max:255", "regex:$this->password_regex"],
			"new_password" => ["required", "max:255", "regex:$this->password_regex"]
		]);
	}

	public function login()
	{
		if ($token = auth()->attempt(request()->data)) {
			return [
				"message" => "Logged in successfully!",
				"token" => $token,
				"user" => auth()->user()
			];
		} else {
			return response([
				"type" => "Login Error",
				"message" => "Invalid login credentials"
			], 400);
		}
	}

	public function register()
	{
		$user = User::create(request()->data);

		return [
			"message" => "Registered successfully!",
			"token" => auth()->login($user),
			"user" => $user
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
	public function current()
	{
		return auth()->user();
	}

	/**
	 * Middleware:
	 * - auth.jwt
	 */
	public function show()
	{
		return User::query()->find(request()->user_id);
	}

	/**
	 * Middleware:
	 * - auth.jwt
	 */
	public function update()
	{
		User::find(auth()->user()->id)->update(request()->data);

		return [
			"message" => "User updated successfully!",
			"user" => auth()->user()
		];
	}

	/**
	 * Middleware:
	 * - auth.jwt
	 */
	public function updatePassword()
	{
		$user = auth()->user();
		if (!password_verify(request("old_password"), $user->password)) {
			return response([
				"type" => "Password Error",
				"message" => "Old password is incorrect"
			], 400);
		}

		User::find(auth()->user()->id)->update(["password" => request("new_password")]);
		return [
			"message" => "Password updated successfully!"
		];
	}

	/**
	 * Middleware:
	 * - auth.jwt
	 */
	public function destroy()
	{
		User::find(auth()->user()->id)->delete();
		auth()->logout();
		return [
			"message" => "User deleted successfully!"
		];
	}
}
