"use client";

import { useState } from "react";
import Link from "next/link";

export default function BukuCard({ id, judul, penulis, kategori, tahun, tersedia }) {
  const [favorit, setFavorit] = useState(false);

  return (
    <article className="flex flex-col rounded-lg border border-garis bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="text-xs font-medium text-lembayung">{kategori}</span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            tersedia
              ? "bg-emerald-100 text-emerald-800"
              : "bg-rose-100 text-rose-800"
          }`}
        >
          {tersedia ? "Tersedia" : "Sedang Dipinjam"}
        </span>
      </div>

      <h3 className="mt-3 font-serif text-xl font-semibold leading-snug">
        {judul}
      </h3>
      <p className="mt-1 text-sm text-ungu">
        {penulis}, {tahun}
      </p>

      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
        <Link
          href={`/katalog/${id}`}
          className="rounded-md bg-malam px-4 py-2 text-sm font-semibold text-white hover:bg-ungu focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-senja"
        >
          Lihat Detail
        </Link>
        <button
          type="button"
          onClick={() => setFavorit((sebelumnya) => !sebelumnya)}
          aria-pressed={favorit}
          className={`rounded-md border px-3 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-senja ${
            favorit
              ? "border-mawar bg-mawar text-white"
              : "border-garis text-malam hover:border-mawar hover:text-mawar"
          }`}
        >
          {favorit ? "♥ Disimpan" : "♡ Simpan"}
        </button>
      </div>
    </article>
  );
}
