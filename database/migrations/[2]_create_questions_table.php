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
			$table->longText('photo')->nullable();
			$table->boolean('required')->default(false);
			$table->enum('type', ["text", "paragraph", "color", "choice", "switch", "slider", "datetime", "table"]);

			$table->json('choices')->default('["Choice 1"]');
			$table->enum('choice_type', ['radio', 'checkbox', 'dropdown'])->default('radio');
			$table->integer('slider_min')->default(0);
			$table->integer('slider_max')->default(100);
			$table->integer('slider_step')->default(10);
			$table->json('table_columns')->default('["Column 1"]');
			$table->json('table_rows')->default('["Row 1"]');
			$table->enum('table_type', ['radio', 'checkbox'])->default('radio');

			$table->foreign('form_id')->references('id')->on('forms')->cascadeOnDelete();

			$table->timestamps();
		});

		// Create foreign key reference after table is created, since reference is to itself
		Schema::table('questions', function (Blueprint $table) {
			$table->foreign('previous_question_id')->references('id')->on('questions')->cascadeOnDelete();
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
