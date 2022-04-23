<?php

namespace App\Models;

use App\Traits\Uuids;
use Illuminate\Database\Eloquent\Model;

class Form extends Model
{
	use Uuids;

	protected $fillable = [
		"user_id",
		"name",
		"description",
		"requires_auth",
		"live"
	];

	protected $casts = [
		"requires_auth" => "boolean",
		"live" => "boolean"
	];
}
