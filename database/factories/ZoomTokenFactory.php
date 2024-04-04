<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ZoomToken>
 */
class ZoomTokenFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'access_token' => $this->faker->sha256,
            'refresh_token' => $this->faker->sha256,
            'expires_at' => $this->faker->dateTimeBetween('now', '+1 year'),
        ];
    }
}
