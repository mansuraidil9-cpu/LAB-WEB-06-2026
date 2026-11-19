export const DAFTAR_KATEGORI = ["Teknologi", "Fiksi", "Pengembangan Diri", "Lainnya"];

// Mengubah id dari URL menjadi angka. Hasilnya null kalau id bukan
// bilangan bulat positif yang muat di kolom INT milik PostgreSQL.
export function parseId(id) {
    const teks = String(id);
    if (!/^\d+$/.test(teks)) return null;

    const angka = Number(teks);
    if (angka < 1 || angka > 2147483647) return null;

    return angka;
}

// Memeriksa isian form buku. Mengembalikan:
// - values : isian apa adanya (untuk mengisi ulang form kalau ada error)
// - error  : objek pesan per kolom, atau null kalau semua valid
// - data   : nilai yang sudah dikonversi tipenya, siap masuk query
export function validasiBuku(formData) {
    const ambil = (nama) => String(formData.get(nama) ?? "").trim();

    const values = {
        judul: ambil("judul"),
        penulis: ambil("penulis"),
        kategori: ambil("kategori"),
        tahun: ambil("tahun"),
        tersedia: ambil("tersedia"),
        sinopsis: ambil("sinopsis"),
    };

    const error = {};
    const tahunIni = new Date().getFullYear();

    if (!values.judul) error.judul = "Judul wajib diisi.";
    else if (values.judul.length > 200) error.judul = "Judul maksimal 200 karakter.";

    if (!values.penulis) error.penulis = "Penulis wajib diisi.";
    else if (values.penulis.length > 120) error.penulis = "Nama penulis maksimal 120 karakter.";

    if (!DAFTAR_KATEGORI.includes(values.kategori)) {
        error.kategori = "Pilih salah satu kategori yang tersedia.";
    }

    if (!values.tahun) {
        error.tahun = "Tahun terbit wajib diisi.";
    } else if (!/^\d{4}$/.test(values.tahun)) {
        error.tahun = "Tahun terbit harus berupa angka 4 digit.";
    } else if (Number(values.tahun) > tahunIni) {
        error.tahun = `Tahun terbit tidak boleh lebih dari ${tahunIni}.`;
    }

    if (values.tersedia !== "true" && values.tersedia !== "false") {
        error.tersedia = "Pilih status ketersediaan buku.";
    }

    if (!values.sinopsis) error.sinopsis = "Sinopsis wajib diisi.";

    const adaError = Object.keys(error).length > 0;

    return {
        values,
        error: adaError ? error : null,
        data: adaError
            ? null
            : {
                  judul: values.judul,
                  penulis: values.penulis,
                  kategori: values.kategori,
                  tahun: Number(values.tahun),
                  tersedia: values.tersedia === "true",
                  sinopsis: values.sinopsis,
              },
    };
}
