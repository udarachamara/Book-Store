<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('books')->insert([
            'name' => 'book1',
            'description' => 'sample',
            'price' => 450.00,
            'count' => 5,
            'author' => 2,
            'status' => 1,
            'isDeleted'=> 0,
            'createdBy' => "SYSTEM",
            'modifiedBy'=> "SYSTEM",
            'created_at' => Date('Y-m-d h:i:s'),
            'updated_at' => Date('Y-m-d h:i:s'),
        ]);
    }
}
