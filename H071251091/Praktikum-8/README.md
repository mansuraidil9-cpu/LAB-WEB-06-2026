# Pustaka Senja

Aplikasi multi-halaman untuk ruang baca komunitas Pustaka Senja.
Dibuat dengan Next.js (App Router), JavaScript, dan Tailwind CSS.
Tugas Praktikum 8: Framework React (Next.js Intro).

## Menjalankan

```powershell
npm install
npm run dev
```

Buka http://localhost:3000.

## Halaman

| URL | Berkas | Jenis |
| --- | --- | --- |
| `/` | `src/app/page.jsx` | Server Component |
| `/katalog` | `src/app/katalog/page.jsx` | Client Component (filter `useState`) |
| `/katalog/[id]` | `src/app/katalog/[id]/page.jsx` | Server Component (`await params`) |
| `/usulan` | `src/app/usulan/page.jsx` | Client Component (form terkontrol) |

## Komponen

- `Navbar.jsx`: client (`usePathname`), menu dirender dari array dengan `.map()`, menu Katalog tetap aktif di `/katalog/[id]`.
- `BukuCard.jsx`: client (tombol favorit per kartu dengan `useState`).
- `Hero.jsx` dan `Footer.jsx`: server component.

## Catatan data

Data 9 buku hanya ada di `src/data/dataBuku.js`. Kolom `tersedia` untuk
"Filosofi Teras" kosong di tabel soal, jadi diisi `true`. Ubah di berkas
tersebut jika ketentuannya berbeda.
