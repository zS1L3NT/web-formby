<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\Question;
use Illuminate\Http\Request;

class FormsController extends Controller
{
	public function show(Request $request, string $form_id)
	{
		$last_question_id = $request->query('last_question_id');
		$form = Form::find($form_id);

		if ($form == NULL) {
			return error([
				"type" => "Invalid Form ID",
				"message" => "Form with ID \"$form_id\" doesn't exist"
			], 404);
		}

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
}
