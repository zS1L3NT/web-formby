<?php

namespace App\Http\Controllers;

use App\Models\Form;
use Illuminate\Http\Request;

class FormsController extends Controller
{
    public function show(Request $request, string $form_id) {
		return Form::query()->find($form_id);
	}
}
