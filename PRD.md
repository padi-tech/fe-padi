

# 📄 PRODUCT REQUIREMENTS DOCUMENT (PRD)

**Project Name:** Paditech LPMS (Landing Page Management System)
**Tech Stack:** * **Frontend:** React, TypeScript, Tailwind CSS (Strictly NO custom CSS files, utility classes only).

* **Backend:** Node.js, Express.js.
* **Database:** PostgreSQL (with Prisma or Sequelize ORM).
**Design Theme:** Nuansa **Purple** (Primary: `purple-600`, Backgrounds: `purple-50`, Text: `gray-900` & `white`).

---

## 👥 1. USER ROLES & PERMISSIONS MATRIX

Sistem memiliki 3 tingkat akses (*Role*):

| Fitur / Akses | Superadmin | Admin | Member |
| --- | --- | --- | --- |
| **Landing Page & Blog View** | ✅ | ✅ | ✅ |
| **Dashboard Analytics (SEO, Web Visitors)** | ✅ Global | ✅ Global | ❌ |
| **User Activity Log** | ✅ Semua User | ✅ Aktivitas Sendiri | ✅ Aktivitas Sendiri |
| **Project Click Analytics** | ✅ Semua Project | ✅ Project Sendiri | ✅ Project Sendiri |
| **Manage Users (CRUD)** | ✅ | ❌ | ❌ |
| **Manage Blogs (CRUD)** | ✅ | ✅ | ❌ |
| **Manage Projects (CRUD)** | ✅ Semua | ✅ Project Sendiri | ✅ Project Sendiri |

---

## 🎨 2. PHASE 1: FRONTEND DEVELOPMENT (MOCK DATA FIRST)

**Instruksi Penting untuk Agent:** Kerjakan fase ini sepenuhnya TANPA backend. Gunakan *hardcoded Dummy Data (JSON)* di dalam file TypeScript untuk melakukan simulasi proses CRUD dan Charting. Pastikan semua styling 100% menggunakan Tailwind CSS.

### 2.1. Public Pages (UI)

**A. Landing Page (`/`)**

* **Navbar:** Posisi *Sticky Top*. Logo di kiri, Links (Home, Projects, Services, Blogs, Contact) di tengah, tombol "Login" di kanan.
* **Section 1 - Hero:** Title besar, Subtitle menarik, dan CTA Button (Call to Action) dengan warna *purple-600* hover *purple-700*. Layout terinspirasi dari gambar referensi (kombinasi teks dan gambar/ilustrasi).
* **Section 2 - Projects:** Grid layout (kartu/cards). Menampilkan *Mock Data* project terbaru.
* **Section 3 - Services:** Penjelasan layanan yang ditawarkan (menggunakan icon + teks).
* **Section 4 - Testimonial:** Slider atau Grid berisi *Mock Data* ulasan klien.
* **Section 5 - Contact:** Form sederhana (Name, Email, Message) & Info kontak.
* **Footer:** Copyright, Social Links, dan Sitemap singkat.

**B. Blog Page (`/blogs` & `/blogs/:id`)**

* **List Page:** Daftar artikel dengan *thumbnail*, *title*, *excerpt*, dan *author*.
* **Detail Page (Medium-Style UI):** Layout minimalis, fokus pada tipografi (font serif/sans-serif yang sangat terbaca). Terdapat judul besar di atas, nama penulis, tanggal, dan konten teks rata tengah (*max-width: 65ch/prose* menggunakan `@tailwindcss/typography`).

### 2.2. Dashboard UI (`/dashboard`)

* **Layout Utama:** *Sidebar* di kiri (collapsible) dan *Top Navbar* (menampilkan profil pengguna & role). Selaras dengan *purple theme* dari Landing Page.
* **Dashboard Utama (Home):**
* Tampilan *Cards* untuk ringkasan metrik (Total Visitor, Total Click, dll).
* *Chart* (gunakan Recharts atau Chart.js) untuk grafik pengunjung.
* *Table/List* untuk Aktivitas Terakhir.


* **Manage Projects (`/dashboard/projects`):**
* Tabel *list project*.
* Form CRUD: `Title`, `Description`, `Image Link`, `Project Link`.
* Action: Edit, Delete.
* **Fitur Public di Card Project:** Tombol *Like* (counter) dan *Share* (copy link).


