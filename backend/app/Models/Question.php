<?php

namespace App\Models;

use App\Traits\Uuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Question extends Model
{
	use HasFactory, Uuids;

	protected $fillable = [
		"form_id",
		"next_question_id",
		"title",
		"description",
		"photo",
		"required",
		"type",
		"choices",
		"choice_type",
		"slider_min",
		"slider_max",
		"slider_step",
		"rating_stars",
		"table_columns",
		"table_rows",
		"table_type"
	];
}
