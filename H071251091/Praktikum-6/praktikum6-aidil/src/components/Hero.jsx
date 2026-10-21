function Hero() {
  const handleClick = () => {
    console.log("Tombol 'Lihat galeri' diklik, menuju bagian Galeri.");
    document.getElementById("galeri")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="beranda"
      className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-12 md:grid-cols-[1.25fr_1fr] md:gap-16 md:pb-28 md:pt-20"
    >
      <div className="order-2 md:order-1">
        <p className="text-lg font-medium text-laut">Halo, selamat datang.</p>
        <h1 className="mt-3 font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
          Saya Aidil, mahasiswa Sistem Informasi.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75">
          Saya kuliah di Universitas Hasanuddin, Makassar. Saya membangun
          aplikasi desktop dengan Java dan JavaFX, dan sekarang sedang
          mendalami pengembangan antarmuka web dengan React.
        </p>
        <div className="flex flex-wrap gap-6">
          <button
            type="button"
            onClick={handleClick}
            className="mt-9 cursor-pointer rounded-full bg-laut px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laut"
          >
            Lihat galeri
          </button>
        </div>
      </div>

      <div className="order-1 mx-auto w-full max-w-[17rem] sm:max-w-xs md:order-2 md:max-w-sm">
        <div className="relative">
          <img
            src="/images/orgganteng.jpg"
            alt="Foto profil Ahmad Aidil Mansur"
            className="relative aspect-[4/5] rounded-full object-cover border bg-blue-900"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;