# JRCC CMS Header/Footer Files

Copy these to Chabad One CMS:

| CMS Field | File |
|-----------|------|
| **Custom Header** | `custom-header-code-vercel.html` |
| **Custom Footer** | `custom-footer-code-vercel.html` |

These load CSS/JS from: `https://chabad-one-styling.vercel.app/jrcc/`

## To update styles/scripts

1. Edit files in `/chabad-one-styling/jrcc/`
2. Deploy: `cd chabad-one-styling && npx vercel --prod`
3. Changes go live in ~5 seconds
