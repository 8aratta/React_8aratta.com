# GitHub Pages Deployment

This document explains how the React app is deployed to GitHub Pages and the configuration required.

## Overview

The site is deployed automatically via GitHub Actions whenever changes are pushed to the `main` branch. The workflow builds the React app and deploys the output to GitHub Pages.

## Workflow Location

`.github/workflows/static.yml`

## How It Works

1. **Trigger**: The workflow runs on every push to `main` or can be triggered manually
2. **Build**: Installs dependencies and runs `npm run build` in the `8aratta_com` folder
3. **Deploy**: Uploads the `build/` folder contents to GitHub Pages

## Key Configuration

### Workflow File

```yaml
name: Deploy React app to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: '8aratta_com/package-lock.json'

      - name: Install dependencies
        working-directory: ./8aratta_com
        run: npm ci --legacy-peer-deps

      - name: Build React app
        working-directory: ./8aratta_com
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './8aratta_com/build'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Important Files

| File | Purpose |
|------|---------|
| `public/.nojekyll` | Prevents Jekyll processing (required for React apps) |
| `public/CNAME` | Custom domain configuration |
| `package.json` → `homepage` | Sets the base URL for the app |

## .nojekyll File

GitHub Pages uses Jekyll by default, which can cause issues with:
- Files/folders starting with `_` (like `_next`)
- Liquid template syntax `{{ }}` in markdown files

The empty `.nojekyll` file in `public/` tells GitHub Pages to skip Jekyll processing entirely.

## Dependency Considerations

### --legacy-peer-deps Flag

The `npm ci --legacy-peer-deps` flag is required because:
- `react-scripts@5.0.1` expects TypeScript 3.x or 4.x
- This project uses TypeScript 5.x
- The flag allows npm to proceed despite peer dependency conflicts

This is safe because TypeScript 5 is backwards compatible with TypeScript 4 APIs.

## Troubleshooting

### "There isn't a GitHub Pages site here"

**Cause**: The workflow was uploading raw source files instead of the built app.

**Solution**: Ensure the workflow:
1. Runs `npm run build`
2. Uploads the `build/` folder, not the repository root

### Liquid Syntax Errors

**Example**: `Liquid syntax error: Variable '{{ colors: ...' was not properly terminated`

**Cause**: Jekyll tries to parse `{{ }}` in markdown files as Liquid templates.

**Solution**: Add `.nojekyll` file to bypass Jekyll.

### Build Fails with Peer Dependency Errors

**Cause**: Version mismatches between packages (e.g., React 19 vs packages expecting React 18).

**Solution**: Use `--legacy-peer-deps` flag or update conflicting packages.

## Custom Domain

The site uses a custom domain configured via:
1. `public/CNAME` file containing the domain
2. DNS records pointing to GitHub Pages

## Local Testing

To test the production build locally:

```bash
cd 8aratta_com
npm run build
npx serve -s build
```

## Related Documentation

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Create React App Deployment](https://create-react-app.dev/docs/deployment/#github-pages)
