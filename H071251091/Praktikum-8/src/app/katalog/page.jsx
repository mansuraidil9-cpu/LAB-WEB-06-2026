"use client";

import { useState } from "react";
import BukuCard from "@/components/BukuCard";
import dataBuku from "@/data/dataBuku";

const daftarKategori = ["Semua", "Teknologi", "Fiksi", "Pengembangan Diri"];

export default function Katalog() {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");

  const bukuTampil =
    kategoriAktif === "Semua"
      ? dataBuku
      : dataBuku.filter((buku) => buku.kategori === kategoriAktif);

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <h1 className="font-serif text-3xl font-semibold">Katalog buku</h1>
      <p className="mt-2 text-ungu">
        Menampilkan {bukuTampil.length} dari {dataBuku.length} buku.
      </p>

      <div
        role="group"
        aria-label="Filter kategori"
        className="mt-6 flex flex-wrap gap-2"
      >
        {daftarKategori.map((kategori) => {
          const aktif = kategori === kategoriAktif;
          return (
            <button
              key={kategori}
              type="button"
              onClick={() => setKategoriAktif(kategori)}
              aria-pressed={aktif}
              className={`rounded-full border px-4 py-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-senja ${
                aktif
                  ? "border-malam bg-malam text-white"
                  : "border-garis bg-white hover:border-malam"
              }`}
            >
              {kategori}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {bukuTampil.map((buku) => (
          <BukuCard
            key={buku.id}
            id={buku.id}
            judul={buku.judul}
            penulis={buku.penulis}
            kategori={buku.kategori}
            tahun={buku.tahun}
            tersedia={buku.tersedia}
          />
        ))}
      </div>
    </div>
  );
}
