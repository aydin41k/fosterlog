<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'address_line',
        'suburb',
        'state',
        'postcode',
        'country',
        'space_details',
        'profile_photo_path',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function animalPhotos(): HasMany
    {
        return $this->hasMany(AnimalPhoto::class, 'uploaded_by');
    }

    public function animalWeights(): HasMany
    {
        return $this->hasMany(AnimalWeight::class, 'recorded_by');
    }

    public function actions(): HasMany
    {
        return $this->hasMany(Action::class, 'performed_by');
    }

    public function animals(): HasMany
    {
        return $this->hasMany(Animal::class, 'foster_carer_id');
    }
}
