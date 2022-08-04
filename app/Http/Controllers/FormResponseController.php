<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\Answer;
use App\Models\Question;
use App\Models\Response;
use Illuminate\Support\Facades\Validator;

class FormResponseController extends Controller
{
	private $color_regex = "/^#(?:[0-9a-fA-F]{3}){1,2}$/";

	public function __construct()
	{
		$this->middleware(["auth.jwt", "form.owner"])->only(["index", "show"]);
	}

	/**
	 * Middleware:
	 * - auth.jwt
	 * - form.owner
	 */
	public function index(Form $form)
	{
		return Response::query()->where("form_id", $form->id)->get();
	}

	/**
	 * Middleware:
	 */
	public function store(Form $form)
	{
		$user = auth()->user();
		if ($user != NULL) {
			if (Response::query()->where("user_id", auth()->user()->id)->where("form_id", $form->id)->exists()) {
				return response([
					"type" => "Response Already Submitted",
					"message" => "You cannot resubmit another response!"
				], 400);
			}
		}

		foreach (request("answers") as $answer) {
			$question = Question::query()->find($answer["question_id"]);

			if ($question == NULL) {
				return response([
					"type" => "Question Not Found",
					"message" => "Question with ID " . $answer["question_id"] . " not found!"
				], 400);
			}

			$when = fn ($type) => $question->type == $type ? ["required"] : ["prohibited"];
			$validator = Validator::make($answer, [
				"question_id" => ["required", "uuid", "exists:questions,id"],
				"text" => [...$when("text"), "string", "max:255"],
				"paragraph" => [...$when("paragraph"), "string", "max:255"],
				"color" => [...$when("color"), "regex:$this->color_regex"],
				"choices.*" => [...$when("choice"), "in_array:questions.*.choices.*"],
				"choices" => [...$when("choice"), "array", "min:1"],
				"switch" => [...$when("switch"), "boolean"],
				"slider" => [...$when("slider"), "integer"],
				"datetime" => [...$when("datetime"), "date"],
				"table.*.0" => [...$when("table"), "in_array:questions.*.table_rows.*"],
				"table.*.1" => [...$when("table"), "in_array:questions.*.table_columns.*"],
				"table.*" => [...$when("table"), "array", "size:2"],
				"table" => [...$when("table"), "array"],
			]);

			if ($validator->fails()) {
				return response([
					"type" => "Invalid request body",
					"message" => $validator->errors()->first()
				], 400);
			}

			if ($question["type"] == "choice") {
				if ($question["choice_type"] != "checkbox" && count($answer["choices"]) > 1) {
					return response([
						"type" => "Invalid Choice Data",
						"message" => "A choice type of " . $question["choice_type"] . " cannot have more than 1 value"
					], 400);
				}
			}

			if ($question["type"] == "table" && $question["table_type"] == "radio") {
				$qr = $question["table_rows"];
				$ar = array_map(fn ($item) => $item[0], $answer["table"]);
				if (count(array_diff($qr, $ar)) > 0 || count(array_diff($ar, $qr)) > 0) {
					return response([
						"type" => "Invalid Table Data",
						"message" => "You must fill in a value for all rows of the table"
					], 400);
				}
			}
		}

		$response = Response::create([
			"user_id" => $user != NULL ? $user->id : NULL,
			"form_id" => $form->id
		]);
		foreach (request("answers") as $answer) {
			Answer::create([
				...$answer,
				"response_id" => $response->id
			]);
		}

		return [
			"message" => "Response created successfully!"
		];
	}

	/**
	 * Middleware:
	 * - auth.jwt
	 * - form.owner
	 */
	public function show(Form $form, Response $response)
	{
		return $response;
	}
}
