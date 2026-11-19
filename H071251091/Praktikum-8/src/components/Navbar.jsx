"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { label: "Beranda", path: "/" },
  { label: "Katalog", path: "/katalog" },
  { label: "Usulan Buku", path: "/usulan" },
];

// "/" hanya aktif di "/" persis; menu lain tetap aktif di sub-halaman (mis. /katalog/4).
function isAktif(pathname, path) {
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-malam text-white">
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-3"
      >
        <Link
          href="/"
          className="font-serif text-xl font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-senja"
        >
          Pustaka <span className="text-senja">Senja</span>
        </Link>

        <ul className="flex items-center gap-1">
          {menu.map((item) => {
            const aktif = isAktif(pathname, item.path);
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  aria-current={aktif ? "page" : undefined}
                  className={`inline-block border-b-2 px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-senja ${
                    aktif
                      ? "border-senja text-senja"
                      : "border-transparent text-white/75 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
