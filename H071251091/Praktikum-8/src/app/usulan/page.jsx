"use client";

import { useState } from "react";

const opsiKategori = ["Teknologi", "Fiksi", "Pengembangan Diri"];
const formAwal = { nama: "", judul: "", kategori: "", alasan: "" };

const kelasInput =
  "mt-1 w-full rounded-md border border-garis bg-white px-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-senja";

export default function Usulan() {
  const [form, setForm] = useState(formAwal);
  const [pesan, setPesan] = useState(null);
  const [daftarUsulan, setDaftarUsulan] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((sebelumnya) => ({ ...sebelumnya, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const bersih = {
      nama: form.nama.trim(),
      judul: form.judul.trim(),
      kategori: form.kategori.trim(),
      alasan: form.alasan.trim(),
    };

    if (!bersih.nama || !bersih.judul || !bersih.kategori || !bersih.alasan) {
      setPesan({
        jenis: "peringatan",
        teks: "Formulir belum lengkap. Isi semua kolom sebelum mengirim.",
      });
      return;
    }

    setDaftarUsulan((sebelumnya) => [
      { id: `${Date.now()}-${sebelumnya.length}`, ...bersih },
      ...sebelumnya,
    ]);
    setForm(formAwal);
    setPesan({
      jenis: "sukses",
      teks: `Terima kasih, ${bersih.nama}. Usulan "${bersih.judul}" berhasil dikirim.`,
    });
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="font-serif text-3xl font-semibold">Usulan buku</h1>
      <p className="mt-2 max-w-prose text-ungu">
        Ada buku yang ingin kamu baca di sini? Tulis judulnya dan alasanmu.
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-8 space-y-5 rounded-lg border border-garis bg-white p-6"
      >
        <div>
          <label htmlFor="nama" className="text-sm font-medium">
            Nama pengusul
          </label>
          <input
            id="nama"
            name="nama"
            type="text"
            value={form.nama}
            onChange={handleChange}
            className={kelasInput}
          />
        </div>

        <div>
          <label htmlFor="judul" className="text-sm font-medium">
            Judul buku yang diusulkan
          </label>
          <input
            id="judul"
            name="judul"
            type="text"
            value={form.judul}
            onChange={handleChange}
            className={kelasInput}
          />
        </div>

        <div>
          <label htmlFor="kategori" className="text-sm font-medium">
            Kategori
          </label>
          <select
            id="kategori"
            name="kategori"
            value={form.kategori}
            onChange={handleChange}
            className={kelasInput}
          >
            <option value="">Pilih kategori</option>
            {opsiKategori.map((kategori) => (
              <option key={kategori} value={kategori}>
                {kategori}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="alasan" className="text-sm font-medium">
            Alasan usulan
          </label>
          <textarea
            id="alasan"
            name="alasan"
            rows={4}
            value={form.alasan}
            onChange={handleChange}
            className={kelasInput}
          />
        </div>

        {pesan && (
          <p
            role={pesan.jenis === "peringatan" ? "alert" : "status"}
            className={`rounded-md px-4 py-3 text-sm font-medium ${
              pesan.jenis === "peringatan"
                ? "bg-amber-100 text-amber-900"
                : "bg-emerald-100 text-emerald-900"
            }`}
          >
            {pesan.teks}
          </p>
        )}

        <button
          type="submit"
          className="rounded-md bg-malam px-5 py-3 font-semibold text-white hover:bg-ungu focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-senja"
        >
          Kirim usulan
        </button>
      </form>

      <section aria-labelledby="judul-usulan" className="mt-10">
        <h2 id="judul-usulan" className="font-serif text-xl font-semibold">
          Usulan sesi ini
        </h2>
        {daftarUsulan.length === 0 ? (
          <p className="mt-2 text-sm text-ungu">
            Belum ada usulan. Usulan yang kamu kirim akan muncul di sini.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {daftarUsulan.map((usulan) => (
              <li
                key={usulan.id}
                className="rounded-lg border border-garis bg-white p-4"
              >
                <p className="font-serif text-lg font-semibold">
                  {usulan.judul}
                </p>
                <p className="text-sm text-lembayung">
                  {usulan.kategori}, diusulkan oleh {usulan.nama}
                </p>
                <p className="mt-2 text-sm leading-relaxed">{usulan.alasan}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
