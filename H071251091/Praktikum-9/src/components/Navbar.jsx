"use client";

import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";

export default function Navbar() {

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const menuItem = [
        {nama: "Beranda", path: "/"},
        {nama: "Katalog", path: "/katalog"},
        {nama: "Buku Tersedia", path: "/katalog?tersedia=true"},
        {nama: "Usulan Buku", path: "/usulan"}
    ];

    return (
        <nav className="p-4 bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold ">
                    Pustaka senja
                </Link>
                    <ul className="flex gap-4" >
                        {menuItem.map((item) => {
                            const isBukuTersedia = item.path.includes("tersedia=true");
                            const isActive = isBukuTersedia
                                ? pathname === "/katalog" && searchParams.get("tersedia") === "true"
                                : item.path === "/"
                                  ? pathname === "/"
                                  : pathname.startsWith(item.path) && searchParams.get("tersedia") !== "true";

                            return (
                                <li key={item.path}>
                                    <Link href={item.path} className={isActive ? "text-amber-600 font-bold" : "text-gray-600"} >
                                        {item.nama}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
            </div>
        </nav>
    );
    
};
