<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('questions', function (Blueprint $table) {
			$table->uuid('id')->primary();
			$table->uuid('form_id');
			$table->uuid('previous_question_id')->nullable();
			$table->string('title');
			$table->string('description')->nullable();
			$table->string('photo')->nullable();
			$table->boolean('required')->default(false);
			$table->enum('type', ["text", "paragraph", "color", "choice", "switch", "slider", "rating", "datetime", "table"]);

			$table->json('choices')->nullable();
			$table->enum('choice_type', ['radio', 'checkbox', 'dropdown'])->nullable();
			$table->integer('slider_min')->nullable();
			$table->integer('slider_max')->nullable();
			$table->integer('slider_step')->nullable();
			$table->integer('rating_stars')->nullable();
			$table->json('table_columns')->nullable();
			$table->json('table_rows')->nullable();
			$table->enum('table_type', ['radio', 'checkbox'])->nullable();

			$table->foreign('form_id')->references('id')->on('forms');

			$table->timestamps();
		});

		// Create foreign key reference after table is created, since reference is to itself
		Schema::table('questions', function (Blueprint $table) {
			$table->foreign('previous_question_id')->references('id')->on('questions');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('questions');
	}
};
