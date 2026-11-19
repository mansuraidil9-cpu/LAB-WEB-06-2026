"use client";

import { useTransition } from "react";
import { hapusBuku } from "@/app/katalog/actions";

export default function TombolHapus({ id, judul }) {
    const [sedangProses, startTransition] = useTransition();

    const handleHapus = () => {
        // confirm() adalah fungsi browser, karena itu komponen ini client component.
        // Kalau dibatalkan, fungsi berhenti dan data tidak disentuh.
        if (!confirm(`Hapus buku "${judul}"? Tindakan ini tidak bisa dibatalkan.`)) {
            return;
        }

        startTransition(async () => {
            const hasil = await hapusBuku(id);
            if (hasil?.error) {
                alert(hasil.error);
            }
        });
    };

    return (
        <button
            type="button"
            onClick={handleHapus}
            disabled={sedangProses}
            className="text-xs bg-red-600 text-white px-3 py-1.5 rounded-md font-medium hover:bg-red-700 transition disabled:opacity-50"
        >
            {sedangProses ? "Menghapus..." : "Hapus"}
        </button>
    );
}
