<?php

namespace App\Http;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CustomValidator
{

	public function __construct(Request $request, array $rules)
	{
		$this->validator = Validator::make($request->only(array_keys($rules)), $rules);
	}

	/**
	 * @return bool
	 */
	public function fails()
	{
		return $this->validator->fails();
	}

	/**
	 * @return array
	 */
	public function data()
	{
		return $this->validator->validated();
	}

	/**
	 * @return array
	 */
	public function errors()
	{
		return [
			"errors" => [
				[
					"type" => "Validation",
					"fields" => $this->validator->errors()->messages()
				]
			]
		];
	}
}
