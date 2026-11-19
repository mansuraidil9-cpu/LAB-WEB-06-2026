import { Fraunces, Figtree } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

export const metadata = {
  title: {
    default: "Pustaka Senja | Ruang Baca Komunitas",
    template: "%s | Pustaka Senja",
  },
  description:
    "Ruang baca dan perpustakaan komunitas dekat kampus. Jelajahi katalog, simpan buku favorit, dan usulkan judul baru.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${fraunces.variable} ${figtree.variable}`}>
      <body className="flex min-h-screen flex-col bg-kertas font-sans text-malam antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
