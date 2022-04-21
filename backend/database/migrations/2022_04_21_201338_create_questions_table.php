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
			$table->uuid('next_question_id')->nullable();
			$table->string('title');
			$table->string('description')->nullable();
			$table->string('photo')->nullable();
			$table->boolean('required')->default(false);
			$table->enum('type', ["text", "options", "checkboxes", "dropdown", "slider", "date", "time", "datetime"]);

			$table->foreign('form_id')->references('id')->on('forms');

			$table->timestamps();
		});

		// Create foreign key reference after table is created, since reference is to itself
		Schema::table('questions', function (Blueprint $table) {
			$table->foreign('next_question_id')->references('id')->on('questions');
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
