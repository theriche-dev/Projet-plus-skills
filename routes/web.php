<?php

use Illuminate\Support\Facades\Route;

// Les écrans de l'application ne sont pas encore construits : l'accueil mène au design system.
Route::redirect('/', '/design-system');

Route::inertia('/design-system', 'DesignSystem')->name('design-system');
