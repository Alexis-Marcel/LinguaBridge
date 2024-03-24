<?php

namespace App\Http\Controllers;

use App\Models\Language;
use App\Models\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class SessionController extends Controller
{
    public function index(Request $request): Response
    {

        $languages = Language::all();

        $query = Session::query();

        $query->with('host:id,name', 'language1:code,name', 'language2:code,name');


        $query->where('host_id', '!=', auth()->id());


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


        /*// Get all column names of the Session table
        $columns = Schema::getColumnListing('sessions');

        foreach ($request->all() as $filter => $value) {
            // Check if the filter exists in the Session table and the value is not empty
            if (in_array($filter, $columns) && !empty($value)) {
                // Faire un cas pour la recherche du titre de la session où on utilise le like pour chercher les sessions qui contiennent le mot clé
                if ($filter === 'session_title') {
                    $query->where($filter, 'like', '%' . $value . '%');
                    continue;
                }
                $query->where($filter, $value);
            }
        }*/



        $sessions = $query->paginate(10);


        return Inertia::render('SearchSession', ['sessions' => $sessions, 'languages' => $languages]);

    }

    public function create(): Response
    {
        $languages = Language::all();
        return Inertia::render('NewHostSession', ['languages' => $languages]);
    }

    /**
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'session_title' => 'required|string|max:100',
            'language1' => 'required|string|max:2',
            'language2' => 'required|string|max:2',
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

        // test if language1 and language2 exist in the database
        $language1 = Language::where('code', $request->language1)->first();
        $language2 = Language::where('code', $request->language2)->first();

        if (!$language1 || !$language2) {
            return redirect()->back()->with('error', 'One or both of the languages do not exist in the database');
        }

        $session = Session::create([
            'session_title' => $request->session_title,
            'language1_id' => $request->language1,
            'language2_id' => $request->language2,
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

    public function mySessions(Request $request): Response
    {

        $languages = Language::all();

        $query = Session::query();

        $query->with('host:id,name', 'language1:code,name', 'language2:code,name');


        $query->where('host_id', auth()->id());


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

    public function show(Session $session): Response
    {
        $session->load('host:id,name', 'language1:code,name', 'language2:code,name');

        $session->cover_photo = Storage::url($session->cover_photo);

        return Inertia::render('SessionDetails', ['session' => $session]);
    }
}
