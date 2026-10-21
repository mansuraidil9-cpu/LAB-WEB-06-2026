import ig from "../assets/gallery/ig.jpg";
import tt from "../assets/gallery/tt.jpg";
import proyek from "../assets/gallery/proyek.jpg";
import vocation from "../assets/gallery/vocation.jpg";

function Gallery() {
  const galeriFoto = [
    { id: 1, src: ig, judul: "Instagram" },
    { id: 2, src: tt, judul: "Tiktok" },
    { id: 3, src: proyek, judul: "Proyek akhir LAB " },
    { id: 4, src: vocation, judul: "Vocation" },
  ];

  return (
    
    <section id="galeri" className="bg-white py-20 md:py-28">
      <div id="akun" className="mx-auto max-w-6xl px-5">
        <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
          Galeri
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {galeriFoto.map((foto) => (
            <figure key={foto.id} className="overflow-hidden">
              <img
                src={foto.src}
                alt={foto.judul}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-2xl object-cover"
              />
              <figcaption className="mt-3 font-medium text-ink/75">
                {foto.judul}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
