<?php

namespace App\Http\Controllers;

use App\Models\Form;

class FormsController extends Controller
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

		$this->middleware('form.owner_modify')->only(["update", "destroy"]);
	}

	public function index()
	{
		$page = request()->query("page") ?? 1;
		return Form::query()
			->where("user_id", auth()->user()->id)
			->skip(($page - 1) * 10)
			->limit(10)
			->get();
	}

	public function store()
	{
		Form::create([...request()->data, "user_id" => auth()->user()->id]);

		return [
			"message" => "Form created successfully!"
		];
	}

	public function show(Form $form)
	{
		$user = auth()->user();
		if (!$form->live && ($user == NULL || $user->id != $form->user_id)) {
			return error([
				"type" => "Form Closed",
				"message" => "This form is not accepting any responses"
			], 400);
		}

		if ($form->requires_auth && $user == NULL) {
			return response([
				"type" => "Unauthorized",
				"message" => "You are not authorized to view this form"
			], 403);
		}

		return $form;
	}

	public function update(Form $form)
	{
		if ($form->live) {
			return error([
				"type" => "Form is Live",
				"message" => "You cannot edit a live form!"
			]);
		}

		$form->update(request()->data);

		return [
			"message" => "Form updated successfully!"
		];
	}

	public function destroy(Form $form)
	{
		$form->delete();

		return [
			"message" => "Form deleted successfully!"
		];
	}
}
