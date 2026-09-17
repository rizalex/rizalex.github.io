# CLAUDE.md

Panduan untuk Claude Code saat bekerja di repo ini.

## Ringkasan

Situs personal profile berbasis **Jekyll + GitHub Pages**, memakai **remote theme `yousinix/portfolYOU`** (berbasis Bootstrap 4). Repo: `rizalex/rizalex.github.io`, custom domain `rizalardian.id` (lihat `CNAME`). Isi repo hanya konten + konfigurasi — bukan kode aplikasi.

## Perintah

Tidak ada `package.json`, Makefile, test, maupun linter di repo ini.

```bash
bundle install
```

```bash
bundle exec jekyll serve
```

```bash
bundle exec jekyll build
```

Deploy berjalan otomatis oleh GitHub Pages dari branch `gh-pages`. Tidak ada workflow build di `.github/workflows` — satu-satunya workflow adalah importer Medium.

## Hal yang wajib diketahui sebelum mengubah apa pun

- **Theme bersifat remote, dengan tiga override lokal.** `_layouts/` dan `_sass/` tidak ada di repo ini, tetapi `_includes/blog/` (`index.html`, `post-card.html`) dan `assets/js/theme.js` **ada** sebagai override lokal yang mengalahkan file theme (prioritas file lokal di atas `remote_theme`). Jangan membuat override baru tanpa alasan kuat — rujuk dokumentasi/repo theme di https://yousinix.github.io/portfolYOU/.
- **Branch kerja = branch publish = `gh-pages`.** Commit di branch ini langsung tayang. `main` ada tapi bukan sumber publikasi.
- **`_posts/` digenerate otomatis.** [.github/workflows/medium-import.yml](.github/workflows/medium-import.yml) menjalankan `bundle exec jekyll import medium --username rizalex --canonical_link true` setiap hari pukul 06:00 UTC (plus `workflow_dispatch`), lalu commit & push sendiri. Artikel baru ditulis di Medium, bukan di sini. Edit manual di `_posts/` bisa tertimpa atau terduplikasi oleh import berikutnya.
- **Placeholder di `_config.yml` memang sengaja.** `disqus.shortname`, `analytics.google.tracking_id`, dan `buymeacoffee.username` masih bernilai contoh, tetapi fiturnya `enabled: false` / `comments: false`. Jangan "memperbaiki"-nya dengan nilai karangan.
- **`repository:` di `_config.yml` masih dikomentari**, padahal `pages/projects.html` mendeklarasikan `remote_projects`. Akibatnya daftar remote project kemungkinan tidak ter-render. Ini kondisi yang diketahui, bukan bug untuk diperbaiki diam-diam.
- **Perubahan `_config.yml` tidak hot-reload** — restart `jekyll serve`.
- **Tidak ada CSS milik situs; satu JS override.** `assets/` berisi gambar (`me.jpg`, `myself.png`) plus `assets/js/theme.js` — satu-satunya JS milik situs, override dari file theme: mengikuti `prefers-color-scheme` sistem secara otomatis selama user belum memilih manual via tombol toggle (pilihan manual disimpan di `localStorage` dan mengalahkan sistem). Semua styling memakai class Bootstrap 4 bawaan theme; hindari menambah stylesheet baru kecuali diminta.

## Struktur & konvensi konten

### `pages/` — semua halaman statis
Field front matter: `layout`, `title`, `permalink`, `weight` (mengatur urutan navbar: Projects `1`, Blog `2`, About `3`). Halaman yang tidak boleh muncul di navbar didaftarkan di `nav_exclude` pada `_config.yml`.

`pages/index.md` memakai `layout: default`, `permalink: /`, isinya hanya `{% include landing.html %}`.
`pages/search.json` (`layout: null`) adalah index pencarian blog yang dikonsumsi theme.

### `_projects/` — collection, output ke `/projects/:name`
Default `layout: page` (diatur di `defaults` pada `_config.yml`). Nama file memakai prefiks urutan, contoh `(4) Passowrd Generator.md` — typo pada nama file memang seperti itu; **jangan rename tanpa diminta** karena nama file menentukan URL.

```yaml
---
name: Password Generator
tools: [Password, Tool, Generator]
image: https://images.unsplash.com/photo-...
description: Generate strong, copy-ready passwords various presets in-browser.
external_url: https://github.com/rizalex   # opsional
---
```

Jika `external_url` diisi, kartu project me-link keluar dan body halaman tidak dirender.

### `_posts/` — hasil import Medium
Format nama `YYYY-MM-DD-slug.html`, body berupa HTML, permalink `/blog/:title`. Front matter dari importer:

```yaml
---
layout: post
title: Akun Sosial-Media Aman dari Hacker
canonical_url: https://rizalex.medium.com/...
tag:
- hacking
- information-security
---
```

Catatan: importer menulis `tag:` (singular) sementara `pages/search.json` membaca `post.tags` — inkonsistensi bawaan, jangan diasumsikan sebagai typo lokal.

### `_data/` — sumber data halaman About
- `hard-skills.yml`, `soft-skills.yml` — daftar `{name, percentage, color}`; `color` adalah class kontekstual Bootstrap (`danger`, `info`, `success`, `secondary`, boleh kosong).
- `timeline.yml` — daftar `{title, from, to, description}`.
- `social-media.yml` — registry bawaan theme (url/icon/color per platform). Yang benar-benar tampil ditentukan oleh key aktif di blok `author:` pada `_config.yml`, bukan oleh file ini.

## Pola untuk project interaktif

Acuan: `_projects/(4) Passowrd Generator.md`.

- Markup memakai class Bootstrap 4 saja, tanpa stylesheet tambahan.
- `<script>` inline **wajib** dibungkus `{% raw %}` … `{% endraw %}` agar kurung kurawal JS tidak diparse sebagai Liquid.
- Vanilla JS, tanpa dependency eksternal, berjalan sepenuhnya di browser.
