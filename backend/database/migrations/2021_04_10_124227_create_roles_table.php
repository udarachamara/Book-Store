<?php

/*
    @author
    I M Udara chamara herath
    Software Engineer
    udara@9465@gmail.com
*/

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('role', 10);
            $table->string('menu');
            $table->integer('status');
            $table->integer('isDeleted');
            $table->string('createdBy', 50);
            $table->string('modifiedBy', 50);
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
        Schema::dropIfExists('roles');
    }
}
