<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Question;
use Illuminate\Http\Request;

class FillQuestionData
{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
	 * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
	 */
	public function handle(Request $request, Closure $next)
	{
		$body = $request->all();

		$question_id = $request->input("question_id");
		if ($question_id != NULL && is_string($question_id)) {
			if ($question = Question::query()->find($question_id)) {
				$body["question"] = $question->toArray();
				$request->replace($body);
			}
		}

		return $next($request);
	}
}
