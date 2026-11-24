# DRAFT: /no-onion-no-garlic-anna-nagar/ (DO NOT PUBLISH)

Not routed, not in the sitemap, `llms.txt` or navigation. This folder is outside `src/` and
`public/`, so Astro never builds it. Status on 24 Nov 2026: held by the client keyword rules
until the kitchen answers the questions below.

## How to publish (about 10 minutes once the answers are in)

1. Fill every `[CLIENT_CONFIRM_REQUIRED]` below from the kitchen's written answers and record
   them in `docs/seo/client-confirmations.md`.
2. Put the confirmed dish names in `NO_ONION_NO_GARLIC_DISHES` in `config/seo-gates.ts`, then set
   `ENABLE_NO_ONION_NO_GARLIC_CLUSTER = true` (and `ENABLE_JAIN_FRIENDLY_CLAIMS = true` only if Q13
   and Q14 are both yes).
3. Copy the confirmed copy into `buildNoOnion()` in `src/data/spokes.js` (the 23 Nov request-based
   page is already there behind the flag; preview it with `SEO_GATES_PREVIEW=1 npm run build:site`).
4. Run `npm run build` and `node scripts/seo-verify.mjs --strict`. Never use "pure Jain",
   "100% Jain", "strictly Jain", "Marwari thali" or "Rajasthani thali", even after confirmation.

## Questions the kitchen must answer

| Question | Placeholder |
|---|---|
| Q11 Can the kitchen make some dishes without onion and garlic when a diner asks? | `[CLIENT_CONFIRM_REQUIRED: yes/no]` |
| Q12 Which dishes qualify on request (plain dosa, ghee dosa, idli, idiyappam, coconut chutney, sambar)? Is a cleaned tawa used? | `[CLIENT_CONFIRM_REQUIRED: dish list]`, `[CLIENT_CONFIRM_REQUIRED: tawa]` |
| Sambar, chutney and podi base recipes: do any contain onion or garlic? | `[CLIENT_CONFIRM_REQUIRED: sambar]`, `[CLIENT_CONFIRM_REQUIRED: chutneys]`, `[CLIENT_CONFIRM_REQUIRED: podis]` |
| Fermented batter: which batters are fermented (relevant to some Jain guests)? | `[CLIENT_CONFIRM_REQUIRED: batters]` |
| Q13 May we say "Jain-friendly on request"? | `[CLIENT_CONFIRM_REQUIRED: yes/no]` |
| Q14 Can Jain orders leave out root vegetables (potato, carrot, beetroot, radish)? May we name Jain and Marwari families? | `[CLIENT_CONFIRM_REQUIRED: yes/no]` |
| Q16 Can catering offer a no-onion-no-garlic or Jain menu for weddings, functions and office lunches? | `[CLIENT_CONFIRM_REQUIRED: yes/no and limits]` |
| Q34 May we describe satvik-style choices? | `[CLIENT_CONFIRM_REQUIRED: yes/no]` |

## Page draft

**Title (≤60):** No Onion No Garlic Food in Anna Nagar | Brihadhee
**Description (135–155):** Brihadhee, Anna Nagar East: South Indian dishes made without onion and garlic on request, satvik-style choices and Jain-friendly options. Ask before ordering.
**H1:** No Onion, No Garlic South Indian Food in Anna Nagar

**Opening answer (40–60 words):** Brihadhee, the South Indian vegetarian restaurant on 3rd Avenue,
Anna Nagar East, can make `[CLIENT_CONFIRM_REQUIRED: dish list]` without onion and garlic when you
ask. It serves lunch and dinner from 11 AM to 11 PM daily. Tell your server before ordering so the
kitchen can confirm each part of the plate.

### Tier 1: No onion, no garlic (broadest)
- Answer: The dishes Brihadhee makes without onion and garlic on request are `[CLIENT_CONFIRM_REQUIRED: dish list]`.
- Sambar: `[CLIENT_CONFIRM_REQUIRED: sambar]` · Chutneys: `[CLIENT_CONFIRM_REQUIRED: chutneys]` · Podis: `[CLIENT_CONFIRM_REQUIRED: podis]`.
- Tawa: `[CLIENT_CONFIRM_REQUIRED: tawa]`.

### Tier 2: Satvik-style choices (only if Q34 is yes)
- Answer: Satvik-style meals avoid onion and garlic. At Brihadhee, `[CLIENT_CONFIRM_REQUIRED: satvik dishes]` can be ordered this way on request.
- Do not define satvik as a Brihadhee standard; describe the request, not a certification.

### Tier 3: Jain-friendly on request (only if Q13 and Q14 are yes; never "pure Jain")
- Answer: Brihadhee can prepare `[CLIENT_CONFIRM_REQUIRED: Jain-friendly dishes]` Jain-friendly on request, without onion, garlic or root vegetables.
- Fermented batter: `[CLIENT_CONFIRM_REQUIRED: batters]`. Shared tawa and utensils: `[CLIENT_CONFIRM_REQUIRED: tawa]`.
- Marwari families: name them only if Q14 allows; never equate Marwari identity with one dietary rule.

### Catering (only if Q16 is yes)
- Answer: Brihadhee's catering team can plan `[CLIENT_CONFIRM_REQUIRED: menu scope]` for events from 50 guests. Agree each dish and its preparation in the quote.

## Pre-mapped Q&As (section 4.8 of the 12 Nov keyword plan)

| Question | Draft answer | Waits on |
|---|---|---|
| Where can I get no onion no garlic food in Anna Nagar? | Brihadhee in Anna Nagar East makes `[dish list]` without onion and garlic on request. Ask your server before ordering. | Q11, Q12 |
| Can dosa be made without onion and garlic at Brihadhee? | `[yes/no]`. `[Which batters, podis and fillings]`. | Q12 |
| Is Brihadhee's sambar made without onion and garlic? | `[CLIENT_CONFIRM_REQUIRED: sambar]` | Q12 |
| Are Brihadhee's chutneys and podis free of onion and garlic? | `[CLIENT_CONFIRM_REQUIRED: chutneys, podis]` | Q12 |
| Can parotta or Nellai meals be made without onion and garlic? | `[CLIENT_CONFIRM_REQUIRED]` (salna and sodhi recipes) | Q12 |
| Is Brihadhee Jain-friendly? | Brihadhee prepares `[dishes]` Jain-friendly on request, without onion, garlic or root vegetables. | Q13, Q14 |
| Can Jain and Marwari families eat at Brihadhee? | `[only if Q14 allows]` | Q14 |
| Does Brihadhee serve satvik food? | `[only if Q34 allows]` | Q34 |
| Can Brihadhee cater a no onion no garlic or Jain menu? | `[only if Q16 allows]` | Q16 |
| பூண்டு, வெங்காயம் இல்லாத உணவு அண்ணா நகரில் எங்கு கிடைக்கும்? (Tamil) | `[after Q11, Q12]` | Q11, Q12 |
