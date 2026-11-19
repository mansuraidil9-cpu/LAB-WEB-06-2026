import Link from "next/link";

export default function BukuTidakDitemukan({ id }) {
    return (
        <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
                Buku Tidak Ditemukan!
            </h1>
            <p className="text-gray-600 mb-6">
                Buku dengan ID : {id} tidak dapat ditemukan.
            </p>
            <Link
                href="/katalog"
                className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
                Kembali ke Katalog
            </Link>
        </div>
    );
}
