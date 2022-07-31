<?php

namespace App\Http\Middleware;

use App\Models\Answer;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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
			$questions = $request->input("questions");
			
			foreach ($questions as $question) {
				if (Answer::query()->where("question_id", $question["id"])->where("user_id", $request->user()->id)->first()) {
					return response([
						"type" => "Response Already Submitted",
						"message" => "You cannot resubmit another response!"
					], 400);
				}
			}
		}

		return $next($request);
	}
}
