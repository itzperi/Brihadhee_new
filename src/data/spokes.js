/**
 * Spoke pages from the 12 November keyword plan (section 6), added to the
 * existing hub-and-spoke site without renaming any live URL:
 *
 *   /small-function-catering-chennai/  priority 1 (section 1a): small and mid-size
 *                                      vegetarian catering from 50 guests
 *   /catering-quote-chennai/           quote and booking intent (3.9b), quote builder
 *   /family-dining-anna-nagar/         temple-visit and family-occasion dining (3.18, 3.19)
 *   /faq/                              brand answers not owned by another page (4.2, 4.7),
 *                                      plus an index of every page's Q&A block
 *   /no-onion-no-garlic-anna-nagar/    GATED (3.15 to 3.17, 4.8): built only when
 *                                      ENABLE_NO_ONION_NO_GARLIC_CLUSTER is on, or as a
 *                                      noindex draft in `astro dev` / SEO_GATES_PREVIEW=1
 *
 * Same rules as src/data/pages.js: one H1, title <= 60 and description <= 155
 * characters (scripts/check-seo.mjs), answer-first copy, every Q&A through qa() and
 * qaRoute() (src/lib/answers.js), facts only from entity-truth.ts, prices only from
 * menu-canonical.ts, and every claim the client has not confirmed behind a gate in
 * config/seo-gates.ts. No competitor names; no "best" claims outside question headings.
 */
import { getFact, openingTimes, RESTAURANT_DIET as PV, FACTS_LAST_CONFIRMED } from "./entity-truth.ts";
import * as GATES from "../../config/seo-gates.ts";
import { ROUTES, href, telHref } from "./site.js";
import { qa, qaRoute, claimQuestion, list } from "../lib/answers.js";
import { taSmallFunctions } from "./faq-ta.js";
import verification from "../../config/client-verification.json";
import {
  cateringEnabled,
  corporateEnabled,
  guests,
  liveCounters,
  contact,
  eventService,
  joinNatural,
  eventIds,
  EVENTS,
  serviceAreas,
} from "./catering.js";
import { pageGraph, faqPageSchema, cateringServiceSchema, HOME_CRUMBS } from "../lib/schema.js";
import { byo, category, allItems, rupees, priceRange, summarise, filterCoffee, menuNotes } from "../lib/menu-facts.js";

/** Gated pages render as noindex drafts in `astro dev` or with SEO_GATES_PREVIEW=1. */
export const gatePreview =
  Boolean(import.meta.env?.DEV) || (typeof process !== "undefined" && process.env?.SEO_GATES_PREVIEW === "1");

const CD = GATES.CATERING_DIET;
/** Title-case form for headings and H1s ("Pure Vegetarian"). */
const CDtitle = CD.replace(/\b\w/g, (ch) => ch.toUpperCase());
const MIN = GATES.CATERING_MIN_GUESTS;
const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1);
const name = getFact("name");
const NEAR = "Anna Nagar East";
const STREET = getFact("street");
const phone = getFact("phone"); // restaurant number (family dining, FAQ)
/* The catering pages (small functions, quote) use the catering numbers (config enquiry_channels). */
const cPhone = contact.phone ?? phone;
const cWhatsapp = contact.whatsapp ?? getFact("whatsapp");
const recipeStory = getFact("recipeStory");
const { open: OPEN, close: CLOSE, range: HOURS } = openingTimes();
const num = (n) => n.toLocaleString("en-IN");

if (guests && guests.min !== MIN) {
  throw new Error(`[spokes] config/client-verification.json min_guests (${guests.min}) != CATERING_MIN_GUESTS (${MIN}) in config/seo-gates.ts`);
}

const offers = getFact("offers");
const offer = (id) => {
  const o = offers.find((x) => x.id === id);
  if (!o) throw new Error(`[spokes] offer "${id}" missing in entity-truth.ts`);
  return o;
};
const prebook = offer("pre-booking").description.replace(/ when you pre-book a table through .*$/, ""); // "up to 40% off Monday to Thursday"
const walkIn = offer("walk-in").description.replace(/ for walk-in dine-in$/, ""); // "10% off"
const bookingLabels = getFact("bookingLinks").map((b) => b.label);
const bookingAnd = list(bookingLabels);

const item = (n) => {
  const hit = allItems.find((i) => i.name === n);
  if (!hit) throw new Error(`[spokes] menu item "${n}" not found in menu-canonical.ts`);
  return hit;
};
const sodhiMeals = item("Nellai Special Sodhi Meals");
const paanai = item("Paanai Parotta");
const poppers = item("Karaikudi Paneer Poppers");
const kali = item("Karuppatti Ulundhu Kali");
const idiyappamSodhi = item("Idiyappam Sodhi");
const combos = category("combos");
const lunch = category("lunch");
const tnMeals = summarise(lunch.items.filter((i) => /TN Meals/.test(i.name)));
const batters = byo.steps.find((s) => s.name === "Batter").options;
const batterRange = priceRange(summarise(batters));
const dish = (i) => ({ name: i.name, price: rupees(i.price), note: i.description });
const svc = eventService ? eventService.replace(/^end-to-end service: /, "") : "menu planning, cooking and serving";
/* Not yet confirmed by the owner (config/client-verification.json): clean-up and
 * vessels, cooking on site or delivered, and the advance notice. Until each is
 * confirmed the copy says it is agreed on the quote call; it never guesses. */
const cleanupKnown = typeof verification.staff_serving_cleanup_included === "boolean";
const cleanupLine = cleanupKnown
  ? verification.staff_serving_cleanup_included
    ? "Serving staff and clean-up are included."
    : "Serving and clean-up are arranged by you."
  : "Transport, vessels and clean-up are agreed for each function on the quote call.";
