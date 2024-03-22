<?php

namespace App\Http\Controllers;

use App\Models\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Inertia\Response;

class ProposedSessionController extends Controller
{
    public function filter(Request $request): Response
    {
        $query = Session::query();

        $query->where('host_id', auth()->id());

        // If the request is empty, return sessions where the host id is the current user's id
        if ($request->all() === []) {
            return Inertia::render('ProposedSession', ['sessions' => $query->get()]);
        }

        // Get all column names of the Session table
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
        }

        $results = $query->get();

        return Inertia::render('ProposedSession', ['sessions' => $results]);
    }
}
