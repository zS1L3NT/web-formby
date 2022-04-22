<?php

namespace App\Models;

use App\Traits\Uuids;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
	use Uuids;

	protected $fillable = [
		"user_id",
		"form_id",
		"question_id",
		"text",
		"paragraph",
		"color",
		"choices",
		"switch",
		"slider",
		"rating",
		"date",
		"time",
		"table"
	];
}
