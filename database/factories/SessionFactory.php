<?php

namespace Database\Factories;

use App\Models\Language;
use App\Models\Material;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Session>
 */
class SessionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'session_title' => $this->faker->sentence(),
            'meeting_id' => null,
            'meeting_password' => $this->faker->password(),
            'language1_id' => Language::inRandomOrder()->first()->code,
            'language2_id' => Language::inRandomOrder()->first()->code,
            'description' => $this->faker->paragraph(),
            'cover_photo' => $this->faker->imageUrl(),
            'level' => $this->faker->randomElement(['Beginner', 'Intermediate', 'Advanced']),
            'date' => $this->faker->dateTimeBetween('now', '+1 year'),
            'duration' => $this->faker->numberBetween(10, 1440),
            'max_attendees' => $this->faker->numberBetween(5, 20),
            'host_id' => User::inRandomOrder()->first()->id,
            'preparation' => $this->faker->paragraph(),
            'material_id' => Material::inRandomOrder()->first()->id,
            'status' => 0,
        ];
    }
}