const leadTime = typeof verification.advance_notice_required === "string" && verification.advance_notice_required ? verification.advance_notice_required : null;
const corp = corporateEnabled ? getFact("corporateCatering") : null;

/* ======================================================================= *
 * /small-function-catering-chennai/  (keyword plan 3.9a, priority 1)       *
 * ======================================================================= */
const SMALL_IDS = ["birthday", "get_together", "housewarming", "baby_shower", "ear_piercing", "engagement", "house_function", "small_events", "small_wedding"];
const smallEvents = cateringEnabled ? SMALL_IDS.filter((id) => eventIds.includes(id)).map((id) => ({ id, ...EVENTS[id] })) : [];
const hasBirthday = smallEvents.some((e) => e.id === "birthday");
/* "Last checked" on catering fact tables: owner confirmations of 2026-11-11 (guests, area, events)
 * and the pure vegetarian wording approved for every catering order on 2026-11-15 (Q20). */
const CATERING_CHECKED = FACTS_LAST_CONFIRMED;
const serviceArea = list(verification.service_area?.length ? verification.service_area : ["Chennai"]);

function buildSmallFunctions() {
  const path = ROUTES.smallFunctions;
  const quoteHref = `${href(ROUTES.cateringQuote)}#enquiry`;
  const hasRegionalMenu = verification.menu_formats?.includes("regional_menus");
  const title = `Small Function Catering in Chennai, ${MIN}+ Guests | ${name}`;
  const description = `${cap(CD)} catering for birthdays, housewarmings and family gatherings in Chennai from ${MIN} guests. Share your date, venue and headcount.`;
  const faq = qaRoute(path, [
    qa(
      "Who does small function catering in Anna Nagar?",
      `${name}'s ${NEAR} team offers ${CD} small function catering across Chennai from ${MIN} guests. ` +
        "For a birthday, housewarming or get-together, share the date, venue and headcount to discuss a menu and check availability."
    ),
    qa(
      `What is the minimum catering order at ${name}?`,
      `${name}'s minimum catering order is ${MIN} guests for a single event in Chennai. ` +
        `Events can go up to ${num(guests.max)} guests. Share your date, venue and menu preferences with the catering team.`,
      { id: "what-is-the-minimum-guest-count-for-brihadhee-catering" }
    ),
    qa(
      "How much does vegetarian catering cost per plate in Chennai?",
      `${name} quotes ${CD} catering per plate for each function. ` +
        "The menu, headcount, counters and service requirements help shape the price. Share these details and what you plan to spend when you request a quote.",
      { kind: "explain" }
    ),
    qa(
      `What does ${name}'s end-to-end catering include?`,
      `${name}'s event team can handle ${svc}, with live counters available to discuss. ` + cleanupLine
    ),
    qa(
      `How far ahead should I book catering for ${MIN} guests?`,
      leadTime
        ? `Book ${name} catering at least ${leadTime} ahead of your function. Call ${cPhone} to check your date.`
        : `${name} has not published a fixed booking lead time, so call ${cPhone} as soon as your date is set. ` +
            `The team confirms whether it can take your date and guest count.`
    ),
    hasBirthday &&
      qa(
        `Can ${name} cater a birthday party for ${MIN} guests in Chennai?`,
        `Yes. ${name} caters birthday parties across Chennai from ${MIN} guests, with a live dosa counter available to discuss. ` +
          `Send the quote form with your date, venue and guest count, or call ${cPhone}.`
      ),
    hasRegionalMenu && qa(
      `What is on a vegetarian catering menu for ${MIN} people?`,
      `Brihadhee can plan a ${CD} function menu for ${MIN} people around rice, Nellai sodhi, regional sides and ${kali.name}. ` +
        "Share the occasion and dishes you prefer. Confirm your menu and service with the team when you review the quote.",
      { id: `vegetarian-catering-menu-for-${MIN}` }
    ),
    ...taSmallFunctions,
  ]);

  return {
    path,
    title,
    description,
    h1: `Small Function Catering in Chennai, From ${MIN} Guests`,
    eyebrow: "Small functions · Chennai",
    intro: `${name} provides ${CD} catering for birthdays, housewarmings and family get-togethers across Chennai from ${MIN} guests. Share your date, venue and estimated headcount with the Anna Nagar East team to discuss a South Indian menu for your gathering.`,
    tamil: `அண்ணா நகர் கிழக்கில் உள்ள பிரிஹதீ குழு, சென்னையில் ${MIN} பேர் முதல் பங்கேற்கும் குடும்ப விழாக்களுக்கு ${GATES.CATERING_DIET_TA} கேட்டரிங் வழங்குகிறது. மெனுவைப் பற்றிப் பேச, விழாவின் தேதி, இடம், விருந்தினர் எண்ணிக்கை ஆகியவற்றைத் தெரிவியுங்கள்.`,
    cta: "quote",
    primaryAction: { label: "Request a small-function quote", shortLabel: "Function quote", href: quoteHref, event: "quote_cta_click" },
    showDirections: false,
    glanceTitle: "Small function catering at a glance",
    glance: [
      ["Starting guest count", `${MIN} guests per event`],
      ["Functions", smallEvents.map((e) => e.label).join(", ")],
      ["Food", `${CD} regional menus; live counters for ${joinNatural(liveCounters)}`],
      ["Service to discuss", svc],
      ["Price", "a per-plate quote for each function, after you share the details"],
      ["Area", joinNatural(serviceAreas)],
    ],
    sections: [
      {
        id: "from-50-guests",
        title: `Does ${name} Cater Functions for ${MIN} Guests?`,
        /* Recorded result (AI-062, Gemini, 14 Nov): the engine added an unsupported purity claim. State only
         * the confirmed facts: minimum, maximum, area, diet wording approved under Q20, how the quote works. */
        lead: `Yes. ${name} caters ${CD} functions in ${serviceArea} from ${MIN} guests, and up to ${num(guests.max)} guests at a single event. Its ${NEAR} team plans a South Indian menu for ${list(smallEvents.slice(0, 3).map((e) => e.inline))}. Share your date, venue and headcount for a per-plate quote.`,
        facts: [
          ["Minimum order", `${MIN} guests per event`],
          ["Largest single event", `${num(guests.max)} guests`],
          ["Area served", serviceArea],
          ["Food", `${cap(CD)} catering for every order, with South Indian menus`],
          ["Price", `A per-plate quote after you share the date, venue, headcount, menu and service needed. [What shapes the quote](${ROUTES.cateringQuote}#price-factors)`],
          ["Catering phone", cPhone],
        ],
        checked: CATERING_CHECKED,
        items: [
          {
            title: "At home or in a hall",
            text: "Tell the team where guests will eat, when the meal should be served and whether you need help with serving or a live counter. Confirm the setup and service details for your venue in the quote.",
          },
          {
            title: "A South Indian menu for your gathering",
            text: `Discuss dishes from Tirunelveli and Karaikudi, such as Nellai sodhi or ${kali.name}, and tell the team which dishes matter most to your guests.`,
          },
          {
            title: "A live build-your-own dosa counter",
            text: `Guests can [build their own dosa](${ROUTES.dosa}) at a live counter: ${byo.batterCount} batters, podis, fillings and a ghee, butter or oil roast, made to order by the kitchen team.`,
          },
        ],
      },
      ...(hasRegionalMenu ? [{
        id: "menu-for-50-guests",
        title: `What Goes on a ${CDtitle} Catering Menu for ${MIN} Guests?`,
        lead: `For a private function in Chennai, start with a South Indian meal and ask ${name} which regional dishes and live counters suit your event. Share the meal time, guest count and venue setup. Confirm the final dishes and the service you need in the catering quote.`,
        items: [
          {
            title: "Tirunelveli-style lunch",
            text: `Ask for a lunch built around rice, Nellai sodhi and regional sides, with ${kali.name} for dessert. [See the restaurant's Nellai meal](${ROUTES.lunch}#sodhi-meals) for a reference when choosing dishes.`,
          },
          {
            title: "Parotta and idiyappam",
            text: `For a birthday dinner or an evening gathering, discuss ${paanai.name} or ${idiyappamSodhi.name} with the catering team. Tell them what else you would like to serve and when guests will eat.`,
          },
          ...(liveCounters.some((counter) => /build your own dosa/i.test(counter)) ? [{
            title: "Live dosa counter",
            text: `Ask about adding a live counter so guests can pick their batter and toppings and the team can cook each dosa to order. [See the live dosa counter for events](${ROUTES.eventCatering}#live-dosa-counter) before choosing the setup.`,
          }] : []),
        ],
        links: [{ label: "Request a quote with your menu choices", href: quoteHref, primary: true }],
      }] : []),
      {
        id: "occasions",
        title: `Which Small Functions Does ${name} Cater?`,
        lead: `${name} caters ${joinNatural(smallEvents.map((e) => e.inline))} across ${serviceArea}, from ${MIN} guests up to ${num(guests.max)} at one event. Each function gets a South Indian menu planned with the ${NEAR} team; the occasions below are the ones the team has confirmed.`,
        tint: true,
        items: smallEvents.map((e) => ({ title: e.label, text: e.text })),
      },
      {
        id: "catering-price",
        title: "How the Per-Plate Quote Works",
        lead: `${name} prepares a per-plate quote for each small function in Chennai based on headcount, dishes, live counters and how meals will be served. Share your intended spend per guest and ask which parts of the service the quote covers, including setup or service at the venue.`,
        links: [{ label: "See what to include in a catering quote", href: `${href(ROUTES.cateringQuote)}#what-to-send` }],
      },
      {
        id: "get-a-quote",
        title: "Get a Quote for Your Function",
        lead: "Share the occasion, date, venue and estimated guest count. Include your meal and service preferences so the team can discuss a menu and per-plate quote.",
        tint: true,
        links: [
          { label: "Request a small-function quote", href: quoteHref, primary: true },
          ...(contact.telHref ? [{ label: `Call ${cPhone}`, href: contact.telHref }] : []),
        ],
      },
    ],
    faqTitle: "Small function catering questions",
    faq,
    related: [
      { label: "Event and wedding catering in Chennai", href: href(ROUTES.eventCatering) },
      ...(corporateEnabled ? [{ label: `${cap(CD)} corporate catering in Chennai`, href: href(ROUTES.corporateCatering) }] : []),
      { label: "Pure veg restaurant in Anna Nagar", href: href("/") },
      { label: "Family dining in Anna Nagar", href: href(ROUTES.familyDining) },
    ],
    schema: () =>
      pageGraph({
        path,
        title,
        description,
        crumbs: [...HOME_CRUMBS, { name: "Catering", path: ROUTES.eventCatering }, { name: "Small function catering", path }],
        extras: [
          cateringServiceSchema({
            areas: serviceAreas,
            path,
            serviceType: "Event catering",
            name: `${name} Small Function Catering`,
            description: `${cap(CD)} catering in Chennai from ${MIN} guests for ${joinNatural(smallEvents.map((e) => e.inline))}, with regional menus and live counters to discuss.`,
            offerCatalog: smallEvents.map((e) => ({ name: `${e.label} catering`, description: e.text })),
            guests: { min: MIN },
            audience: [{ "@type": "Audience", audienceType: "Families planning small functions" }],
          }),
          faqPageSchema(path, faq),
        ],
      }),
  };
}
export const smallFunctionsPage = cateringEnabled && guests && smallEvents.length ? buildSmallFunctions() : null;

