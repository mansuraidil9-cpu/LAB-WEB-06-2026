import Link from "next/link";
import pool from "@/lib/db";
import { parseId } from "@/lib/validasi";
import TombolHapus from "@/components/TombolHapus";
import BukuTidakDitemukan from "@/components/BukuTidakDitemukan";

export default async function DetailBukuPage({ params }) {
    const { id } = await params;

    // ID dari URL harus angka valid dulu, kalau tidak PostgreSQL akan error saat membandingkan dengan kolom INT.
    const idBuku = parseId(id);
    if (idBuku === null) {
        return <BukuTidakDitemukan id={id} />;
    }

    const hasil = await pool.query("SELECT * FROM buku WHERE id = $1", [idBuku]);
    const buku = hasil.rows[0];

    // Jika buku tidak ditemukan
    if (!buku) {
        return <BukuTidakDitemukan id={id} />;
    }

    // Jika buku ditemukan (tampilkan informasi lengkap)
    return (
        <div className="container mx-auto px-4 py-8">
            <Link href="/katalog" className="inline-block text-amber-700 hover:underline mb-6 font-medium text-sm">
                ← Kembali ke Katalog
            </Link>

            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-medium">
                            {buku.kategori}
                        </span>
                        <h1 className="text-3xl font-bold text-gray-800 mt-2">
                            {buku.judul}
                        </h1>
                        <p className="text-xl text-gray-700 mt-2">
                            Penulis: {buku.penulis}
                        </p>
                    </div>
                    <span className={`text-sm px-3 py-1 rounded font-medium ${
                        buku.tersedia
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                    }`}>
                        {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
                    </span>
                </div>

                <p className="text-sm text-gray-500 mb-6">
                    Tahun Terbit: {buku.tahun}
                </p>
                <div className="border-t border-gray-100 pt-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-3">
                        Sinopsis
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        {buku.sinopsis}
                    </p>
                </div>

                <div className="flex items-center gap-2 mt-8">
                    <Link
                        href={`/katalog/${buku.id}/edit`}
                        className="text-xs bg-amber-500 text-white px-3 py-1.5 rounded-md font-medium hover:bg-amber-600 transition"
                    >
                        Edit
                    </Link>
                    <TombolHapus id={buku.id} judul={buku.judul} />
                </div>
            </div>
        </div>
    );
}
