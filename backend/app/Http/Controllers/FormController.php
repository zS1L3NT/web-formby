<?php

namespace App\Http\Controllers;

use App\Models\Form;

class FormController extends Controller
{
	public function __construct()
	{
		$this->middleware('auth.jwt')->except(["show"]);

		$this->validate("store", [
			"name" => ["required", "max:255", "string"],
			"description" => ["required", "max:255", "string"],
			"requires_auth" => ["boolean"],
			"live" => ["boolean"]
		]);

		$this->validate("update", [
			"name" => ["max:255", "string"],
			"description" => ["max:255", "string"],
			"requires_auth" => ["boolean"],
			"live" => ["boolean"]
		]);

		$this->middleware('form.view')->only(["show"]);
		$this->middleware('form.modify')->only(["update", "destroy"]);
		$this->middleware('form.live_modify')->only(["update"]);
	}

	/**
	 * Middleware:
	 * - auth.jwt
	 */
	public function index()
	{
		$page = request()->query("page") ?? 1;
		return Form::query()
			->where("user_id", auth()->user()->id)
			->skip(($page - 1) * 10)
			->limit(10)
			->get();
	}

	/**
	 * Middleware:
	 * - auth.jwt
	 */
	public function store()
	{
		Form::create([...request()->data, "user_id" => auth()->user()->id]);

		return [
			"message" => "Form created successfully!"
		];
	}

	/**
	 * Middleware:
	 * - form.view
	 */
	public function show(Form $form)
	{
		return $form;
	}

	/**
	 * Middleware:
	 * - auth.jwt
	 * - form.modify
	 * - form.live_modify
	 */
	public function update(Form $form)
	{
		$form->update(request()->data);

		return [
			"message" => "Form updated successfully!"
		];
	}

	/**
	 * Middleware:
	 * - auth.jwt
	 * - form.modify
	 */
	public function destroy(Form $form)
	{
		$form->delete();

		return [
			"message" => "Form deleted successfully!"
		];
	}
}
