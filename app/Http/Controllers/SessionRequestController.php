<?php

namespace App\Http\Controllers;

use App\Models\Session;
use App\Models\SessionRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SessionRequestController extends Controller
{

    public function index(Session $session)
    {
        if ($session->host_id !== auth()->id()) {
            abort(403);
        }

        $requestsAccepted = $session->requests()->where('status', 1)->with('user:id,name,profile_photo')->get();
        $requestsPending = $session->requests()->where('status', 0)->with('user:id,name,profile_photo')->get();
        $requestsRejected = $session->requests()->where('status', 2)->with('user:id,name,profile_photo')->get();

        return Inertia::render('RequestDetails', [
            'session' => $session,
            'requestsAccepted' => $requestsAccepted,
            'requestsPending' => $requestsPending,
            'requestsRejected' => $requestsRejected,
        ]);
    }


    public function store(Request $request, Session $session)
    {

        if($session->myRequest){
            return back()->with('notification', [
                'type' => 'error',
                'message' => 'Request already sent',
            ]);
        }

        $session->requests()->create([
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('sessions.my-requests')->with('notification', [
            'type' => 'success',
            'message' => 'Request sent',
        ]);
    }

    public function status(Request $request, Session $session, $sessionRequest)
    {

        if ($session->host_id !== auth()->id()) {
            abort(403);
        }

        $request->validate([
            'status' => 'required|in:1,2',
        ]);

        $sessionRequest = SessionRequest::findOrFail($sessionRequest);

        if($sessionRequest->session_id !== $session->id){
            abort(403);
        }

        if ($session->requests()->where('status', 1)->count() >= $session->max_attendees-1 && $request->status == 1) {

            return back()->with('notification', [
                'type' => 'error',
                'message' => 'Session is full',
            ]);
        }

        $sessionRequest->update([
            'status' => $request->status,
        ]);


        return back()->with('notification', [
            'type' => 'success',
            'message' => $request->status == 1 ? 'Request accepted' : 'Request rejected',
        ]);
    }

    public function destroy(Session $session, $sessionRequest)
    {
        $sessionRequest = SessionRequest::findOrFail($sessionRequest);

        if ($sessionRequest->session_id !== $session->id) {
            abort(403);
        }

        if ($sessionRequest->user_id !== auth()->id()) {
            abort(403);
        }

        $sessionRequest->delete();

        return back()->with('notification', [
            'type' => 'success',
            'message' => 'Request deleted',
        ]);
    }
}
