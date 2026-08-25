# Competition Platform (Next.js + OGAds Ready)

A clean multi-competition giveaway site built with Next.js App Router + Tailwind.

- **8 active competitions** (easy to add more)
- Individual competition pages with Open Graph tags
- **Live countdown timer** on every competition page (creates urgency)
- Content locker placeholder ready for **OGAds**
- Name + email entry form that posts to `/api/entries`
- Fully deployable on Vercel free tier

## Live Repo
https://github.com/Yolokoso/competition-platform

---

## Quick Start (Local)

```bash
git clone https://github.com/Yolokoso/competition-platform.git
cd competition-platform
npm install
npm run dev
```

Open http://localhost:3000

---

## How the Money Flow Works

1. Visitor lands on a competition page.
2. They see the **countdown timer** (urgency).
3. They click to enter → **Content Locker** appears.
4. They complete an OGAds offer → **you get paid**.
5. Locker unlocks → they submit name + email.
6. You receive the entry (see below).

You still must run a legitimate competition and award the prize.

---

## Receiving the Emails (Important)

Entries are sent to `POST /api/entries`.

Right now the API logs them to the server console.  
To actually receive them in your inbox, do this:

### Easiest method – Formspree (free)

1. Go to [formspree.io](https://formspree.io) and create a free account + form.
2. Open `app/api/entries/route.ts`.
3. Uncomment the Formspree `fetch` block near the bottom.
4. Replace `YOUR_FORM_ID` with the ID Formspree gives you.
5. Redeploy.

Every new entry will now land in your email.

Other good options: Resend, Google Sheets + Apps Script, Supabase, or Tally.

---

## Adding / Editing Competitions

Edit the file:

```
data/competitions.json
```

There are currently **8 competitions**. Just copy an existing object and change the fields.

Key fields:
- `endDate` → ISO string (this powers the countdown timer)
- `active`: true/false
- `entryCount` → you can update this manually for social proof

After editing, commit & push. Vercel will redeploy automatically.

---

## Connecting Real OGAds Content Locker

1. Sign up at [OGAds](https://ogads.com).
2. Create a content locker / campaign and get the embed code.
3. Open `components/ContentLocker.tsx`.
4. Replace the demo button section with your real locker.
5. When the locker reports completion, call `onUnlocked()`.

---

## Deploy to Vercel + Custom Domain

1. Go to [vercel.com](https://vercel.com) → Import the GitHub repo.
2. Deploy (Next.js is auto-detected).
3. Project → Settings → Domains → Add the domain you bought.
4. Update DNS at your registrar as Vercel shows.

---

## Project Structure

```
app/
  page.tsx                     # Premium landing page
  competitions/[slug]/page.tsx # Competition detail + countdown
  api/entries/route.ts         # Receives name + email
components/
  CountdownTimer.tsx           # Live urgency timer
  ContentLocker.tsx            # OGAds placeholder
  EntryForm.tsx                # Captures emails
data/
  competitions.json            # All 8 competitions live here
```

---

## Important Notes

- Run real competitions and actually award prizes.
- Disclose offer requirements if needed by your CPA network or local laws.
- Follow platform rules (Reddit, TikTok, etc.) when promoting.

---

Need help next?

- Wire Formspree / Resend / Google Sheets for you
- Add a simple admin panel
- Improve individual competition page design further
- Help with domain or OGAds setup

Just tell me what you want.
