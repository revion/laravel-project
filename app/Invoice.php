<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Invoice extends Authenticatable {
  use Notifiable;

  protected $fillable = [
    'id_user', 'id_product', 'amount', 'has_bought'
  ];
}
