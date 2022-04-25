<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\Answer;
use App\Models\Response;

class ResponseAnswerController extends Controller
{
	private $color_regex = "/^#(?:[0-9a-fA-F]{3}){1,2}$/";
	private $date_regex = "/^\d{4}-\d{2}-\d{2}$/";
	private $time_regex = "/^\d{2}:\d{2}:\d{2}$/";

	public function __construct()
	{
		$this->middleware('auth.jwt')->only(["index"]);

		$this->middleware('fill_question_data')->only(["store"]);

		$when = fn ($type) => ["required_if:question.type,$type", "prohibited_unless:question.type,$type"];
		$this->validate("store", [
			"question_id" => ["required", "uuid", "exists:questions,id"],
			"question" => [],

			"text" => [...$when("text"), "string", "max:255"],
			"paragraph" => [...$when("paragraph"), "string", "max:255"],
			"color" => [...$when("color"), "regex:$this->color_regex"],
			"choices.*" => [...$when("choices"), "in_array:question.choices"],
			"choices" => [...$when("choices"), "array", "min:1"],
			"switch" => [...$when("switch"), "boolean"],
			"slider" => [...$when("slider"), "integer"],
			"rating" => [...$when("rating"), "integer"],
			"date" => [...$when("date"), "regex:$this->date_regex"],
			"time" => [...$when("time"), "regex:$this->time_regex"],
			"table.*.0" => [...$when("table"), "in_array:question.table_rows.*"],
			"table.*.1" => [...$when("table"), "in_array:question.table_columns.*"],
			"table.*" => [...$when("table"), "array", "size:2"],
			"table" => [...$when("table"), "array"],
		]);

		$this->middleware('response.live_restrict')->only(["store"]);
	}

	/**
	 * Middleware:
	 * - auth.jwt
	 */
	public function index(Response $response)
	{
		$form = Form::query()->find($response->form_id);

		if ($form->user_id != auth()->user()->id) {
			return error([
				"type" => "Unauthorized",
				"message" => "You have no permission to view these answers"
			]);
		}

		return Answer::query()->where("response_id", $response->id)->get();
	}

	/**
	 * Middleware:
	 * - fill_question_data
	 * - response.live_restrict
	 */
	public function store(Response $response)
	{
		$user = auth()->user();
		Answer::create([
			...request()->data,
			"user_id" => $user != NULL ? $user->id : NULL,
			"form_id" => $response->form_id,
			"response_id" => $response->id,
		]);

		return [
			"message" => "Answer created successfully!"
		];
	}
}
