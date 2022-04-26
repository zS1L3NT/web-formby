<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FormController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AnswerController;
use App\Http\Controllers\FormAnswerController;
use App\Http\Controllers\FormQuestionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::controller(UserController::class)->group(function () {
	Route::post("login", "login");
	Route::post("register", "register");
	Route::post("logout", "logout");
	Route::get("user", "show");
	Route::put("user", "update");
});

Route::apiResource("forms", FormController::class);

Route::apiResource("forms.questions", FormQuestionController::class);

Route::apiResource("forms.answers", FormAnswerController::class)->only(["index"]);

Route::apiResource("answers", AnswerController::class)->only(["store"]);

Route::fallback(fn () => response([
	"type" => "Page Not Found",
	"message" => "The route you requested could not be found"
]));
