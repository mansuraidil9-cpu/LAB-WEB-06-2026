function Navbar() {
  const menu = [
    { id: "beranda", label: "Beranda" },
    { id: "tentang", label: "Tentang" },
    { id: "keahlian", label: "Keahlian" },
    { id: "galeri", label: "Galeri" },
  ];

  const handleMenuClick = (namaMenu) => {
    console.log("Menu diklik:", namaMenu);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4"
      >
        <a
          href="#beranda"
          onClick={() => handleMenuClick("Logo")}
          className="font-display text-xl font-extrabold tracking-tight"
        >
          Aidil Mansur
        </a>

        <input id="menu-toggle" type="checkbox" className="peer sr-only" />
        <label
          htmlFor="menu-toggle"
          className="flex cursor-pointer items-center gap-2 rounded-lg border border-ink/20 px-3 py-2 text-sm font-semibold peer-focus-visible:ring-2 peer-focus-visible:ring-laut md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          Menu
        </label>

        <ul className="absolute left-0 right-0 top-full hidden flex-col gap-1 border-b border-ink/10 bg-paper px-5 py-3 peer-checked:flex md:static md:flex md:flex-row md:gap-8 md:border-0 md:bg-transparent md:p-0">
          {menu.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => handleMenuClick(item.label)}
                className="block rounded-md py-2 text-base font-medium text-ink/80 transition-colors hover:text-laut focus-visible:outline-2 focus-visible:outline-laut md:py-0"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
