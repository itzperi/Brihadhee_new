/**
 * Informational guides (P1): /guides/what-are-nellai-meals/.
 *
 * Each question section opens with an answer and then gives more context.
 * claimQuestion() reserves the headings for this route (src/lib/answers.js).
 *
 * Two kinds of statement live here, kept apart on purpose:
 *  - general culinary background about Tirunelveli food (what sodhi or ulundhu
 *    kali is), written as general knowledge, never as a Brihadhee claim;
 *  - Brihadhee facts (dishes, prices, hours, address), always computed from
 *    menu-canonical.ts and entity-truth.ts.
 * Copy may contain contextual links as [anchor](/path/) (src/lib/inline-links.js).
 */
import { getFact, openingTimes, RESTAURANT_DIET } from "./entity-truth.ts";
import { ROUTES } from "./site.js";
import { claimQuestion, list, qa, qaRoute } from "../lib/answers.js";
import { category, allItems, rupees } from "../lib/menu-facts.js";
import { cateringEnabled, guests, liveCounters, corporate } from "./catering.js";
import { CATERING_DIET } from "../../config/seo-gates.ts";

const name = getFact("name");
const { open: OPEN, close: CLOSE } = openingTimes();
const item = (n) => {
  const hit = allItems.find((i) => i.name === n);
  if (!hit) throw new Error(`[guides] menu item "${n}" not found in menu-canonical.ts`);
  return hit;
};
const lc = (s) => s.replace(/\.$/, "").replace(/^[A-Z]/, (c) => c.toLowerCase());
const num = (n) => n.toLocaleString("en-IN");

const sodhiMeals = item("Nellai Special Sodhi Meals");
const kali = item("Karuppatti Ulundhu Kali");
const idiyappamSodhi = item("Idiyappam Sodhi");
const sodhiIdly = item("Sodhi Idly");
const parottaSalna = item("Parotta Salna (2 pcs)");
const poppers = item("Karaikudi Paneer Poppers");
const idiyappam = category("idiyappam");
const idiCoconut = item("Idiyappam Coconut Milk");
const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
const countWord = (n) => NUMBER_WORDS[n] ?? String(n);

const PATH = ROUTES.nellaiGuide;
const q = (text) => claimQuestion(PATH, text);

