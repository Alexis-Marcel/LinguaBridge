<?php

namespace Database\Seeders;

use App\Models\Session;
use App\Models\SessionRequest;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SessionRequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SessionRequest::factory(200)->create();

        SessionRequest::factory(15)->create([
            'session_id' => Session::where('host_id', 1)->inRandomOrder()->first()->id,
            'status' => 0,
        ]);

    }
}
