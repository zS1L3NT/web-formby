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
		$response_ids = array_map(
			fn ($data) => $data["id"],
			Response::query()
				->where("live", false)
				->get("id")
				->toArray()
		);
		return Answer::query()
			->where("form_id", $form->id)
			->whereIn("response_id", $response_ids)
			->get();
	}
}
