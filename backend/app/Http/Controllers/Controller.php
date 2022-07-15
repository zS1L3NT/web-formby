<?php

namespace App\Http\Controllers;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
	use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

	public function validate(string $route, array $rules)
	{
		$middleware = function (Request $request, Closure $next) use ($rules) {
			$validator = Validator::make($request->only(array_keys($rules)), $rules);

			$extra_keys = array_filter(
				array_keys(
					array_diff_key(
						$request->all(),
						$rules
					)
				),
				fn ($key) => is_string($key)
			);
			if (count($extra_keys) > 0 || $validator->fails()) {
				return response(
					[
						"type" => "Invalid Request Body",
						"message" => "The request body contains invalid data",
						"fields" => array_merge(
							array_reduce(
								$extra_keys,
								fn ($arr, $key) => [...$arr, $key => ["The $key field is not allowed."]],
								[]
							),
							$validator->errors()->messages()
						)
					],
					400
				);
			}

			$request->data = $validator->validated();

			return $next($request);
		};

		$this
			->middleware($middleware)
			->only($route);
	}
}
