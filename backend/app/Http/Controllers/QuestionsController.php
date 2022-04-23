<?php

namespace App\Http\Controllers;

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
	}

	public function index(string $form_id)
	{
		$last_question_id = request("last_question_id");

		$questions = [];
		for ($i = 0; $i < 10; $i++) {
			$question = Question::query()->where("form_id", $form_id)->where("previous_question_id", $last_question_id)->first();
			if ($question != NULL) {
				$questions[] = $question;
				$last_question_id = $question->id;
			} else {
				break;
			}
		}

		return $questions;
	}

	public function store(string $form_id)
	{
		Question::create([
			...request()->data,
			"form_id" => $form_id
		]);

		return [
			"message" => "Question created successfully!"
		];
	}

	public function show(Question $question)
	{
	}

	public function update(Question $question)
	{
	}

	public function delete(Question $question)
	{
	}
}
