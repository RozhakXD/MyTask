# MyTask 🔥 Manajemen Tugas Tanpa Ribet
![MyTask Logo](https://github.com/user-attachments/assets/1952241c-6266-49ca-b419-d0963c724c19)

MyTask adalah aplikasi manajemen tugas yang dirancang untuk membantu pengguna dalam mengelola dan melacak tugas-tugas mereka dengan cara yang efisien dan terorganisir. Aplikasi ini dibangun menggunakan bahasa pemrograman Go dan framework Gin, serta menggunakan SQLite sebagai database untuk menyimpan data tugas.

## Fitur Utama
- **Status Tugas**: Kelola status tugas seperti Pending, In Progress, dan Done.
- **CRUD Tugas**: Buat, baca, perbarui, dan hapus tugas.
- **Antarmuka Pengguna**: Antarmuka yang responsif dan mudah digunakan.

## Teknologi yang Digunakan

- **Bahasa Pemrograman**: Go
- **Framework**: Gin
- **Database**: SQLite
- **Frontend**: HTML, CSS, JavaScript

## Instalasi
1. **Clone Repository**:
   ```bash
   git clone https://github.com/RozhakXD/MyTask.git
   cd MyTask
   ```

2. **Instal Dependensi**:
   Pastikan Anda memiliki Go terinstal, kemudian jalankan:
   ```bash
   go mod tidy
   ```

3. **Inisialisasi Database**:
   Jalankan aplikasi untuk menginisialisasi database:
   ```bash
   go run main.go
   ```

4. **Akses Aplikasi**:
   Buka browser dan akses `http://localhost:8080`.

## Penggunaan
- **Menambahkan Tugas**: Klik tombol "New Task" untuk menambahkan tugas baru.
- **Mengedit Tugas**: Klik tombol edit pada tugas yang ingin diubah.
- **Menghapus Tugas**: Klik tombol hapus pada tugas yang ingin dihapus.
- **Mengubah Status Tugas**: Seret dan lepas tugas ke kolom status yang sesuai.

## Lisensi
Proyek ini dilisensikan di bawah MIT License. Lihat file [LICENSE](LICENSE) untuk detail lebih lanjut.
