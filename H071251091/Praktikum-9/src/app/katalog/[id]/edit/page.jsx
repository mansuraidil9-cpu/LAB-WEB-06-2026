import Link from "next/link";
import pool from "@/lib/db";
import { parseId } from "@/lib/validasi";
import { ubahBuku } from "@/app/katalog/actions";
import FormBuku from "@/components/FormBuku";
import BukuTidakDitemukan from "@/components/BukuTidakDitemukan";

export default async function EditBukuPage({ params }) {
    const { id } = await params;

    const idBuku = parseId(id);
    if (idBuku === null) {
        return <BukuTidakDitemukan id={id} />;
    }

    const hasil = await pool.query("SELECT * FROM buku WHERE id = $1", [idBuku]);
    const buku = hasil.rows[0];

    if (!buku) {
        return <BukuTidakDitemukan id={id} />;
    }

    // Nilai form selalu berupa teks, jadi tahun dan tersedia diubah ke string.
    const nilaiAwal = {
        judul: buku.judul,
        penulis: buku.penulis,
        kategori: buku.kategori,
        tahun: String(buku.tahun),
        tersedia: String(buku.tersedia),
        sinopsis: buku.sinopsis,
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-xl">
            <Link href={`/katalog/${buku.id}`} className="inline-block text-amber-700 hover:underline mb-6 font-medium text-sm">
                ← Kembali ke Detail
            </Link>

            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Edit Buku
            </h1>

            <FormBuku
                action={ubahBuku.bind(null, buku.id)}
                nilaiAwal={nilaiAwal}
                labelTombol="Simpan Perubahan"
                urlBatal={`/katalog/${buku.id}`}
            />
        </div>
    );
}
