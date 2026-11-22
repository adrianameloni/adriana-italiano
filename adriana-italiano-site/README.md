# Italiano con Adriana — bilingual GitHub Pages website

A static landing page for Adriana Meloni, an Italian language and literature teacher in Israel. Hebrew is the default homepage (right-to-left); Italian has its own page at `/it/` (left-to-right). There is no build step, paid hosting, server, or framework.

## Before publishing: ADD A CONTACT METHOD

**The site intentionally does not invent Adriana's phone number or email.** The inquiry form is inactive until you configure at least one contact method. Do this *before* sharing the website with potential students.

Open `js/site-config.js` and edit:

```js
window.ADRIANA_SITE_CONFIG = {
  whatsapp: '9725XXXXXXXX', // replace with her real number, country code, digits only
  email: 'adriana@example.com' // replace with her real email
};
```

Use a real number and/or address; the values above show the format only. Do not leave the example values in place! You can leave either field as an empty string. If WhatsApp is configured, the form prepares a pre-filled WhatsApp message. Otherwise, if email is configured, it opens the student's email application with a pre-filled message. The student then sends it manually. No messages or personal details are stored on GitHub Pages. There is no backend.

## Publish on GitHub Pages

1. Create a **public GitHub repository**, e.g., `adriana-italiano` (or use a private repository if your GitHub plan supports Pages for private repositories).
2. Upload the **contents** of this folder to the repository root: `index.html`, `it/`, `css/`, `js/`, `assets/`, etc. Commit to the `main` branch.
3. In the repository, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. After publication, your address will normally be `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`. The Italian version will be at `/it/`. If you use a repository named `YOUR-USERNAME.github.io`, the homepage will be at `https://YOUR-USERNAME.github.io/`.
5. Test both languages, the language switch, and the contact form on your phone.

The relative file links intentionally work for both a user site (`username.github.io`) and a project site (`username.github.io/repo-name/`).

### Local preview

You can open `index.html` directly in a browser, or run a local web server from inside this folder:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/` and `http://localhost:8000/it/`.

## Add Adriana's photos later

**Portrait:** In both `index.html` and `it/index.html`, locate `adriana-placeholder.svg`. Replace the image path with a real photo, for example:

- Hebrew: `src="assets/adriana-portrait.jpg"`
- Italian: `src="../assets/adriana-portrait.jpg"`

Save the actual photo as `assets/adriana-portrait.jpg`. Change the image's `alt` text to describe the photo rather than the placeholder. A vertical photo with the subject near the center works best. The `portrait-frame` CSS automatically crops it gracefully.

**Hero image:** The illustrated Italian street is `assets/italian-landscape.svg`. You can keep it for visual atmosphere, or replace its `<img>` element in each HTML page with a relevant photo. The `.art-card` styles are sized for a vertical image.

**Tip:** Use photos that Adriana owns or has permission to publish. Resize large photos (typically below 500 KB for a portrait) to keep the website fast.

## Editing the text

- `index.html` — Hebrew homepage and SEO copy.
- `it/index.html` — Italian version.
- `BIOGRAPHY.md` — full-length polished biography in both languages, for reference or future pages.
- `css/styles.css` — styling, color scheme, breakpoints, typography.
- `js/main.js` — mobile navigation, copyright year, contact form behavior.
- `js/site-config.js` — contact details used by both languages.
- `assets/` — illustration, portrait placeholder, favicon.

### Things worth deciding before launch

- Whether lessons are **online, in person, or both**, and which cities are served. This is deliberately not promised in the current copy because it was not specified.
- Whether to list pricing or let students request it.
- Whether Adriana is comfortable publishing her portrait and phone number.
- An actual custom domain (optional).

### SEO follow-up once you have the live address

Add absolute canonical URLs and `hreflang` alternates to both pages, using the final GitHub Pages or custom-domain URL. After the site is live, you can submit its URLs to Google Search Console. The current pages already have unique language-specific titles/descriptions, correct HTML language and writing direction, and semantic headings.

## Important limitations

- GitHub Pages hosts **static files**. It does not accept contact form submissions or send email by itself.
- This version uses WhatsApp or a visitor's email application, so it needs no backend but **does not automatically collect leads**. If you later want a submission form that works without opening an app, you will need a separate service (such as Formspree or another form provider), plus a clear privacy policy.
- Fonts load from Google Fonts when the visitor has internet connectivity; local fallback fonts are set.

Created as a first version, ready for photos, final contact information, and possible later enhancements.
