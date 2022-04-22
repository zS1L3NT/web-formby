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
		"rating_stars",
		"table_columns",
		"table_rows",
		"table_type"
	];

	public function getChoicesAttribute($choices)
	{
		return json_decode($choices);
	}

	public function setChoicesAttribute(array $choices)
	{
		$this->attributes['choices'] = json_encode($choices);
	}

	public function getTableColumnsAttribute($table)
	{
		return json_decode($table);
	}

	public function setTableColumnsAttribute(array $table)
	{
		$this->attributes['table_columns'] = json_encode($table);
	}

	public function getTableRowsAttribute($table)
	{
		return json_decode($table);
	}

	public function setTableRowsAttribute(array $table)
	{
		$this->attributes['table_rows'] = json_encode($table);
	}
}
