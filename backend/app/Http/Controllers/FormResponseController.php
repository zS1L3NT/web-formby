<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\Response;

class FormResponseController extends Controller
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
	public function index(Form $form)
	{
		return Response::query()->where("form_id", $form->id)->get();
	}

	/**
	 * Middleware:
	 * - form.user
	 */
	public function store(Form $form)
	{
		$user = auth()->user();

		if (Response::query()->where("form_id", $form->id)->where("user_id", $user->id)->exists()) {
			return error([
				"type" => "Already Responded",
				"message" => "You have already responsed to this form!"
			], 400);
		}

		Response::create([
			"user_id" => $user != NULL ? $user->id : NULL,
			"form_id" => $form->id,
		]);

		return [
			"message" => "Response created successfully!"
		];
	}
}
