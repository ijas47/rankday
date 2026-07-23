/**
 * India + Kerala location data for programmatic /seo-agency/[city] pages.
 *
 * Each entry renders a unique, locally-grounded landing page. Content is
 * differentiated per location (real economic context, local high-ticket
 * verticals) so pages earn rankings rather than reading as thin doorway pages.
 *
 * Pricing is India parity: Standard ₹3,99,000 / Growth ₹6,49,000 (90 days).
 */

export const INR_STANDARD = "3,99,000";
export const INR_GROWTH = "6,49,000";

export type LocationType = "country" | "state" | "district" | "city";

export type Location = {
  slug: string;
  /** Display name, e.g. "Kochi". */
  name: string;
  /** Alternate names people search, e.g. ["Cochin", "Ernakulam"]. */
  aliases?: string[];
  type: LocationType;
  /** Parent slug for breadcrumb (e.g. district -> kerala -> india). */
  parent?: string;
  /** District the location sits in (for city entries). */
  district?: string;
  /** One-line SEO title suffix. */
  metaTitle: string;
  metaDescription: string;
  /** H1. */
  headline: string;
  /** 2-3 sentence unique intro. Real local economic context. */
  intro: string;
  /** The local high-ticket verticals we lead with here. */
  industries: string[];
  /** Unique paragraph on why AI + local search matters in THIS market. */
  localAngle: string;
  /** Sibling slugs to interlink (topical cluster). */
  nearby: string[];
};

const HIGH_TICKET = [
  "Construction & builders",
  "Interior design",
  "Architecture firms",
  "Marble, granite & tiles",
  "Lighting & electrical showrooms",
  "Luxury real estate",
  "Modular kitchens",
  "Landscaping & outdoor",
];

