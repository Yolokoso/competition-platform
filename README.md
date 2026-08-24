# Competition Platform (Next.js + OGAds Ready)

A clean multi-competition giveaway site built with Next.js App Router + Tailwind.

- List multiple active competitions
- Individual competition pages with Open Graph tags
- Content locker placeholder ready for **OGAds** (or any CPA locker)
- Simple name + email entry form after unlock
- Fully static-friendly (easy to deploy on Vercel free tier)

## Live Repo
https://github.com/Yolokoso/competition-platform

---

## Quick Start (Local)

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

## How the Money Flow Works

1. Visitor lands on a competition page.
2. They click to enter → **Content Locker** appears.
3. They complete an OGAds offer (app install, survey, etc.).
4. You get paid by OGAds.
5. Locker unlocks → they fill the free entry form and are entered into the real competition.

You still must run a legitimate competition and award the prize.

---

## Adding / Editing Competitions

Edit the file:

```
data/competitions.json
```

Each competition needs:

- `id` / `slug` (unique)
- `title`, `shortDescription`, `description`
- `prize`, `prizeValue`
- `endDate` (ISO string)
- `entryCount` (you can update manually or later connect a real DB)
- `active`: true/false
- `rules`: array of strings

After editing, commit & push. Vercel will redeploy automatically.

---

## Connecting Real OGAds Content Locker

1. Sign up at [OGAds](https://ogads.com) (or your preferred CPA network).
2. Create a content locker / campaign and get the embed code or script.
3. Open `components/ContentLocker.tsx`.
4. Replace the demo button section with your real locker embed.
5. When the locker fires the “completed” callback, call the `onUnlocked()` prop.

The component is already structured for this.

---

## Deploy to Vercel (Recommended)

1. Go to [vercel.com](https://vercel.com) and import this GitHub repo.
2. Framework preset: **Next.js** (auto-detected).
3. Deploy.

You will get a free `*.vercel.app` URL immediately.

### Add Your Custom Domain

1. In Vercel → Project → Settings → Domains.
2. Add the domain you bought (e.g. `freecomps.com` or `winprizes.online`).
3. Update the DNS records at your registrar exactly as Vercel shows (usually A/CNAME).
4. Wait for SSL (automatic, usually a few minutes).

That’s it – your site is live on your own domain.

---

## Collecting Entries (Next Steps)

Right now the form just logs to the console and shows a success message.

Recommended free options to actually store entries:

- **Google Sheets** via a free API route + Google Apps Script or SheetDB
- **Resend / Buttondown / Loops** for email + list
- **Supabase** free tier (very easy with Next.js)
- **Formspree** or **Tally** (no code)

I can help you wire any of these next if you want.

---

## Project Structure

```
app/
  layout.tsx              # Site shell + default OG tags
  page.tsx                # Homepage – lists all active competitions
  competitions/[slug]/
    page.tsx              # Competition detail + metadata
    CompetitionClient.tsx # Locker → Form state
  not-found.tsx
components/
  ContentLocker.tsx       # OGAds placeholder (replace with real locker)
  EntryForm.tsx           # Name + email after unlock
data/
  competitions.json       # All competitions live here
lib/
  competitions.ts         # Helpers
```

---

## Important Legal / Platform Notes

- Run real competitions and actually award prizes.
- Disclose that entry requires completing an offer if your network or jurisdiction requires it.
- Follow OGAds terms and the advertising policies of the platforms you promote on (Reddit, TikTok, etc.).
- Keep the prize reasonable relative to the traffic you drive.

---

## Need Help?

You can ask me to:
- Wire a real database / Google Sheet for entries
- Add a simple admin page to manage competitions
- Improve the design or add countdown timers
- Set up email notifications for new entries
- Help with the Vercel domain or OGAds integration specifics

Just say what you want next.
