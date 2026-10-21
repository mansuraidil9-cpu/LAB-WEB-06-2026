function About() {
  const dataDiri = [
    { id: 1, label: "Nama lengkap", value: "Ahmad Aidil Mansur" },
    { id: 2, label: "NIM", value: "H071251091" },
    { id: 3, label: "Program studi", value: "Sistem Informasi" },
    { id: 4, label: "Universitas", value: "Universitas Hasanuddin (UNHAS)" },
    { id: 5, label: "Domisili", value: "Makassar, Sulawesi Selatan" },
    { id: 6, label: "Minat", value: "Pengembangan aplikasi desktop dan web" },
  ];

  return (
    <section id="tentang" className="bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            Tentang saya
          </h2>
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink/75">
            Saya Aidil, mahasiswa Sistem Informasi di Universitas Hasanuddin.
            Di kampus saya belajar sistem operasi, analisis algoritma, jaringan
            komputer, dan pemrograman berorientasi objek. Proyek kuliah saya
            banyak berupa aplikasi desktop Java dengan basis data SQLite, dan
            kini saya mulai membangun tampilan web dengan React.
          </p>
        </div>

        <dl className="divide-y divide-ink/10 border-y border-ink/10">
          {dataDiri.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[8.5rem_1fr] gap-4 py-4 sm:grid-cols-[10rem_1fr]"
            >
              <dt className="text-sm font-medium text-ink/60">{item.label}</dt>
              <dd className="font-semibold">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default About;
