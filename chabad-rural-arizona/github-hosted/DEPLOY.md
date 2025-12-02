# Deploying Changes

## First-time Setup
```bash
cd chabad-rural-arizona/github-hosted/
npx vercel
# When prompted for project name, use: cra-github-hosted
npx vercel --prod
```

## After editing `cra-styles.css` or `cra-scripts.js`:
```bash
git add . && git commit -m "your message" && git push
```

Vercel auto-deploys in ~5 seconds. Files are served from:
- `https://cra-github-hosted.vercel.app/cra-styles.css`
- `https://cra-github-hosted.vercel.app/cra-scripts.js`

## Manual redeploy:
```bash
cd chabad-rural-arizona/github-hosted/ && npx vercel --prod
```