/* ======================================================================= *
 * /catering-quote-chennai/  (keyword plan 3.9b)                            *
 * ======================================================================= */
const whatsappQuote = GATES.ENABLE_LIVE_WHATSAPP_QUOTE_FORM && GATES.QUOTE_WHATSAPP_NUMBER ? GATES.QUOTE_WHATSAPP_NUMBER : null;
if (GATES.ENABLE_LIVE_WHATSAPP_QUOTE_FORM && !GATES.QUOTE_WHATSAPP_NUMBER) {
  throw new Error("[spokes] ENABLE_LIVE_WHATSAPP_QUOTE_FORM is on but QUOTE_WHATSAPP_NUMBER is empty (Q19, config/seo-gates.ts)");
}

function buildQuote() {
  const path = ROUTES.cateringQuote;
  const title = `Catering Quote in Chennai for ${MIN}+ Guests | ${name}`;
  const description = `Request a ${CD} catering quote in Chennai for events from ${MIN} guests. Share your date, venue, guest count, menu and service requirements.`;
  const reply = whatsappQuote ? "follows up on WhatsApp" : "follows up by phone";
  const whatToSend = claimQuestion(path, "What Do I Need to Tell a Caterer to Get a Quote?");
  const faq = qaRoute(path, [
    qa(
      `How can I request a catering quote from ${name}?`,
      `Use the ${name} event quote form with the occasion, Chennai venue area, estimated guest count from ${MIN}, and date if known. ` +
        (whatsappQuote
          ? "The form opens WhatsApp with your details ready to send."
          : `Add menu and serving preferences for the catering team, or call ${cPhone} to discuss them.`),
      { id: "how-do-i-get-a-catering-quote-from-brihadhee" }
    ),
    qa(
      `What happens after I send ${name} a catering enquiry?`,
      `${name}'s catering team ${reply} to discuss the menu, venue, service and per-plate quote. ` +
        "Your event is booked after you and the team confirm availability and agree the details."
    ),
    qa(
      `Does ${name} provide serving staff with catering?`,
      `${name} can provide serving as part of its end-to-end event service. ` +
        `Tell the team whether you need staff and confirm the scope in your quote. ${cleanupLine}`
    ),
    whatsappQuote
      ? qa(
          `Can I send a catering enquiry to ${name} on WhatsApp?`,
          `Yes. The quote form on this page sends your details to ${name}'s catering team on WhatsApp at ${whatsappQuote}, for functions from ${MIN} guests. ` +
            `The team replies with a menu and a per-plate price.`
        )
      : qa(
          `Can I send a catering enquiry to ${name} on WhatsApp?`,
          `Yes. WhatsApp ${name}'s catering team on ${cWhatsapp} with your event, date, venue and guest count (from ${MIN}). ` +
            "Use WhatsApp to message the team directly. Enquiries sent through the form are followed up by phone."
        ),
    qa(
      "Can I request specific dishes in my catering quote?",
      `Yes. Tell Brihadhee's Anna Nagar East team which dishes you want when you submit the enquiry. ` +
        "The catering team will discuss the choices with you and confirm the final menu in your quote.",
      { id: `what-is-on-a-vegetarian-catering-menu-for-${MIN}-people` }
    ),
  ]);

  return {
    path,
    title,
    description,
    h1: `Get a ${CDtitle} Catering Quote in Chennai`,
    eyebrow: "Catering quote · Chennai",
    intro: `Share your event date, Chennai venue and estimated headcount from ${MIN} guests. Brihadhee ${reply} to discuss the ${CD} menu, service requirements and per-plate quote.`,
    cta: "quote",
    primaryAction: { label: "Go to the quote form", shortLabel: "Quote form", href: "#enquiry", event: "quote_cta_click" },
    showDirections: false,
    builder: {
      whatsappNumber: whatsappQuote,
      min: MIN,
      fallbackWhatsapp: whatsappQuote ? null : cWhatsapp,
    },
    sections: [
      {
        id: "what-to-send",
        title: whatToSend,
        lead: `To request a Brihadhee catering quote, share the occasion, Chennai venue area, estimated guest count and date if known. Include your preferred meal, any dishes or live counters you have in mind, and the service you need at the venue. The team uses these details to discuss availability and price.`,
        items: [
          { title: "Event, date and venue", text: "Give the occasion, date or approximate timing and venue area in Chennai. Add your meal time if you know it." },
          { title: "Headcount and meal", text: `An estimated guest count from ${MIN} is enough to start. Indicate lunch or dinner and note any must-have dishes or dietary requirements for discussion.` },
          { title: "Serving and setup", text: "Tell the team if you need help with serving or live counters. Ask what the quote covers for setup, transport, vessels and clean-up." },
        ],
      },
      {
        id: "price-factors",
        title: "What Shapes Your Per-Plate Quote",
        checked: CATERING_CHECKED,
        lead: "Brihadhee bases a Chennai catering quote on the guest count, menu, live counters and service at the venue. If you have a planned spend per guest, share it with the team. Ask which items and services the per-plate quote covers before you book.",
        items: [
          {
            title: "Menu and counters",
            text: "The dishes, number of guests and any live counter service help the team work out the menu and quantities." +
              (smallFunctionsPage && verification.menu_formats?.includes("regional_menus")
                ? ` Start with [menu ideas for a ${MIN}-guest function](${ROUTES.smallFunctions}#menu-for-50-guests) if you are still choosing dishes.`
                : ""),
          },
          { title: "Venue and service", text: "Share the location and the support you need at the venue. Ask the team to confirm what is included in the quote." },
        ],
      },
      {
        id: "how-quotes-work",
        title: `How a ${name} Catering Quote Works`,
        lead: `Send your enquiry, discuss the proposed menu and service with ${name}, then review the agreed details before booking.`,
        tint: true,
        items: [
          { title: "1. Send the details", text: whatsappQuote ? "Fill in the form; it opens WhatsApp with your details ready to send." : `Fill in the form, or call ${cPhone}.` },
          { title: "2. Review the proposal", text: `Discuss a ${CD} menu, any live counters and the service scope with the team.` },
          { title: "3. Confirm before booking", text: "Agree availability, menu, service and per-plate pricing with the team." },
        ],
      },
    ],
    faqTitle: "Catering quote questions",
    faq,
    related: [
      { label: `Small function catering from ${MIN} guests`, href: href(ROUTES.smallFunctions) },
      { label: "Event and wedding catering in Chennai", href: href(ROUTES.eventCatering) },
      ...(corporateEnabled ? [{ label: "Request recurring office lunch catering", href: `${href(ROUTES.corporateCatering)}#enquiry` }] : []),
      { label: "Catering for event planners", href: href(ROUTES.plannerPartner) },
      { label: "Pure veg restaurant in Anna Nagar", href: href("/") },
    ],
    schema: () =>
      pageGraph({
        path,
        title,
        description,
        crumbs: [...HOME_CRUMBS, { name: "Catering", path: ROUTES.eventCatering }, { name: "Catering quote", path }],
        extras: [faqPageSchema(path, faq)],
      }),
  };
}
export const quotePage = cateringEnabled && guests ? buildQuote() : null;

