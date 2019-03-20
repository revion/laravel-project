<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Product extends Authenticatable {
  use Notifiable;

  protected $fillable = [
    'id_brand', 'id_type', 'name', 'stock', 'price'
  ];
}
