<?php

namespace Database\Factories;

use App\Models\Question;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Question>
 */
class QuestionFactory extends Factory
{
	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition()
	{
		return [
			"next_question_id" => Question::query()->first()->id,
			"title" => $this->faker->words(3, true),
			"description" => $this->faker->sentences(3),
			"photo" => $this->faker->imageUrl(),
			"required" => $this->faker->boolean(),
			"type" => "text"
		];
	}
}
