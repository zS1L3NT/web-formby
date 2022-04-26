<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\Answer;
use App\Models\Response;

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
		return Answer::query()
			->where("form_id", $form->id)
			->whereIn(
				"response_id",
				Response::query()
					->where("form_id", $form->id)
					->where("live", true)
					->get("id")
			)
			->get();
	}
}
