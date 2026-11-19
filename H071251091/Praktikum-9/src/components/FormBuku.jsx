"use client";

import Link from "next/link";
import { useActionState } from "react";
import { DAFTAR_KATEGORI } from "@/lib/validasi";

const stateAwal = { error: null, values: null };

const kelasInput =
    "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white";

function PesanError({ pesan }) {
    if (!pesan) return null;
    return <p className="text-sm text-red-600 mt-1">{pesan}</p>;
}

export default function FormBuku({ action, nilaiAwal, labelTombol, urlBatal }) {
    const [state, formAction, sedangProses] = useActionState(action, stateAwal);

    // Kalau server menolak isian, form diisi ulang dengan isian terakhir pengguna.
    const nilai = state.values ?? nilaiAwal;
    const error = state.error ?? {};

    return (
        <form
            action={formAction}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-100 space-y-4"
        >
            {error.umum && (
                <div className="p-3 bg-red-100 border border-red-300 text-red-800 rounded-lg text-sm">
                    {error.umum}
                </div>
            )}

            <div>
                <label htmlFor="judul" className="block text-sm font-medium text-gray-700 mb-1">
                    Judul Buku
                </label>
                <input id="judul" name="judul" type="text" required
                    defaultValue={nilai.judul} className={kelasInput} />
                <PesanError pesan={error.judul} />
            </div>

            <div>
                <label htmlFor="penulis" className="block text-sm font-medium text-gray-700 mb-1">
                    Penulis
                </label>
                <input id="penulis" name="penulis" type="text" required
                    defaultValue={nilai.penulis} className={kelasInput} />
                <PesanError pesan={error.penulis} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="kategori" className="block text-sm font-medium text-gray-700 mb-1">
                        Kategori
                    </label>
                    <select id="kategori" name="kategori"
                        defaultValue={nilai.kategori} className={kelasInput}>
                        {DAFTAR_KATEGORI.map((kategori) => (
                            <option key={kategori} value={kategori}>
                                {kategori}
                            </option>
                        ))}
                    </select>
                    <PesanError pesan={error.kategori} />
                </div>

                <div>
                    <label htmlFor="tahun" className="block text-sm font-medium text-gray-700 mb-1">
                        Tahun Terbit
                    </label>
                    <input id="tahun" name="tahun" type="number" required
                        defaultValue={nilai.tahun} className={kelasInput} />
                    <PesanError pesan={error.tahun} />
                </div>
            </div>

            <div>
                <label htmlFor="tersedia" className="block text-sm font-medium text-gray-700 mb-1">
                    Status Ketersediaan
                </label>
                <select id="tersedia" name="tersedia"
                    defaultValue={nilai.tersedia} className={kelasInput}>
                    <option value="true">Tersedia</option>
                    <option value="false">Sedang Dipinjam</option>
                </select>
                <PesanError pesan={error.tersedia} />
            </div>

            <div>
                <label htmlFor="sinopsis" className="block text-sm font-medium text-gray-700 mb-1">
                    Sinopsis
                </label>
                <textarea id="sinopsis" name="sinopsis" rows="5" required
                    defaultValue={nilai.sinopsis} className={kelasInput}></textarea>
                <PesanError pesan={error.sinopsis} />
            </div>

            <div className="flex gap-3">
                <button
                    type="submit"
                    disabled={sedangProses}
                    className="flex-1 bg-blue-600 text-white font-semibold py-2.5 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {sedangProses ? "Menyimpan..." : labelTombol}
                </button>
                <Link
                    href={urlBatal}
                    className="px-5 py-2.5 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 transition text-center"
                >
                    Batal
                </Link>
            </div>
        </form>
    );
}
