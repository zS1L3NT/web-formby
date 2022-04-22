<?php

namespace App\Models;

use App\Traits\Uuids;
use Illuminate\Database\Eloquent\Model;

class Response extends Model
{
    use Uuids;

	protected $fillable = [
		"user_id",
		"form_id"
	];
}
