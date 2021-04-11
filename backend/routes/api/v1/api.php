<?php

/*
    @author
    I M Udara chamara herath
    Software Engineer
    udara@9465@gmail.com
*/

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


Route::post('/user/login', 'api\v1\LoginController@login')->middleware('cors');

Route::post('/book/search', 'api\v1\BookController@search')->middleware('cors');

Route::get('/book/get_book_by/{id}', 'api\v1\BookController@show_active_book')->middleware('cors');

Route::get('/book/active_authors_book', 'api\v1\BookController@show_active_authors_book')->middleware(['cors']);

Route::get('/book/show_books_by_author/{id}', 'api\v1\BookController@show_books_by_author')->middleware('cors');

Route::resource('/book', 'api\v1\BookController')->middleware(['cors', 'user_accessible']);

Route::get('/author', 'api\v1\AuthorController@index')->middleware(['cors', 'user_accessible']);

Route::get('/author/book', 'api\v1\AuthorController@get_my_books')->middleware(['cors', 'user_accessible']);

Route::get('/author/{id}', 'api\v1\AuthorController@show')->middleware(['cors', 'user_accessible']);

Route::post('/author', 'api\v1\AuthorController@store')->middleware('cors');

Route::put('/author/inactive/{id}', 'api\v1\AuthorController@inactive')->middleware(['cors', 'user_accessible']);

Route::put('/author/{id}', 'api\v1\AuthorController@update')->middleware(['cors', 'user_accessible']);

Route::delete('/author/{id}', 'api\v1\AuthorController@destroy')->middleware(['cors', 'user_accessible']);
