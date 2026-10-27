function RingkasanPesanan({ baris, jumlahItem, totalHarga, setPesanan, onTambah, onKurang }) {
  return (
    <section className="rounded-2xl border border-amber-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold text-stone-900">Ringkasan Pesanan</h2>

      {baris.length === 0 ? (
        <p className="rounded-lg bg-amber-50 p-3 text-sm text-stone-600">
          Belum ada pesanan. Pilih menu lalu tekan Tambah.
        </p>
      ) : (
        <ul className="divide-y divide-stone-100">
          {baris.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-2 py-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-stone-900">{item.nama}</p>
                <p className="text-xs text-stone-500">
                  Rp {item.harga.toLocaleString("id-ID")} × {item.jumlah} = Rp{" "}
                  {item.subtotal.toLocaleString("id-ID")}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onKurang(item.id)}
                  aria-label={`Kurangi ${item.nama}`}
                  className="h-8 w-8 rounded-lg bg-stone-100 font-bold text-stone-700 hover:bg-stone-200"
                >
                  −
                </button>
                <span className="w-6 text-center text-sm font-semibold">{item.jumlah}</span>
                <button
                  type="button"
                  onClick={() => onTambah(item.id)}
                  aria-label={`Tambah ${item.nama}`}
                  className="h-8 w-8 rounded-lg bg-stone-100 font-bold text-stone-700 hover:bg-stone-200"
                >
                  +
                </button>

                
              </div>
              
            </li>
          ))}
          <div className="bg-amber-500 rounded-full inline-block ">
            <button
                onClick={() => (
                    setPesanan([])
                )}>
                  reset
                </button>
          </div>
          
        </ul>
        
      )}

      <div className="mt-3 flex items-center justify-between border-t border-stone-200 pt-3">
        <p className="text-sm text-stone-600">{jumlahItem} item</p>
        <p className="text-lg font-bold text-amber-700">
          Rp {totalHarga.toLocaleString("id-ID")}
        </p>
      </div>
    </section>
  );
}

export default RingkasanPesanan;
