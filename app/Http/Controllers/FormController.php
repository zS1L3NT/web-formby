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
			"auth" => ["boolean"],
			"state" => ["required", "in:draft,live,closed"]
		]);

		$this->validate("update", [
			"name" => ["max:255", "string"],
			"description" => ["max:255", "string"],
			"auth" => ["boolean"],
			"state" => ["required", "in:draft,live,closed"]
		]);

		$this->middleware('form.user')->only(["show"]);
		$this->middleware('form.owner')->only(["update", "destroy"]);
		$this->middleware('form.live_restrict')->only(["update"]);
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
			->skip(($page - 1) * 20)
			->limit(20)
			->get();
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
	 * - form.live_restrict
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
