<?php

use App\Http\Controllers\ProposedSessionController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\NewSessionController;
use App\Http\Controllers\ProfileController;
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
        Route::get('/new-session', [SessionController::class, 'create'])->name('sessions.create');
        Route::post('/new-session', [SessionController::class, 'store'])->name('sessions.store');

        Route::prefix('{session}')->group(function () {
            Route::get('/', [SessionController::class, 'show'])->name('sessions.show');
            Route::get('/edit', [SessionController::class, 'edit'])->name('sessions.edit');
            Route::patch('/', [SessionController::class, 'update'])->name('sessions.update');
            Route::delete('/', [SessionController::class, 'destroy'])->name('sessions.destroy');
            Route::get('/material/download/{material}', [SessionController::class, 'downloadMaterial'])->name('sessions.download-material');
        });

    });

});

require __DIR__.'/auth.php';