/* ======================================================================= *
 * /family-dining-anna-nagar/  (keyword plan 3.18, 3.19)                    *
 * Temple naming waits for Q24; "premium" waits for Q22.                   *
 * ======================================================================= */
function buildFamily() {
  const path = ROUTES.familyDining;
  const title = `Pure Veg Family Restaurant in Anna Nagar | ${name}`;
  const description = `Plan a vegetarian family lunch, birthday or anniversary dinner at ${name} in Anna Nagar East. View the menu and call ahead for group seating.`;
  const temple = GATES.ENABLE_NAMED_TEMPLE && GATES.NEARBY_TEMPLE ? GATES.NEARBY_TEMPLE : null;
  const faq = qaRoute(path, [
    qa(
      `Is ${name} good for families and groups?`,
      `Yes. ${name} is a family-friendly, ${PV} restaurant in ${NEAR}, open for lunch and dinner every day from ${HOURS}. ` +
        `For a large group, call ${phone} before you come so the team can arrange seating.`,
      { id: "families-groups" }
    ),
    qa(
      "Which Anna Nagar restaurant suits a family lunch after a temple visit?",
      `${name}, in ${NEAR}, suits a family lunch after a temple visit: it opens at ${OPEN} daily, and no meat, egg or fish is cooked in its kitchen. ` +
        `Its ${sodhiMeals.name} cost ${rupees(sodhiMeals.price)}, served on a banana leaf.`
    ),
    qa(
      "Which vegetarian restaurant in Anna Nagar is good for a birthday or anniversary dinner?",
      `${name}, in ${NEAR}, serves dinner every day until ${CLOSE} and takes table pre-bookings for birthdays and anniversaries on ${bookingAnd}. ` +
        `Pre-booked tables get ${prebook}.`
    ),
  ]);

  return {
    path,
    title,
    description,
    h1: "A Pure Veg Family Restaurant in Anna Nagar East",
    eyebrow: "Family dining · Anna Nagar East",
    intro: `${name} is a ${PV} family restaurant in ${NEAR}, open every day from ${HOURS} for lunch and dinner. No meat, egg or fish is cooked in its kitchen and alcohol is not served, so vegetarian families can order anything on the menu. For a group table, call ${phone} so the restaurant can check seating.`,
    menuHref: href(ROUTES.menu),
    primaryAction: { label: "Book a family table", href: href(ROUTES.reserve), event: "reserve_table_view_click" },
    glanceTitle: `Family dining at ${name}: summary`,
    glance: [
      ["Who", `${name}, a South Indian vegetarian restaurant in ${NEAR}`],
      ["Open", `${HOURS} daily · ${GATES.MEAL_FRAMING}`],
      ["Food", recipeStory],
      ["Good for", "lunch after a morning temple visit, birthdays, anniversaries and weekend family meals"],
      ["Booking", `pre-book on ${bookingAnd}, or walk in`],
      ["Offers", `${walkIn} for walk-in diners; ${prebook} when pre-booked`],
      ["Location", `${STREET}, Chennai ${getFact("address").postalCode}`],
    ],
    sections: [
      {
        id: "after-temple",
        title: "Family Lunch After a Morning Temple Visit",
        lead:
          `${name} opens at ${OPEN} every day for families coming in after a morning temple visit. The vegetarian lunch menu includes ${sodhiMeals.name} (${rupees(sodhiMeals.price)}) and Tamil Nadu meals (${priceRange(tnMeals)}).` +
          (temple ? ` ${temple.name} is on ${temple.where}.` : ""),
        dishes: [dish(sodhiMeals), ...lunch.items.filter((i) => /TN Meals/.test(i.name)).map(dish)],
        links: [{ label: "Veg lunch and Nellai meals in Anna Nagar", href: href(ROUTES.lunch) }],
      },
      {
        id: "celebrations",
        title: "Birthday and Anniversary Dinners",
        lead: `For a birthday or anniversary dinner at ${name} in Anna Nagar East, book a date and time directly on the restaurant website or through a booking partner. For a large family group, call ahead with your party size so the team can check seating for everyone.`,
        tint: true,
        items: smallFunctionsPage ? [
          {
            title: `Celebrating with ${MIN} or more guests?`,
            text: `For a family function of ${MIN} guests or more, ${name} caters at your home or venue: see [small function catering in Chennai](${ROUTES.smallFunctions}).`,
          },
        ] : [],
        links: [{ label: `Veg dinner in Anna Nagar until ${CLOSE}`, href: href(ROUTES.dinner) }],
      },
      {
        id: "family-favourites",
        title: `What Families Order at ${name}`,
        lead: `Families at ${name} can order Nellai meals at lunch or choose ${paanai.name} and ${poppers.name} at dinner. Anyone who wants to customise a dosa can start with one of ${byo.batterCount} batters (${batterRange}) and choose toppings, filling and roast. Check the menu for the listed prices before GST.`,
        dishes: [paanai, poppers, filterCoffee].map(dish),
        links: [
          { label: "Build your own dosa", href: href(ROUTES.dosa) },
          { label: "Full Brihadhee menu with prices", href: href(ROUTES.menu) },
        ],
      },
      {
        id: "family-booking",
        title: "Booking a Table for a Family Group",
        lead: `When you call about a group table at ${name}, share your date, preferred time and party size so the team can check seating. For a regular table, use ${bookingAnd} or walk in. See [the address and directions](${ROUTES.about}#find-us) before you leave.`,
        tint: true,
        links: [
          { label: "How to book a table", href: href(ROUTES.book), primary: true },
          { label: "Call about group seating", href: telHref },
        ],
      },
    ],
    faqTitle: "Family dining questions",
    faq,
    related: [
      { label: "Pure veg restaurant in Anna Nagar", href: href("/") },
      { label: "Nellai meals in Anna Nagar", href: href(ROUTES.lunch) },
      { label: "Veg dinner in Anna Nagar", href: href(ROUTES.dinner) },
      { label: "Brihadhee questions and answers", href: href(ROUTES.faq) },
      ...(smallFunctionsPage ? [{ label: "Small function catering in Chennai", href: href(ROUTES.smallFunctions) }] : []),
    ],
    schema: () =>
      pageGraph({
        path,
        title,
        description,
        crumbs: [...HOME_CRUMBS, { name: "Family dining", path }],
        extras: [faqPageSchema(path, faq)],
      }),
  };
}
export const familyPage = buildFamily();

