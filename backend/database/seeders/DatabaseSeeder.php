<?php

namespace Database\Seeders;

use App\Models\Form;
use App\Models\User;
use App\Models\Answer;
use App\Models\Question;
use Illuminate\Database\Seeder;
use Faker\Factory as FakerFactory;

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

		$auth_form = Form::create([
			"user_id" => $main_user->id,
			"name" => $faker->sentence(),
			"description" => $faker->sentences(3, true),
			"requires_auth" => true,
			"live" => true,
		]);
		$noauth_form = Form::create([
			"user_id" => $other_user->id,
			"name" => $faker->sentence(),
			"description" => $faker->sentences(3, true),
			"requires_auth" => false,
			"live" => true,
		]);

		foreach ([$auth_form->id, $noauth_form->id] as $form_id) {
			$prev_qn = NULL;
			$question_data = fn ($prev_qn) => [
				"form_id" => $form_id,
				"previous_question_id" => $prev_qn ? $prev_qn->id : NULL,
				"title" => $faker->sentence(),
				"description" => $faker->randomDigit() >= 5 ? $faker->sentences(3, true) : NULL,
				"photo" => $faker->randomDigit() >= 5 ? $faker->sentences(3, true) : NULL
			];

			$prev_qn = Question::create([
				...$question_data($prev_qn),
				"required" => true,
				"type" => "text"
			]);

			$prev_qn = Question::create([
				...$question_data($prev_qn),
				"required" => true,
				"type" => "paragraph"
			]);

			$prev_qn = Question::create([
				...$question_data($prev_qn),
				"required" => false,
				"type" => "color"
			]);

			$prev_qn = Question::create([
				...$question_data($prev_qn),
				"required" => true,
				"type" => "choice",
				"choices" => $faker->words(3),
				"choice_type" => "radio"
			]);

			$prev_qn = Question::create([
				...$question_data($prev_qn),
				"required" => true,
				"type" => "choice",
				"choices" => $faker->words(3),
				"choice_type" => "checkbox"
			]);

			$prev_qn = Question::create([
				...$question_data($prev_qn),
				"required" => true,
				"type" => "choice",
				"choices" => $faker->words(3),
				"choice_type" => "dropdown"
			]);

			$prev_qn = Question::create([
				...$question_data($prev_qn),
				"required" => false,
				"type" => "switch"
			]);

			$prev_qn = Question::create([
				...$question_data($prev_qn),
				"required" => true,
				"type" => "slider",
				"slider_min" => 0,
				"slider_max" => 100,
				"slider_step" => 1
			]);

			$prev_qn = Question::create([
				...$question_data($prev_qn),
				"required" => true,
				"type" => "datetime"
			]);

			$prev_qn = Question::create([
				...$question_data($prev_qn),
				"required" => true,
				"type" => "table",
				"table_columns" => $faker->words(3),
				"table_rows" => $faker->words(3),
				"table_type" => "radio"
			]);

			$prev_qn = Question::create([
				...$question_data($prev_qn),
				"required" => true,
				"type" => "table",
				"table_columns" => $faker->words(3),
				"table_rows" => $faker->words(3),
				"table_type" => "checkbox"
			]);
		}

		foreach (Question::all() as $question) {
			$answer_data = [
				"user_id" => $question->form_id == $auth_form->id ? $other_user->id : $main_user->id,
				"question_id" => $question->id,
			];

			switch ($question->type) {
				case "text":
					$answer_data["text"] = $faker->sentence();
					break;
				case "paragraph":
					$answer_data["paragraph"] = $faker->sentences(3, true);
					break;
				case "color":
					$answer_data["color"] =  $faker->randomDigit() >= 5 ? $faker->hexcolor() : NULL;
					break;
				case "choice":
					$answer_data["choices"] = $faker->randomElements(
						$question->choices,
						$question->choice_type == "checkbox" ? 2 : 1
					);
					break;
				case "switch":
					$answer_data["switch"] = $faker->boolean();
					break;
				case "slider":
					$answer_data["slider"] = $faker->numberBetween(0, 100);
					break;
				case "datetime":
					$answer_data["date"] = $faker->date();
					$answer_data["time"] = $faker->time();
					break;
				case "table":
					$answer_data["table"] = array_map(
						fn ($row) => [$row, $faker->randomElement($question->table_columns)],
						$question->table_rows
					);
					break;
			}

			Answer::create($answer_data);
		}
	}
}
