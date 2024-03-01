<?php

namespace Database\Seeders;

use App\Models\Session;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SessionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Session::factory(10)->create();

        Session::factory()->create([
            'session_title' => 'Test Session',
            'description' => 'This is a test session',
            'language1' => 'english',
            'language2' => 'spanish',
            'level' => 'Beginner',
            'date' => '2021-12-12',
            'max_attendees' => 10,
            'host_id' => 1,
            'preparation' => 'This is a test preparation',
            'materials' => 'This is a test material',
        ]);
    }
}
