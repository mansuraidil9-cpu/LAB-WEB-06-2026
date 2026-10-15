"use strict";


const API_URL = "https://jsonplaceholder.typicode.com";


const daftarAnggota = document.getElementById("daftarAnggota");
const statusAnggota = document.getElementById("statusAnggota");
const errorAnggota = document.getElementById("errorAnggota");

const judulTugas = document.getElementById("judulTugas");
const petunjukAwal = document.getElementById("petunjukAwal");
const statusTugas = document.getElementById("statusTugas");
const errorTugas = document.getElementById("errorTugas");
const areaTugas = document.getElementById("areaTugas");

const ringkasan = document.getElementById("ringkasan");
const barProgres = document.getElementById("barProgres");
const daftarTugas = document.getElementById("daftarTugas");
const pesanKosong = document.getElementById("pesanKosong");

const formTugas = document.getElementById("formTugas");
const inputJudul = document.getElementById("inputJudul");
const tombolSimpan = document.getElementById("tombolSimpan");
const pesanForm = document.getElementById("pesanForm");
const inputCari = document.getElementById("inputCari");
const notifikasi = document.getElementById("notifikasi");

let anggotaDipilihId = null;   // id anggota yang sedang dipilih
let nomorPermintaan = 0;       // mencegah respons lama menimpa respons baru
let sedangMenyimpan = false;
let timerNotifikasi = null;


const KELAS_ANGGOTA_BIASA = ["bg-white", "text-slate-700", "border-slate-300", "hover:bg-indigo-50"];
const KELAS_ANGGOTA_AKTIF = ["bg-green-600", "text-white", "border-indigo-600", "shadow"];

// Kelas Tailwind untuk tugas selesai
const KELAS_SELESAI = ["line-through", "text-gray-400"];


   //F1. Daftar anggota

async function muatAnggota() {
  statusAnggota.textContent = "Memuat anggota...";
  errorAnggota.classList.add("hidden");
  errorAnggota.textContent = "";

  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
      throw new Error(`Server mengembalikan status ${response.status}.`);
    }
    const users = await response.json();

    daftarAnggota.innerHTML = "";
    users.forEach((user) => {
      const tombol = document.createElement("button");
      tombol.type = "button";
      tombol.textContent = user.name;
      tombol.dataset.id = user.id;
      tombol.dataset.nama = user.name;
      tombol.classList.add(
        "w-full", "rounded-md", "border", "px-3", "py-2", "text-left",
        "text-sm", "font-medium", "transition", ...KELAS_ANGGOTA_BIASA
      );
      tombol.addEventListener("click", () => pilihAnggota(user.id, user.name, user.email));
      daftarAnggota.appendChild(tombol);
    });
  } catch (error) {
    errorAnggota.textContent = `Gagal memuat anggota. ${error.message}`;
    errorAnggota.classList.remove("hidden");
  } finally {
    statusAnggota.textContent = "";
  }
}


   //F2. Tugas anggota
  
function tandaiAnggotaAktif(id) {
  for (const tombol of daftarAnggota.children) {
    if (Number(tombol.dataset.id) === id) {
      tombol.classList.remove(...KELAS_ANGGOTA_BIASA);
      tombol.classList.add(...KELAS_ANGGOTA_AKTIF, "aktif");
    } else {
      tombol.classList.remove(...KELAS_ANGGOTA_AKTIF, "aktif");
      tombol.classList.add(...KELAS_ANGGOTA_BIASA);
    }
  }
}

async function pilihAnggota(id, nama, email) {
  anggotaDipilihId = id;
  nomorPermintaan += 1;                     
  const permintaanIni = nomorPermintaan;

  tandaiAnggotaAktif(id);
  judulTugas.textContent = `Tugas ${nama}, emailnya ${email}`;

  // Reset tampilan
  petunjukAwal.classList.add("hidden");
  errorTugas.classList.add("hidden");
  errorTugas.textContent = "";
  areaTugas.classList.add("hidden");
  daftarTugas.innerHTML = "";
  inputCari.value = "";
  inputJudul.value = "";
  pesanForm.textContent = "";
  statusTugas.textContent = "Memuat tugas...";
  statusTugas.classList.remove("hidden");

  try {
    const response = await fetch(`${API_URL}/todos?userId=${id}`);
    if (!response.ok) {
      throw new Error(`Server mengembalikan status ${response.status}.`);
    }
    const todos = await response.json();

    // Abaikan jika sementara itu pengguna sudah memilih anggota lain
    if (permintaanIni !== nomorPermintaan) return;

    daftarTugas.innerHTML = "";
    todos.forEach((todo) => {
      daftarTugas.appendChild(buatItemTugas(todo.title, todo.completed));
    });

    areaTugas.classList.remove("hidden");
    perbaruiRingkasan();
  } catch (error) {
    if (permintaanIni !== nomorPermintaan) return;
    errorTugas.textContent = `Gagal memuat tugas ${nama}. ${error.message}`;
    errorTugas.classList.remove("hidden");
  } finally {
    if (permintaanIni === nomorPermintaan) {
      statusTugas.classList.add("hidden");
      statusTugas.textContent = "";
    }
  }
}

