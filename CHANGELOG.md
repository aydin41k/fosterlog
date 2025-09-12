# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.8.0] - 2025-09-12

### Added
- Complete animal management user interface with Inertia.js:
  - **Dashboard enhancements**: Quick stats display showing animals count, today's actions, and recent weight recordings
  - **Animals index page** (`/animals`): Table view of user's animals with primary photo thumbnails, status badges, and quick edit links
  - **Animals create page** (`/animals/create`): Form with all required fields (name, species, dob, sex, medical_conditions, description, status)
  - **Animals edit page** (`/animals/:id/edit`): Pre-populated form for editing existing animals
- Inertia.js forms with client-side validation and server error display
- Web routes for animal management pages with proper authentication and authorisation
- Navigation sidebar updated with "Animals" link using Heart icon
- User model relationship: Added `animals()` hasMany relationship for accessing user's foster animals
- Comprehensive test coverage with `AnimalWebTest` feature test suite covering:
  - Page loading and data display verification
  - Form validation and submission
  - Authorisation and security (cannot edit others' animals)
  - Dashboard stats functionality

### Technical Details
- Frontend pages use React with TypeScript and Tailwind CSS styling
- Inertia.js integration with Laravel backend API
- Client-side validation with real-time error feedback
- Server-side validation using existing AnimalController and validation rules
- Proper CSRF token handling for web routes
- Responsive design with minimal Tailwind styling
- Type-safe interfaces for all React components
- Policy-based authorisation enforcing animal ownership
- Existing API endpoints reused with proper authentication

### User Experience
- Can add/edit animals from the UI and see them immediately in the list
- Primary photo thumbnails displayed in animal table
- Status badges with appropriate colours (available/default, in_foster/secondary, adopted/outline)
- Age calculation and display in human-readable format
- Quick navigation between dashboard and animal management
- Form validation with clear error messages
- Loading states and form submission feedback

## [0.7.0] - 2025-09-12

### Added
- ActionType PHP enum with food and medication values:
  - `FOOD = 'food'` - For feeding activities
  - `MEDICATION = 'medication'` - For medication administration
- Action model with comprehensive activity tracking system:
  - `id` (primary key)
  - `animal_id` (foreign key to animals table)
  - `performed_by` (foreign key to users table) - User who performed the action
  - `type` (string enum) - ActionType enum values (food/medication)
  - `details` (JSON) - Type-specific structured data
  - `performed_at` (datetime) - When the action was performed
  - `timestamps`
- Type-specific validation for action details:
  - **Food actions** require: `{ "amount_g": number>0, "brand": string|null, "notes": string|null }`
  - **Medication actions** require: `{ "name": string, "dose": string, "notes": string|null }`
- Action tracking API endpoints (authenticated):
  - `GET /api/animals/{animal}/actions` - List all actions for an animal (with type filtering support)
  - `GET /api/animals/{animal}/actions?type=food` - Filter by food actions only
  - `GET /api/animals/{animal}/actions?type=medication` - Filter by medication actions only
  - `POST /api/animals/{animal}/actions` - Record new action with type-specific validation
  - `DELETE /api/actions/{id}` - Delete action record
- Advanced validation system:
  - Dynamic validation based on action type
  - Food amount must be positive number (>0)
  - Medication name and dose are required non-empty strings
  - Optional fields properly validated as string|null
  - Invalid type parameter returns 400 with clear error message
- Action ownership enforcement via ActionPolicy:
  - Only assigned foster carers can manage actions for their animals
  - Create/read/delete operations restricted to animal's foster carer
  - Authentication required for all endpoints
- Enhanced animal and user relationships:
  - Animal hasMany actions relationship
  - User hasMany actions relationship (performed_by)
- Smart features and automation:
  - Automatic timestamp when performed_at not provided (defaults to now)
  - Automatic assignment of performed_by to current user
  - Chronological ordering - newest actions first (desc by performed_at)
  - User information included in responses (performed_by relationship)
- Type filtering with query parameters:
  - Support for `?type=food` and `?type=medication` filters
  - Invalid type parameters handled gracefully with error messages
- Comprehensive test suite with 8 test cases covering:
  - Food and medication action recording with type-specific validation
  - Complex validation rules for each action type
  - Ownership enforcement and security
  - Type-based filtering functionality
  - Permission restrictions and authentication

### Technical Details
- Database migration `2025_09_12_051616_create_actions_table`
- Performance indices on (animal_id, type) and (animal_id, performed_at) for efficient filtering and sorting
- JSON column for flexible type-specific detail storage
- PHP 8.4+ enum with string backing for type safety
- ActionFactory with type-specific factory states (`->food()`, `->medication()`)
- Policy-based authorisation for all action operations
- Type-safe enum casting in Eloquent model
- Proper foreign key constraints with cascade deletion

## [0.6.0] - 2025-09-12

### Added
- AnimalWeight model with comprehensive weight tracking system:
  - `id` (primary key)
  - `animal_id` (foreign key to animals table)
  - `measured_at` (datetime, defaults to current timestamp)
  - `weight_kg` (decimal 5,2) - Animal weight in kilograms
  - `notes` (text, nullable) - Optional notes about the measurement
  - `recorded_by` (foreign key to users table) - User who recorded the weight
  - `timestamps`
- Weight tracking API endpoints (authenticated):
  - `GET /api/animals/{animal}/weights` - List all weight records for an animal (ordered by measured_at descending)
  - `POST /api/animals/{animal}/weights` - Record new weight measurement
  - `DELETE /api/animal-weights/{id}` - Delete weight record
- Comprehensive validation for weight entries:
  - Weight must be positive (> 0.01 kg)
  - Sensible upper bound (≤ 200 kg)
  - Optional date validation for measured_at field
  - Notes field limited to 1000 characters
- Weight ownership enforcement via AnimalWeightPolicy:
  - Only assigned foster carers can manage weights for their animals
  - Create/read/delete operations restricted to animal's foster carer
  - Authentication required for all endpoints
- Enhanced animal and user relationships:
  - Animal hasMany weights relationship
  - User hasMany animalWeights relationship (recorded_by)
- Smart defaults and automation:
  - Automatic timestamp when measured_at not provided
  - Automatic assignment of recorded_by to current user
  - Descending date order for weight history (newest first)
- Comprehensive test suite with 10 test cases covering:
  - Weight recording with ownership enforcement
  - Chronological listing with proper ordering
  - Weight validation and boundary testing
  - Permission restrictions and security
  - Default timestamp behavior

### Technical Details
- Database migration `2025_09_12_050403_create_animal_weights_table`
- Performance index on (animal_id, measured_at) for efficient queries
- Decimal precision (5,2) supporting weights up to 999.99 kg
- Policy-based authorisation for all weight operations
- AnimalWeightFactory for testing support
- Proper foreign key constraints with cascade deletion

## [0.5.0] - 2025-09-12

### Added
- AnimalPhoto model with comprehensive photo management system:
  - `id` (primary key)
  - `animal_id` (foreign key to animals table)
  - `uploaded_by` (foreign key to users table)
  - `path` (string) - Storage path for photo file
  - `caption` (string, nullable) - Optional photo caption
  - `is_primary` (boolean, default false) - Primary photo designation
  - `timestamps`
- Photo upload functionality with file validation:
  - Support for JPEG, PNG, JPG, GIF formats
  - Maximum file size: 5MB
  - Automatic storage in `public/animals/{animal_id}/` directories
- Photo management API endpoints (authenticated):
  - `GET /api/animals/{animal}/photos` - List all photos for an animal
  - `POST /api/animals/{animal}/photos` - Upload new photo with multipart form data
  - `PUT /api/animal-photos/{id}` - Update photo caption and primary status
  - `DELETE /api/animal-photos/{id}` - Delete photo (removes file from storage)
- Primary photo constraint logic:
  - Only one photo can be marked as primary per animal
  - Setting a new primary photo automatically unsets previous primary
  - Model events handle constraint enforcement during create/update operations
- Enhanced animal relationships:
  - Animal hasMany photos relationship
  - User hasMany animalPhotos relationship
  - Animal primaryPhoto() helper method
- Photo ownership enforcement via AnimalPhotoPolicy:
  - Only foster carers assigned to animals can manage photos
  - All authenticated users can view photos
  - Create/update/delete restricted to animal's foster carer
- Public photo integration:
  - Public animal endpoint now includes `primary_photo_url` field
  - Photo URLs generated via Storage::url() for public access
  - No PII exposed in public photo data
- Comprehensive test suite with 10 test cases covering:
  - Photo upload with ownership enforcement
  - Caption and primary status management
  - File validation and storage verification
  - Public endpoint photo URL inclusion
  - Permission restrictions and security

### Technical Details
- Database migration `2025_09_12_044529_create_animal_photos_table`
- Storage integration with Laravel's public disk configuration
- Model events for automatic primary photo constraint enforcement
- Policy-based authorisation for all photo operations
- File storage in organised directory structure by animal ID
- Storage::url() integration for public photo access
- AnimalPhotoFactory for testing support

## [0.4.0] - 2025-09-12

### Added
- Animal model with comprehensive foster animal management:
  - `id` (primary key)
  - `name` (string) - Animal name
  - `species` (enum: cat, dog, other; default cat) - Animal species
  - `dob` (date, nullable) - Date of birth
  - `sex` (enum: male, female, unknown; default unknown) - Animal sex
  - `medical_conditions` (text, nullable) - Medical conditions
  - `description` (text, nullable) - Animal description
  - `status` (enum: in_foster, available, adopted; default in_foster) - Animal status
  - `slug` (string, unique) - Auto-generated from name with uniqueness
  - `foster_carer_id` (foreign key to users, nullable) - Assigned foster carer
  - `soft_deletes` and `timestamps`
- Auto-generation of unique slugs from animal names
- Animal policy with carer-based permissions:
  - Carers can view any animal
  - Carers can only update/delete animals assigned to them
- API endpoints with authentication required:
  - `GET /api/animals` - List current user's assigned animals
  - `POST /api/animals` - Create animal (assigns to current user by default)
  - `GET /api/animals/{id}` - View specific animal
  - `PUT /api/animals/{id}` - Update animal (ownership enforced)
  - `DELETE /api/animals/{id}` - Soft delete animal (ownership enforced)
- Public read endpoint:
  - `GET /public/animals/{slug}` - Returns animal data without foster carer PII
- `available()` scope for filtering available animals
- AnimalFactory and AnimalSeeder for testing/development
- Comprehensive test suite with 13 test cases covering:
  - CRUD operations and ownership enforcement
  - Slug generation and uniqueness
  - Public access without PII exposure
  - Validation and scope functionality

### Technical Details
- Database migration `2025_09_12_043418_create_animals_table` with soft deletes
- Automatic slug generation with collision handling (e.g., "name", "name-1", "name-2")
- Policy-based authorisation enforcing foster carer ownership for updates/deletes
- Public endpoint excludes foster_carer_id and related PII
- Soft delete implementation for data preservation
- Model events for automatic slug generation on create/update

## [0.3.0] - 2025-09-12

### Added
- ResidentPet model with full CRUD API functionality:
  - `id` (primary key)
  - `user_id` (foreign key to users table) 
  - `name` (string) - Pet name
  - `species` (enum: cat, dog, other) - Pet species
  - `dob` (date, nullable) - Date of birth
  - `notes` (text, nullable) - Additional notes about the pet
  - `timestamps` (created_at, updated_at)
- API endpoints with authentication required:
  - `GET /api/resident-pets` - List current user's pets
  - `POST /api/resident-pets` - Create a new pet
  - `GET /api/resident-pets/{id}` - View specific pet
  - `PUT /api/resident-pets/{id}` - Update pet
  - `DELETE /api/resident-pets/{id}` - Delete pet
- ResidentPetPolicy enforcing ownership-based access control
- Laravel Sanctum integration for API authentication
- ResidentPetFactory and ResidentPetSeeder for testing/development
- Comprehensive feature tests covering all CRUD operations and ownership enforcement
- Input validation for all fields including species enum validation

### Technical Details
- Database migration `2025_09_12_042307_create_resident_pets_table`
- Sanctum guard configuration added to auth.php
- API routes configured in dedicated routes/api.php file  
- User model updated with HasApiTokens trait
- Policy-based authorisation preventing users from accessing other users' pets
- Comprehensive test suite with 12 test cases covering CRUD and security

## [0.2.0] - 2025-09-12

### Added
- Foster Carer profile fields to User model:
  - `phone` (string, nullable) - Contact phone number
  - `address_line` (string, nullable) - Street address
  - `suburb` (string, nullable) - Suburb/city
  - `state` (string, nullable) - State/province  
  - `postcode` (string, nullable) - Postal code
  - `country` (string, default 'Australia') - Country
  - `space_details` (text, nullable) - Details about available space for foster children
  - `profile_photo_path` (string, nullable) - Path to profile photo
- PUT `/user/profile` endpoint for updating foster carer profile information
- POST `/user/profile/photo` endpoint for uploading profile photos
- `ProfileUpdateRequest` with comprehensive validation for profile fields
- `ProfileController` with `updateProfile` and `uploadPhoto` methods
- Profile photos stored in `storage/app/public/profiles` directory
- Automatic deletion of old profile photos when uploading new ones
- Comprehensive feature tests for all profile functionality
- Authentication and authorisation requirements for all profile endpoints

### Technical Details
- Added database migration `2025_09_12_023923_add_foster_carer_fields_to_users_table`
- Profile photos limited to 2MB, accepted formats: jpeg, png, jpg, gif
- All profile fields are optional/nullable for flexibility
- Routes protected by `auth` and `verified` middleware
- Follows Laravel best practices with strict typing and final classes

## [0.1.0] - Initial Release

### Added
- Initial Laravel application setup
- User authentication system
- Dashboard functionality
- Basic settings management
