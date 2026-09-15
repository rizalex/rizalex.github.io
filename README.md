<div align="center">

![header](https://capsule-render.vercel.app/api?type=rect&color=gradient&height=160&section=header&text=ZAL%5Bat%5DHome&fontSize=50&fontAlignY=55&fontColor=fff)

# ZAL[at]Home

*Personal site of **Syafrizal S. Ardiansyah** — cybersecurity professional. Built with Jekyll + GitHub Pages.*

🌐 **Live:** https://rizalardian.id

</div>

---

## ✨ About

Welcome! I'm **ZAL**, an Indonesian cybersecurity professional (blue-team defense, cloud security, SecOps/DFIR) sharing knowledge and tools from the digital frontier.

This repo is content + configuration only — the layout comes from the remote Jekyll theme [`yousinix/portfolYOU`](https://yousinix.github.io/portfolYOU/) (Bootstrap 4). There is no custom CSS/JS; interactive pages use vanilla JS inline.

---

## 🛠 Features

- **Landing, Projects, Blog, About** pages (theme-driven, dark-mode toggle included)
- **Blog auto-sync from Medium** — daily import via GitHub Actions ([medium-import.yml](.github/workflows/medium-import.yml)), so new articles are written on Medium, not here
- **Blog search + tags** (`pages/search.json`, `pages/tags.html`)
- **Interactive Password Generator** project page (100% in-browser, `crypto.getRandomValues`)
- **Link-out project cards** (GitHub, Medium, Rasa Medan, Ponten) via `external_url`
- Blog grid fix + HTML-safe excerpts via local `_includes/blog/` overrides of the theme

---

## 🚩 Folder Structure

```text
.
├── _data/              # About page data: hard-skills, soft-skills, timeline, social-media
├── _includes/blog/     # Local theme overrides: index.html (2-col grid), post-card.html (clean excerpts)
├── _posts/             # Blog posts — AUTO-GENERATED from Medium, do not edit by hand
├── _projects/          # Project cards (filename order = display order; external_url = link-out card)
├── assets/             # Images only (me.jpg, myself.png)
├── pages/              # Static pages: index, blog, projects, about, tags, 404, search.json
├── .github/workflows/  # Daily Medium → Jekyll import
├── _config.yml         # Site configuration (remote_theme, author, collections)
├── CNAME               # Custom domain: rizalardian.id
├── Gemfile             # Ruby dependencies
├── CLAUDE.md           # Contributor guide for this repo
└── ...
```

---

## 💻 Local Development

```bash
bundle install
bundle exec jekyll serve   # http://localhost:4000
```

> Publishing branch is **`gh-pages`** — every commit there goes live automatically via GitHub Pages. There are no tests or linters in this repo.

---

## 🙏 Template Credit

Theme by [Youssef Shinab (yousinix)](https://github.com/yousinix) — [portfolYOU](https://yousinix.github.io/portfolYOU/), MIT licensed.
