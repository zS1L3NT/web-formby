<?php

namespace App\Models;

use App\Traits\Uuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Answer extends Model
{
	use HasFactory, Uuids;

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
