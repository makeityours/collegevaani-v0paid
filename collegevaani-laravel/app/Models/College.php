<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class College extends Model
{
    use HasFactory, HasUuids;

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * The "type" of the primary key ID.
     *
     * @var string
     */
    protected $keyType = 'string';

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'logo',
        'images',
        'location',
        'contact',
        'type',
        'category',
        'accreditation',
        'rankings',
        'facilities',
        'fees',
        'admissions',
        'stats',
        'is_verified',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'images' => 'json',
        'location' => 'json',
        'contact' => 'json',
        'accreditation' => 'json',
        'rankings' => 'json',
        'facilities' => 'json',
        'fees' => 'json',
        'admissions' => 'json',
        'stats' => 'json',
        'is_verified' => 'boolean',
        'is_active' => 'boolean',
    ];

    /**
     * Get the courses for the college.
     */
    public function courses(): HasMany
    {
        return $this->hasMany(Course::class);
    }

    /**
     * Get the applications for the college.
     */
    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }
}