* **Manage Blogs (`/dashboard/blogs`):**
* Tabel *list blog*.
* Form CRUD: `Title`, `Content` (Rich Text Editor atau Textarea Markdown), `Thumbnail Image`.



### 2.3. Struktur Mock Data (Wajib Dibuat Pertama di Frontend)

*Agent harus membuat file `src/mocks/dummyData.ts` berisi data berikut:*

```typescript
// Contoh Struktur Dummy Data
export const mockProjects = [
  { id: 1, title: "Lingu AI", description: "Music App", imgUrl: "...", projectUrl: "...", likes: 12, shares: 4, authorId: 2, clicks: 145 },
];

export const mockUsers = [
  { id: 1, name: "Catur", role: "superadmin" },
  { id: 2, name: "Admin 1", role: "admin" },
  { id: 3, name: "Member 1", role: "member" },
];

export const mockAnalytics = {
  globalVisitors: [ {date: "2026-05-01", count: 120}, /*...*/ ],
  memberClicks: [ {date: "2026-05-01", count: 15}, /*...*/ ]
};

```

---

## ⚙️ 3. PHASE 2: BACKEND DEVELOPMENT (EXPRESS + POSTGRESQL)

**Instruksi Penting untuk Agent:** Bangun sistem ini setelah UI Frontend selesai dengan Dummy Data. Gunakan JWT untuk autentikasi.

### 3.1. Database Schema (PostgreSQL)

Terdapat 4 Entitas utama:

1. **Users:**
* `id` (PK, UUID)
* `name` (String)
* `email` (String, Unique)
* `password` (Hashed String)
* `role` (Enum: 'superadmin', 'admin', 'member')


2. **Projects:**
* `id` (PK, UUID)
* `title` (String)
* `description` (Text)
* `image_link` (String)
* `project_link` (String)
* `likes` (Integer, default 0)
* `user_id` (FK -> Users.id)


3. **Blogs:**
* `id` (PK, UUID)
* `title` (String)
* `content` (Text)
* `thumbnail` (String)
* `author_id` (FK -> Users.id)


4. **Analytics & Activities:**
* `id` (PK, UUID)
* `type` (Enum: 'page_view', 'project_click', 'user_action')
* `reference_id` (UUID, nullable - misal: project_id jika type=project_click)
* `user_id` (FK -> Users.id, nullable - pelaku aksi)
* `action_detail` (String - contoh: "Created a new project")
* `created_at` (Timestamp)



### 3.2. API Endpoints Map

* **Auth:**
* `POST /api/auth/login`
* `POST /api/auth/register` (Default role: member)


* **Projects:**
* `GET /api/projects` (Public)
* `POST /api/projects` (Auth required)
* `PUT /api/projects/:id` (Auth + Role check/Owner check)
* `DELETE /api/projects/:id` (Auth + Role check/Owner check)
* `POST /api/projects/:id/like` (Public/Auth)
* `POST /api/projects/:id/click` (Public - triggers analytics write)


* **Blogs:**
* `GET /api/blogs` (Public)
* `GET /api/blogs/:id` (Public)
* `POST/PUT/DELETE /api/blogs/:id` (Superadmin, Admin only)


* **Analytics:**
* `GET /api/analytics/global` (Superadmin, Admin)
* `GET /api/analytics/member` (Member - only gets data where reference_id = their projects)


* **Activities:**
* `GET /api/activities` (Superadmin sees all, Admin/Member sees `user_id = self`)



---

## 🔗 4. PHASE 3: INTEGRATION

1. Ganti pemanggilan *Mock Data* di Frontend dengan *Fetch API* (gunakan `axios` atau `fetch`).
2. Pasang JWT token pada *Header Authorization* (`Bearer <token>`) untuk setiap request ke protected routes (Dashboard).
3. Hubungkan *Login Form* ke API `/api/auth/login` dan simpan token di *Local Storage* atau *HttpOnly Cookies*.
4. Pastikan *conditional rendering* di React berjalan sesuai token role (menyembunyikan menu Superadmin dari Member).

---