/* ======================================================================= *
 * /faq/  (keyword plan 4.2 and 4.7)                                        *
 * Only questions no other page owns (one Q&A per route), plus an index of *
 * every page's Q&A block, so the hub never duplicates a spoke's answer.   *
 * ======================================================================= */
function buildFaqHub() {
  const path = ROUTES.faq;
  const title = `FAQ on Timings, Dosa, Catering and Booking | ${name}`;
  const description = `Answers about ${name}, the pure veg South Indian restaurant in Anna Nagar East: lunch and dinner only, ${OPEN} to ${CLOSE}, dosa, catering and bookings.`;
  const faq = qaRoute(path, [
    /* The single permitted mention of the retired service: the exact question in
       config/seo-gates.ts, answered without repeating the word. */
    qa(GATES.NEGATIVE_FAQ_QUESTION, `${name} serves lunch and dinner only, from ${HOURS} every day. Lunch starts at ${OPEN} and dinner is served until ${CLOSE}, so plan a late-morning visit. For a table, see the booking options or call ${phone}.`, { id: GATES.NEGATIVE_FAQ_ID }),
    qa(
      `Does ${name} serve non-veg food?`,
      `No. ${name}'s restaurant is ${PV}: no meat, egg or fish is cooked in its kitchen, and alcohol is not served. ` +
        `Its catering is ${CD}, and each function's menu is agreed in the quote.`
    ),
    qa(
      `What makes ${name} different?`,
      `${name} is a ${PV} South Indian restaurant in ${NEAR} where diners choose their dosa ingredients and the kitchen cooks each dosa to order. ` +
        `The menu also features ${sodhiMeals.name}, a Tirunelveli lunch with coconut milk stew, and Karaikudi dishes such as ${poppers.name}.`,
      { id: "how-is-brihadhee-different-from-other-pure-veg-restaurants-i" }
    ),
    qa(
      `Is ${name} related to the Brihadeeswarar Temple?`,
      `No. ${name} is a restaurant in Anna Nagar East, Chennai, and is not affiliated with the Brihadeeswarar Temple in Thanjavur. ` +
        `Its name is a tribute to the temple and its Chola architecture.`
    ),
    qa(
      `Is ${name} on Swiggy or Zomato?`,
      `Yes. ${name} has its own listings on Zomato and Swiggy Dineout, as well as EazyDiner and District. ` + `Its full menu, with every price, is on this website.`
    ),
    qa(
      `Does ${name} deliver food?`,
      `${name} has not confirmed a delivery service on its website, so call ${phone} to check current delivery and parcel options for your area. ` +
        `${menuNotes.parcel}`
    ),
    qa(
      `Is there parking at ${name}?`,
      `${name} has not published parking details yet, so call ${phone} before you visit to ask about parking near the restaurant at your time. ` +
        `Directions from nearby landmarks are on the address and contact page.`
    ),
  ]);
  const topic = (label, route) => ({ label, href: `${href(route)}#faq` });
  return {
    path,
    title,
    description,
    h1: `${name} Questions and Answers`,
    eyebrow: "FAQ · Anna Nagar East",
    intro: `Short answers about ${name}, the South Indian vegetarian restaurant in ${NEAR}, Chennai, open every day from ${HOURS} for lunch and dinner only. Each topic below links to the page with the full answers.`,
    menuHref: href(ROUTES.menu),
    sections: [
      {
        id: "first-visit",
        title: `What Should I Order on a First Visit to ${name}?`,
        lead: `On a first visit to ${name}, order by meal: the ${sodhiMeals.name} at lunch, with sodhi (a coconut milk stew), and build-your-own dosa or ${paanai.name} (parotta and salna slow-cooked in a sealed pot) at dinner. Everything below is on the current menu, with its price.`,
        items: [
          {
            title: "Lunch",
            text: `The [${sodhiMeals.name}](${ROUTES.lunch}) (${rupees(sodhiMeals.price)}): a Tirunelveli banana-leaf meal with sodhi and ${kali.name}. For something lighter, Tamil Nadu meals cost ${priceRange(tnMeals)}; for a quick lunch, a dine-in combo costs ${priceRange(combos)} (lunch only).`,
          },
          {
            title: "Dinner",
            text: `A [build-your-own dosa](${ROUTES.dosa}) from ${byo.batterCount} batters (${batterRange}), or [${paanai.name}](${ROUTES.dinner}) (${rupees(paanai.price)}), parotta slow-cooked with salna in a sealed pot.`,
          },
          {
            title: "To share",
            text: `${idiyappamSodhi.name} (${rupees(idiyappamSodhi.price)}), idiyappam in a coconut milk stew, or ${poppers.name} (${rupees(poppers.price)}).`,
          },
          {
            title: "To finish",
            text: `${filterCoffee.name} (${rupees(filterCoffee.price)}), or ${kali.name} (${rupees(kali.price)}) if you skipped the Nellai meal. ${menuNotes.gst}`,
          },
        ],
        links: [{ label: "Full Brihadhee menu with prices", href: href(ROUTES.menu), primary: true }],
      },
    ],
    faqTitle: `${name}: quick answers`,
    faq,
    topics: [
      topic(`What ${name} is and what to order`, "/"),
      topic("Address, timings and Sunday hours", ROUTES.about),
      { id: "faq-can-i-book-a-table-at-brihadhee", label: "How to book a table and check confirmation", href: `${href(ROUTES.book)}#how-to-book` },
      topic("Menu, prices and filter coffee", ROUTES.menu),
      topic("Build your own dosa", ROUTES.dosa),
      topic("Nellai meals and veg lunch", ROUTES.lunch),
      topic("Parotta varieties, kothu parotta and vegetarian salna", ROUTES.parotta),
      { label: "What Nellai meals are", href: `${href(ROUTES.nellaiGuide)}#what-are-nellai-meals` },
      topic(`Dinner until ${CLOSE}`, ROUTES.dinner),
      topic("Family dining", ROUTES.familyDining),
      ...(smallFunctionsPage ? [topic(`Small function catering from ${MIN} guests`, ROUTES.smallFunctions)] : []),
      ...(quotePage ? [topic("Catering quotes", ROUTES.cateringQuote)] : []),
      ...(cateringEnabled ? [topic("Event and wedding catering", ROUTES.eventCatering)] : []),
      ...(corporateEnabled ? [topic("Corporate catering", ROUTES.corporateCatering)] : []),
    ],
    schema: () =>
      pageGraph({
        path,
        title,
        description,
        crumbs: [...HOME_CRUMBS, { name: "FAQ", path }],
        extras: [faqPageSchema(path, faq)],
      }),
  };
}
export const faqHubPage = buildFaqHub();

