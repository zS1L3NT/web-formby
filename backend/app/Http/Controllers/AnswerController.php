<?php

namespace App\Http\Controllers;

use App\Models\Answer;

class AnswerController extends Controller
{
	private $color_regex = "/^#(?:[0-9a-fA-F]{3}){1,2}$/";
	private $date_regex = "/^\d{4}-\d{2}-\d{2}$/";
	private $time_regex = "/^\d{2}:\d{2}:\d{2}$/";

	public function __construct()
	{
		$this->validate("store", [
			"answers.*.question_id" => ["required", "uuid", "exists:questions,id"],
			"answers" => ["required", "array"],
		]);

		$this->middleware('fill_question_data')->only(["store"]);

		$when = fn ($type) => ["required_if:questions.*.type,$type", "prohibited_unless:questions.*.type,$type"];
		$this->validate("store", [
			"questions" => [],
			"answers.*.question_id" => ["required", "uuid", "exists:questions,id"],
			"answers.*.text" => [...$when("text"), "string", "max:255"],
			"answers.*.paragraph" => [...$when("paragraph"), "string", "max:255"],
			"answers.*.color" => [...$when("color"), "regex:$this->color_regex"],
			"answers.*.choices.*" => [...$when("choice"), "in_array:questions.*.choices.*"],
			"answers.*.choices" => [...$when("choice"), "array", "min:1"],
			"answers.*.switch" => [...$when("switch"), "boolean"],
			"answers.*.slider" => [...$when("slider"), "integer"],
			"answers.*.date" => [...$when("datetime"), "regex:$this->date_regex"],
			"answers.*.time" => [...$when("datetime"), "regex:$this->time_regex"],
			"answers.*.table.*.0" => [...$when("table"), "in_array:questions.*.table_rows.*"],
			"answers.*.table.*.1" => [...$when("table"), "in_array:questions.*.table_columns.*"],
			"answers.*.table.*" => [...$when("table"), "array", "size:2"],
			"answers.*.table" => [...$when("table"), "array"],
			"answers" => ["required", "array"],
		]);

		$this->middleware('response.live_restrict')->only(["store"]);
	}

	/**
	 * Middleware:
	 * - fill_question_data
	 * - response.live_restrict
	 */
	public function store()
	{
		for ($i = 0; $i < count(request("questions")); $i++) {
			$question = request("questions")[$i];
			$answer = request("answers")[$i];

			if ($question->type == "choice") {
				if ($question->choice_type != "checkbox" && count($answer->choices) > 1) {
					return response([
						"type" => "Invalid Choice Data",
						"message" => "answers.$i.choices: A choice type of " . $question->choice_type . " cannot have more than 1 value"
					], 400);
				}
			}

			if ($question->type == "table" && $question->table_type == "radio") {
				$qr = $question->table_rows;
				$ar = array_map(fn ($item) => $item[0], $answer->table);
				if (count(array_diff($qr, $ar)) > 0 || count(array_diff($ar, $qr)) > 0) {
					return response([
						"type" => "Invalid Table Data",
						"message" => "answers.$i.table: You must fill in a value for all rows of the table"
					], 400);
				}
			}
		}

		$user = auth()->user();
		foreach (request("answers") as $answer) {
			Answer::create([
				...$answer,
				"user_id" => $user != NULL ? $user->id : NULL,
			]);
		}

		return [
			"message" => "Answer created successfully!"
		];
	}
}
