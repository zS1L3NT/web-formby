<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class FormModify
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

		if ($form->user_id != auth()->user()->id) {
			return error([
				"type" => "Unauthorized",
				"message" => "You have no permission to view or modify this form"
			], 403);
		}

		return $next($request);
	}
}
