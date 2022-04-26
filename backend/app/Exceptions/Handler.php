<?php

namespace App\Exceptions;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
	/**
	 * A list of exception types with their corresponding custom log levels.
	 *
	 * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
	 */
	protected $levels = [
		//
	];

	/**
	 * A list of the exception types that are not reported.
	 *
	 * @var array<int, class-string<\Throwable>>
	 */
	protected $dontReport = [
		//
	];

	/**
	 * A list of the inputs that are never flashed for validation exceptions.
	 *
	 * @var array<int, string>
	 */
	protected $dontFlash = [
		'current_password',
		'password',
		'password_confirmation',
	];

	/**
	 * Register the exception handling callbacks for the application.
	 *
	 * @return void
	 */
	public function register()
	{
		$this->reportable(function (Throwable $e) {
			//
		});
	}

	public function render($request, Throwable $throwable)
	{
		if ($throwable instanceof ModelNotFoundException) {
			$model = explode("\\", (string) $throwable->getModel())[2];
			return response([
				"type" => "$model not found",
				"message" => "There was no " . strtolower($model) . " with the requested id: " . $throwable->getIds()[0],
			]);
		}

		return response([
			"type" => "Unhandled Exception",
			"message" => $throwable->getMessage(),
			"stack" => $throwable->getTrace(),
		]);
	}
}
