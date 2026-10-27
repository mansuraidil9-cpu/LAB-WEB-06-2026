import { useState } from "react";

function MenuCard({ id, nama, kategori, harga, tersedia, deskripsi, jumlah, onTambah }) {
  // Detail dibuka per kartu, jadi tidak memengaruhi menu lain.
  const [detailTerbuka, setDetailTerbuka] = useState(false);

  return (
    <article
      className={
        "flex flex-col rounded-2xl border bg-white p-4 shadow-sm " +
        (tersedia ? "border-amber-200" : "border-stone-200 opacity-70")
      }
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-stone-900">{nama}</h3>
          <span className="mt-1 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
            {kategori}
          </span>
        </div>
        <p className="whitespace-nowrap font-bold text-amber-700">
          Rp {harga.toLocaleString("id-ID")}
        </p>
      </div>

      {detailTerbuka && (
        <p className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-stone-700">
          {deskripsi}
        </p>
      )}

      {!tersedia && (
        <p className="mt-3 text-sm font-semibold text-red-600">Sedang habis</p>
      )}

      <div className="mt-4 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setDetailTerbuka(!detailTerbuka)}
          aria-expanded={detailTerbuka}
          className="rounded-lg px-3 py-2 text-sm font-medium text-stone-600 hover:bg-stone-100"
        >
          {detailTerbuka ? "Tutup detail" : "Lihat detail"}
        </button>

        <button
          type="button"
          onClick={() => onTambah(id)}
          disabled={!tersedia}
          className={
            "rounded-lg px-4 py-2 text-sm font-semibold transition " +
            (tersedia
              ? "bg-stone-900 text-amber-50 hover:bg-stone-700"
              : "cursor-not-allowed bg-stone-200 text-stone-400")
          }
        >
          {tersedia ? (jumlah > 0 ? `Tambah (${jumlah})` : "Tambah") : "Habis"}
        </button>
      </div>
    </article>
  );
}

export default MenuCard;
