function Navbar({ daftarKategori, kategoriAktif, onPilihKategori, jumlahItem, totalHarga }) {
  return (
    <header className="sticky top-0 z-10 bg-stone-900 text-amber-50 shadow-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div>
          <h1 className="text-xl font-bold tracking-wide">Kedai Kopi Senja</h1>
          <p className="text-xs text-amber-200">Pesan sendiri langsung dari meja Anda</p>
        </div>

        <div
          className="rounded-xl bg-amber-500 px-4 py-2 text-stone-900"
          aria-live="polite"
        >
          <span className="font-semibold">{jumlahItem} item</span>
          <span className="mx-2">•</span>
          <span className="font-bold">Rp {totalHarga.toLocaleString("id-ID")}</span>
        </div>
      </div>

      <nav
        className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 pb-3"
        aria-label="Kategori menu"
      >
        {daftarKategori.map((kategori) => (
          <button
            key={kategori}
            type="button"
            onClick={() => onPilihKategori(kategori)}
            aria-pressed={kategori === kategoriAktif}
            className={
              "whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition " +
              (kategori === kategoriAktif
                ? "bg-amber-500 text-stone-900"   
                : "bg-stone-700 text-amber-50 hover:bg-stone-600")
            }
          >
            {kategori}
          </button>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
