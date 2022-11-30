<?php

namespace App\Models;

use App\Traits\Uuids;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
	use Uuids;

	protected $fillable = [
		"response_id",
		"question_id",
		"text",
		"paragraph",
		"color",
		"choices",
		"switch",
		"slider",
		"datetime",
		"table"
	];

	protected $casts = [
		"switch" => "boolean",
		"slider" => "integer"
	];

	public function getChoicesAttribute($choices)
	{
		return json_decode($choices);
	}

	public function setChoicesAttribute(array|NULL $choices)
	{
		$this->attributes['choices'] = $choices === NULL ? NULL : json_encode($choices);
	}

	public function getDatetimeAttribute($datetime)
	{
		return Carbon::parse($datetime)->toIso8601String();
	}

	public function setDatetimeAttribute(string|NULL $datetime)
	{
		$this->attributes['datetime'] = $datetime === NULL ? NULL : Carbon::parse($datetime);
	}

	public function getTableAttribute($table)
	{
		return json_decode($table);
	}

	public function setTableAttribute(array|NULL $table)
	{
		$this->attributes['table'] = $table === NULL ? NULL : json_encode($table);
	}
}
