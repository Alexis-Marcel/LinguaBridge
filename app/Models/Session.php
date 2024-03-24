<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Session extends Model
{
    use HasFactory;

    /**
     * @var mixed|string
     */
    protected $fillable = [
        'session_title',
        'description',
        'language1_id',
        'language2_id',
        'cover_photo',
        'level',
        'date',
        'duration',
        'max_attendees',
        'host_id',
        'preparation',
        'materials',
    ];

    public function host() : BelongsTo
    {
        return $this->belongsTo(User::class, 'host_id');
    }

    public function language1() : BelongsTo
    {
        return $this->belongsTo(Language::class, 'language1_id', 'code');
    }

    public function language2() : BelongsTo
    {
        return $this->belongsTo(Language::class, 'language2_id', 'code');
    }
}
