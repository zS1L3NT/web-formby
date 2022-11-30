<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Form;
use App\Models\Response;

class FormResponseAnswerController extends Controller
{
    public function __construct()
    {
        $this->middleware(["auth.jwt", "form.owner"])->only(["index"]);
    }

	/**
	 * Middleware:
	 * - auth.jwt
	 * - form.owner
	 */
    public function index(Form $form, Response $response)
    {
        return Answer::query()->where("response_id", $response->id)->get();
    }
}
