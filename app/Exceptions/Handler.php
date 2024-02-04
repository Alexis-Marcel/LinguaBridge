<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Inertia\Inertia;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {

        });

        $this->renderable(function (\Exception $e, $request) {
           if(in_array($e->getStatusCode(), [404, 500, 403, 401])){
               return Inertia::render('Error', ['status' => $e->getStatusCode()])
                   ->toResponse($request)
                   ->setStatusCode($e->getStatusCode());
           } elseif ($e->getStatusCode() === 419) {
               return back()->with([
                   'message' => 'The page expired, please try again.',
               ]);
           }
        });
        
    }



}
