<?php

/*
    @author
    I M Udara chamara herath
    Software Engineer
    udara@9465@gmail.com
*/

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Book;
use App\Role;
use App\Http\Requests\BookStoreRequest;
use App\Http\Requests\BookUpdateRequest;
use Illuminate\Support\Facades\Auth;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::guard('api')->user();
        $user_role = Role::where('id', '=', $user->role)->first();

        if ($user_role->role == 'Admin') {
            $book_all = Book::all();
            return response(['books' => $book_all]);
        } else {
            return response(['message' => "Unautherized Access", 'code' => 403]);
        }
    }

    public function show_active_authors_book()
    {

        $user_role = Role::where('role', '=', 'Author')->first();

        $active_authers_books = Book::join('users', 'books.author', '=', 'users.id')
            ->where([ ['users.status', '=', 1], ['books.status', '=', 1], ['users.role' , '=', $user_role->id] ])
            ->select('books.*')
            ->get();

        if ($active_authers_books) {
            return response(['books' => $active_authers_books]);
        } else {
        return response(['message' => "No Records Found", 'code' => 404]);
        }
    }

    public function show_books_by_author($id)
    {

        $books_by_author = Book::join('users', 'books.author', '=', 'users.id')
            ->where([ ['users.status', '=', 1], ['books.status', '=', 1], ['books.isDeleted', '=', 0], ['users.id','=',$id] ])
            ->select('books.*')
            ->get();

        if ($books_by_author) {
            return response(['books' => $books_by_author]);
        } else {
        return response(['message' => "No Records Found", 'code' => 404]);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(BookStoreRequest $request)
    {

        $user = Auth::guard('api')->user();
        $user_role = Role::where('id', '=', $user->role)->first();

        if ($user_role->role == 'Admin' || $user_role->role == 'Author') {

            $data = json_decode($request->getContent(), true);
            $book = Book::insert(
                [
                    'name' => $data['name'],
                    'description' => $data['description'],
                    'price' => $data['price'],
                    'count' => $data['count'],
                    'author' => $data['author'],
                    'status' => 1,
                    'isDeleted' => 0,
                    'createdBy' => $data['createdBy'],
                    'modifiedBy' => $data['modifiedBy'],
                    'created_at' => Date('Y-m-d h:i:s'),
                    'updated_at' => Date('Y-m-d h:i:s')
                ]
            );
            if ($book)
                return response(['message' => "Book Inserted", 'code' => 200, 'book' => $book]);
            else
                return response(['message' => "Error Occurd", 'code' => 401]);
        } else {
            return response(['message' => "Unautherized Access", 'code' => 403]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = Auth::guard('api')->user();
        $user_role = Role::where('id', '=', $user->role)->first();

        if ($user_role->role == 'Admin' || $user_role->role == 'Author') {
            $book = Book::where('id', '=', $id)->first();
            return response(['book' => $book]);
        } else {
            return response(['message' => "Unautherized Access", 'code' => 403]);
        }
    }

    public function show_active_book($id)
    {
        $book = Book::where([ ['id', '=', $id], ['status', '=', 1], ['isDeleted', '=', 0] ])->first();

        if ($book) {
            return response(['book' => $book, 'code'=> 200]);
        } else {
            return response(['message' => "No Record found", 'code' => 404]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(BookUpdateRequest $request, $id)
    {

        $user = Auth::guard('api')->user();
        $user_role = Role::where('id', '=', $user->role)->first();

        if ($user_role->role == 'Admin' || $user_role->role == 'Author') {
            $data = json_decode($request->getContent(), true);
            if (!$data)
                return response(['message' => "No Content", 'code' => 401]);

            $res = Book::where('id', '=', $id)
                ->update(
                    [
                        'name' => $data['name'],
                        'description' => $data['description'],
                        'price' => $data['price'],
                        'author' => $data['author'],
                        'count' => $data['count'],
                        'status' => $data['status'],
                        'modifiedBy' => $data['modifiedBy'],
                        'updated_at' => Date('Y-m-d h:i:s')
                    ]
                );
            if ($res == 1) {
                $book = Book::where('id', '=', $id)->first();
                return response(['book' => $book]);
            } else {
                return response(['message' => "Error Update", 'code' => 401]);
            }
        } else {
            return response(['message' => "Unautherized Access", 'code' => 403]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = Auth::guard('api')->user();
        $user_role = Role::where('id', '=', $user->role)->first();

        if ($user_role->role == 'Admin' || $user_role->role == 'Author') {
            $book = Book::where('id', '=', $id)->update(['isDeleted' => 1]);

            if ($book) {
                return response(['message' => "Delete Success", 'code' => 200]);
            } else {
                return response(['message' => "Delete Failed", 'code' => 401]);
            }
        } else {
            return response(['message' => "Unautherized Access", 'code' => 403]);
        }
    }
}
