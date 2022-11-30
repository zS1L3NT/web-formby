<?php

namespace App\Http\Middleware;

use App\Models\Response;
use Closure;
use Illuminate\Http\Request;

class FormUser
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
		$form = $request->route()->parameter("form");

		$user = auth()->user();
		if ($form->state !== "live" && ($user == NULL || $user->id != $form->user_id)) {
			return response([
				"type" => "Form Closed",
				"message" => "This form is not accepting any responses"
			], 400);
		}

		if ($form->auth && $user == NULL) {
			return response([
				"type" => "Unauthorized",
				"message" => "You need to be authorized to view this form"
			], 403);
		}

		if ($user != NULL && $form->user_id != $user->id && Response::query()->where("form_id", $form->id)->where("user_id", $user->id)->exists()) {
			return response([
				"type" => "Response Already Submitted",
				"message" => "You cannot resubmit another response!"
			], 400);
		}

		return $next($request);
	}
}
