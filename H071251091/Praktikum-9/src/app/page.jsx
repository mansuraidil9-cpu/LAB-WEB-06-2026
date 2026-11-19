import Hero from "@/components/Hero";
import pool from "@/lib/db";
import Link from "next/link";

export default async function HomePage() {
  // Satu query menghitung ketiga statistik sekaligus.
  // ::int dipakai karena COUNT() di PostgreSQL bertipe bigint, yang oleh pg dikirim sebagai string.
  const hasil = await pool.query(
    `SELECT COUNT(*)::int AS total,
            COUNT(*) FILTER (WHERE tersedia = TRUE)::int AS tersedia,
            COUNT(*) FILTER (WHERE tersedia = FALSE)::int AS dipinjam
     FROM buku`
  );
  const { total: totalBuku, tersedia: bukuTersedia, dipinjam: bukuDipinjam } = hasil.rows[0];

  return (
    <div className="pb-12">
      <Hero
        namaRuangBaca="Pustaka Senja"
        slogan="Ruang Baca & Perpustakaan Kami Hangat di Dekat Kampus"
        jadwal="Buka Setiap Hari | 09.00 - Kiamat"
      />

      <div className="my-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-amber-500">
          Ringkasan Koleksi
        </h2>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-100 text-center">
          <h3 className="text-gray-500 font-medium text-sm">
            Total Koleksi Buku
          </h3>
          <p className="text-4xl font-bold text-gray-800 mt-2">
            {totalBuku}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-100 text-center">
          <h3 className="text-gray-500 font-medium text-sm">
            Buku Tersedia
          </h3>
          <p className="text-4xl font-bold text-green-600 mt-2">
            {bukuTersedia}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-100 text-center">
          <h3 className="text-gray-500 font-medium text-sm">
            Buku Dipinjam
          </h3>
          <p className="text-4xl font-bold text-amber-600 mt-2">
            {bukuDipinjam}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10 px-4">
        <Link href="/katalog" className="bg-blue-600 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Jelajahi Katalog Buku
        </Link>

        <Link href="/usulan" className="bg-gray-200 text-gray-800 text-center px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
          Usulkan Buku Baru
        </Link>
      </div>
    </div>
  );
}
