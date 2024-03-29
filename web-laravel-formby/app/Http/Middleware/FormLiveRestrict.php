<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class FormLiveRestrict
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

		if ($form->state !== "draft") {
			return response([
				"type" => "Form is Live",
				"message" => "You cannot modify a live form!"
			], 400);
		}

		return $next($request);
	}
}
