<?php

namespace App\Http\Controllers;

use App\Models\Session;
use Illuminate\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use App\Models\User;
use App\Models\ZoomToken;

use Firebase\JWT\JWT;

class ZoomAuthController extends Controller
{
    public function redirectToZoom(): Application|Redirector|RedirectResponse|\Illuminate\Contracts\Foundation\Application
    {
        // Appeler le middleware CORS
        $this->middleware('cors');

        $query = http_build_query([
            'response_type' => 'code',
            'client_id' => env('ZOOM_CLIENT_ID'),
            'redirect_uri' => env('ZOOM_REDIRECT_URI'),
        ]);

        //affiche à l'écran l'url de redirection
        print_r('https://zoom.us/oauth/authorize?' . $query);

        return redirect('https://zoom.us/oauth/authorize?' . $query);
    }

    public function handleCallback(Request $request): RedirectResponse
    {
        // Récupérer le code d'autorisation depuis la requête
        $code = $request->input('code');

        // Configurer les données de la requête
        $data = [
            'code' => $code,
            'redirect_uri' => env('ZOOM_REDIRECT_URI'),
            'grant_type' => 'authorization_code',
        ];

        $response = Http::withBasicAuth(env('ZOOM_CLIENT_ID'), env('ZOOM_CLIENT_SECRET'))
            ->asForm()
            ->post('https://zoom.us/oauth/token', $data);

        $accessToken = $response->json()['access_token'];
        $refreshToken = $response->json()['refresh_token'];
        $time = $response->json()['expires_in'];

        // On récupère l'utilisateur connecté
        $user = User::find(auth()->id());

        // On vérifie si l'utilisateur a déjà un token Zoom
        $zoomToken = ZoomToken::where('user_id', $user->id)->first();

        // Si l'utilisateur a déjà un token Zoom, on le met à jour
        if ($zoomToken) {
            $zoomToken->update([
                'access_token' => $accessToken,
                'refresh_token' => $refreshToken,
                'expires_in' => $time,
                'updated_at' => now(),
            ]);
        } else {
            // Sinon, on crée un nouveau token Zoom
            ZoomToken::create([
                'user_id' => $user->id,
                'access_token' => $accessToken,
                'refresh_token' => $refreshToken,
                'expires_in' => $time,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // On redirige l'utilisateur vers le dashboard
        return redirect()->route('dashboard')->with('notification', ['message' => 'Connected with Zoom !', 'type' => 'success']);
    }

    public function disconnectZoom(): RedirectResponse
    {
        // On récupère l'utilisateur connecté
        $user = User::find(auth()->id());

        // On supprime le token Zoom de l'utilisateur
        ZoomToken::where('user_id', $user->id)->delete();

        // On redirige l'utilisateur vers le dashboard
        return redirect()->route('dashboard')->with('notification', ['message' => 'Disconnected from Zoom !', 'type' => 'success']);
    }

    public function refreshToken(): RedirectResponse
    {
        // On récupère l'utilisateur connecté
        $user = User::find(auth()->id());

        // On récupère le token Zoom de l'utilisateur
        $zoomToken = ZoomToken::where('user_id', $user->id)->first();

        // Configurer les données de la requête
        $data = [
            'refresh_token' => $zoomToken->refresh_token,
            'grant_type' => 'refresh_token',
        ];

        $response = Http::withBasicAuth(env('ZOOM_CLIENT_ID'), env('ZOOM_CLIENT_SECRET'))
            ->asForm()
            ->post('https://zoom.us/oauth/token', $data);

        $accessToken = $response->json()['access_token'];
        $refreshToken = $response->json()['refresh_token'];
        $time = $response->json()['expires_in'];

        // On met à jour le token Zoom de l'utilisateur
        $zoomToken->update([
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken,
            'expires_in' => $time,
            'updated_at' => now(),
        ]);

        // On redirige l'utilisateur vers le dashboard
        return redirect()->route('dashboard')->with('notification', ['message' => 'Token refreshed !', 'type' => 'success']);
    }

    public function isTokenExpired(): bool
    {
        // On récupère l'utilisateur connecté
        $user = User::find(auth()->id());

        // On récupère le token Zoom de l'utilisateur
        $zoomToken = ZoomToken::where('user_id', $user->id)->first();

        if (!$zoomToken) {
            return false;
        }

        // On vérifie si le token Zoom de l'utilisateur est expiré
        if ($zoomToken->expires_in + $zoomToken->created_at->timestamp < now()->timestamp) {
            return true;
        }

        return false;
    }

    public function jsonMeeting(Request $request): \Illuminate\Http\JsonResponse
    {
        $api_key = env('ZOOM_CLIENT_ID');
        $api_secret = env('ZOOM_CLIENT_SECRET');
        $meeting_id = $request->input('meeting_number');
        // On retrouve la réunion en fonction de l'id
        $session = Session::where('meeting_id', $meeting_id)->first();
        if (!$session) {
            return response()->json(['error' => 'Meeting not found.']);
        }
        // Si la personne est l'hôte de la réunion, le rôle doit être 1 (hôte) sinon 0 (participant)
        $user = User::find(auth()->id());
        $role = $session->host_id === $user->id ? 1 : 0;
        // Si la personne n'est pas l'hôte de la réunion, on vérifie si elle est inscrite à la réunion
        if ($role === 0) {
            $role = $session->requests()->where('user_id', $user->id)->exists() ? 0 : -1;
            if ($role === -1) {
                return response()->json(['error' => 'You are not allowed to join this meeting.']);
            }
        }

        // Créer le JWT signature
        $iat = floor(time())-30;
        $exp = $iat + 60 * 60 * 2;
        $header = ['alg' => 'HS256', 'typ' => 'JWT'];

        $payload = [
            'appKey' => $api_key,
            'sdkKey' => $api_key,
            'mn' => $meeting_id,
            'role' => $role,
            'iat' => $iat,
            'exp' => $exp,
            'tokenExp' => $exp
        ];
        $jwt = JWT::encode($payload, $api_secret, 'HS256', null, $header);

        return response()->json(['jwt' => $jwt, 'meeting_password' => $session->meeting_password]);
    }
}