// Membuat satu elemen tugas (dipakai data server dan tugas baru) 
function buatItemTugas(judul, selesai) {
  const item = document.createElement("li");
  item.classList.add(
    "flex", "items-center", "justify-between", "gap-3",
    "rounded-md", "bg-white", "px-4", "py-3", "shadow-sm"
  );
  item.dataset.selesai = selesai ? "true" : "false";

  const teks = document.createElement("span");
  teks.textContent = judul;
  teks.classList.add("flex-1", "text-sm", "break-words");
  if (selesai) teks.classList.add(...KELAS_SELESAI);

  const aksi = document.createElement("div");
  aksi.classList.add("flex", "shrink-0", "gap-2");

  if (!selesai) {
    const tombolSelesai = document.createElement("button");
    tombolSelesai.type = "button";
    tombolSelesai.textContent = "Tandai selesai";
    tombolSelesai.classList.add(
      "rounded-md", "bg-green-100", "px-2", "py-1", "text-xs",
      "font-semibold", "text-green-700", "hover:bg-green-200"
    );
    // F5.1
    tombolSelesai.addEventListener("click", () => {
      teks.classList.add(...KELAS_SELESAI);
      item.dataset.selesai = "true";
      tombolSelesai.remove();
      perbaruiRingkasan();
    });
    aksi.appendChild(tombolSelesai);
  }

  const tombolHapus = document.createElement("button");
  tombolHapus.type = "button";
  tombolHapus.textContent = "Hapus";
  tombolHapus.classList.add(
    "rounded-md", "bg-red-100", "px-2", "py-1", "text-xs",
    "font-semibold", "text-red-700", "hover:bg-red-200"
  );
  // F5.2
  tombolHapus.addEventListener("click", () => {
    item.remove();
    perbaruiRingkasan();
  });
  aksi.appendChild(tombolHapus);

  item.appendChild(teks);
  item.appendChild(aksi);
  return item;
}

//Ringkasan "X dari Y tugas selesai" (dihitung dari isi daftar saat ini)
function perbaruiRingkasan() {
  const total = daftarTugas.children.length;
  let selesai = 0;
  for (const item of daftarTugas.children) {
    if (item.dataset.selesai === "true") selesai += 1;
  }
  ringkasan.textContent = `${selesai} dari ${total} tugas selesai`;
  barProgres.style.width = total === 0 ? "0%" : `${(selesai / total) * 100}%`;
  perbaruiPesanKosong();
}


//F3. Pencarian

function terapkanFilter() {
  const kataKunci = inputCari.value.trim().toLowerCase();
  for (const item of daftarTugas.children) {
    const judul = item.firstElementChild.textContent.toLowerCase();
    if (judul.includes(kataKunci)) {
      item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
    }
  }
  perbaruiPesanKosong();
}

function perbaruiPesanKosong() {
  const total = daftarTugas.children.length;
  let tampil = 0;
  for (const item of daftarTugas.children) {
    if (!item.classList.contains("hidden")) tampil += 1;
  }

  if (total === 0) {
    pesanKosong.textContent = "Belum ada tugas.";
    pesanKosong.classList.remove("hidden");
  } else if (tampil === 0) {
    pesanKosong.textContent = "Tidak ada tugas yang cocok.";
    pesanKosong.classList.remove("hidden");
  } else {
    pesanKosong.classList.add("hidden");
    pesanKosong.textContent = "";
  }
}

inputCari.addEventListener("input", terapkanFilter);

//F4. Tambah tugas

//Simulasi menyimpan ke server
function simpanTugas(judul) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const kembar = Array.from(daftarTugas.children).some(
        (item) => item.firstElementChild.textContent.trim().toLowerCase() === judul.toLowerCase()
      );
      if (kembar) {
        reject(new Error(`Tugas "${judul}" sudah ada di daftar.`));
      } else {
        resolve({ title: judul, completed: false });
      }
    }, );
  });
}

function tampilkanNotifikasi(pesan) {
  notifikasi.textContent = pesan;
  notifikasi.classList.remove("hidden");
  clearTimeout(timerNotifikasi);
  timerNotifikasi = setTimeout(() => {
    notifikasi.classList.add("hidden");
  }, 3000);
}

inputJudul.addEventListener("input", () => {
  pesanForm.textContent = "";
});

formTugas.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (sedangMenyimpan) return;

  const judul = inputJudul.value.trim();
  pesanForm.textContent = "";

  // Validasi
  if (judul.length < 5) {
    pesanForm.textContent = "Judul tugas minimal 5 karakter (spasi di awal/akhir tidak dihitung).";
    return;
  }

  const anggotaSaatSubmit = anggotaDipilihId;
  sedangMenyimpan = true;
  tombolSimpan.disabled = true;
  tombolSimpan.textContent = "Menyimpan...";

  try {
    const tugasBaru = await simpanTugas(judul);

    // Pengguna berpindah anggota saat menunggu: jangan masukkan ke daftar yang salah
    if (anggotaSaatSubmit !== anggotaDipilihId) return;

    daftarTugas.prepend(buatItemTugas(tugasBaru.title, tugasBaru.completed));
    inputJudul.value = "";
    terapkanFilter();      // jika pencarian sedang aktif, tugas baru ikut disaring
    perbaruiRingkasan();
    tampilkanNotifikasi("Tugas berhasil ditambahkan.");
  } catch (error) {
    pesanForm.textContent = error.message;
  } finally {
    sedangMenyimpan = false;
    tombolSimpan.disabled = false;
    tombolSimpan.textContent = "Simpan";
  }
});

muatAnggota();
