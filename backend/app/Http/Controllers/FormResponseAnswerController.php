<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\Answer;
use App\Models\Response;

class FormResponseAnswerController extends Controller
{
	public function __construct()
	{
		$this->middleware('auth.jwt')->only(["index"]);

		$this->middleware('form.user')->only(["store"]);
	}

	/**
	 * Middleware:
	 * - auth.jwt
	 */
	public function index(Form $form, Response $response)
	{
		return Answer::query()->where("form_id", $form->id)->where("response_id", $response->id)->get();
	}

	/**
	 * Middleware:
	 * - form.user
	 */
	public function store(Form $form, Response $response)
	{
	}
}
