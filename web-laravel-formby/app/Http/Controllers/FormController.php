<?php

namespace App\Http\Controllers;

use App\Models\Form;

class FormController extends Controller
{
	public function __construct()
	{
		$this->middleware('auth.jwt')->except(["show"]);

		$this->validate("store", [
			"name" => ["required", "min:1", "max:255", "string"],
			"description" => ["min:1", "max:255", "string"],
			"auth" => ["boolean"],
			"state" => ["required", "in:draft,live,closed"]
		]);

		$this->validate("update", [
			"name" => ["min:1", "max:255", "string"],
			"description" => ["min:1", "max:255", "string"],
			"auth" => ["boolean"],
			"state" => ["required", "in:draft,live,closed"]
		]);

		$this->middleware('form.user')->only(["show"]);
		$this->middleware('form.owner')->only(["update", "destroy"]);
	}

	/**
	 * Middleware:
	 * - auth.jwt
	 */
	public function index()
	{
		return Form::query()->where("user_id", auth()->user()->id)->get();
	}

	/**
	 * Middleware:
	 * - auth.jwt
	 */
	public function store()
	{
		$form = Form::create([...request()->data, "user_id" => auth()->user()->id]);

		return [
			"message" => "Form created successfully!",
			"form" => $form
		];
	}

	/**
	 * Middleware:
	 * - form.user
	 */
	public function show(Form $form)
	{
		return $form;
	}

	/**
	 * Middleware:
	 * - auth.jwt
	 * - form.owner
	 */
	public function update(Form $form)
	{
		$form->update(request()->data);

		return [
			"message" => "Form updated successfully!",
			"form" => $form
		];
	}

	/**
	 * Middleware:
	 * - auth.jwt
	 * - form.owner
	 */
	public function destroy(Form $form)
	{
		$form->delete();

		return [
			"message" => "Form deleted successfully!"
		];
	}
}
