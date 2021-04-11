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
use Illuminate\Support\Facades\Auth;
use App\Role;
use App\User;
use App\Book;
use App\Http\Requests\AuthorStoreRequest;
use App\Http\Requests\AuthorUpdateRequest;
use Illuminate\Support\Facades\Hash;

class AuthorController extends Controller
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
        $author_role_id = Role::where('role', '=', 'Author')->first();

        if ($user_role->role == 'Admin') {
            $author_all = User::where([['role', '=', $author_role_id->id], ['isDeleted', '=', 0]])->get();
            return response(['authors' => $author_all]);
        } else {
            return response(['message' => "Unautherized Access", 'code' => 403]);
        }
    }

    /*
    Get all books belong to the login user is Author
    */
    public function get_my_books()
    {
        $user = Auth::guard('api')->user();

        $user_role = Role::where('id', '=', $user->role)->first();

        if ($user_role->role == 'Author') {
            $books = Book::where('author', '=', $user->id)->get();
            return response(['books' => $books]);
        } else {
            return response(['message' => "Unautherized Access", 'code' => 403]);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AuthorStoreRequest $request)
    {

        $author_role_id = Role::where('role', '=', 'Author')->first();

        $data = json_decode($request->getContent(), true);
        if (!$data)
            return response(['message' => "No Content", 'code' => $request]);

        $author = User::insert(
            [
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'role' => $author_role_id->id,
                'status' => 1,
                'isDeleted' => 0,
                'createdBy' => $data['createdBy'],
                'modifiedBy' => $data['modifiedBy'],
                'created_at' => Date('Y-m-d h:i:s'),
                'updated_at' => Date('Y-m-d h:i:s')
            ]
        );
        if ($author)
            return response(['message' => "Author Registered", 'code' => 200, 'author' => $author]);
        else
            return response(['message' => "Error Occurd", 'code' => 401]);
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
        $author_role_id = Role::where('role', '=', 'Author')->first();

        if ($user_role->role == 'Admin' || $user_role->role == 'Author') {
            $author = User::where([['id', '=', $id], ['role', '=', $author_role_id->id]])
                ->first();
            return response(['author' => $author]);
        } else {
            return response(['message' => "Unautherized Access", 'code' => 403]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(AuthorUpdateRequest $request, $id)
    {
        $user = Auth::guard('api')->user();
        $user_role = Role::where('id', '=', $user->role)->first();
        $author_role_id = Role::where('role', '=', 'Author')->first();

        $data = json_decode($request->getContent(), true);
        if (!$data)
            return response(['message' => "No Content", 'code' => 401]);

        if ($user_role->role == 'Admin' || $user_role->role == 'Author') {
            $author = User::where('id', '=', $id)->update(
                [
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'password' => Hash::make($data['password']),
                    'status' => $data['status'],
                    'modifiedBy' => $data['modifiedBy'],
                    'updated_at' => Date('Y-m-d h:i:s')
                ]
            );
            if ($author)
                return response(['message' => "Author Registered", 'code' => 200, 'author' => $author]);
            else
                return response(['message' => "Error Occurd", 'code' => 401]);
        } else {
            return response(['message' => "Unautherized Access", 'code' => 403]);
        }
    }

    public function inactive(Request $request, $id)
    {
        $user = Auth::guard('api')->user();
        $user_role = Role::where('id', '=', $user->role)->first();

        if ($user_role->role == 'Admin') {

            $data = json_decode($request->getContent(), true);
            if (!$data)
                return response(['message' => "No Content", 'code' => 401]);

            $author = User::where('id', '=', $id)->update(['status' =>  $data['status']]);

            if ($author) {
                return response(['message' => "Delete Success", 'code' => 200]);
            } else {
                return response(['message' => "Delete Failed", 'code' => 401]);
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

        if ($user_role->role == 'Admin') {
            $author = User::where('id', '=', $id)->update(['isDeleted' => 1]);

            if ($author) {
                return response(['message' => "Delete Success", 'code' => 200]);
            } else {
                return response(['message' => "Delete Failed", 'code' => 401]);
            }
        } else {
            return response(['message' => "Unautherized Access", 'code' => 403]);
        }
    }
}
