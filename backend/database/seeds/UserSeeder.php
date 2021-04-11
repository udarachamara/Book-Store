<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin123'),
            'role'=> 1,
            'status' => 1,
            'isDeleted'=> 0,
            'createdBy' => "SYSTEM",
            'modifiedBy'=> "SYSTEM",
            'created_at' => Date('Y-m-d h:i:s'),
            'updated_at' => Date('Y-m-d h:i:s'),
        ]);

        DB::table('users')->insert([
            'name' => 'author1',
            'email' => 'author1@gmail.com',
            'password' => Hash::make('author1'),
            'role'=> 2,
            'status' => 1,
            'isDeleted'=> 0,
            'createdBy' => "SYSTEM",
            'modifiedBy'=> "SYSTEM",
            'created_at' => Date('Y-m-d h:i:s'),
            'updated_at' => Date('Y-m-d h:i:s'),
        ]);
    }
}
