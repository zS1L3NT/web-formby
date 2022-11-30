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
        Schema::create('responses', function (Blueprint $table) {
			$table->uuid('id')->primary();
			$table->uuid('user_id')->nullable();
			$table->uuid('form_id');

			$table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
			$table->foreign('form_id')->references('id')->on('forms')->cascadeOnDelete();

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
        Schema::dropIfExists('responses');
    }
};
