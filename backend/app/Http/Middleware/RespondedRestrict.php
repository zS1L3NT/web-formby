<?php

namespace App\Http\Middleware;

use App\Models\Answer;
use Closure;
use Illuminate\Http\Request;

class RespondedRestrict
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
		if ($request->user()) {
			$questions = $request->route()->parameter("questions");
			
			foreach ($questions as $question) {
				if (Answer::query()->where("question_id", $question->id)->where("user_id", $request->user()->id)->first()) {
					return response([
						"type" => "Response Already Submitted",
						"message" => "You cannot modify or delete a submitted response!"
					], 400);
				}
			}
		}

		return $next($request);
	}
}
