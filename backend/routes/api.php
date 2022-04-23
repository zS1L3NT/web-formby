<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FormsController;
use App\Http\Controllers\UsersController;

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

Route::controller(UsersController::class)->group(function () {
	Route::post("/login", "login");
	Route::post("/register", "register");
	Route::post("/logout", "logout");
	Route::get("/user", "show");
	Route::put("/user", "update");
});

Route::apiResource("/form", FormsController::class)->except(["index"]);
