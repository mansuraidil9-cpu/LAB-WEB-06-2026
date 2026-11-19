"use client"
import { useState } from "react";


export default function UsulanPage() {

    const [formData, setFormData] = useState({
        judul: "",
        penulis: "",
        kategori: "Teknologi",
        alasan: ""
    });
    
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({ ...prev, [name]: value}));
    };

    //fungsi penanganan saat tombol kirim usulan buku di klik
    const handleSubmit = (e) => {
        e.preventDefault(); //mencegah browser reload/refresh halaman
        setIsSubmitted(true);//muncul notifikasi sukses di layar

        setFormData({   //mengosongkan isi form setelah berhasil di kirim
            judul: "",
            penulis: "",
            kategori: "Teknologi",
            alasan: ""
        });
    };
    
    return(
            <div className="container mx-auto px-4 py-8 max-w-xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
                    Usulkan Buku Baru
                </h1>
                <p className="text-gray-600 text-center mb-8 text-sm">
                    Bantu kami memperkaya koleksi Pustaka Senja dengan merekomendasikan buku favoritmu.
                </p>

                {/*notifikasi muncul, kalau isSubmitted bernilai true*/}
                {isSubmitted && (
                    <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-800 rounded-lg text-center">
                        🎉 Terima kasih! Usulan bukumu telah berhasil dikirim.
                    </div>
                )}
                {/*input buku*/}
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 space-y-4">
                    <div>           {/*judul*/}
                        <label  className="block text-sm font-medium text-gray-700 mb-1">
                            Judul Buku
                        </label> 
                        <input type="text"
                            name="judul"
                            value={formData.judul}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                            required
                        />
                        
                    </div>

                    <div>           {/*penulis*/}
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Penulis
                        </label>
                        <input type="text" 
                            name="penulis"
                            value={formData.penulis}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                            required
                        />
                    </div>

                    <div>           {/*kategori*/}
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Kategori
                        </label>
                        <select name="kategori"
                            value={formData.kategori}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white"
                        >
                            <option value="Teknologi">
                                Teknologi
                            </option>

                            <option value="Fiksi">
                                Fiksi
                            </option>

                            <option value="Pengembangan Diri">
                                Pengembangan Diri
                            </option>

                            <option value="Lainnya">
                                Lainnya
                            </option>
                        </select>
                    </div>

                    <div>           {/*alasan*/}
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Alasan Pengusulan
                        </label>
                        <textarea name="alasan"
                            rows="4"
                            value={formData.alasan}
                            onChange={handleChange}
                            placeholder="Alasan anda tentang, mengapa buku ini perlu ada di perpustakaan Senja?"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                            required
                        ></textarea>
                    </div>
                    
                    <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-md hover:bg-blue-700 transition">
                        Kirim
                    </button>
                </form>
            </div>
        )
    

}