import { useState } from "react";

function FormPesan({ jumlahItem, ucapan, onKirim }) {
  const [nama, setNama] = useState("");
  const [meja, setMeja] = useState("");
  const [galat, setGalat] = useState({ nama: "", meja: "", pesanan: "" });

  function handleSubmit(event) {
    event.preventDefault();

    const namaBersih = nama.trim();
    const mejaBersih = meja.trim();
    const galatBaru = { nama: "", meja: "", pesanan: "" };

    if (namaBersih === "") {
      galatBaru.nama = "Nama wajib diisi.";
    } else if (namaBersih.length < 2) {
      galatBaru.nama = "Nama minimal 2 karakter.";
    } else if (!/^[\p{L}\s.'-]+$/u.test(namaBersih)) {
      galatBaru.nama = "Nama hanya boleh berisi huruf.";
    }

    if (mejaBersih === "") {
      galatBaru.meja = "Nomor meja wajib diisi.";
    } else if (!/^\d+$/.test(mejaBersih) || Number(mejaBersih) < 1) {
      galatBaru.meja = "Nomor meja harus berupa angka bulat, minimal 1.";
    }

    if (jumlahItem === 0) {
      galatBaru.pesanan = "Pesanan masih kosong. Pilih menu dulu sebelum mengirim.";
    }

    setGalat(galatBaru);
    if (galatBaru.nama || galatBaru.meja || galatBaru.pesanan) return;

    onKirim({ nama: namaBersih, meja: Number(mejaBersih) });
    setNama("");
    setMeja("");
  }

  // Pesan "pesanan kosong" hilang sendiri begitu ada item di pesanan.
  const tampilGalatPesanan = galat.pesanan !== "" && jumlahItem === 0;

  return (
    <section className="rounded-2xl border border-amber-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold text-stone-900">Data Pemesan</h2>

      {ucapan && (
        <div
          role="status"
          className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800"
        >
          <p className="font-semibold">Terima kasih, {ucapan.nama}!</p>
          <p>
            Pesanan Anda untuk meja {ucapan.meja} sudah kami terima (total Rp{" "}
            {ucapan.total.toLocaleString("id-ID")}). Mohon ditunggu ya.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label htmlFor="nama" className="mb-1 block text-sm font-medium text-stone-700">
            Nama
          </label>
          <input
            id="nama"
            type="text"
            value={nama}
            onChange={(e) => {
              setNama(e.target.value);
              setGalat({ ...galat, nama: "" });
            }}
            placeholder="Nama Anda"
            aria-invalid={galat.nama !== ""}
            className={
              "w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 " +
              (galat.nama ? "border-red-400" : "border-stone-300")
            }
          />
          {galat.nama && <p className="mt-1 text-xs text-red-600">{galat.nama}</p>}
        </div>

        <div>
          <label htmlFor="meja" className="mb-1 block text-sm font-medium text-stone-700">
            Nomor Meja
          </label>
          <input
            id="meja"
            type="text"
            inputMode="numeric"
            value={meja}
            onChange={(e) => {
              setMeja(e.target.value);
              setGalat({ ...galat, meja: "" });
            }}
            placeholder="Contoh: 5"
            aria-invalid={galat.meja !== ""}
            className={
              "w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 " +
              (galat.meja ? "border-red-400" : "border-stone-300")
            }
          />
          {galat.meja && <p className="mt-1 text-xs text-red-600">{galat.meja}</p>}
        </div>

        {tampilGalatPesanan && (
          <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {galat.pesanan}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-amber-500 px-4 py-3 text-sm font-bold text-stone-900 transition hover:bg-amber-400"
        >
          Kirim Pesanan
        </button>
      </form>
    </section>
  );
}

export default FormPesan;
