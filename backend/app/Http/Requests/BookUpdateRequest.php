<?php

/*
    @author
    I M Udara chamara herath
    Software Engineer
    udara@9465@gmail.com
*/

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookUpdateRequest extends FormRequest
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
            'description' => 'required|string|max:100',
            'price' => 'required|regex:/^\d+(\.\d{1,2})?$/',
            'count' => 'required|integer',
            'author' => 'required|integer',
            'status' => 'required|integer',
            'modifiedBy' => 'required|string|max:10',
        ];
    }
}
