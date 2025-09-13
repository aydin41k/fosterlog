# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project adheres to Semantic Versioning.

## [1.0.0] - 2025-09-13

### Added
- Animal management UI: index, create, edit, and a details view with Photos, Weights, and Actions tabs
- Photo management: upload, set primary, and delete with confirmation
- Weight tracking: add entries with notes, simple trend chart, and deletion
- Care actions: food and medication with type-specific validation, filtering, and deletion
- Resident pets: full in-app management via authenticated web routes
- Public adoption pages: cats gallery and details
- Profile management: foster carer fields and profile photo upload
- Delete button on animal details with confirmation dialog
- Responsive UI built with Inertia.js, React, TypeScript, and Tailwind CSS

### Changed
- Migrated functionality to authenticated web routes with Inertia responses and redirects

### Removed
- Legacy JSON API layer and Sanctum token authentication (`routes/api.php`)

