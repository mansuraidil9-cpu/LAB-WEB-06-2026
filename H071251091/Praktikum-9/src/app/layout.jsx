import "./globals.css";
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer";


export const metadata = {
    title: "Pustaka Senja",
    description: "Ruang baca dan perpustakaan komunitas. Temukan berbagai katalog buku dan usulan membaca terbaik di perpustakaan kami."
}
;
export default function RootLayout ({children}) {
    return (
        <html>
            <body className="flex flex-col min-h-screen bg-gray-50">
                <Navbar />

                <main className="flex-grow">
                    {children}
                </main>

                <Footer />
            </body>
        </html>
    );
};


