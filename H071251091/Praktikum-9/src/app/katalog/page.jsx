import Link from "next/link";
import pool from "@/lib/db";
import BukuCard from "@/components/BukuCard";

export default async function KatalogPage({ searchParams }) {
    const { kategori, tersedia } = await searchParams;
    const kategoriAktif = typeof kategori === "string" && kategori ? kategori : "Semua";
    const hanyaTersedia = tersedia === "true";

    // Daftar kategori diambil dari data yang benar-benar ada di tabel.
    const hasilKategori = await pool.query(
        "SELECT DISTINCT kategori FROM buku ORDER BY kategori"
    );
    const daftarKategori = ["Semua", ...hasilKategori.rows.map((baris) => baris.kategori)];

    const hasilTotal = await pool.query("SELECT COUNT(*)::int AS total FROM buku");
    const totalBuku = hasilTotal.rows[0].total;

    // Filter kategori dikirim sebagai parameter ($1), bukan digabung ke teks SQL.
    const hasilBuku =
        kategoriAktif === "Semua"
            ? await pool.query("SELECT * FROM buku ORDER BY id")
            : await pool.query("SELECT * FROM buku WHERE kategori = $1 ORDER BY id", [kategoriAktif]);
    const bukuTersaring = hanyaTersedia
        ? hasilBuku.rows.filter((buku) => buku.tersedia === true)
        : hasilBuku.rows;

    // Kolom tersedia bertipe boolean, jadi hitung baris yang bernilai true.
    const hasilTersedia = await pool.query(
        "SELECT COUNT(*)::int AS total FROM buku WHERE tersedia = true"
    );
    const totalTersedia = hasilTersedia.rows[0].total;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-amber-500 mb-6 text-center">
                Katalog Buku Pustaka Senja
            </h1>

            <div className="flex justify-center mb-6">
                <Link
                    href="/katalog/tambah"
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    + Tambah Buku
                </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {daftarKategori.map((nama) => (
                    <Link
                        key={nama}
                        href={nama === "Semua" ? "/katalog" : `/katalog?kategori=${encodeURIComponent(nama)}`}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                            kategoriAktif === nama
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                    >
                        {nama}
                    </Link>
                ))}
            </div>

            {bukuTersaring.length === 0 ? (
                <p className="text-center text-gray-500 py-12">
                    {hanyaTersedia ? "Belum ada buku tersedia." : "Belum ada buku pada kategori ini."}
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bukuTersaring.map((buku) => (
                        <BukuCard key={buku.id} buku={buku} />
                    ))}
                </div>
            )}

            <div className="text-center text-sm text-gray-500 mt-8">
                {hanyaTersedia
                    ? `Buku tersedia ditampilkan: ${bukuTersaring.length} judul`
                    : kategoriAktif === "Semua"
                      ? `Seluruh buku: ${totalBuku} buku`
                      : `Buku ${kategoriAktif}: ${bukuTersaring.length} dari ${totalBuku} buku`}
            </div>

            <div className="text-center text-sm text-gray-500 mt-8">
                {hanyaTersedia
                    ? `Total buku tersedia: ${bukuTersaring.length} judul`
                    : kategoriAktif === "Semua"
                    ? `Buku tersedia: ${totalTersedia} judul`
                    : `Buku tersedia dalam kategori ${kategoriAktif}: ${
                          bukuTersaring.filter((buku) => buku.tersedia === true).length
                      } judul`}
            </div>
        </div>
    );
}
