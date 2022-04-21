<?php

namespace App\Http;

use Illuminate\Support\Facades\Validator;

class CustomValidator
{

	public function __construct(array $data, array $rules)
	{
		$this->validator = Validator::make($data, $rules);
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
	public function data() {
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