export const nellaiGuide = {
  path: PATH,
  published: "2026-11-12",
  title: `Nellai Meals Guide to Sodhi and Ulundhu Kali | ${name}`,
  description: `What are Nellai meals? A guide to sodhi, ulundhu kali, idiyappam and Tirunelveli food, and where to eat a Nellai meal in Chennai at ${name}.`,
  h1: "What Are Nellai Meals? A Guide to Sodhi, Ulundhu Kali and Tirunelveli Food",
  intro: `Nellai is another name for Tirunelveli in southern Tamil Nadu. At ${name} in Anna Nagar East, Chennai, Nellai meals are a vegetarian banana-leaf lunch with sodhi, a coconut milk stew, and ulundhu kali, a sweet made with palm jaggery.`,
  sections: [
    {
      id: "what-are-nellai-meals",
      title: q("What Are Nellai Meals?"),
      answer: `Nellai meals are Tirunelveli-style meals. At ${name} in Chennai, the [${sodhiMeals.name}](${ROUTES.lunch}) is a vegetarian banana-leaf lunch with rice, sodhi (a coconut milk stew), sambar, rasam, kootu, poriyal and ulundhu kali (a sweet made with palm jaggery). It costs ${rupees(sodhiMeals.price)} before GST and is served at lunch every day.`,
      paras: [
        `The menu lists ${lc(sodhiMeals.description)}. At ${name}, the coconut milk in the sodhi, the tart rasam and the palm jaggery in the kali give you distinct flavours in one lunch.`,
        `${name} serves this meal from ${OPEN} daily at its pure vegetarian restaurant in Anna Nagar East. The [lunch menu](${ROUTES.lunch}) also lists the Tamil Nadu meals.`,
      ],
    },
    {
      id: "what-is-sodhi",
      title: q("What Is Sodhi?"),
      answer: `Sodhi is a Tirunelveli-style stew of vegetables simmered in coconut milk, mildly spiced with green chilli and ginger and finished with lemon. ${name} serves it in the ${sodhiMeals.name}, with idiyappam as ${idiyappamSodhi.name} (${rupees(idiyappamSodhi.price)}) and with idly as ${sodhiIdly.name} (${rupees(sodhiIdly.price)}).`,
      paras: [
        "Sodhi is gentle rather than fiery. The coconut milk carries the flavour, and the sourness comes from lemon squeezed in at the end, not from tamarind as in a kuzhambu. In Tirunelveli it is a celebration dish, traditionally part of wedding feasts, and it is eaten with rice, idiyappam or idly.",
        "The mild stew pairs with sharper flavours such as rasam and pickle. With soft idiyappam, it makes a lighter meal.",
        `Sodhi and salna are different dishes on the ${name} menu. Sodhi is the coconut milk stew in the Nellai meal and Idiyappam Sodhi. Salna is the gravy served with [${parottaSalna.name}](${ROUTES.menu}#parotta).`,
      ],
    },
    {
      id: "what-is-ulundhu-kali",
      title: q("What Is Ulundhu Kali?"),
      answer: `Ulundhu kali is a soft, thick sweet of black urad dal cooked with karuppatti, the dark palm jaggery of southern Tamil Nadu. ${name} serves ${kali.name} for ${rupees(kali.price)} on its own, and as part of the ${sodhiMeals.name} at its restaurant in Anna Nagar East.`,
      paras: [
        "Kali means a dish cooked and stirred until it holds together, and ulundhu is urad dal, the same lentil used in idly and dosa batter. Cooked with karuppatti, made from the sap of the palmyra trees that grow across the dry south of Tamil Nadu, it turns deep brown and tastes of caramel and roasted lentils, and it is traditionally eaten with a little gingelly oil.",
        "On a Nellai meal it is the sweet, served with the rice and curries, so there is something rich to balance the sour rasam and the cooling buttermilk.",
      ],
    },
    {
      id: "tirunelveli-cuisine",
      title: q("What Is Tirunelveli Cuisine Known For?"),
      answer: `Tirunelveli cuisine is known for coconut-rich dishes such as sodhi, palm jaggery sweets such as ulundhu kali, and the famous Tirunelveli halwa. At ${name} in Anna Nagar East, Chennai, sodhi and ulundhu kali are both part of the restaurant’s vegetarian banana-leaf lunch.`,
      paras: [
        "The district sits between the Western Ghats and the sea, and its cooking reflects both: coconut in stews and kootu, palm jaggery from the palmyra trees of the dry plains, and a preference for gentle, layered flavours over heavy spice.",
        `Tirunelveli halwa, a glossy wheat halwa, is the sweet the town is famous for, but it is not on ${name}'s menu. The restaurant's Nellai dishes are the sodhi meal, ulundhu kali and sodhi with idiyappam or idly, served next to dishes from Karaikudi, further north in Chettinad, such as ${poppers.name} (${rupees(poppers.price)}).`,
      ],
    },
    {
      id: "idiyappam-pairings",
      title: q("What Goes Best with Idiyappam?"),
      answer: `Idiyappam goes well with sweetened coconut milk, with sodhi, or chopped and tossed as kothu idiyappam with lemon or tomato. ${name} serves it ${countWord(idiyappam.count)} ways, from ${idiCoconut.name} (${rupees(idiCoconut.price)}) to ${idiyappamSodhi.name} (${rupees(idiyappamSodhi.price)}), at its pure vegetarian restaurant in Anna Nagar East.`,
      paras: [
        "Idiyappam, or string hoppers, are steamed nests of fine rice noodles, light enough to soak up a stew. Sodhi is the classic Tirunelveli pairing; coconut milk with a little sugar is the gentlest; and kothu idiyappam, the strands chopped and tossed on a hot griddle, turns them into a meal of their own.",
      ],
      dishes: idiyappam.items.map((i) => ({ name: i.name, price: rupees(i.price), note: i.description })),
    },
    {
      id: "where-to-eat",
      title: "Where to Eat Nellai Meals in Chennai",
      answer: `${name} serves Nellai meals on ${getFact("street")} in Anna Nagar East, near ${getFact("landmarks")[0]}. Lunch starts at ${OPEN} every day, and the restaurant is open until ${CLOSE}. The ${sodhiMeals.name} costs ${rupees(sodhiMeals.price)} before GST and is served on a banana leaf.`,
      paras: [
        `The restaurant is ${RESTAURANT_DIET}: no meat, egg or fish is cooked in its kitchen, and alcohol is not served. Ask the restaurant about specific ingredients if you follow dietary rules for a festival or a vow.`,
        `The full banana-leaf meal is a lunch dish. At dinner, you can try the same style of stew with ${idiyappamSodhi.name} or ${sodhiIdly.name}.`,
        `For current dishes and prices, see the [Brihadhee lunch menu](${ROUTES.lunch}). If you're visiting, check [directions to the restaurant](${ROUTES.about}#find-us).`,
      ],
    },
    ...(cateringEnabled && guests
      ? [
          {
            id: "nellai-catering",
            title: "Nellai Food at Your Function",
            answer: `${name} offers ${CATERING_DIET} catering for functions across Chennai for ${num(guests.min)} to ${num(guests.max)} guests. Discuss Nellai dishes for your menu and ask about live counters for ${list(liveCounters)}. Share your venue, date and guest count so the team can include the menu and service arrangements in your quote.`,
            paras: [
              `For a wedding, birthday or family function, see [${CATERING_DIET} event catering in Chennai](${ROUTES.eventCatering}). Ask what the quote covers for preparation, serving and setup.` +
                (corporate
                  ? ` For a recurring office lunch, discuss Nellai Special Sodhi Meals as part of the menu rotation with the [corporate catering team](${ROUTES.corporateCatering}).`
                  : ""),
            ],
          },
        ]
      : []),
  ],
  faq: qaRoute(PATH, [
    qa("What is the difference between sodhi and salna at Brihadhee?",
      "Sodhi is a coconut milk stew from Tirunelveli, while salna is the gravy Brihadhee serves with parotta. Order sodhi with the Nellai meal, idiyappam or idly at Brihadhee in Anna Nagar East."),
    qa("Can you order ulundhu kali on its own at Brihadhee?",
      `Yes. ${name} lists ${kali.name} on its own for ${rupees(kali.price)} before GST. It is a black urad dal sweet made with palm jaggery and also comes as part of the ${sodhiMeals.name}.`),
  ]),
};
