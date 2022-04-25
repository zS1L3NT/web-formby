<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\Response;

class ResponseController extends Controller
{
	public function __construct()
	{
		$this->middleware('auth.jwt')->only(["show", "update", "destroy"]);

		$this->validate("store", [
			"form_id" => ["required", "uuid", "exists:forms,id"]
		]);

		$this->validate("update", [
			"live" => ["required", "boolean"]
		]);

		$this->middleware("response.owner")->only(["update", "destroy"]);
		$this->middleware("response.live_restrict")->only(["update", "destroy"]);
	}

	/**
	 * Middleware:
	 */
	public function store()
	{
		$user = auth()->user();

		if ($user != NULL && Response::query()->where("form_id", request("form_id"))->where("user_id", $user->id)->exists()) {
			return error([
				"type" => "Responded Already Submitted",
				"message" => "You have already submitted a response to this form!"
			], 400);
		}

		$form = Form::query()->find(request("form_id"));
		if (!$form->live && ($user == NULL || $user->id != $form->user_id)) {
			return error([
				"type" => "Form Closed",
				"message" => "This form is not accepting any responses"
			], 400);
		}

		if ($form->requires_auth && $user == NULL) {
			return response([
				"type" => "Unauthorized",
				"message" => "You need to be authorized to view this form"
			], 403);
		}

		Response::create([
			"user_id" => $user != NULL ? $user->id : NULL,
			"form_id" => request("form_id"),
		]);

		return [
			"message" => "Response created successfully!"
		];
	}

	/**
	 * Middleware:
	 * - auth.jwt
	 */
	public function show(Response $response)
	{
		$form = Form::query()->find($response->form_id);

		if ($form->user_id != auth()->user()->id) {
			return error([
				"type" => "Unauthorized",
				"message" => "You have no permission to view this response"
			]);
		}

		return $response;
	}

	/**
	 * Middleware:
	 * - auth.jwt
	 * - response.owner
	 * - response.live_restrict
	 */
	public function update(Response $response)
	{
		$response->update(request()->data);

		return [
			"message" => "Response updated successfully!"
		];
	}

	/**
	 * Middleware:
	 * - auth.jwt
	 * - response.owner
	 * - response.live_restrict
	 */
	public function delete(Response $response)
	{
		$response->delete();

		return [
			"message" => "Response deleted successfully!"
		];
	}
}
