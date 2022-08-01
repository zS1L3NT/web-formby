<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\Answer;
use App\Models\Question;

class FormAnswerController extends Controller
{
	public function __construct()
	{
		$this->middleware(['auth.jwt', 'form.owner']);
	}

	/**
	 * Middleware:
	 * - auth.jwt
	 * - form.owner
	 */
	public function index(Form $form)
	{
		return Answer::query()->whereIn(
			"question_id",
			Question::query()
				->where("form_id", $form->id)
				->get("id")
				->map(fn ($item) => $item["id"])
		)->get();
	}
}
