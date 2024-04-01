<?php

namespace App\Http\Controllers;

use App\Models\Language;
use App\Models\Material;
use App\Models\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class SessionController extends Controller
{
    public function index(Request $request): Response
    {

        $languages = Language::all();

        $query = Session::query();

        $query->with('host:id,name', 'language1:code,name', 'language2:code,name');


        $query->where('host_id', '!=', auth()->id());

        $query->whereDoesntHave('myRequest');

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

        foreach ($sessions as $session) {
            if(Storage::exists($session->cover_photo)) {
                $session->cover_photo = Storage::url($session->cover_photo);
            }
        }

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
        DB::beginTransaction();

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

        $cover_photo = Storage::putFile('public/sessions/covers', $request->file('cover_photo'));

        $materials = $request->file('materials');
        if ($materials) {
            $material_id = Material::create([
                'name' => $materials->getClientOriginalName(),
                'size' => $materials->getSize(),
                'path' => Storage::putFile('public/sessions/materials', $materials),
            ])->id;
        }

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
            'material_id' => $material_id ?? null,
        ]);

        DB::commit();

        return redirect()->route('sessions.show', $session)->with('notification',
            ['message' => 'Session created successfully', 'type' => 'success']
        );

    }


    public function update(Request $request, Session $session): RedirectResponse
    {
        DB::beginTransaction();


        $request->validate([
            'session_title' => 'required|string|max:10',
            'language1' => 'required|string|max:2',
            'language2' => 'required|string|max:2',
            'description' => 'nullable|string|max:255',
            'level' => 'required|string|in:Beginner,Intermediate,Advanced',
            'date_time' => 'required|date',
            'duration' => 'required|integer|min:10|max:1440',
            'maximum_participants' => 'required|integer|min:2|max:100',
            'preparation' => 'nullable|string|max:255',
            'cover_photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'materials' => 'nullable|file|mimes:pdf,doc,docx,txt|max:2048',
        ]);

        $cover_photo = $session->cover_photo;

        if ($request->hasFile('cover_photo')) {
            Storage::delete($session->cover_photo);
            $cover_photo = Storage::putFile('public/sessions/covers', $request->file('cover_photo'));
        }

        $material_id = $session->material_id;

        if ($request->hasFile('materials')) {
            if ($session->material) {
                Storage::delete($session->material->path);
                $session->material->delete();
            }

            $materials = $request->file('materials');
            $material_id = Material::create([
                'name' => $materials->getClientOriginalName(),
                'size' => $materials->getSize(),
                'path' => Storage::putFile('public/sessions/materials', $materials),
            ])->id;
        }

        $user = $request->user();

        // test if language1 and language2 exist in the database
        $language1 = Language::where('code', $request->language1)->first();
        $language2 = Language::where('code', $request->language2)->first();

        if (!$language1 || !$language2) {
            return redirect()->back()->with('error', 'One or both of the languages do not exist in the database');
        }

        $session->update([
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
            'material_id' => $material_id,
        ]);

        DB::commit();

        return redirect()->route('sessions.show', $session)->with('notification',
            ['message' => 'Session updated successfully', 'type' => 'success']
        );
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

        foreach ($sessions as $session) {
            if(Storage::exists($session->cover_photo)) {
                $session->cover_photo = Storage::url($session->cover_photo);
            }
        }


        return Inertia::render('ProposedSession', ['sessions' => $sessions, 'languages' => $languages]);

    }

    public function sessionRequests(Request $request): Response
    {

        $languages = Language::all();

        $query = Session::query();

        $query->where('host_id', auth()->id());

        $query->with(['requests' => function ($query) {
            $query->where('status', 0)->with('user:id,name,profile_photo');
        }]);

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

        foreach ($sessions as $session) {
            if(Storage::exists($session->cover_photo)) {
                $session->cover_photo = Storage::url($session->cover_photo);
            }
        }


        return Inertia::render('SessionRequests', [
            'sessions' => $sessions,
            'languages' => $languages,
        ]);
    }

    public function myRequests(Request $request): Response
    {

        $languages = Language::all();

        $query = Session::query();

        $query->whereHas('myRequest');

        $query->with('myRequest');

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

        foreach ($sessions as $session) {
            if(Storage::exists($session->cover_photo)) {
                $session->cover_photo = Storage::url($session->cover_photo);
            }
        }

        return Inertia::render('MyRequests', [
            'sessions' => $sessions,
            'languages' => $languages,
        ]);
    }

    public function show(Session $session): Response
    {

        $session->load('host:id,name', 'language1:code,name', 'language2:code,name', 'material:id,name,size,path', 'myRequest');

        if(Storage::exists($session->cover_photo)) {
            $session->cover_photo = Storage::url($session->cover_photo);
        }

        if($session->material && Storage::exists($session->material->path)) {
            $session->material->path = Storage::url($session->material->path);
        }

        $session->participants = $session->requests()->where('status', 1)->count();

        return Inertia::render('SessionDetails', ['session' => $session]);
    }

    public function destroy(Session $session): RedirectResponse
    {
        $session->delete();

        return redirect()->route('sessions.my-sessions')->with(
            'notification', [
                'message' => 'Session deleted successfully',
                'type' => 'success',
            ],
        );
    }

    public function downloadMaterial(Session $session, Material $material): RedirectResponse | BinaryFileResponse
    {
        if ($session->material_id !== $material->id) {
            return redirect()->back()->with('error', 'The material does not belong to the session');
        }

        if (!Storage::exists($material->path)) {
            return redirect()->back()->with('error', 'The material does not exist in the storage');
        }

        return response()->download(Storage::path($material->path), $material->name);
    }
}
