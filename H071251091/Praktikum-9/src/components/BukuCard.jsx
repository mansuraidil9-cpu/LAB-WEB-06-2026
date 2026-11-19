"use client";

import { useState } from "react";
import Link from "next/link";
import TombolHapus from "@/components/TombolHapus";

export default function BukuCard({buku}) {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <div className="bg-white p-5 rounded-lg shadow-md border border-gray-100 flex flex-col justify-between">
            <div>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-amber-700">
                        {buku.kategori}
                    </span>
                    <span className={`text-xs px-2.5 py-0.5 rounded font-medium ${
                        buku.tersedia
                            ?"bg-green-100 text-green-800"
                            :"bg-red-100 text-red-800"
                    }`}>
                        {buku.tersedia
                            ?"Tersedia"
                            :"Sedang Dipinjam"}
                    </span>
                </div>

                <h3 className="text-amber-500">
                    {buku.judul}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                    Penulis: {buku.penulis}
                </p>
                <p className="text-xs text-gray-500 mb-4">
                    Tahun: {buku.tahun}
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <button onClick={() => setIsFavorite(!isFavorite)}
                    className={`px-3 py-1.5 text-xs rounded-md font-medium transition ${
                        isFavorite
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}>
                        {isFavorite
                        ? "❤️ Favorit"
                        : "🤍 Simpan" }
                </button>

                <Link
                    href={`/katalog/${buku.id}`}
                    className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-md font-medium hover:bg-blue-700 transition">
                    Lihat Detail
                </Link>

                <Link
                    href={`/katalog/${buku.id}/edit`}
                    className="text-xs bg-amber-500 text-white px-3 py-1.5 rounded-md font-medium hover:bg-amber-600 transition">
                    Edit
                </Link>

                <TombolHapus id={buku.id} judul={buku.judul} />
            </div>
        </div>
    )
}
