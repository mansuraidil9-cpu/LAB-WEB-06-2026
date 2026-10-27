import { useState } from "react";
import Navbar from "./components/Navbar";
import MenuList from "./components/MenuList";
import RingkasanPesanan from "./components/RingkasanPesanan";
import FormPesan from "./components/FormPesan";
import Footer from "./components/Footer";

// Satu-satunya sumber data menu. Komponen anak hanya menerimanya lewat props.
const dataMenu = [
  { id: 1, nama: "Kopi Susu", kategori: "Kopi", harga: 18000, tersedia: true, deskripsi: "Espresso dengan susu segar dan gula aren." },
  { id: 2, nama: "Americano", kategori: "Kopi", harga: 15000, tersedia: true, deskripsi: "Espresso dengan air panas, rasa kuat dan bersih." },
  { id: 3, nama: "Cappuccino", kategori: "Kopi", harga: 22000, tersedia: true, deskripsi: "Espresso, susu panas, dan busa susu tebal." },
  { id: 4, nama: "Matcha Latte", kategori: "Non-Kopi", harga: 24000, tersedia: true, deskripsi: "Teh hijau matcha dengan susu." },
  { id: 5, nama: "Teh Tarik", kategori: "Non-Kopi", harga: 14000, tersedia: false, deskripsi: "Teh susu yang ditarik hingga berbusa." },
  { id: 6, nama: "Cokelat Panas", kategori: "Non-Kopi", harga: 20000, tersedia: true, deskripsi: "Cokelat pekat dengan susu hangat." },
  { id: 7, nama: "Roti Bakar", kategori: "Makanan", harga: 16000, tersedia: true, deskripsi: "Roti tebal dengan selai cokelat dan keju." },
  { id: 8, nama: "Pisang Goreng", kategori: "Makanan", harga: 12000, tersedia: false, deskripsi: "Pisang goreng renyah dengan taburan keju." },
  { id: 9, nama: "Nasi Goreng", kategori: "Makanan", harga: 25000, tersedia: true, deskripsi: "Nasi goreng kampung dengan telur mata sapi." },
];

const daftarKategori = ["Semua", "Kopi", "Non-Kopi", "Makanan"];

function App() {
  // kategori yang sedang dipilih (hanya ada di sini)
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  // pesanan hanya menyimpan id dan jumlah; nama, harga, total dihitung dari dataMenu
  const [pesanan, setPesanan] = useState([]);
  // data ucapan terima kasih setelah pesanan terkirim (null = tidak tampil)
  const [ucapan, setUcapan] = useState(null);

  const menuTampil =
    kategoriAktif === "Semua"
      ? dataMenu
      : dataMenu.filter((menu) => menu.kategori === kategoriAktif);


  // Turunan dari state pesanan, bukan state baru, sehingga angka di Navbar
  // dan di Ringkasan selalu sama.
  const barisPesanan = pesanan.map((item) => {
    const menu = dataMenu.find((m) => m.id === item.id);
    return { 
      id: item.id,
      nama: menu.nama,
      harga: menu.harga,
      jumlah: item.jumlah,
      subtotal: menu.harga * item.jumlah,
    };
  });
  const jumlahItem = barisPesanan.reduce((total, baris) => total + baris.jumlah, 0);
  const totalHarga = barisPesanan.reduce((total, baris) => total + baris.subtotal, 0);

  function tambahMenu(id) {
    const menu = dataMenu.find((m) => m.id === id);
    if (!menu || !menu.tersedia) return; // menu habis tidak boleh dipesan

    setUcapan(null);
    setPesanan((sebelumnya) =>
      sebelumnya.some((item) => item.id === id)
        ? sebelumnya.map((item) =>
            item.id === id ? { ...item, jumlah: item.jumlah + 1 } : item
          )
        : [...sebelumnya, { id: id, jumlah: 1 }]
    );
  }

  function kurangiMenu(id) {
    setPesanan((sebelumnya) =>
      sebelumnya
        .map((item) => (item.id === id ? { ...item, jumlah: item.jumlah - 1 } : item))
        .filter((item) => item.jumlah > 0)
    );
  }

  function kirimPesanan(data) {
    setUcapan({ nama: data.nama, meja: data.meja, total: totalHarga });
    setPesanan([]);
  }

  return (
    <div className="flex min-h-screen flex-col bg-amber-50 text-stone-800">
      <Navbar
        daftarKategori={daftarKategori}
        kategoriAktif={kategoriAktif}
        onPilihKategori={setKategoriAktif}
        jumlahItem={jumlahItem}
        totalHarga={totalHarga}
      />

      <main className="mx-auto grid w-full max-w-6xl flex-1 gap-6 px-4 py-6 lg:grid-cols-3">
        <section className="lg:col-span-2" aria-label="Daftar menu">
          <h2 className="mb-4 text-lg font-semibold text-stone-900">
            Menu {kategoriAktif === "Semua" ? "Lengkap" : kategoriAktif}
          </h2>
          <MenuList menu={menuTampil} pesanan={pesanan} onTambah={tambahMenu} />
        </section>

        <aside className="space-y-6 lg:sticky lg:top-36 lg:self-start">
          <RingkasanPesanan
            baris={barisPesanan}
            jumlahItem={jumlahItem}
            totalHarga={totalHarga}
            setPesanan={setPesanan}
            onTambah={tambahMenu}
            onKurang={kurangiMenu}
          />
          <FormPesan
            jumlahItem={jumlahItem}
            ucapan={ucapan}
            onKirim={kirimPesanan}
          />
        </aside>
      </main>

      <Footer />
    </div>
  );
}

export default App;
