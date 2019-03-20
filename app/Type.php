<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Type extends Authenticatable
{
    use Notifiable;

  protected $fillable = [
    'name'
  ];
}
