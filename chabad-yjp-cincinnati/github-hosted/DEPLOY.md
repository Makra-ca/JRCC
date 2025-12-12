# YJP Cincinnati - Deployment Guide

## Files

- `yjp-cincinnati-header.html` - Code to add to Chabad One CMS header
- Main script at: `chabad-one-styling/yjp/redesign.js`

## Deployment Steps

### 1. Push to GitHub
```bash
cd /home/daniel/coding-work/Makra-work-files/JRCC
git add chabad-one-styling/yjp/
git add chabad-yjp-cincinnati/
git commit -m "Add YJP Cincinnati redesign"
git push
```

### 2. Deploy to Vercel
```bash
cd /home/daniel/coding-work/Makra-work-files/JRCC/chabad-one-styling
npx vercel --prod
```

Script URL: `https://chabad-one-styling.vercel.app/yjp/redesign.js`

### 3. Add to Chabad One CMS
1. Log in to Chabad One CMS for YJP Cincinnati
2. Go to Settings → Custom Header Code
3. Paste contents of `yjp-cincinnati-header.html`
4. Save

## Features

- **Hero**: Extracted from homepage slider
- **About**: "YJP Cincinnati" section with image and description
- **Events**: Fetched live from `/tools/events/default.htm`
- **Instagram**: Posts fetched from Google Sheet (client can update)

## Google Sheet for Instagram Posts

URL: https://docs.google.com/spreadsheets/d/e/2PACX-1vQVF4z8xBFPw3IQgZCCbyBDOFydVReff3uiKEgcLXsQFcz1MO2ktI0De_Aa7QVbMvVi2DFAnUQI6e_x/pub?output=csv

Client can add Instagram post URLs to Column A - they'll automatically appear on the site.
