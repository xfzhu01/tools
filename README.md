# tools (React)

This repo was refactored from static HTML into a React app using Vite.

## Local dev

1. Install Node.js (includes npm).
2. Install deps:

```bash
npm install
```

3. Start dev server:

```bash
npm run dev
```

## Routes

- `/#/` home
- `/#/tax-calc` Beijing severance calculator

## Deploy to GitHub Pages (github.io)

This project is configured for GitHub Pages:

- Vite `base` is set to `./` (prevents broken asset paths on project pages).
- A GitHub Actions workflow is included at `.github/workflows/deploy.yml`.

### Steps

1. Push the repo to GitHub (branch: `main`).
2. In GitHub: **Settings → Pages**
   - **Build and deployment**: select **GitHub Actions**
3. Push any commit to `main` (or run the workflow manually).
4. Wait for the workflow to finish. Your site will be available at:
   - `https://<username>.github.io/<repo>/`

### URLs (HashRouter)

- Home: `https://<username>.github.io/<repo>/#/`
- Calculator: `https://<username>.github.io/<repo>/#/tax-calc`

## Legacy

Original static pages are preserved under `legacy/`.

