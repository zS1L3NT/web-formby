<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ResponseLiveRestrict
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
		$response = $request->route()->parameter("response");

		if ($response->live) {
			return response([
				"type" => "Response Already Submitted",
				"message" => "You cannot modify or delete a submitted response!"
			]);
		}

		return $next($request);
	}
}
