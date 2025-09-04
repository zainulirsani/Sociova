<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to your application's "home" route.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    // Hapus atau komentari baris ini
    // public const HOME = '/dashboard';

    /**
     * Membuat method baru untuk redirect dinamis berdasarkan role.
     */
    public static function redirectTo(string $default = '/'): string
    {
        $user = auth()->guard()->user();

        if (!$user) {
            return $default;
        }

        if ($user->role === 'dosen') {
            return route('dosen.dashboardDosen');
        }

        if ($user->role === 'student') {
            return route('welcome');
        }

        return $default;
    }

    // ... sisa file
}