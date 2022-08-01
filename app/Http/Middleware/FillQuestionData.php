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
		$request->replace([
			"questions" => array_map(
				fn ($answer) => Question::query()->find($answer["question_id"])->toArray(),
				$request->input("answers")
			),
			"answers" => $request->input("answers"),
		]);

		return $next($request);
	}
}
