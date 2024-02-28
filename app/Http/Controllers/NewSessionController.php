<?php

namespace App\Http\Controllers;

use App\Models\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class NewSessionController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('NewHostSession');
    }

    /**
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {

        $request->session()->flash('success', 'Video has been successfully uploaded.');


        $request->validate([
            'session_title' => 'required|string|max:100',
            'language1' => 'required|string|max:50',
            'language2' => 'required|string|max:50',
            'description' => 'nullable|string|max:255',
            'level' => 'required|string|in:Beginner,Intermediate,Advanced',
            'date_time' => 'required|date',
            'duration' => 'required|integer|min:10|max:1440',
            'maximum_participants' => 'required|integer|min:2|max:100',
            'preparation' => 'nullable|string|max:255',
            'cover_photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'materials' => 'nullable|file|mimes:pdf,doc,docx,txt|max:2048',
        ]);

        $cover_photo = Storage::putFile('public', $request->file('cover_photo'));
        $materials = $request->file('materials') ? Storage::putFile('public', $request->file('materials')) : null;

        $user = $request->user();

        $session = Session::create([
            'session_title' => $request->session_title,
            'language1' => $request->language1,
            'language2' => $request->language2,
            'description' => $request->description,
            'cover_photo' => $cover_photo,
            'level' => $request->level,
            'date' => $request->date_time,
            'duration' => $request->duration,
            'max_attendees' => $request->maximum_participants,
            'host_id' => $user->id,
            'preparation' => $request->preparation,
            'materials' => $materials,
        ]);

        return redirect()->route('dashboard');

    }
}
