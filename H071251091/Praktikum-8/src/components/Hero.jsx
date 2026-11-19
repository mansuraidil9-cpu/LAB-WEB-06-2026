import dataBuku from "@/data/dataBuku";

// Warna punggung buku mengikuti kategori; tingginya bervariasi agar terlihat seperti rak sungguhan.
const warnaKategori = {
  Teknologi: "bg-lembayung",
  Fiksi: "bg-mawar",
  "Pengembangan Diri": "bg-senja",
};
const tinggi = ["h-32", "h-40", "h-36", "h-44"];

export default function Hero({ nama, slogan, lokasi, jam, children }) {
  return (
    <section className="bg-linear-to-b from-malam via-ungu to-[#8a4a78] text-white">
      <div className="mx-auto max-w-5xl px-5 pt-14 sm:pt-20">
        <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {nama}
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/80">
          {slogan}
        </p>
        <p className="mt-4 text-sm text-white/70">
          {lokasi}. Buka {jam}.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">{children}</div>

        {/* Rak: satu punggung buku untuk setiap judul di koleksi */}
        <div
          aria-hidden="true"
          className="mt-14 flex items-end gap-1.5 border-b-8 border-malam sm:gap-2"
        >
          {dataBuku.map((buku) => (
            <div
              key={buku.id}
              className={`w-full max-w-14 rounded-t-sm ${
                warnaKategori[buku.kategori]
              } ${tinggi[Number(buku.id) % tinggi.length]}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
