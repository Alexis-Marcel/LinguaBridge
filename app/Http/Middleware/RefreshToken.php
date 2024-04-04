<?php

namespace App\Http\Middleware;

use App\Http\Controllers\ZoomAuthController;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RefreshToken
{
    protected $zoomAuthController;

    public function __construct(ZoomAuthController $zoomAuthController)
    {
        $this->zoomAuthController = $zoomAuthController;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($this->zoomAuthController->isTokenExpired()) {
            $this->zoomAuthController->refreshToken();
        }

        return $next($request);
    }
}