/* ======================================================================= *
 * /no-onion-no-garlic-anna-nagar/  GATED (keyword plan 3.15 to 3.17, 4.8)  *
 * Tier 1 no onion no garlic (lead), tier 2 satvik, tier 3 Jain-friendly    *
 * (ENABLE_JAIN_FRIENDLY_CLAIMS). Hindi lines wait for Q17. In a draft      *
 * (gate off) every unconfirmed part is shown with a draft marker.         *
 * ======================================================================= */
export const noOnionLive = GATES.ENABLE_NO_ONION_NO_GARLIC_CLUSTER;

function buildNoOnion() {
  const path = ROUTES.noOnionNoGarlic;
  const title = "No-Garlic South Indian Food in Anna Nagar | Brihadhee";
  const description = "Plan no-garlic South Indian food at Brihadhee, Anna Nagar East, Chennai. Discuss no-onion and Jain dietary requests before lunch, dinner or catering.";
  const faq = qaRoute(path, [
    qa(
      "Where can I discuss no-garlic food in Anna Nagar?",
      "Brihadhee supports no-garlic food requests at its South Indian vegetarian restaurant in Anna Nagar East, Chennai. Tell the team what you avoid before choosing a dish. Ask about the batter, podi, filling, cooking fat and accompaniments, and confirm availability for your visit before placing the order."
    ),
    qa(
      "Are no-onion dishes available at Brihadhee?",
      "Brihadhee can discuss no-onion choices where available, alongside your no-garlic request. Availability depends on the dish and its preparation. Before ordering, ask the team to check the base recipe, premade ingredients and sides. A request to omit an onion topping should also cover the rest of the plate."
    ),
    qa(
      "How should Jain guests order at Brihadhee?",
      "Brihadhee welcomes Jain dietary enquiries for lunch, dinner and catering. Describe your requirements, including any root vegetables, fermented ingredients or preparation contact you avoid. Ask the team to check the complete dish and accompaniments. Confirm what can be prepared for your order before finalising your selection.",
      { kind: "explain" }
    ),
    qa(
      "Can a custom dosa suit my dietary requirements?",
      "Brihadhee's custom dosa lets you choose batter, toppings, filling and roast, giving the team a clear starting point for discussing dietary requests. Ask which ingredients and sides suit your needs before ordering. Omitting a named topping still requires checking the ingredients in the batter, podi and chutneys.",
      { kind: "explain" }
    ),
    qa(
      "How do I arrange a no-garlic catering menu in Chennai?",
      "Brihadhee's catering team can discuss a no-garlic menu for offices or private functions in Chennai. Include the date, venue, headcount and dietary requirements in your enquiry. Ask for the agreed dishes, preparation arrangements and serving plan in the quote so the organiser and kitchen work from the same information.",
      { kind: "explain" }
    ),
    qa(
      "When should I call about dietary requirements?",
      "Call Brihadhee before your lunch or dinner visit to discuss dietary requirements and confirm the dishes available. The restaurant opens every day from " + HOURS + ". For a family group, mention how many guests share the requirements so the team can discuss ordering and service before you arrive."
    ),
  ]);
  return {
    path, title, description,
    h1: "No-Garlic South Indian Food in Anna Nagar",
    eyebrow: "Dietary requests · Anna Nagar East",
    intro: "Brihadhee is a South Indian vegetarian restaurant in Anna Nagar East, Chennai, serving lunch and dinner from " + HOURS + ". No-garlic requests are supported, with no-onion options discussed where available. Marwari families and Jain guests can describe their dietary needs to the restaurant team before choosing dishes.",
    menuHref: href(ROUTES.menu),
    glanceTitle: "Dietary requests at Brihadhee",
    glance: [
      ["Location", STREET + ", Chennai " + getFact("address").postalCode],
      ["Hours", HOURS + " daily · " + GATES.MEAL_FRAMING],
      ["No garlic", "Discuss the complete dish and confirm availability before ordering"],
      ["No onion", "Ask which options are available for your visit"],
    ],
    sections: [
      {
        id: "ordering",
        title: "How do I order food without garlic?",
        lead: "Brihadhee supports a no-garlic request by discussing what you want to eat and which ingredients you avoid. Start with the dish you are considering and ask the server to confirm it with the kitchen. The current menu gives you dish names and prices so the conversation can be specific.",
        items: [
          { title: "Explain the complete request", text: "Say whether you avoid garlic alone or both onion and garlic. Tell the server about root vegetables or other ingredients you also exclude. Your requirements help the kitchen check a suitable order with the ingredients and preparation details that matter to you." },
          { title: "Check each part of the plate", text: "Ask about the base recipe, spice mixes, podi, filling, roast and accompaniments. Confirm any ingredients prepared ahead of service. A visible garnish is only one part of a dish, so discuss chutneys, sambar and other sides as well." },
        ],
        links: [{ label: "Read the current Brihadhee menu", href: href(ROUTES.menu) }],
      },
      {
        id: "custom-dosa",
        title: "What can I choose in a custom dosa?",
        lead: "Brihadhee's build-your-own dosa begins with a choice of " + byo.batterCount + " batters, followed by toppings, filling and roast. Choosing individual components makes it easier to explain your preferences to the server. The kitchen cooks the dosa to order and serves it at your table.",
        items: [
          { title: "Start with the batter", text: "Ask which batter fits your requirements and whether your preferred ingredients can be used together. If you avoid fermented ingredients, describe that separately so the kitchen can answer the right question." },
          { title: "Confirm fillings and sides", text: "The menu names onion and garlic among some additions. Ask the server to check your chosen podi, filling and accompaniments together. Confirm the preparation method before choosing the finished combination." },
        ],
        links: [{ label: "Explore the custom dosa ingredients and prices", href: href(ROUTES.dosa) }],
        tint: true,
      },
      {
        id: "jain-requests",
        title: "What should Jain and Marwari guests discuss?",
        lead: "Brihadhee welcomes Marwari families and Jain guests who want to discuss South Indian vegetarian food around their own dietary requirements. Guests may have different rules about onion, garlic, root vegetables, fermentation and preparation contact. Describe the ingredients and processes you avoid so the team can check your order individually.",
        items: [
          { title: "Ask about preparation", text: "Discuss the tawa, utensils, cooking fat and serving arrangements if contact with other ingredients matters to you. Ask whether the kitchen can meet your requirements on the day. These details need an answer from the restaurant for your particular order." },
          { title: "Confirm before ordering", text: "Ask the team to repeat the selected dish, changes and sides before it goes to the kitchen. If you have an allergy, state the allergen explicitly when discussing ingredients and preparation. Make sure your server understands each requirement before you finalise the order." },
        ],
      },
      {
        id: "groups",
        title: "Can we plan dietary requests for a group or event?",
        lead: "Brihadhee offers corporate catering and end-to-end event catering in Chennai, including birthdays, weddings and get-togethers. Tell the team how many people need a no-garlic menu and whether onion or other ingredients must also be excluded. Private event enquiries start from " + MIN + " guests.",
        items: [
          { title: "For an office programme", text: "Share your office area, meal schedule and the number of dietary portions needed each day. Brihadhee serves " + GATES.CORPORATE_DAILY_SCALE + " across corporate clients. Ask the team to agree on dishes, packing, delivery timing and how portions will be identified within your programme." },
          { title: "For a family function", text: "Include the occasion, Chennai venue, date and guest count when you enquire. Agree on the complete menu and service scope with the catering team. Ask for dietary portions and serving arrangements to be recorded alongside the quote so everyone has the same plan." },
        ],
        links: [
          { label: "Discuss corporate lunch catering", href: href(ROUTES.corporateCatering) },
          { label: "Request an event catering quote", href: href(ROUTES.cateringQuote), primary: true },
        ],
      },
    ],
    faqTitle: "Questions about dietary requests",
    faq,
    related: [
      { label: "Brihadhee address and directions", href: href(ROUTES.about) },
      { label: "Family dining in Anna Nagar", href: href(ROUTES.familyDining) },
    ],
    schema: () => pageGraph({
      path, title, description,
      crumbs: [...HOME_CRUMBS, { name: "Dietary requests", path }],
      extras: [faqPageSchema(path, faq)],
    }),
  };
}
export const noOnionPage = noOnionLive ? buildNoOnion() : null;
