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
use Illuminate\Support\Facades\Schema;

class SearchSessionController extends Controller
{
    public function filter(Request $request): Response
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
}
