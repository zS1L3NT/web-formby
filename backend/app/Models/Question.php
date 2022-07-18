<?php

namespace App\Models;

use App\Traits\Uuids;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
	use Uuids;

	protected $fillable = [
		"form_id",
		"previous_question_id",
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
		"table_columns",
		"table_rows",
		"table_type"
	];

	protected $casts = [
		"required" => "boolean",
		"slider_min" => "integer",
		"slider_max" => "integer",
		"slider_step" => "integer"
	];

	public function getChoicesAttribute($choices)
	{
		return json_decode($choices);
	}

	public function setChoicesAttribute(array|NULL $choices)
	{
		$this->attributes['choices'] = $choices == NULL ? NULL : json_encode($choices);
	}

	public function getTableColumnsAttribute($table)
	{
		return json_decode($table);
	}

	public function setTableColumnsAttribute(array|NULL $table)
	{
		$this->attributes['table_columns'] = $table == NULL ? NULL : json_encode($table);
	}

	public function getTableRowsAttribute($table)
	{
		return json_decode($table);
	}

	public function setTableRowsAttribute(array|NULL $table)
	{
		$this->attributes['table_rows'] = $table == NULL ? NULL : json_encode($table);
	}
}
