
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12361711&assignment_repo_type=AssignmentRepo)

# FSJSP2S5-LC01 - Hacktiv Grocery

## Ringkasan

Kali ini, kalian sedang bekerja di sebuah perusahaan agency dan ditugaskan untuk membuat aplikasi bernama `Hacktiv Grocery`, sebuah web server node.js yang berfungsi untuk menampilkan, menambahkan, mengupdate, dan menghapus data grocery. Feature utama dari aplikasi ini adalah:

1. Menampilkan seluruh list grocery
2. Menambahkan grocery baru
3. Mengupdate data grocery
4. Menghapus grocery (dengan otorisasi)

Dalam tugas ini, PM kalian sudah menyediakan `api_docs.md` beserta petunjuk testing. Silahkan kalian buat semua feature sesuai release yang ada pada `README.md` ini!

Semoga sukses!

## Aturan & Kebijakan

- Waktu Pengerjaan: **105 menit**
- Student diharapkan menjunjung tinggi INTEGRITAS. Segala bentuk ketidakjujuran seperti peniruan, plagiarisme, pemalsuan pengerjaan, penggunaan AI, dsb akan mendapatkan tindakan tegas dari akademik (Score 0 & SP)
- **Untuk kampus remote**: **WAJIB** melakukan **share screen** (**DESKTOP/ENTIRE SCREEN**), **open cam** dan **unmute microphone**.
- **Pada text editor hanya ada file/folder yang terdapat pada repository ini**.
- Dilarang membuka repository lain (**setelah melakukan clone, close tab GitHub pada web browser kalian**)
- (-10) jika `node_modules` tidak diignore
- (-5) jika `package.json` tidak ada, tidak valid atau tidak dipush
- (-5) jika tidak menyertakan example value `.env` bagi yang menggunakan dotenv
- (-5) jika `.env` di push, bagi yang menggunakan dotenv

## Bobot Penilaian

- REST API
- Authentication & Authorization
- Testing

## Github Live Code Workflow

Dalam pengerjaan live code, kalian diminta untuk melakukan commit sebagai checkpoin pengerjaan. Jika pengerjaan release sudah selesai, segera lakukan `add-commit` dengan message release yang jelas.

- Contoh 1: `git commit -m "Release 0 Done"`
- Contoh 2: `git commit -m "Release 2 - Fetch Grocery List: Done"`

## Release 0 - Authentication: Register

Buatlah sebuah endpoint untuk menambahkan User ke dalam aplikasi dengan detail sebagai berikut:

- Routing: `POST /register`
- Menerima request body sesuai dengan `api_docs.md` dan mengembalikan response success atau error
- Pastikan, password di-hash menggunakan `bcrypt` sebelum disimpan ke dalam database

## Release 1 - Authentication: Login

Buatlah sebuah endpoint untuk autentikasi User dengan detail sebagai berikut:

- Routing: `POST /login`
- Menerima request body sesuai dengan `api_docs.md` dan mengembalikan token menggunakan `jsonwebtoken`
- Mengembalikan response success atau error sesuai dengan `api_docs.md`

## Release 2 - Fetch Grocery List

Buatlah sebuah endpoint untuk valid user yang digunakan untuk mendapatkan seluruh list grocery dengan detail sebagai berikut:

- Routing: `GET /groceries`
- Menerima headers dan melakukan Authentication Check untuk memastikan user valid sebelum mengakses endpoint
- Mengembalikan response success atau error sesuai dengan `api_docs.md`

## Release 3 - Delete Grocery

Buatlah sebuah endpoint untuk valid user yang digunakan untuk menghapus grocery dengan detail sebagai berikut:

- Routing: `DELETE /groceries/:id`
- Menerima headers dan melakukan Authentication & Authorization Check untuk memastikan hanya user yang berwenang yang dapat menghapus data
- Mengembalikan response success atau error sesuai dengan `api_docs.md`

## Release 4 - Post Grocery

Buatlah sebuah endpoint untuk valid user yang digunakan untuk menambahkan grocery baru dengan detail sebagai berikut:

- Routing: `POST /groceries`
- Menerima request body sesuai dengan `api_docs.md`
- Melakukan Authentication Check sebelum memproses request
- Mengembalikan response success atau error sesuai dengan `api_docs.md`

## Release 5 - Update Grocery

Buatlah sebuah endpoint untuk valid user yang digunakan untuk meng-update data grocery dengan detail sebagai berikut:

- Routing: `PATCH /groceries/:id`
- Menerima request body dan headers, serta melakukan Authentication & Authorization Check untuk memastikan hanya user yang berwenang yang dapat mengupdate data
- Mengembalikan response success atau error sesuai dengan `api_docs.md`

## Testing

Pastikan semua release yang sudah dikerjakan sesuai dengan testing yang sudah dibuat. Lakukan testing dengan langkah berikut:

- Drop db testing: `sequelize --env test db:drop`
- Create db testing: `sequelize --env test db:create`
- Migrate db testing: `sequelize --env test db:migrate`
- Ketika run test, buatlah file `bin/www` untuk menjalankan aplikasi Express. Pada file `app.js` lakukan `module.exports = app`
- Pada package.json tambahkan script `"test": "jest --runInBand --forceExit"`
