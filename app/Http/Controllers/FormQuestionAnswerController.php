<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Form;
use App\Models\Question;

class FormQuestionAnswerController extends Controller
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
    public function index(Form $form, Question $question)
    {
        return Answer::query()->where("question_id", $question->id)->get();
    }
}