export const locations: Location[] = [
  // ---------------- NATIONAL ----------------
  {
    slug: "india",
    name: "India",
    type: "country",
    metaTitle: "SEO Agency India. Website + Top 3 Rankings + AI Citations in 90 Days.",
    metaDescription:
      "A new website, top-3 Google rankings, and AI citations for Indian businesses. ₹3,99,000 fixed. 90-day guarantee. Get cited by ChatGPT, Perplexity, Gemini & Google AI.",
    headline: "A new website, top-3 Google rankings, and AI citations for Indian businesses. In 90 days.",
    intro:
      "Indian buyers no longer stop at Google. They ask ChatGPT for the best architect in their city, Perplexity for the top marble supplier, Gemini for a builder they can trust. rankday rebuilds your website, ranks it in the Google top 3, and gets your business named in those AI answers — all in a fixed 90 days, one price, with a written guarantee.",
    industries: HIGH_TICKET,
    localAngle:
      "India is one of the fastest-growing AI-search markets on earth. ChatGPT and Gemini adoption here is enormous, and almost none of your competitors have done the work to be cited by them yet. That window — being the first business in your category an AI recommends — is open right now and closing fast.",
    nearby: ["kerala", "ernakulam", "thiruvananthapuram", "kozhikode", "thrissur"],
  },

  // ---------------- STATE ----------------
  {
    slug: "kerala",
    name: "Kerala",
    type: "state",
    parent: "india",
    metaTitle: "SEO Agency Kerala. Top 3 Google + AI Citations in 90 Days. ₹3,99,000.",
    metaDescription:
      "SEO, AEO and web design for Kerala businesses. Top-3 Google rankings and citations in ChatGPT, Perplexity & Gemini in 90 days. Fixed ₹3,99,000. Malayalam supported.",
    headline: "Rank #1 in Kerala on Google — and get named by AI. In 90 days.",
    intro:
      "Kerala runs on reputation and word of mouth. In 2026 that word of mouth is increasingly an AI answer. When a Kochi homeowner asks ChatGPT for the best interior designer, or a Thrissur family asks Gemini which builder to trust, one name comes up. rankday makes sure it is yours — with a rebuilt website, top-3 Google rankings, and AI citations, guaranteed in 90 days.",
    industries: HIGH_TICKET,
    localAngle:
      "Kerala has the highest literacy and smartphone penetration in India, and a diaspora across the Gulf, US, and UK researching home projects from abroad before they fly back. These are high-intent, high-ticket buyers who Google and ask AI before they ever call. We get you found in both. Malayalam-language SEO is supported at no extra cost.",
    nearby: ["ernakulam", "thiruvananthapuram", "thrissur", "kozhikode", "kottayam", "kochi"],
  },

  // ---------------- DISTRICTS (14) ----------------
  {
    slug: "ernakulam",
    name: "Ernakulam",
    aliases: ["Kochi", "Cochin"],
    type: "district",
    parent: "kerala",
    metaTitle: "SEO Agency Ernakulam. Website + Top 3 + AI Citations in 90 Days.",
    metaDescription:
      "SEO, AEO and web design for Ernakulam and Kochi businesses. Top-3 Google rankings and AI citations in 90 days. Fixed ₹3,99,000. Guarantee in writing.",
    headline: "SEO for Ernakulam businesses that want to own their category.",
    intro:
      "Ernakulam is Kerala's commercial engine — Kochi, Kakkanad's Infopark, Marine Drive, and the state's densest concentration of builders, interior studios, and premium showrooms. It is also the most competitive search market in Kerala. Ranking here takes a rebuilt, technically clean site and real citation work. That is exactly what rankday does in 90 days.",
    industries: HIGH_TICKET,
    localAngle:
      "In Ernakulam, buyers comparing three interior firms or four builders now open ChatGPT before they open your website. If the AI names your competitor and not you, you lost the shortlist before the enquiry. We fix that.",
    nearby: ["kochi", "kakkanad", "aluva", "kottayam", "thrissur", "kerala"],
  },
  {
    slug: "thiruvananthapuram",
    name: "Thiruvananthapuram",
    aliases: ["Trivandrum", "TVM"],
    type: "district",
    parent: "kerala",
    metaTitle: "SEO Agency Thiruvananthapuram (Trivandrum). Top 3 + AI in 90 Days.",
    metaDescription:
      "SEO, AEO and web design for Trivandrum businesses. Top-3 Google rankings and AI citations in 90 days. Fixed ₹3,99,000. Government, IT, and premium home market.",
    headline: "SEO for Thiruvananthapuram — the capital's most competitive searches.",
    intro:
      "Trivandrum blends government, Technopark's IT economy, and a fast-growing premium housing belt from Kowdiar to Vellayambalam. Its high-ticket buyers — building villas, fitting out offices, sourcing imported marble — research thoroughly before spending. rankday gets you ranked and AI-cited for exactly those searches in 90 days.",
    industries: HIGH_TICKET,
    localAngle:
      "Technopark professionals and returning NRIs building homes in Trivandrum are heavy AI-search users. They will ask Gemini and ChatGPT for architects and contractors long before they visit an office. We make your firm the answer.",
    nearby: ["kollam", "kottayam", "kerala", "kochi"],
  },
  {
    slug: "thrissur",
    name: "Thrissur",
    type: "district",
    parent: "kerala",
    metaTitle: "SEO Agency Thrissur. Website + Top 3 Google + AI Citations. 90 Days.",
    metaDescription:
      "SEO, AEO and web design for Thrissur businesses. Top-3 rankings and AI citations in 90 days. Fixed ₹3,99,000. Kerala's gold, finance and premium home hub.",
    headline: "SEO for Thrissur — Kerala's wealth capital deserves visibility to match.",
    intro:
      "Thrissur is the cultural and financial heart of Kerala — home to the gold trade, major chit and banking families, and Guruvayur's constant flow of visitors. It is a market where premium builders, jewellers, interior firms, and event venues compete for affluent, discerning buyers. rankday puts your name at the top of Google and inside AI answers in 90 days.",
    industries: [
      "Construction & builders",
      "Interior design",
      "Jewellery & luxury retail",
      "Marble, granite & tiles",
      "Event & wedding venues",
      "Architecture firms",
      "Modular kitchens",
      "Lighting showrooms",
    ],
    localAngle:
      "Thrissur's wedding and home-building economy is enormous and heavily researched. Families comparing venues, jewellers, and interior designers increasingly ask AI for a shortlist. Being cited there is a direct line to high-ticket enquiries.",
    nearby: ["guruvayur", "ernakulam", "palakkad", "kerala"],
  },
  {
    slug: "kozhikode",
    name: "Kozhikode",
    aliases: ["Calicut"],
    type: "district",
    parent: "kerala",
    metaTitle: "SEO Agency Kozhikode (Calicut). Top 3 Google + AI Citations. 90 Days.",
    metaDescription:
      "SEO, AEO and web design for Kozhikode / Calicut businesses. Top-3 rankings and AI citations in 90 days. Fixed ₹3,99,000. Trade, timber, furniture and premium homes.",
    headline: "SEO for Kozhikode & Calicut businesses ready to lead their market.",
    intro:
      "Kozhikode is North Kerala's commercial capital — a historic trade city with deep money in timber, furniture, construction, and a booming premium housing market from Kottooli to Vellimadukunnu. Its buyers are brand-loyal but research hard. rankday gets your business ranked on Google and named by AI for Calicut's highest-value searches in 90 days.",
    industries: [
      "Construction & builders",
      "Furniture & interiors",
      "Timber & plywood",
      "Marble, granite & tiles",
      "Lighting & electrical showrooms",
      "Luxury real estate",
      "Modular kitchens",
      "Architecture firms",
    ],
    localAngle:
      "A large share of Kozhikode's high-ticket buyers are Gulf-based, planning and sourcing home projects remotely. They live inside WhatsApp, Google, and increasingly ChatGPT. If AI does not know your firm, that diaspora money goes to whoever it does name.",
    nearby: ["malappuram", "wayanad", "kannur", "manjeri", "kerala"],
  },
  {
    slug: "kollam",
    name: "Kollam",
    aliases: ["Quilon"],
    type: "district",
    parent: "kerala",
    metaTitle: "SEO Agency Kollam (Quilon). Website + Top 3 + AI Citations. 90 Days.",
    metaDescription:
      "SEO, AEO and web design for Kollam businesses. Top-3 Google rankings and AI citations in 90 days. Fixed ₹3,99,000. Cashew, construction and coastal premium homes.",
    headline: "SEO for Kollam businesses that want to be found first.",
    intro:
      "Kollam sits between Trivandrum's growth and Kerala's backwater tourism belt, with strong construction, cashew, and a rising premium-home market. Buyers here are practical and price-aware but still research before committing to a builder or interior firm. rankday gets you to the top of Google and into AI answers in 90 days.",
    industries: HIGH_TICKET,
    localAngle:
      "As Trivandrum's premium housing spills north into Kollam, buyers comparing contractors and designers are searching online first. Rank and get cited before your competitors realise AI search matters.",
    nearby: ["thiruvananthapuram", "pathanamthitta", "alappuzha", "kerala"],
  },
  {
    slug: "kottayam",
    name: "Kottayam",
    type: "district",
    parent: "kerala",
    metaTitle: "SEO Agency Kottayam. Website + Top 3 Google + AI Citations. 90 Days.",
    metaDescription:
      "SEO, AEO and web design for Kottayam businesses. Top-3 rankings and AI citations in 90 days. Fixed ₹3,99,000. Rubber, education, healthcare and premium homes.",
    headline: "SEO for Kottayam — the town that reads, now searches AI too.",
    intro:
      "Kottayam is Kerala's education and publishing capital, with rubber wealth, strong healthcare, and an affluent, highly literate population from Pala to Changanassery. These are exactly the buyers who research a builder, architect, or clinic thoroughly online. rankday gets you ranked and AI-cited for Kottayam's high-value searches in 90 days.",
    industries: [
      "Construction & builders",
      "Interior design",
      "Healthcare & clinics",
      "Architecture firms",
      "Marble, granite & tiles",
      "Modular kitchens",
      "Luxury real estate",
      "Lighting showrooms",
    ],
    localAngle:
      "Kottayam's literate, prosperous buyers are early AI adopters. A family planning a home in Pala will ask ChatGPT for architects before visiting one. Be the name it returns.",
    nearby: ["pala", "ernakulam", "idukki", "alappuzha", "kerala"],
  },
  {
    slug: "alappuzha",
    name: "Alappuzha",
    aliases: ["Alleppey"],
    type: "district",
    parent: "kerala",
    metaTitle: "SEO Agency Alappuzha (Alleppey). Top 3 Google + AI Citations. 90 Days.",
    metaDescription:
      "SEO, AEO and web design for Alappuzha / Alleppey businesses. Top-3 rankings and AI citations in 90 days. Fixed ₹3,99,000. Tourism, hospitality and premium homes.",
    headline: "SEO for Alappuzha — where tourism buyers decide by search.",
    intro:
      "Alleppey is the face of Kerala tourism — houseboats, resorts, and a premium hospitality market where nearly every booking starts with a search or an AI question. Beyond tourism, its construction and interiors market serves a returning diaspora. rankday gets you ranked and cited across both in 90 days.",
    industries: [
      "Resorts & hospitality",
      "Houseboat & tourism operators",
      "Construction & builders",
      "Interior design",
      "Event & wedding venues",
      "Architecture firms",
      "Landscaping & outdoor",
      "Marble, granite & tiles",
    ],
    localAngle:
      "Tourism is the purest AI-search category there is: travellers ask ChatGPT and Perplexity 'best houseboat in Alleppey' or 'top resort near the backwaters' and book what gets named. If you are not cited, you are invisible to that traveller.",
    nearby: ["kottayam", "kollam", "ernakulam", "kerala"],
  },
  {
    slug: "palakkad",
    name: "Palakkad",
    type: "district",
    parent: "kerala",
    metaTitle: "SEO Agency Palakkad. Website + Top 3 Google + AI Citations. 90 Days.",
    metaDescription:
      "SEO, AEO and web design for Palakkad businesses. Top-3 rankings and AI citations in 90 days. Fixed ₹3,99,000. Industry, agriculture and growing premium homes.",
    headline: "SEO for Palakkad businesses building for the next decade.",
    intro:
      "Palakkad is Kerala's gateway and industrial belt, with manufacturing, agriculture, and a steadily growing premium housing and commercial market. As money moves in, so does competition for the buyers building homes, offices, and showrooms. rankday gets you ranked and AI-cited in 90 days.",
    industries: HIGH_TICKET,
    localAngle:
      "Palakkad's industrial and NRI-funded home projects are researched online first. Rank now, while the local search market is still winnable, and own it before larger agencies move in.",
    nearby: ["thrissur", "malappuram", "kerala"],
  },
  {
    slug: "malappuram",
    name: "Malappuram",
    type: "district",
    parent: "kerala",
    metaTitle: "SEO Agency Malappuram. Website + Top 3 + AI Citations. 90 Days.",
    metaDescription:
      "SEO, AEO and web design for Malappuram businesses. Top-3 rankings and AI citations in 90 days. Fixed ₹3,99,000. Gulf-funded construction and premium home market.",
    headline: "SEO for Malappuram — Kerala's biggest home-building market.",
    intro:
      "Malappuram is one of Kerala's most dynamic districts — a huge Gulf-remittance economy pouring into construction, interiors, marble, and premium homes from Manjeri to Perinthalmanna to Tirur. The spending is enormous; the digital competition is still light. rankday gets your firm ranked and AI-cited in 90 days.",
    industries: [
      "Construction & builders",
      "Interior design",
      "Marble, granite & tiles",
      "Lighting & electrical showrooms",
      "Modular kitchens",
      "Furniture & interiors",
      "Architecture firms",
      "Luxury real estate",
    ],
    localAngle:
      "Malappuram's Gulf-based families plan and fund home projects entirely online, over WhatsApp and search, often asking AI for contractor and interior recommendations before they land. Being cited there wins remote high-ticket buyers your competitors can't reach.",
    nearby: ["manjeri", "perinthalmanna", "kozhikode", "palakkad", "kerala"],
  },
  {
    slug: "kannur",
    name: "Kannur",
    type: "district",
    parent: "kerala",
    metaTitle: "SEO Agency Kannur. Website + Top 3 Google + AI Citations. 90 Days.",
    metaDescription:
      "SEO, AEO and web design for Kannur businesses. Top-3 rankings and AI citations in 90 days. Fixed ₹3,99,000. Handloom, construction and Gulf-funded premium homes.",
    headline: "SEO for Kannur businesses ready to be found across the world.",
    intro:
      "Kannur pairs a strong Gulf-remittance economy with growing construction, interiors, and a premium housing belt around Thalassery and the airport corridor. Its buyers are affluent and increasingly global in how they research. rankday gets you ranked on Google and named by AI in 90 days.",
    industries: HIGH_TICKET,
    localAngle:
      "With Kannur International Airport pulling in NRI investment, home and commercial projects here are planned from abroad. AI search is how that diaspora shortlists firms. Get cited and capture it.",
    nearby: ["thalassery", "kozhikode", "kasaragod", "kerala"],
  },
  {
    slug: "pathanamthitta",
    name: "Pathanamthitta",
    type: "district",
    parent: "kerala",
    metaTitle: "SEO Agency Pathanamthitta. Top 3 Google + AI Citations. 90 Days.",
    metaDescription:
      "SEO, AEO and web design for Pathanamthitta businesses. Top-3 rankings and AI citations in 90 days. Fixed ₹3,99,000. NRI-funded premium homes and Sabarimala economy.",
    headline: "SEO for Pathanamthitta — the NRI district that builds big.",
    intro:
      "Pathanamthitta has among the highest NRI concentrations in Kerala, funding a steady stream of premium home and commercial projects, alongside the Sabarimala pilgrimage economy. Buyers plan from abroad and research online first. rankday gets you ranked and AI-cited in 90 days.",
    industries: HIGH_TICKET,
    localAngle:
      "Nearly every high-ticket project here is NRI-funded and researched remotely through search and AI. If ChatGPT does not name your firm, a family in the Gulf will never find you.",
    nearby: ["kottayam", "kollam", "alappuzha", "kerala"],
  },
  {
    slug: "idukki",
    name: "Idukki",
    type: "district",
    parent: "kerala",
    metaTitle: "SEO Agency Idukki. Website + Top 3 Google + AI Citations. 90 Days.",
    metaDescription:
      "SEO, AEO and web design for Idukki businesses. Top-3 rankings and AI citations in 90 days. Fixed ₹3,99,000. Munnar tourism, resorts and hospitality.",
    headline: "SEO for Idukki & Munnar — tourism runs on being found.",
    intro:
      "Idukki is Kerala's hill country — Munnar's resorts, homestays, and a hospitality economy where almost every guest starts with a search or an AI question. rankday gets your property ranked on Google and named by AI for the queries travellers actually ask, in 90 days.",
    industries: [
      "Resorts & hospitality",
      "Homestays & tourism operators",
      "Construction & builders",
      "Interior design",
      "Landscaping & outdoor",
      "Event & wedding venues",
      "Architecture firms",
    ],
    localAngle:
      "'Best resort in Munnar' is asked to ChatGPT, Perplexity, and Gemini thousands of times a month. The properties those tools name get the bookings. We make yours one of them.",
    nearby: ["munnar", "kottayam", "ernakulam", "kerala"],
  },
  {
    slug: "wayanad",
    name: "Wayanad",
    type: "district",
    parent: "kerala",
    metaTitle: "SEO Agency Wayanad. Website + Top 3 Google + AI Citations. 90 Days.",
    metaDescription:
      "SEO, AEO and web design for Wayanad businesses. Top-3 rankings and AI citations in 90 days. Fixed ₹3,99,000. Resorts, homestays and hill-country hospitality.",
    headline: "SEO for Wayanad — where every guest searches before they book.",
    intro:
      "Wayanad's resorts, homestays, and eco-tourism properties live and die by discoverability. Guests research heavily, comparing options through Google and increasingly through AI. rankday gets your property ranked and cited for the highest-intent travel queries in 90 days.",
    industries: [
      "Resorts & hospitality",
      "Homestays & tourism operators",
      "Construction & builders",
      "Interior design",
      "Landscaping & outdoor",
      "Architecture firms",
    ],
    localAngle:
      "Travel is the category where AI citation matters most. When someone asks Perplexity for the best homestay in Wayanad, the named properties win the booking outright — no second click.",
    nearby: ["kozhikode", "kannur", "kerala"],
  },
  {
    slug: "kasaragod",
    name: "Kasaragod",
    type: "district",
    parent: "kerala",
    metaTitle: "SEO Agency Kasaragod. Website + Top 3 Google + AI Citations. 90 Days.",
    metaDescription:
      "SEO, AEO and web design for Kasaragod businesses. Top-3 rankings and AI citations in 90 days. Fixed ₹3,99,000. Gulf-funded construction and premium homes.",
    headline: "SEO for Kasaragod businesses on Kerala's northern frontier.",
    intro:
      "Kasaragod blends Kerala and coastal Karnataka influences, with a strong Gulf economy funding construction, interiors, and premium homes. Digital competition here is still light — an opening for the first firms to rank and get AI-cited. rankday does exactly that in 90 days.",
    industries: HIGH_TICKET,
    localAngle:
      "As a border market often overlooked by big agencies, Kasaragod's high-ticket searches are winnable now. Rank and get cited before anyone else claims the top spots.",
    nearby: ["kanhangad", "kannur", "kerala"],
  },

  // ---------------- MAJOR TOWNS / CITIES ----------------
  {
    slug: "kochi",
    name: "Kochi",
    aliases: ["Cochin"],
    type: "city",
    parent: "ernakulam",
    district: "Ernakulam",
    metaTitle: "SEO Agency Kochi (Cochin). Website + Top 3 + AI Citations. 90 Days.",
    metaDescription:
      "SEO, AEO and web design for Kochi / Cochin businesses. Top-3 Google rankings and AI citations in 90 days. Fixed ₹3,99,000. Kerala's most competitive market.",
    headline: "SEO for Kochi — win Kerala's most competitive market.",
    intro:
      "Kochi is Kerala's business capital: Marine Drive, Kakkanad's Infopark, the metro corridor, and the state's densest cluster of premium builders, interior studios, marble galleries, and lighting showrooms. It is the hardest market in Kerala to rank in — and the most valuable. rankday rebuilds your site, ranks it top-3, and gets you AI-cited in 90 days.",
    industries: HIGH_TICKET,
    localAngle:
      "In Kochi, a buyer choosing between four interior firms opens ChatGPT first. The firm the AI names starts the race three lengths ahead. We make that firm you — and back it with a top-3 Google guarantee.",
    nearby: ["kakkanad", "aluva", "ernakulam", "thrissur", "kerala"],
  },
  {
    slug: "kakkanad",
    name: "Kakkanad",
    type: "city",
    parent: "ernakulam",
    district: "Ernakulam",
    metaTitle: "SEO Agency Kakkanad. Website + Top 3 Google + AI Citations. 90 Days.",
    metaDescription:
      "SEO, AEO and web design for Kakkanad businesses. Top-3 rankings and AI citations in 90 days. Fixed ₹3,99,000. Infopark, IT corridor and premium home market.",
    headline: "SEO for Kakkanad — Kochi's IT corridor and its premium home belt.",
    intro:
      "Kakkanad is Kochi's fastest-growing zone — Infopark's IT workforce, Smart City, and a wave of premium apartments and villas driving demand for builders, interior designers, and high-end showrooms. Its buyers are young, affluent, and AI-native. rankday gets you ranked and cited in 90 days.",
    industries: HIGH_TICKET,
    localAngle:
      "Infopark professionals are among the heaviest AI-search users in Kerala. They will ask ChatGPT for an interior designer or modular kitchen brand before they ask a colleague. Be the answer.",
    nearby: ["kochi", "ernakulam", "aluva", "kerala"],
  },
  {
    slug: "aluva",
    name: "Aluva",
    type: "city",
    parent: "ernakulam",
    district: "Ernakulam",
    metaTitle: "SEO Agency Aluva. Website + Top 3 Google + AI Citations. 90 Days.",
    metaDescription:
      "SEO, AEO and web design for Aluva businesses. Top-3 rankings and AI citations in 90 days. Fixed ₹3,99,000. Industrial, metro corridor and growing home market.",
    headline: "SEO for Aluva businesses on Kochi's growth corridor.",
    intro:
      "Aluva anchors Kochi's northern industrial and metro corridor, with strong construction, manufacturing, and a rising residential market near the airport. rankday gets your business ranked on Google and named by AI for the searches that bring high-ticket enquiries, in 90 days.",
    industries: HIGH_TICKET,
    localAngle:
      "As the airport-metro corridor develops, home and commercial projects around Aluva are researched online first. Rank and get cited while the market is still open.",
    nearby: ["kochi", "kakkanad", "ernakulam", "kerala"],
  },
  {
    slug: "guruvayur",
    name: "Guruvayur",
    type: "city",
    parent: "thrissur",
    district: "Thrissur",
    metaTitle: "SEO Agency Guruvayur. Website + Top 3 Google + AI Citations. 90 Days.",
    metaDescription:
      "SEO, AEO and web design for Guruvayur businesses. Top-3 rankings and AI citations in 90 days. Fixed ₹3,99,000. Temple economy, hospitality and weddings.",
    headline: "SEO for Guruvayur — a constant flow of visitors, searching first.",
    intro:
      "Guruvayur's temple economy drives year-round demand for hotels, wedding venues, catering, and premium retail. Nearly every visitor and event planner researches online before booking. rankday gets your business ranked and AI-cited for those high-intent searches in 90 days.",
    industries: [
      "Hotels & hospitality",
      "Wedding & event venues",
      "Jewellery & luxury retail",
      "Catering & events",
      "Interior design",
      "Construction & builders",
    ],
    localAngle:
      "Wedding and pilgrimage planning is intensely researched. Families ask AI for the best venue or hotel in Guruvayur and book what gets named. Citation here is direct revenue.",
    nearby: ["thrissur", "kerala"],
  },
  {
    slug: "munnar",
    name: "Munnar",
    type: "city",
    parent: "idukki",
    district: "Idukki",
    metaTitle: "SEO Agency Munnar. Website + Top 3 Google + AI Citations. 90 Days.",
    metaDescription:
      "SEO, AEO and web design for Munnar resorts and businesses. Top-3 rankings and AI citations in 90 days. Fixed ₹3,99,000. Resorts, homestays and hill tourism.",
    headline: "SEO for Munnar — get booked before your competitors are seen.",
    intro:
      "Munnar is one of India's most-searched hill destinations. Every resort, homestay, and experience operator competes for travellers who decide almost entirely through search and AI. rankday gets your property ranked on Google and cited by ChatGPT, Perplexity, and Gemini in 90 days.",
    industries: [
      "Resorts & hospitality",
      "Homestays & tourism operators",
      "Experience & adventure operators",
      "Restaurants & cafés",
      "Landscaping & outdoor",
    ],
    localAngle:
      "'Best resort in Munnar' and 'romantic stay in Munnar' are asked to AI constantly. The named properties win the booking with zero further clicks. We make yours the name AI trusts.",
    nearby: ["idukki", "kottayam", "kerala"],
  },
  {
    slug: "thalassery",
    name: "Thalassery",
    aliases: ["Tellicherry"],
    type: "city",
    parent: "kannur",
    district: "Kannur",
    metaTitle: "SEO Agency Thalassery. Website + Top 3 Google + AI Citations. 90 Days.",
    metaDescription:
      "SEO, AEO and web design for Thalassery businesses. Top-3 rankings and AI citations in 90 days. Fixed ₹3,99,000. Heritage trade town with Gulf-funded premium homes.",
    headline: "SEO for Thalassery — heritage trade money, modern search.",
    intro:
      "Thalassery blends a rich trade heritage with a strong Gulf economy funding premium homes, interiors, and commercial projects along the Kannur corridor. rankday gets your firm ranked and AI-cited for high-ticket local searches in 90 days.",
    industries: HIGH_TICKET,
    localAngle:
      "Thalassery's Gulf-based families research and fund home projects remotely. AI search is how they shortlist. Get cited and win buyers your competitors never see.",
    nearby: ["kannur", "kozhikode", "kerala"],
  },
  {
    slug: "manjeri",
    name: "Manjeri",
    type: "city",
    parent: "malappuram",
    district: "Malappuram",
    metaTitle: "SEO Agency Manjeri. Website + Top 3 Google + AI Citations. 90 Days.",
    metaDescription:
      "SEO, AEO and web design for Manjeri businesses. Top-3 rankings and AI citations in 90 days. Fixed ₹3,99,000. Malappuram's commercial hub, Gulf-funded home market.",
    headline: "SEO for Manjeri — Malappuram's commercial engine.",
    intro:
      "Manjeri is one of Malappuram's largest commercial centres, with heavy Gulf-remittance spending on construction, marble, interiors, and premium retail. Digital competition remains light relative to the money moving through. rankday gets you ranked and AI-cited in 90 days.",
    industries: [
      "Construction & builders",
      "Marble, granite & tiles",
      "Interior design",
      "Lighting & electrical showrooms",
      "Furniture & interiors",
      "Modular kitchens",
    ],
    localAngle:
      "Manjeri's home-building economy is huge and remotely funded. Families in the Gulf ask AI for contractors and showrooms before they visit. Be the name that comes up.",
    nearby: ["perinthalmanna", "malappuram", "kozhikode", "kerala"],
  },
  {
    slug: "perinthalmanna",
    name: "Perinthalmanna",
    type: "city",
    parent: "malappuram",
    district: "Malappuram",
    metaTitle: "SEO Agency Perinthalmanna. Top 3 Google + AI Citations. 90 Days.",
    metaDescription:
      "SEO, AEO and web design for Perinthalmanna businesses. Top-3 rankings and AI citations in 90 days. Fixed ₹3,99,000. Healthcare hub and Gulf-funded home market.",
    headline: "SEO for Perinthalmanna — healthcare hub, high-ticket homes.",
    intro:
      "Perinthalmanna is a major healthcare and commercial town in Malappuram, with strong Gulf-funded construction and interiors demand. rankday gets your clinic, showroom, or firm ranked on Google and cited by AI in 90 days.",
    industries: [
      "Healthcare & hospitals",
      "Construction & builders",
      "Interior design",
      "Marble, granite & tiles",
      "Modular kitchens",
      "Lighting showrooms",
    ],
    localAngle:
      "Patients and home-builders alike research Perinthalmanna businesses online first, and increasingly through AI. Rank and get cited before competitors catch on.",
    nearby: ["manjeri", "malappuram", "palakkad", "kerala"],
  },
  {
    slug: "pala",
    name: "Pala",
    type: "city",
    parent: "kottayam",
    district: "Kottayam",
    metaTitle: "SEO Agency Pala. Website + Top 3 Google + AI Citations. 90 Days.",
    metaDescription:
      "SEO, AEO and web design for Pala businesses. Top-3 rankings and AI citations in 90 days. Fixed ₹3,99,000. Rubber wealth, premium homes and education.",
    headline: "SEO for Pala — old money, new search behaviour.",
    intro:
      "Pala is one of Kerala's most prosperous towns — rubber wealth, strong education, and affluent families building premium homes. These are discerning, high-ticket buyers who research thoroughly. rankday gets your firm ranked and AI-cited in 90 days.",
    industries: [
      "Construction & builders",
      "Interior design",
      "Architecture firms",
      "Marble, granite & tiles",
      "Modular kitchens",
      "Luxury real estate",
    ],
    localAngle:
      "Pala's prosperous families plan homes carefully and research online. A buyer will ask ChatGPT for an architect long before an office visit. Be the recommendation.",
    nearby: ["kottayam", "idukki", "kerala"],
  },
  {
    slug: "kanhangad",
    name: "Kanhangad",
    type: "city",
    parent: "kasaragod",
    district: "Kasaragod",
    metaTitle: "SEO Agency Kanhangad. Website + Top 3 Google + AI Citations. 90 Days.",
    metaDescription:
      "SEO, AEO and web design for Kanhangad businesses. Top-3 rankings and AI citations in 90 days. Fixed ₹3,99,000. Growing northern Kerala commercial town.",
    headline: "SEO for Kanhangad — north Kerala's rising commercial town.",
    intro:
      "Kanhangad is one of Kasaragod's fastest-growing towns, with steady Gulf-funded construction and retail demand. Digital competition is minimal — a rare chance to rank first and get AI-cited early. rankday does it in 90 days.",
    industries: HIGH_TICKET,
    localAngle:
      "In a market this open, the first firms to rank and get cited by AI will own their category for years. Move before anyone else does.",
    nearby: ["kasaragod", "kannur", "kerala"],
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

export function locationLabel(l: Location): string {
  if (l.type === "country" || l.type === "state") return l.name;
  return l.name;
}
