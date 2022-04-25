<?php

namespace App\Http\Controllers;

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
		return Answer::query()->where("response_id", $response->id)->get();
	}

	/**
	 * Middleware:
	 */
	public function store(Response $response)
	{
	}
}
