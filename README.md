# 🐾 FosterLog

Modern, delightful tools for foster carers to organize every pet’s journey — photos, weights, feeding, medications, and more — in one beautiful, secure app.

<p align="center">
  <img alt="FosterLog banner" src="https://dummyimage.com/1200x260/0f172a/ffffff&text=FosterLog" />
  <!-- Replace the image URL above with a real banner when available -->
</p>

<p align="center">
  <a href="#-features"><img alt="Features" src="https://img.shields.io/badge/Features-packed-14b8a6?style=for-the-badge&labelColor=0f172a" /></a>
  <a href="#-tech-stack"><img alt="Laravel" src="https://img.shields.io/badge/Laravel-12-ef4444?style=for-the-badge&labelColor=0f172a&logo=laravel&logoColor=ef4444" /></a>
  <a href="#-tech-stack"><img alt="PHP" src="https://img.shields.io/badge/PHP-8.2+-777bb3?style=for-the-badge&labelColor=0f172a&logo=php&logoColor=777bb3" /></a>
  <a href="#-tech-stack"><img alt="React" src="https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&labelColor=0f172a&logo=react&logoColor=61dafb" /></a>
  <a href="#-tech-stack"><img alt="Inertia" src="https://img.shields.io/badge/Inertia.js-2.0-8b5cf6?style=for-the-badge&labelColor=0f172a" /></a>
  <a href="#-tech-stack"><img alt="Vite" src="https://img.shields.io/badge/Vite-6-646cff?style=for-the-badge&labelColor=0f172a&logo=vite&logoColor=646cff" /></a>
  <a href="#-tech-stack"><img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&labelColor=0f172a&logo=tailwindcss&logoColor=38bdf8" /></a>
  <a href="CHANGELOG.md"><img alt="Changelog" src="https://img.shields.io/badge/Changelog-keep%20a%20changelog-0ea5e9?style=for-the-badge&labelColor=0f172a" /></a>
  <a href="#-license"><img alt="License" src="https://img.shields.io/badge/License-MIT-10b981?style=for-the-badge&labelColor=0f172a" /></a>
</p>

---

## ✨ Features

- Animals: index, create, edit, and a rich details page with tabs
- Photos: upload, set primary, and delete with confirmations
- Weights: add entries with notes, simple trend chart, delete
- Care Actions: track food and medication with type‑specific validation + filtering
- Resident Pets: manage your own household pets
- Public Pages: adoptable cats gallery and details
- Profile Management: foster carer fields and profile photo upload
- Solid UX: responsive UI, toast feedback, dialogs, keyboard/focus friendly

> Everything runs on authenticated web routes with Inertia-powered pages — fast, secure, and simple.

---

## 🧰 Tech Stack

- Backend: Laravel 12 (PHP 8.2+), Policies, Validation, Migrations
- Frontend: React 18 + TypeScript via Inertia.js
- Tooling: Vite 6, Tailwind CSS 4, Radix UI, lucide-react icons
- DX: ESLint + Prettier, TypeScript strict, Wayfinder route helpers

---

## 🚀 Quickstart

Prereqs: PHP 8.2+, Composer, Node 18+, npm, SQLite (or your preferred DB).

```bash
# 1) Install deps
composer install
npm install

# 2) Environment
cp .env.example .env        # edit DB_* if not using the default SQLite
php artisan key:generate

# 3) Database
# Using SQLite by default (database/database.sqlite). Create if missing:
mkdir -p database && touch database/database.sqlite
php artisan migrate --graceful

# 4) Run
# Option A: Separate processes
php artisan serve            # http://127.0.0.1:8000
npm run dev                  # Vite dev server

# Option B: All-in-one (multi-process) via Composer
composer run dev
```

Server‑Side Rendering (SSR) dev mode:
```bash
composer run dev:ssr
```

Run tests:
```bash
composer test
```

---

## 🗺️ Key App Routes

- Public: `/` (welcome), `/adopt/cats`, `/adopt/cats/{slug}`
- App: `/animals`, `/animals/{id}`, `/animals/{id}/photos|weights|actions`
- Profile: `PUT /user/profile`, `POST /user/profile/photo`
- Resident Pets: `/resident-pets`

All application routes are authenticated (except public pages). See `routes/web.php`.

---

## 🏗️ Project Layout

```
resources/
  js/
    pages/
      animals/               # Animals index/create/edit/show + tabs
      resident-pets/         # Resident pets pages
      public/cats/           # Public adoption gallery & details
      auth/                  # Auth pages
    components/ui/           # UI primitives (buttons, dialog, tabs, etc.)
    components/              # App shell, nav, layout, toasts
    layouts/                 # App & auth layouts
    app.tsx                 
    ssr.tsx
routes/
  web.php                    # Inertia pages & web endpoints
```

---

## ⚙️ Configuration

- App name: set `APP_NAME` in `.env` (also used for Vite via `VITE_APP_NAME`).
- Database: default SQLite; update `DB_*` in `.env` to use MySQL/PostgreSQL.
- Queues/Jobs: `php artisan queue:listen` (included in `composer run dev`).

---

## 📦 Builds & Deployment

- Build assets: `npm run build` (includes SSR build via `npm run build:ssr`).
- Cache/optimize (typical Laravel deploy):
  ```bash
  php artisan migrate --force
  php artisan optimize
  php artisan config:cache && php artisan route:cache && php artisan view:cache
  ```
- Serve via your preferred PHP runtime (FPM + nginx, Apache, or Laravel Octane).

---

## 🤝 Contributing

- Use conventional, focused PRs.
- Run `npm run lint` and `npm run types` locally.
- Keep UI consistent with existing components.

---

## 📜 License

MIT — see `LICENSE` (default for Laravel skeletons). If a license file is missing, the package metadata declares MIT.

---

## 📚 Links

- Changelog: `CHANGELOG.md`
- Tech: [Laravel](https://laravel.com) · [Inertia.js](https://inertiajs.com) · [Vite](https://vitejs.dev) · [Tailwind](https://tailwindcss.com) · [Radix UI](https://www.radix-ui.com/)

---

> Pro tip: pin FosterLog as a PWA in your browser for a native‑like feel.

