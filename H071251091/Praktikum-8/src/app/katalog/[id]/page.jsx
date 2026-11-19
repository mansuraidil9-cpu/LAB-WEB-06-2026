import Link from "next/link";
import dataBuku from "@/data/dataBuku";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const buku = dataBuku.find((item) => item.id === id);
  return { title: buku ? buku.judul : "Buku tidak ditemukan" };
}

export default async function DetailBuku({ params }) {
  const { id } = await params;
  const buku = dataBuku.find((item) => item.id === id);

  if (!buku) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-16 text-center">
        <h1 className="font-serif text-3xl font-semibold">
          Buku tidak ditemukan
        </h1>
        <p className="mt-3 text-ungu">
          Tidak ada buku dengan nomor &quot;{id}&quot; di koleksi Pustaka Senja.
          Coba pilih dari katalog.
        </p>
        <Link
          href="/katalog"
          className="mt-6 inline-block rounded-md bg-malam px-5 py-3 font-semibold text-white hover:bg-ungu focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-senja"
        >
          Kembali ke katalog
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <Link
        href="/katalog"
        className="text-sm font-medium text-ungu underline underline-offset-4 hover:text-malam focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-senja"
      >
        Kembali ke katalog
      </Link>

      <article className="mt-6 rounded-lg border border-garis bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-lembayung">
            {buku.kategori}
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              buku.tersedia
                ? "bg-emerald-100 text-emerald-800"
                : "bg-rose-100 text-rose-800"
            }`}
          >
            {buku.tersedia ? "Tersedia" : "Sedang Dipinjam"}
          </span>
        </div>

        <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
          {buku.judul}
        </h1>

        <dl className="mt-5 grid grid-cols-2 gap-4 border-y border-garis py-4 text-sm">
          <div>
            <dt className="text-ungu">Penulis</dt>
            <dd className="mt-0.5 font-semibold">{buku.penulis}</dd>
          </div>
          <div>
            <dt className="text-ungu">Tahun terbit</dt>
            <dd className="mt-0.5 font-semibold">{buku.tahun}</dd>
          </div>
        </dl>

        <h2 className="mt-6 font-serif text-xl font-semibold">Sinopsis</h2>
        <p className="mt-2 max-w-prose leading-relaxed">{buku.sinopsis}</p>
      </article>
    </div>
  );
}
