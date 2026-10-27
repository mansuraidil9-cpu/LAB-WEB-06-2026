import MenuCard from "./MenuCard";

function MenuList({ menu, pesanan, onTambah }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {menu.map((item) => {
        const dalamPesanan = pesanan.find((p) => p.id === item.id);
        return (
          <MenuCard
            key={item.id}
            id={item.id}
            nama={item.nama}
            kategori={item.kategori}
            harga={item.harga}
            tersedia={item.tersedia}
            deskripsi={item.deskripsi}
            jumlah={dalamPesanan ? dalamPesanan.jumlah : 0}
            onTambah={onTambah}
          />
        );
      })}
    </div>
  );
}

export default MenuList;
