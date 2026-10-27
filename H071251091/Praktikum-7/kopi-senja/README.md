# Kedai Kopi Senja

Tugas Praktikum 7 — React Hooks (State & Props).
Halaman pemesanan mandiri untuk Kedai Kopi Senja, dibangun dengan React (Vite), JavaScript (JSX), dan Tailwind CSS.

## Menjalankan

```bash
npm install
npm run dev
```

Buka alamat yang tampil di terminal (biasanya http://localhost:5173).

## Struktur State

| State | Lokasi | Fungsi |
|---|---|---|
| `kategoriAktif` | `App.jsx` | Kategori yang sedang dipilih (Semua/Kopi/Non-Kopi/Makanan) |
| `pesanan` | `App.jsx` | Daftar `{ id, jumlah }` menu yang dipesan |
| `ucapan` | `App.jsx` | Data ucapan terima kasih setelah pesanan terkirim |
| `detailTerbuka` | `MenuCard.jsx` | Buka/tutup detail, terpisah untuk tiap kartu |
| `nama`, `meja`, `galat` | `FormPesan.jsx` | Isi form dan pesan kesalahan validasi |

Jumlah item dan total harga **tidak disimpan sebagai state**. Keduanya dihitung dari `pesanan` dan `dataMenu`
di `App.jsx`, lalu dikirim lewat props ke Navbar dan Ringkasan Pesanan sehingga angkanya selalu sama.

## Fitur

- Daftar menu lengkap dengan harga, filter kategori, dan detail yang bisa dibuka per menu
- Menu habis ditandai dan tombol pesannya nonaktif
- Tombol Tambah memperbarui jumlah dan total di Navbar dan Ringkasan secara langsung
- Ringkasan bisa menambah/mengurangi jumlah tiap menu
- Validasi form (nama, nomor meja, pesanan kosong) dengan pesan yang jelas
- Setelah terkirim: ucapan terima kasih, form dan pesanan dikosongkan
