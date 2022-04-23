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
		"time"
	];

	protected $casts = [
		"switch" => "boolean",
		"slider" => "integer",
		"rating" => "integer"
	];

	public function getChoicesAttribute($choices)
	{
		return json_decode($choices);
	}

	public function setChoicesAttribute(array $choices)
	{
		$this->attributes['choices'] = json_encode($choices);
	}

	public function getTableAttribute($table)
	{
		return json_decode($table);
	}

	public function setTableAttribute(array $table)
	{
		$this->attributes['table'] = json_encode($table);
	}
}
