<?php

namespace App\Models;

use App\Traits\Uuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Form extends Model
{
	use HasFactory, Uuids;

	protected $fillable = [
		"user_id",
		"name",
		"description",
		"requires_auth",
		"live"
	];
}
