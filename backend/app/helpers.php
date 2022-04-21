<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

function validate(Request $request, array $rules, Closure $callback)
{
	$validator = Validator::make($request->only(array_keys($rules)), $rules);

	if ($validator->fails()) {
		return errors([
			"type" => "Request Body",
			"fields" => $validator->errors()->messages()
		]);
	}

	return $callback($validator->validated());
}

function errors(array ...$errors)
{
	return response(
		["errors" => $errors],
		400
	);
}
