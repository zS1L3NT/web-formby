<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\Question;

class QuestionsController extends Controller
{
	public function __construct()
	{
		$this->middleware('auth.jwt')->only(["store", "update", "destroy"]);

		$this->validate("store", [
			"previous_question_id" => ["nullable", "uuid"],
			"title" => ["required", "max:255", "string"],
			"description" => ["max:255", "string"],
			"photo" => ["max:255", "url"],
			"required" => ["boolean"],
			"type" => ["required", "in:text,paragraph,color,choice,switch,slider,rating,datetime,table"],

			"choices.*" => ["required_if:type,choice", "prohibited_unless:type,choice", "max:255", "string"],
			"choices" => ["required_if:type,choice", "prohibited_unless:type,choice", "array"],
			"choice_type" => ["required_if:type,choice", "prohibited_unless:type,choice", "in:radio,checkbox:dropdown"],
			"slider_min" => ["required_if:type,slider", "prohibited_unless:type,slider", "integer"],
			"slider_max" => ["required_if:type,slider", "prohibited_unless:type,slider", "integer"],
			"slider_step" => ["required_if:type,slider", "prohibited_unless:type,slider", "integer"],
			"rating_stars" => ["required_if:type,rating", "prohibited_unless:type,rating", "integer"],
			"table_columns.*" => ["required_if:type,table", "prohibited_unless:type,table", "max:255", "string"],
			"table_columns" => ["required_if:type,table", "prohibited_unless:type,table", "array"],
			"table_rows.*" => ["required_if:type,table", "prohibited_unless:type,table", "max:255", "string"],
			"table_rows" => ["required_if:type,table", "prohibited_unless:type,table", "array"],
			"table_type" => ["required_if:type,table", "prohibited_unless:type,table", "in:radio,checkbox"]
		]);

		$this->validate("update", [
			"title" => ["max:255", "string"],
			"description" => ["max:255", "string"],
			"photo" => ["max:255", "url"],
			"required" => ["boolean"],
			"type" => ["in:text,paragraph,color,choice,switch,slider,rating,datetime,table"],

			"choices.*" => ["required_if:type,choice", "prohibited_unless:type,choice", "max:255", "string"],
			"choices" => ["required_if:type,choice", "prohibited_unless:type,choice", "array"],
			"choice_type" => ["required_if:type,choice", "prohibited_unless:type,choice", "in:radio,checkbox:dropdown"],
			"slider_min" => ["required_if:type,slider", "prohibited_unless:type,slider", "integer"],
			"slider_max" => ["required_if:type,slider", "prohibited_unless:type,slider", "integer"],
			"slider_step" => ["required_if:type,slider", "prohibited_unless:type,slider", "integer"],
			"rating_stars" => ["required_if:type,rating", "prohibited_unless:type,rating", "integer"],
			"table_columns.*" => ["required_if:type,table", "prohibited_unless:type,table", "max:255", "string"],
			"table_columns" => ["required_if:type,table", "prohibited_unless:type,table", "array"],
			"table_rows.*" => ["required_if:type,table", "prohibited_unless:type,table", "max:255", "string"],
			"table_rows" => ["required_if:type,table", "prohibited_unless:type,table", "array"],
			"table_type" => ["required_if:type,table", "prohibited_unless:type,table", "in:radio,checkbox"]
		]);

		$this->middleware('form.owner_modify')->only(["store", "update", "destroy"]);
	}

	public function index(Form $form)
	{
		$user = auth()->user();
		if (!$form->live && ($user == NULL || $user->id != $form->user_id)) {
			return error([
				"type" => "Form Closed",
				"message" => "This question is not accepting any responses"
			], 400);
		}

		if ($form->requires_auth && $user == NULL) {
			return response([
				"type" => "Unauthorized",
				"message" => "You are not authorized to view this form"
			], 403);
		}

		$last_question_id = request("last_question_id");

		$questions = [];
		for ($i = 0; $i < 10; $i++) {
			$question = Question::query()
				->where("form_id", $form->id)
				->where("previous_question_id", $last_question_id)
				->first();
			if ($question != NULL) {
				$questions[] = $question;
				$last_question_id = $question->id;
			} else {
				break;
			}
		}

		return $questions;
	}

	public function store(Form $form)
	{
		if ($form->live) {
			return error([
				"type" => "Form is Live",
				"message" => "You cannot add a question to a live form"
			]);
		}

		$question = Question::create([
			...request()->data,
			"form_id" => $form->id
		]);

		Question::query()
			->where("form_id", $form->id)
			->where("previous_question_id", request("previous_question_id"))
			->whereNot("id", $question->id)
			->update(["previous_question_id" => $question->id]);

		return [
			"message" => "Question created successfully!"
		];
	}

	public function show(Form $form, Question $question)
	{
		$user = auth()->user();
		if (!$form->live && ($user == NULL || $user->id != $form->user_id)) {
			return error([
				"type" => "Form Closed",
				"message" => "This question is not accepting any responses"
			], 400);
		}

		if ($form->requires_auth && $user == NULL) {
			return response([
				"type" => "Unauthorized",
				"message" => "You are not authorized to view this question"
			], 403);
		}

		return $question;
	}

	public function update(Form $form, Question $question)
	{
		if ($form->live) {
			return error([
				"type" => "Form is Live",
				"message" => "You cannot edit a question from a live form!"
			]);
		}

		if (request("type") != NULL) {
			$question->update([
				"choices" => NULL,
				"choice_type" => NULL,
				"slider_min" => NULL,
				"slider_max" => NULL,
				"slider_step" => NULL,
				"rating_stars" => NULL,
				"table_columns" => NULL,
				"table_rows" => NULL,
				"table_type" => NULL,
				...request()->data
			]);
		} else {
			$question->update(request()->data);
		}

		return [
			"message" => "Question updated successfully!"
		];
	}

	public function destroy(Form $form, Question $question)
	{
		Question::query()
			->where("form_id", $form->id)
			->where("previous_question_id", $question->id)
			->whereNot("id", $question->id)
			->update(["previous_question_id" => $question->previous_question_id]);

		$question->delete();

		return [
			"message" => "Question deleted successfully!"
		];
	}
}
