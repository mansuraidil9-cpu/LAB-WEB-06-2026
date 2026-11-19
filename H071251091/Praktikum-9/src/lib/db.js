import { Pool } from "pg";

// Pool dibuat sekali saja. Saat development, Next.js memuat ulang modul
// setiap ada perubahan kode, jadi pool disimpan di globalThis supaya
// koneksi tidak menumpuk.
const pool =
    globalThis.pgPool ??
    new Pool({ connectionString: process.env.DATABASE_URL });

if (process.env.NODE_ENV !== "production") {
    globalThis.pgPool = pool;
}

export default pool;
