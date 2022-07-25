<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\Question;

class FormQuestionController extends Controller
{
	public function __construct()
	{
		$this->middleware('auth.jwt')->only(["store", "update", "destroy"]);

		$when = fn ($type) => ["required_if:type,$type", "prohibited_unless:type,$type"];
		$this->validate("store", [
			"previous_question_id" => ["nullable", "uuid"],
			"title" => ["required", "max:255", "string"],
			"description" => ["max:255", "string"],
			"photo" => ["max:255", "url"],
			"required" => ["boolean"],
			"type" => ["required", "in:text,paragraph,color,choice,switch,slider,datetime,table"],

			"choices.*" => [...$when("choice"), "max:255", "string"],
			"choices" => [...$when("choice"), "array"],
			"choice_type" => [...$when("choice"), "in:radio,checkbox,dropdown"],
			"slider_min" => [...$when("slider"), "integer"],
			"slider_max" => [...$when("slider"), "integer"],
			"slider_step" => [...$when("slider"), "integer"],
			"table_columns.*" => [...$when("table"), "max:255", "string"],
			"table_columns" => [...$when("table"), "array"],
			"table_rows.*" => [...$when("table"), "max:255", "string"],
			"table_rows" => [...$when("table"), "array"],
			"table_type" => [...$when("table"), "in:radio,checkbox"]
		]);

		$this->validate("update", [
			"previous_question_id" => ["nullable", "uuid"],
			"title" => ["max:255", "string"],
			"description" => ["max:255", "string"],
			"photo" => ["max:255", "url"],
			"required" => ["boolean"],
			"type" => ["in:text,paragraph,color,choice,switch,slider,datetime,table"],

			"choices.*" => ["max:255", "string"],
			"choices" => ["array"],
			"choice_type" => ["in:radio,checkbox,dropdown"],
			"slider_min" => ["integer"],
			"slider_max" => ["integer"],
			"slider_step" => ["integer"],
			"table_columns.*" => ["max:255", "string"],
			"table_columns" => ["array"],
			"table_rows.*" => ["max:255", "string"],
			"table_rows" => ["array"],
			"table_type" => ["in:radio,checkbox"]
		]);

		$this->middleware('form.user')->only(["index", "show"]);
		$this->middleware('form.owner')->only(["store", "update", "destroy"]);
		$this->middleware('form.live_restrict')->only(["store", "update"]);
	}

	/**
	 * Middleware:
	 * - form.user
	 */
	public function index(Form $form)
	{
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

	/**
	 * Middleware:
	 * - auth.jwt
	 * - form.owner
	 * - form.live_restrict
	 */
	public function store(Form $form)
	{
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

	/**
	 * Middleware:
	 * - form.user
	 */
	public function show(Form $form, Question $question)
	{
		return $question;
	}

	/**
	 * Middleware:
	 * - auth.jwt
	 * - form.owner
	 * - form.live_restrict
	 */
	public function update(Form $form, Question $question)
	{
		$question->update(request()->data);

		return [
			"message" => "Question updated successfully!",
			"question" => $question
		];
	}

	/**
	 * Middleware:
	 * - auth.jwt
	 * - form.owner
	 */
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
