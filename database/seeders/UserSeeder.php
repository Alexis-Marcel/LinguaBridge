<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {


        User::factory()->create([
            'name' => 'John Doe',
            'email' => 'test@test.com',
            'password' => 'pass',
        ]);

        User::factory()->create([
            'name' => 'Jane Doe',
            'email' => 'jane@test.com',
            'password' => 'pass',
        ]);

        User::factory(10)->create();

    }
}
