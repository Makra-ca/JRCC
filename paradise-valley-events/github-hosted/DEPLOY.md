# Deploying Changes

After editing `pv-events-styles.css` or `pv-events-scripts.js`:

```bash
git add . && git commit -m "your message" && git push
```

Vercel auto-deploys in ~5 seconds. Files are served from:
- `https://github-hosted.vercel.app/pv-events-styles.css`
- `https://github-hosted.vercel.app/pv-events-scripts.js`

To manually redeploy: `vercel --prod` from the `github-hosted` folder.

Also it works cd paradise-valley-events/github-hosted/ && npx vercel --prod
