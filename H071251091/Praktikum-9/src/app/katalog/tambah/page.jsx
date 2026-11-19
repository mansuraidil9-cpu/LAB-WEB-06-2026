import Link from "next/link";
import FormBuku from "@/components/FormBuku";
import { tambahBuku } from "@/app/katalog/actions";
import { DAFTAR_KATEGORI } from "@/lib/validasi";

export default function TambahBukuPage() {
    const nilaiAwal = {
        judul: "",
        penulis: "",
        kategori: DAFTAR_KATEGORI[0],
        tahun: "",
        tersedia: "true",
        sinopsis: "",
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-xl">
            <Link href="/katalog" className="inline-block text-amber-700 hover:underline mb-6 font-medium text-sm">
                ← Kembali ke Katalog
            </Link>

            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Tambah Buku Baru
            </h1>

            <FormBuku
                action={tambahBuku}
                nilaiAwal={nilaiAwal}
                labelTombol="Simpan Buku"
                urlBatal="/katalog"
            />
        </div>
    );
}
