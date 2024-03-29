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
		Schema::create('answers', function (Blueprint $table) {
			$table->uuid('id')->primary();
			$table->uuid('response_id');
			$table->uuid('question_id');

			$table->string('text')->nullable();
			$table->string('paragraph')->nullable();
			$table->string('color', 7)->nullable();
			$table->json('choices')->nullable();
			$table->boolean('switch')->nullable();
			$table->integer('slider')->nullable();
			$table->timestamp('datetime')->nullable();
			$table->json('table')->nullable();

			$table->foreign('response_id')->references('id')->on('responses')->cascadeOnDelete();
			$table->foreign('question_id')->references('id')->on('questions')->cascadeOnDelete();

			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('answers');
	}
};
