<?php

namespace Database\Seeders;

use App\Models\Form;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
	/**
	 * Seed the application's database.
	 *
	 * @return void
	 */
	public function run()
	{
		User::create([
			"name" => "Zechariah Tan",
			"photo" => "https://i.scdn.co/image/ab6761610000e5eb006ff3c0136a71bfb9928d34",
			"email" => "zechariahtan144@gmail.com",
			"password" => '$2y$10$l8NKnLh7AHrVpYWKksP.7OCuKK9q2143zy.0IY1/Sgs8tvdpvHSju' // P@ssw0rd
		]);
		User::factory(3)->create();
		Form::factory(3)->create();
	}
}
