<?php

/*
    @author
    I M Udara chamara herath
    Software Engineer
    udara@9465@gmail.com
*/

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthorStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:100',
            'email' => 'required|unique:users|email',
            'password' => 'required|string',
            'createdBy' => 'required|string|max:10',
            'modifiedBy' => 'required|string|max:10',
        ];
    }
}
