<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use HasFactory;

    protected $fillable = [
        'session_title',
        'description',
        'language1',
        'language2',
        'cover_photo',
        'level',
        'date',
        'duration',
        'max_attendees',
        'host_id',
        'preparation',
        'materials',
    ];

    public function host()
    {
        return $this->belongsTo(User::class, 'host_id');
    }
}
