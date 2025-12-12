# Chabad One Styling

Central hosting for all Chabad One CMS custom styling files.

## Structure
- `cra/` - Chabad Rural Arizona
- `pv/` - Paradise Valley Events
- `jrcc/` - JRCC
- `cns/` - Chabad North Shore (Events Widget)
- `yjp/` - YJP Cincinnati (Shadow DOM redesign)

## URLs
After deploying to Vercel (`chabad-one-styling.vercel.app`):
- `https://chabad-one-styling.vercel.app/cra/cra-scripts.js`
- `https://chabad-one-styling.vercel.app/pv/pv-events-scripts.js`
- `https://chabad-one-styling.vercel.app/jrcc/jrcc-scripts.js`
- `https://chabad-one-styling.vercel.app/cns/` (Events Widget - standalone HTML page)
- `https://chabad-one-styling.vercel.app/yjp/redesign.js` (YJP Cincinnati homepage redesign)

## Deploy
```bash
git add . && git commit -m "message" && git push
```
Vercel auto-deploys on push. Manual: `cd chabad-one-styling && npx vercel --prod`
