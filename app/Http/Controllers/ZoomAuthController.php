<?php

namespace App\Http\Controllers;

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

        // On vérifie si le token Zoom de l'utilisateur est expiré
        if ($zoomToken->expires_in + $zoomToken->created_at->timestamp < now()->timestamp) {
            return true;
        }

        return false;
    }

    public function generateSignature(Request $request): \Illuminate\Http\JsonResponse
    {
        $api_key = env('ZOOM_CLIENT_ID');
        $api_secret = env('ZOOM_CLIENT_SECRET');
        $meeting_number = $request->input('meeting_number');
        $role = $request->input('role');

        $iat = floor(time());
        $exp = $iat + 60 * 60 * 2;
        $header = json_encode(['alg' => 'HS256', 'typ' => 'JWT']);

        $payload = json_encode([
            'appKey' => $api_key,
            'sdkKey' => $api_key,
            'mn' => $meeting_number,
            'role' => $role,
            'iat' => $iat,
            'exp' => $exp,
            'tokenExp' => $exp
        ]);

        // Base64 encode the header and payload
        $base64Header = base64_encode($header);
        $base64Payload = base64_encode($payload);

        // Create the signature using HMAC SHA256
        $signature = hash_hmac('sha256', $base64Header . '.' . $base64Payload, $api_secret, true);
        $base64Signature = base64_encode($signature);

        // Concatenate the base64 encoded header, payload, and signature to create the JWT
        $jwt = $base64Header . '.' . $base64Payload . '.' . $base64Signature;

        return response()->json(['signature' => $jwt]);
    }
}
