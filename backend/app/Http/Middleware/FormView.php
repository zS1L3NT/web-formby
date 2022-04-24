<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class FormView
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

		return $next($request);
	}
}
