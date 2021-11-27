<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('test', 'App\Http\Controllers\AppController@test');
Route::post('login', 'App\Http\Controllers\AppController@login');
Route::post('logout', 'App\Http\Controllers\AppController@logout');
Route::post('refresh', 'App\Http\Controllers\AppController@refresh');
Route::post('me', 'App\Http\Controllers\AppController@me');
Route::post('register', 'App\Http\Controllers\AppController@register');
Route::get('endpoints', 'App\Http\Controllers\AppController@endpoints');
Route::post('password-reset-start', 'App\Http\Controllers\AppController@passwordResetStart');
Route::post('password-reset-change', 'App\Http\Controllers\AppController@passwordResetChange');
Route::post('email-test', 'App\Http\Controllers\AppController@emailTest');
Route::get('emails-templates', 'App\Http\Controllers\AppController@emailsTemplates');

Route::get('addresses/search', 'App\Http\Controllers\AddressesController@search');
Route::get('addresses/find/{id}', 'App\Http\Controllers\AddressesController@find');
Route::post('addresses/save', 'App\Http\Controllers\AddressesController@save');
Route::post('addresses/valid', 'App\Http\Controllers\AddressesController@valid');
Route::post('addresses/remove', 'App\Http\Controllers\AddressesController@remove');
Route::get('addresses/clone/{id}', 'App\Http\Controllers\AddressesController@clone');
Route::get('addresses/export', 'App\Http\Controllers\AddressesController@export');

Route::get('pages/search', 'App\Http\Controllers\PagesController@search');
Route::get('pages/find/{id}', 'App\Http\Controllers\PagesController@find');
Route::post('pages/save', 'App\Http\Controllers\PagesController@save');
Route::post('pages/valid', 'App\Http\Controllers\PagesController@valid');
Route::post('pages/remove', 'App\Http\Controllers\PagesController@remove');
Route::get('pages/clone/{id}', 'App\Http\Controllers\PagesController@clone');
Route::get('pages/export', 'App\Http\Controllers\PagesController@export');
Route::get('pages/page', 'App\Http\Controllers\PagesController@page');

Route::post('settings/save-all', 'App\Http\Controllers\SettingsController@saveAll');
Route::get('settings/get-all', 'App\Http\Controllers\SettingsController@getAll');

Route::get('users/search', 'App\Http\Controllers\UsersController@search');
Route::get('users/find/{id}', 'App\Http\Controllers\UsersController@find');
Route::post('users/save', 'App\Http\Controllers\UsersController@save');
Route::post('users/valid', 'App\Http\Controllers\UsersController@valid');
Route::post('users/remove', 'App\Http\Controllers\UsersController@remove');
Route::get('users/clone/{id}', 'App\Http\Controllers\UsersController@clone');
Route::get('users/export', 'App\Http\Controllers\UsersController@export');

Route::get('files/search', 'App\Http\Controllers\FilesController@search');
Route::post('files/save', 'App\Http\Controllers\FilesController@save');
Route::post('files/remove', 'App\Http\Controllers\FilesController@remove');
Route::get('file/{slug}', 'App\Http\Controllers\FilesController@file');
Route::post('files/upload', 'App\Http\Controllers\FilesController@upload');

\App\Http\Controllers\AddressesController::router();
\App\Http\Controllers\AppController::router();
\App\Http\Controllers\EmailsController::router();
\App\Http\Controllers\FilesController::router();
\App\Http\Controllers\MapsController::router();
\App\Http\Controllers\SettingsController::router();