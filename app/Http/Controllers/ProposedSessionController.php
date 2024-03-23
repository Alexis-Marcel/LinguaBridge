<?php

namespace App\Http\Controllers;

use App\Models\Language;
use App\Models\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Inertia\Response;

class ProposedSessionController extends Controller
{
    public function filter(Request $request): Response
    {

        $languages = Language::all();

        $query = Session::query();

        $query->with('host:id,name', 'language1:code,name', 'language2:code,name');

        $query->where('host_id', '=', auth()->id());

        $query->when($request->input('session_title'), function ($query, $searchTerm) {
            $query->where('session_title', 'like', "%{$searchTerm}%");
        });

        $query->when($request->input('language1'), function ($query, $language) {
            $query->where('language1_id', $language);
        });

        $query->when($request->input('language2'), function ($query, $language) {
            $query->where('language2_id', $language);
        });

        $query->when($request->input('level'), function ($query, $level) {
            $query->whereIn('level', $level);
        });


        $sessions = $query->paginate(10);

        return Inertia::render('ProposedSession', ['sessions' => $sessions, 'languages' => $languages]);

    }
}
