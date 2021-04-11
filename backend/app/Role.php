<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'role', 'menu','status', 'isDeleted', 'createdBy', 'modifiedBy',
    ];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'roles';
}
