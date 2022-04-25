<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\Answer;
use App\Models\Response;

class ResponseAnswerController extends Controller
{
	public function __construct()
	{
		$this->middleware('auth.jwt')->only(["index"]);
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
	 */
	public function store(Response $response)
	{
	}
}
