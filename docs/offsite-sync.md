# Off-site listing sync (prepared 24 Nov 2026)

Done by the owner (or with the owner signed in), **after** the sprint is deployed and
`node scripts/audit-repo.mjs --live` shows the new titles live. Every value below comes from
`src/data/entity-truth.ts` (verified facts). Do not paste anything marked **OWNER**.

## Values to use everywhere

| Field | Value |
|---|---|
| Name | Brihadhee |
| Address | New No. W-41, Old No. W-124, W-Block, 3rd Avenue, Ward 100, Main Road, Anna Nagar East, Chennai, Tamil Nadu 600040 |
| Dine-in phone | +91 73587 14113 |
| Catering phone (catering listings only) | +91 94442 24999 |
| Hours | 11:00 AM – 11:00 PM, lunch and dinner only. **OWNER:** confirm Sunday (Google profile shows closed on Sundays; site says every day, `docs/owner-todo.md` P1) |
| Food | 100% pure vegetarian. No meat, egg or fish. No breakfast. |
| Website / menu | https://www.brihadhee.com/ · https://www.brihadhee.com/menu/ |
| Cost for two | **OWNER:** one figure is needed first. Listings disagree (Swiggy Dineout ₹800; Zomato, District, EazyDiner ₹200), `docs/owner-todo.md` P3 |

## 1. EazyDiner correction
Listing: https://www.eazydiner.com/chennai/brihadhee-anna-nagar-east-chennai-703877
Check the page first; the wording to remove has not been verified from this repo.

> Please correct the Brihadhee (Anna Nagar East) listing. Brihadhee is a 100% pure vegetarian restaurant: no meat, egg or fish is served. Please remove any "veg and non veg" text. Our hours are 11:00 AM to 11:00 PM daily, lunch and dinner only; the 6:30 AM opening is no longer correct. Address and phone as on https://www.brihadhee.com/about/.

## 2. Justdial
Claim needs the owner's phone OTP. Then set the address, dine-in phone, hours and "pure vegetarian" as above.
Justdial also lists "Beyond Curry By Brihadhee" at a different street; that sub-brand is gated off (`ENABLE_SUB_BRAND`), so do not link it to this listing until the owner decides.

## 3. Google Business Profile
- Primary category: South Indian restaurant. Secondary: Vegetarian restaurant, Caterer (catering is verified).
- Menu link: https://www.brihadhee.com/menu/ · Website: https://www.brihadhee.com/
- Phone +91 73587 14113 · Hours as above, after the Sunday answer.
- Photos: upload only real photos taken at the restaurant. The repo has no dining-room photo yet (`public/images/interior.*` is a placeholder).

## 4. Search Console and Bing
- Submit https://www.brihadhee.com/sitemap.xml in both.
- Request Indexing once each, using the order in `docs/deploy-checklist.md`. Do not inspect
  `/nellai-meals-south-indian-veg-anna-nagar/` or `http://www.brihadhee.com/`: they redirect, so Google
  only needs the canonical URLs (`/menu/nellai-meals/`, `https://www.brihadhee.com/`).
- Bing: set `INDEXNOW_KEY` in Vercel before the build, then `npm run indexnow`.

## 5. Reviews
- No staff pressure to post reviews, no incentives, and no photos of guests without consent.
- Reply to each review on Google, District and others within a day, politely and without arguing.
- Table card text (no incentive, no rating request):
  > Enjoyed your meal at Brihadhee? Tell others which dish you liked on Google Maps. [QR to the Google Maps listing]
- Do not add ratings or review counts to the website until a dated platform figure is verified (CLAUDE.md).
