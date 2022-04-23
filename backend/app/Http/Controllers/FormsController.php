<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\Question;

class FormsController extends Controller
{
	public function __construct()
	{
		$this->middleware('auth.jwt')->only(["store", "update", "destroy"]);

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
	}

	public function store()
	{
		$form = Form::create([...request()->data, "user_id" => auth()->user()->id]);
		$form->save();

		return [
			"message" => "Form created successfully!"
		];
	}

	public function show(Form $form)
	{
		$last_question_id = request('last_question_id');

		$user = auth()->user();
		if (!$form->live && ($user == NULL || $user->id != $form->user_id)) {
			return error([
				"type" => "Form Closed",
				"message" => "This form is not accepting responses"
			], 400);
		}

		if ($form->requires_auth && $user == NULL) {
			return response([
				"type" => "Unauthorized",
				"message" => "This form requires authentication"
			], 403);
		}

		$questions = [];
		for ($i = 0; $i < 10; $i++) {
			$question = Question::query()->where("previous_question_id", $last_question_id)->first();
			if ($question != NULL) {
				$questions[] = $question;
				$last_question_id = $question->id;
			} else {
				break;
			}
		}

		return [
			...$form->toArray(),
			"questions" => $questions
		];
	}

	public function update(Form $form)
	{
		$user = auth()->user();
		if ($user == NULL || $form->user_id != $user->id) {
			return error([
				"type" => "Unauthorized",
				"message" => "You are not authorized to update this form"
			], 403);
		}

		$form->update(request()->data);
		$form->save();

		return [
			"message" => "Form updated successfully!"
		];
	}

	public function destroy(Form $form)
	{
		$user = auth()->user();
		if ($user == NULL || $form->user_id != $user->id) {
			return error([
				"type" => "Unauthorized",
				"message" => "You are not authorized to delete this form"
			], 403);
		}

		$form->delete();

		return [
			"message" => "Form deleted successfully!"
		];
	}
}
