<?php

namespace App\Http\Controllers;

use App\Models\Question;

class QuestionsController extends Controller
{
	public function __construct() {
		$this->middleware('auth.jwt')->only(["store", "update", "destroy"]);
	}

    public function index() {
		$last_question_id = request("last_question_id");

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

		return $questions;
	}

	public function store() {

	}

	public function show(Question $question) {

	}

	public function update(Question $question) {

	}

	public function delete(Question $question) {

	}
}
