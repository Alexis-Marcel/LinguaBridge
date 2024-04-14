<?php

use App\Http\Controllers\SessionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SessionRequestController;
use App\Http\Controllers\ZoomAuthController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');

    });

    Route::prefix('sessions')->group(function () {
        Route::get('/', [SessionController::class, 'index'])->name('sessions.index');
        Route::get('/my-sessions', [SessionController::class, 'mySessions'])->name('sessions.my-sessions');
        Route::get('/requested-sessions', [SessionController::class, 'sessionRequests'])->name('sessions.sessionRequests');
        Route::get('/my-requests', [SessionController::class, 'myRequests'])->name('sessions.my-requests');
        Route::get('/new-session', [SessionController::class, 'create'])->name('sessions.create');
        Route::post('/new-session', [SessionController::class, 'store'])->name('sessions.store');

        Route::prefix('{session}')->group(function () {
            Route::get('/', [SessionController::class, 'show'])->name('sessions.show');
            Route::post('/start', [SessionController::class, 'start'])->middleware('refresh.token')->name('sessions.start');
            Route::put('/', [SessionController::class, 'update'])->name('sessions.update');
            Route::delete('/', [SessionController::class, 'destroy'])->name('sessions.destroy');
            Route::get('/material/download/{material}', [SessionController::class, 'downloadMaterial'])->name('sessions.download-material');

            Route::prefix('requests')->group(function () {
                Route::get('/', [SessionRequestController::class, 'index'])->name('sessions.requests.index');
                Route::post('/', [SessionRequestController::class, 'store'])->name('sessions.requests.store');
                Route::prefix('{request}')->group(function () {
                    Route::post('/status', [SessionRequestController::class, 'status'])->name('sessions.requests.status');
                    Route::delete('/', [SessionRequestController::class, 'destroy'])->name('sessions.requests.destroy');
                });
            });
        });

    });

    Route::prefix('oauth')->group(function () {
        Route::get('/zoom', [ZoomAuthController::class, 'redirectToZoom'])->name('zoom.auth');
        Route::get('/callback', [ZoomAuthController::class, 'handleCallback'])->name('zoom.callback');
        Route::post('/meeting', [ZoomAuthController::class, 'jsonMeeting'])->name('zoom.meeting');
    });



});

require __DIR__.'/auth.php';
