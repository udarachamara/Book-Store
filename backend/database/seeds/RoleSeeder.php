<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            'role' => 'Admin',
            'menu' => '[{"label":"View Authors", "route":"view-author"},{"label":"View Book", "route":"view-book"}]',
            'status' => 1,
            'isDeleted'=> 0,
            'createdBy' => "SYSTEM",
            'modifiedBy'=> "SYSTEM",
            'created_at' => Date('Y-m-d h:i:s'),
            'updated_at' => Date('Y-m-d h:i:s'),
        ]);

        DB::table('roles')->insert([
            'role' => 'Author',
            'menu' => '[{"label":"My Books", "route":"my-book"},{"label":"Add New Book", "route":"add-new-book"}]',
            'status' => 1,
            'isDeleted'=> 0,
            'createdBy' => "SYSTEM",
            'modifiedBy'=> "SYSTEM",
            'created_at' => Date('Y-m-d h:i:s'),
            'updated_at' => Date('Y-m-d h:i:s'),
        ]);
    }
}
