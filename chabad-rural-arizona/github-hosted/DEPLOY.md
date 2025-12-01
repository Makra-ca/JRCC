# Deploying Changes

After editing `cra-styles.css` or `cra-scripts.js`:

```bash
git add . && git commit -m "your message" && git push
```

Vercel auto-deploys in ~5 seconds. Files are served from:
- `https://YOUR-PROJECT.vercel.app/cra-styles.css`
- `https://YOUR-PROJECT.vercel.app/cra-scripts.js`

To manually redeploy:
```bash
cd chabad-rural-arizona/github-hosted/ && npx vercel --prod
```
