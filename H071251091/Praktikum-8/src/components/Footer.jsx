import Link from "next/link";

const tautan = [
  { label: "Beranda", path: "/" },
  { label: "Katalog", path: "/katalog" },
  { label: "Usulan Buku", path: "/usulan" },
];

export default function Footer() {
  const tahun = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-malam text-white/75">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <p className="font-serif text-lg font-semibold text-white">
            Pustaka <span className="text-senja">Senja</span>
          </p>
          <p className="mt-2 text-sm leading-relaxed">
            Ruang baca komunitas di dekat kampus. Buka setiap hari, gratis
            untuk membaca di tempat.
          </p>
        </div>

        <ul className="flex gap-5 text-sm">
          {tautan.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className="hover:text-senja focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-senja"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="border-t border-white/10 px-5 py-4 text-center text-xs text-white/50">
        © {tahun} Pustaka Senja. Dibuat untuk Tugas Praktikum 8.
      </p>
    </footer>
  );
}
