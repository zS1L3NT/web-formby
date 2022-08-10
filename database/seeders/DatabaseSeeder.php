<?php

namespace Database\Seeders;

use App\Models\Form;
use App\Models\User;
use App\Models\Answer;
use App\Models\Question;
use App\Models\Response;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Faker\Factory as FakerFactory;
use Illuminate\Support\Facades\Date;

class DatabaseSeeder extends Seeder
{
	/**
	 * Seed the application's database.
	 *
	 * @return void
	 */
	public function run()
	{
		$faker = FakerFactory::create();

		$main_user = User::create([
			"name" => "Zechariah Tan",
			"photo" => "https://media-exp1.licdn.com/dms/image/C5603AQH44a3q4YZIzQ/profile-displayphoto-shrink_800_800/0/1634632712439?e=1655942400&v=beta&t=9CXewWyIS3g93mFEYOZ1fIcOJqqDB0z8g2qKTzPJ1fY",
			"email" => "zechariahtan144@gmail.com",
			"password" => 'P@ssw0rd'
		]);
		$other_user = User::create([
			"name" => "Joey Lim",
			"photo" => "https://media-exp1.licdn.com/dms/image/C5603AQGfItIgsZeC-g/profile-displayphoto-shrink_800_800/0/1648962418190?e=1655942400&v=beta&t=M_RgY0en6pxsjzKwz1_qfIo8qCPPNI9okYJlZPhVLRI",
			"email" => "jyorien@gmail.com",
			"password" => 'P@ssw0rd'
		]);

		$main_form = Form::create([
			"user_id" => $main_user->id,
			"name" => $faker->sentence(),
			"description" => $faker->sentences(3, true),
			"auth" => true,
			"state" => "live",
		]);
		$other_form = Form::create([
			"user_id" => $other_user->id,
			"name" => $faker->sentence(),
			"description" => $faker->sentences(3, true),
			"auth" => false,
			"state" => "live",
		]);

		$main_response = Response::create([
			"form_id" => $main_form->id,
			"user_id" => $main_user->id,
		]);
		$anonymous_respose = Response::create([
			"form_id" => $main_form->id,
			"user_id" => null,
		]);

		foreach ([$main_form->id, $other_form->id] as $form_id) {
			$prev_qn = NULL;
			$question_data = fn ($prev_qn) => [
				"form_id" => $form_id,
				"previous_question_id" => $prev_qn ? $prev_qn->id : NULL,
				"title" => $faker->sentence(),
				"description" => $faker->randomDigit() >= 5 ? $faker->sentences(3, true) : NULL,
				"photo" => $faker->randomDigit() >= 5 ? $faker->imageUrl() : NULL
			];

			$prev_qn = Question::create([
				...$question_data($prev_qn),
				"required" => true,
				"type" => "text"
			]);
			Answer::create([
				"response_id" => $main_response->id,
				"question_id" => $prev_qn->id,
				"text" => "Text"
			]);
			Answer::create([
				"response_id" => $anonymous_respose->id,
				"question_id" => $prev_qn->id,
				"text" => $faker->sentence()
			]);

			$prev_qn = Question::create([
				...$question_data($prev_qn),
				"required" => true,
				"type" => "paragraph"
			]);
			Answer::create([
				"response_id" => $main_response->id,
				"question_id" => $prev_qn->id,
				"paragraph" => "Paragraph"
			]);
			Answer::create([
				"response_id" => $anonymous_respose->id,
				"question_id" => $prev_qn->id,
				"paragraph" => $faker->sentences(3, true)
			]);

			$prev_qn = Question::create([
				...$question_data($prev_qn),
				"required" => false,
				"type" => "color"
			]);
			Answer::create([
				"response_id" => $main_response->id,
				"question_id" => $prev_qn->id,
				"color" => "#000000"
			]);
			Answer::create([
				"response_id" => $anonymous_respose->id,
				"question_id" => $prev_qn->id,
				"color" => "#FFFFFF"
			]);

			$prev_qn = Question::create([
				...$question_data($prev_qn),
				"required" => true,
				"type" => "choice",
				"choices" => $faker->words(3),
				"choice_type" => "radio"
			]);
			Answer::create([
				"response_id" => $main_response->id,
				"question_id" => $prev_qn->id,
				"choices" => [$prev_qn->choices[0]]
			]);
			Answer::create([
				"response_id" => $anonymous_respose->id,
				"question_id" => $prev_qn->id,
				"choices" => [$prev_qn->choices[2]]
			]);

			$prev_qn = Question::create([
				...$question_data($prev_qn),
				"required" => true,
				"type" => "choice",
				"choices" => $faker->words(3),
				"choice_type" => "checkbox"
			]);
			Answer::create([
				"response_id" => $main_response->id,
				"question_id" => $prev_qn->id,
				"choices" => [$prev_qn->choices[0]]
			]);
			Answer::create([
				"response_id" => $anonymous_respose->id,
				"question_id" => $prev_qn->id,
				"choices" => $prev_qn->choices
			]);

			$prev_qn = Question::create([
				...$question_data($prev_qn),
				"required" => true,
				"type" => "choice",
				"choices" => $faker->words(3),
				"choice_type" => "dropdown"
			]);
			Answer::create([
				"response_id" => $main_response->id,
				"question_id" => $prev_qn->id,
				"choices" => [$prev_qn->choices[0]]
			]);
			Answer::create([
				"response_id" => $anonymous_respose->id,
				"question_id" => $prev_qn->id,
				"choices" => [$prev_qn->choices[2]]
			]);

			$prev_qn = Question::create([
				...$question_data($prev_qn),
				"required" => false,
				"type" => "switch"
			]);
			Answer::create([
				"response_id" => $main_response->id,
				"question_id" => $prev_qn->id,
				"switch" => true
			]);
			Answer::create([
				"response_id" => $anonymous_respose->id,
				"question_id" => $prev_qn->id,
				"switch" => true
			]);

			$prev_qn = Question::create([
				...$question_data($prev_qn),
				"required" => true,
				"type" => "slider",
				"slider_min" => 0,
				"slider_max" => 100,
				"slider_step" => 10
			]);
			Answer::create([
				"response_id" => $main_response->id,
				"question_id" => $prev_qn->id,
				"slider" => 10
			]);
			Answer::create([
				"response_id" => $anonymous_respose->id,
				"question_id" => $prev_qn->id,
				"slider" => 100
			]);

			$prev_qn = Question::create([
				...$question_data($prev_qn),
				"required" => true,
				"type" => "datetime"
			]);
			Answer::create([
				"response_id" => $main_response->id,
				"question_id" => $prev_qn->id,
				"datetime" => Carbon::parse(Date::now())
			]);
			Answer::create([
				"response_id" => $anonymous_respose->id,
				"question_id" => $prev_qn->id,
				"datetime" => Carbon::parse(Date::now())
			]);

			$prev_qn = Question::create([
				...$question_data($prev_qn),
				"required" => true,
				"type" => "table",
				"table_columns" => $faker->words(3),
				"table_rows" => $faker->words(3),
				"table_type" => "radio"
			]);
			Answer::create([
				"response_id" => $main_response->id,
				"question_id" => $prev_qn->id,
				"table" => [
					[$prev_qn->table_columns[0], $prev_qn->table_rows[0]],
					[$prev_qn->table_columns[1], $prev_qn->table_rows[1]],
					[$prev_qn->table_columns[2], $prev_qn->table_rows[2]]
				]
			]);
			Answer::create([
				"response_id" => $anonymous_respose->id,
				"question_id" => $prev_qn->id,
				"table" => [
					[$prev_qn->table_columns[2], $prev_qn->table_rows[0]],
					[$prev_qn->table_columns[1], $prev_qn->table_rows[1]],
					[$prev_qn->table_columns[0], $prev_qn->table_rows[2]]
				]
			]);

			$prev_qn = Question::create([
				...$question_data($prev_qn),
				"required" => true,
				"type" => "table",
				"table_columns" => $faker->words(3),
				"table_rows" => $faker->words(3),
				"table_type" => "checkbox"
			]);
			Answer::create([
				"response_id" => $main_response->id,
				"question_id" => $prev_qn->id,
				"table" => [
					[$prev_qn->table_columns[0], $prev_qn->table_rows[0]],
					[$prev_qn->table_columns[1], $prev_qn->table_rows[1]],
					[$prev_qn->table_columns[2], $prev_qn->table_rows[2]]
				]
			]);
			Answer::create([
				"response_id" => $anonymous_respose->id,
				"question_id" => $prev_qn->id,
				"table" => [
					[$prev_qn->table_columns[2], $prev_qn->table_rows[0]],
					[$prev_qn->table_columns[1], $prev_qn->table_rows[1]],
					[$prev_qn->table_columns[0], $prev_qn->table_rows[2]]
				]
			]);
		}
	}
}
