<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\Answer;

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
		return Answer::query()->where("form_id", $form->id)->get();
	}
}
