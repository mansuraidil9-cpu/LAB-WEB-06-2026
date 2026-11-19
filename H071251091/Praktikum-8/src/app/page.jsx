import Link from "next/link";
import Hero from "@/components/Hero";
import dataBuku from "@/data/dataBuku";

export default function Beranda() {
  // Statistik dihitung dari data, bukan ditulis manual.
  const total = dataBuku.length;
  const tersedia = dataBuku.filter((buku) => buku.tersedia).length;
  const dipinjam = dataBuku.filter((buku) => !buku.tersedia).length;

  const statistik = [
    { label: "Total koleksi buku", nilai: total },
    { label: "Buku tersedia", nilai: tersedia },
    { label: "Buku dipinjam", nilai: dipinjam },
  ];

  return (
    <>
      <Hero
        nama="Pustaka Senja"
        slogan="Ruang baca komunitas untuk membaca pelan-pelan selepas kuliah. Pilih buku, duduk, dan lanjutkan besok kalau belum selesai."
        lokasi="Jl. Perintis Kemerdekaan, dekat kampus"
        jam="setiap hari, pukul 10.00 sampai 21.00 WITA"
      >
        <Link
          href="/katalog"
          className="rounded-md bg-senja px-5 py-3 font-semibold text-malam hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Lihat katalog
        </Link>
        <Link
          href="/usulan"
          className="rounded-md border border-white/60 px-5 py-3 font-semibold text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Usulkan buku
        </Link>
      </Hero>

      <section
        aria-labelledby="judul-statistik"
        className="mx-auto max-w-5xl px-5 py-12"
      >
        <h2 id="judul-statistik" className="font-serif text-2xl font-semibold">
          Koleksi saat ini
        </h2>
        <dl className="mt-6 grid gap-4 sm:grid-cols-3">
          {statistik.map((item) => (
            <div
              key={item.label}
              className="flex flex-col-reverse rounded-lg border border-garis bg-white px-5 py-5"
            >
              <dt className="mt-1 text-sm text-ungu">{item.label}</dt>
              <dd className="font-serif text-4xl font-semibold">
                {item.nilai}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
