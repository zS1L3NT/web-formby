<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition()
	{
		return [
			'name' => $this->faker->name(),
			'photo' => $this->faker->imageUrl(),
			'email' => $this->faker->unique()->safeEmail(),
			'password' => '$2y$10$l8NKnLh7AHrVpYWKksP.7OCuKK9q2143zy.0IY1/Sgs8tvdpvHSju', // P@ssw0rd
			'email_verified_at' => now(),
			'remember_token' => Str::random(10),
		];
	}

	/**
	 * Indicate that the model's email address should be unverified.
	 *
	 * @return static
	 */
	public function unverified()
	{
		return $this->state(function (array $attributes) {
			return [
				'email_verified_at' => null,
			];
		});
	}
}
