<?php

/*
    @author
    I M Udara chamara herath
    Software Engineer
    udara@9465@gmail.com
*/

namespace App\Http\Middleware;

use Closure;

class CorsEnable
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        header('Access-Control-Allow-Origin:  *');
        header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Authorization');
        header('Access-Control-Request-Headers:  Content-Type, X-Auth-Token, Authorization');
        header('Access-Control-Allow-Methods:  POST, PUT, GET, OPTION, DELETE');

        return $next($request);
    }
}
