"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import pool from "@/lib/db";
import { parseId, validasiBuku } from "@/lib/validasi";

// CREATE
export async function tambahBuku(stateSebelumnya, formData) {
    const { values, error, data } = validasiBuku(formData);
    if (error) return { error, values };

    try {
        await pool.query(
            `INSERT INTO buku (judul, penulis, kategori, tahun, tersedia, sinopsis)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [data.judul, data.penulis, data.kategori, data.tahun, data.tersedia, data.sinopsis]
        );
    } catch (err) {
        console.error("Gagal menambah buku:", err.message);
        return { error: { umum: "Buku gagal disimpan. Coba lagi beberapa saat." }, values };
    }

    revalidatePath("/katalog");
    revalidatePath("/");
    redirect("/katalog");
}

// UPDATE
export async function ubahBuku(id, stateSebelumnya, formData) {
    const idBuku = parseId(id);
    const { values, error, data } = validasiBuku(formData);

    if (idBuku === null) {
        return { error: { umum: "ID buku tidak valid." }, values };
    }
    if (error) return { error, values };

    let hasil;
    try {
        hasil = await pool.query(
            `UPDATE buku
             SET judul = $1, penulis = $2, kategori = $3,
                 tahun = $4, tersedia = $5, sinopsis = $6
             WHERE id = $7`,
            [data.judul, data.penulis, data.kategori, data.tahun, data.tersedia, data.sinopsis, idBuku]
        );
    } catch (err) {
        console.error("Gagal mengubah buku:", err.message);
        return { error: { umum: "Perubahan gagal disimpan. Coba lagi beberapa saat." }, values };
    }

    if (hasil.rowCount === 0) {
        return { error: { umum: "Buku tidak ditemukan. Mungkin sudah dihapus." }, values };
    }

    revalidatePath("/katalog");
    revalidatePath(`/katalog/${idBuku}`);
    revalidatePath("/");
    redirect(`/katalog/${idBuku}`);
}

// DELETE
export async function hapusBuku(id) {
    const idBuku = parseId(id);
    if (idBuku === null) {
        return { error: "ID buku tidak valid." };
    }

    try {
        await pool.query("DELETE FROM buku WHERE id = $1", [idBuku]);
    } catch (err) {
        console.error("Gagal menghapus buku:", err.message);
        return { error: "Buku gagal dihapus. Coba lagi beberapa saat." };
    }

    revalidatePath("/katalog");
    revalidatePath("/");
    redirect("/katalog");
}
