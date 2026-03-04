import type { FeedPost } from "@/data/types";

export const FEED_POSTS: FeedPost[] = [
  // ── Thoughts (8) ──────────────────────────────────────

  {
    id: "fp-001",
    type: "thought",
    authorId: "usr-001",
    isTeam: false,
    content:
      "People always talk about the Silk Road as if it were one road. It was a sprawling web of routes — some maritime, some overland — shifting with every political upheaval. When the Parthian Empire collapsed, entire branches went dormant for decades. Trade didn't stop; it just found new veins, like water around a boulder.",
    score: 187,
    commentCount: 34,
    createdAt: "2026-03-03T14:30:00Z",
  },
  {
    id: "fp-002",
    type: "thought",
    authorId: "usr-005",
    isTeam: false,
    content:
      "Just realized that the medieval \"right of wreck\" — where locals could legally salvage cargo from shipwrecks — was so profitable that some coastal villages in Cornwall and Brittany would light false beacons to lure ships onto rocks. The line between maritime law and piracy was thinner than we think.",
    score: 243,
    commentCount: 41,
    createdAt: "2026-03-03T11:15:00Z",
  },
  {
    id: "fp-003",
    type: "thought",
    authorId: "usr-007",
    isTeam: false,
    content:
      "The Tokugawa shogunate's sankin-kōtai system was pure political genius. By forcing every daimyō to maintain a residence in Edo and travel there every other year, they drained feudal lords of wealth, prevented rebellion, AND accidentally built Japan's road infrastructure. The unintended consequences of control are fascinating.",
    score: 156,
    commentCount: 22,
    createdAt: "2026-03-03T08:00:00Z",
  },
  {
    id: "fp-004",
    type: "thought",
    authorId: "usr-008",
    isTeam: false,
    content:
      "Al-Jazari's 1206 Book of Knowledge of Ingenious Mechanical Devices described a programmable automaton — a boat with four mechanical musicians that could play different rhythms by rearranging pegs on a rotating drum. This is, functionally, the same concept as a music box or even a punch card. Eight centuries before computers.",
    score: 312,
    commentCount: 56,
    createdAt: "2026-03-02T19:45:00Z",
  },
  {
    id: "fp-005",
    type: "thought",
    authorId: "usr-006",
    isTeam: false,
    content:
      "The Indus Valley Civilization had standardized weights and measures across an area larger than ancient Egypt and Mesopotamia combined. Their smallest weight division was 0.856 grams. We still don't fully understand their script, but their bureaucratic precision is unmistakable. You don't standardize weights across 1,500 km without serious institutional power.",
    score: 198,
    commentCount: 29,
    createdAt: "2026-03-02T15:20:00Z",
  },
  {
    id: "fp-006",
    type: "thought",
    authorId: "usr-009",
    isTeam: false,
    content:
      "Hot take: the Viking expansion wasn't primarily about raiding. The earliest Norse settlements in the Faroe Islands and Iceland were farming communities. Raiding got the headlines (literally — monks wrote the chronicles), but most Norse who left Scandinavia were looking for arable land during a period of population pressure and political consolidation under Harald Fairhair.",
    score: 267,
    commentCount: 53,
    createdAt: "2026-03-02T10:30:00Z",
  },
  {
    id: "fp-007",
    type: "thought",
    authorId: "usr-002",
    isTeam: false,
    content:
      "Zheng He's treasure ships were reportedly 120 meters long — four times the size of Columbus's Santa Maria. Whether or not you believe the exact dimensions (there's legitimate debate), the Ming dynasty's naval capability in the early 1400s was unmatched anywhere on Earth. And then they just... stopped. Burned the ships. Turned inward. One of history's great what-ifs.",
    score: 340,
    commentCount: 67,
    createdAt: "2026-03-01T22:00:00Z",
  },
  {
    id: "fp-008",
    type: "thought",
    authorId: "usr-010",
    isTeam: false,
    content:
      "Mansa Musa's 1324 hajj to Mecca crashed the gold market in Cairo for over a decade. He gave away so much gold that its value plummeted across the entire eastern Mediterranean. On his return trip, he tried to fix the inflation by borrowing gold back at high interest — possibly the first recorded instance of monetary policy correction by a sub-Saharan African ruler.",
    score: 289,
    commentCount: 45,
    createdAt: "2026-03-01T18:45:00Z",
  },

  // ── Chronicles (5) ────────────────────────────────────

  {
    id: "fp-009",
    type: "chronicle",
    authorId: "usr-004",
    isTeam: false,
    title: "The Forgotten Siege: How Osaka Castle Fell Twice",
    content:
      "The Winter and Summer campaigns of 1614-1615 are among the most dramatic episodes in Japanese history, yet they remain poorly understood in the West. Tokugawa Ieyasu's methodical dismantling of the Toyotomi clan involved psychological warfare, engineered flooding, and a peace treaty designed to be broken. This chronicle traces the siege day by day, using letters from both sides...",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&h=400&fit=crop",
    },
    metadata: {
      readTime: "18 min",
      era: "renaissance",
      chronicleId: "chr-osaka-siege",
    },
    score: 203,
    commentCount: 31,
    createdAt: "2026-03-03T13:00:00Z",
  },
  {
    id: "fp-010",
    type: "chronicle",
    authorId: "usr-001",
    isTeam: false,
    title: "Salt, Gold, and Silence: The Trans-Saharan Routes Nobody Talks About",
    content:
      "We know about Timbuktu. We know about the gold-for-salt exchanges. But the trans-Saharan trade network had dozens of lesser-known routes carrying copper, kola nuts, textiles, and enslaved people through some of the harshest terrain on Earth. This chronicle maps eight forgotten corridors and the communities that sustained them for over 700 years...",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=600&h=400&fit=crop",
    },
    metadata: {
      readTime: "24 min",
      era: "medieval",
      chronicleId: "chr-trans-saharan",
    },
    score: 178,
    commentCount: 27,
    createdAt: "2026-03-02T20:00:00Z",
  },
  {
    id: "fp-011",
    type: "chronicle",
    authorId: "usr-003",
    isTeam: false,
    title: "Cacao and Empire: How Chocolate Shaped Mesoamerican Politics",
    content:
      "Cacao beans weren't just currency in Mesoamerica — they were a tool of statecraft. The Maya elite controlled cacao orchards the way modern nations control oil fields. When Teotihuacan's influence waned in the 7th century, cacao trade routes shifted, and with them, the balance of power across the entire Yucatan. This chronicle follows the bean from farm to throne room...",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&h=400&fit=crop",
    },
    metadata: {
      readTime: "15 min",
      era: "classical",
      chronicleId: "chr-cacao-empire",
    },
    score: 221,
    commentCount: 38,
    createdAt: "2026-03-02T12:30:00Z",
  },
  {
    id: "fp-012",
    type: "chronicle",
    authorId: "usr-008",
    isTeam: false,
    title: "The House of Wisdom: Baghdad's Library That Changed Everything",
    content:
      "Between the 8th and 13th centuries, the Abbasid caliphate's House of Wisdom in Baghdad became the intellectual center of the world. Scholars translated Greek, Persian, Indian, and Chinese texts into Arabic, synthesizing knowledge across civilizations. Al-Khwarizmi developed algebra here. Hunayn ibn Ishaq translated Galen. This chronicle reconstructs what the library actually looked like and how it operated...",
    metadata: {
      readTime: "21 min",
      era: "medieval",
      chronicleId: "chr-house-of-wisdom",
    },
    score: 296,
    commentCount: 52,
    createdAt: "2026-03-01T16:00:00Z",
  },
  {
    id: "fp-013",
    type: "chronicle",
    authorId: "usr-005",
    isTeam: false,
    title: "The Black Death's Silver Lining: How Plague Remade the English Economy",
    content:
      "When the Black Death killed roughly 40-60% of England's population between 1348 and 1351, it didn't just cause devastation — it fundamentally restructured the economy. Surviving peasants suddenly had leverage. Wages rose. Serfdom crumbled. The Statute of Labourers (1351) tried to freeze wages, but market forces won. This chronicle argues the plague was the single greatest catalyst for English social mobility before industrialization...",
    metadata: {
      readTime: "19 min",
      era: "medieval",
      chronicleId: "chr-black-death-economy",
    },
    score: 234,
    commentCount: 44,
    createdAt: "2026-03-01T09:15:00Z",
  },

  // ── Recreations (4) ───────────────────────────────────

  {
    id: "fp-014",
    type: "recreation",
    authorId: "usr-004",
    isTeam: false,
    title: "Walk Through the Roman Forum — 44 BC",
    content:
      "Experience the Roman Forum on the Ides of March, 44 BC — the day Julius Caesar was assassinated. Every temple, basilica, and rostra has been reconstructed from archaeological surveys and Vitruvius's descriptions. Walk past the Temple of Saturn, hear the crowd noise, and see the Senate house where it all happened. Historically accurate down to the graffiti on the walls.",
    media: {
      type: "3d",
      url: "https://atlas.app/recreations/roman-forum-44bc",
      thumbnail:
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=400&fit=crop",
    },
    metadata: {
      era: "classical",
      coordinates: [41.8925, 12.4853],
      location: "Rome, Italy",
    },
    score: 315,
    commentCount: 58,
    createdAt: "2026-03-03T16:00:00Z",
  },
  {
    id: "fp-015",
    type: "recreation",
    authorId: "usr-003",
    isTeam: false,
    title: "Tenochtitlan at Its Peak — 1500 AD",
    content:
      "Tenochtitlan in 1500 was larger than any city in Europe. This recreation lets you explore the island capital from the great Templo Mayor to the bustling Tlatelolco marketplace, where 60,000 people traded daily. Paddle a canoe through the chinampas (floating gardens), cross the three great causeways, and visit Moctezuma I's palace complex. Built from Bernardino de Sahagun's descriptions and recent LIDAR scans.",
    media: {
      type: "3d",
      url: "https://atlas.app/recreations/tenochtitlan-1500",
      thumbnail:
        "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&h=400&fit=crop",
    },
    metadata: {
      era: "renaissance",
      coordinates: [19.4326, -99.1332],
      location: "Mexico City, Mexico",
    },
    score: 284,
    commentCount: 47,
    createdAt: "2026-03-02T14:00:00Z",
  },
  {
    id: "fp-016",
    type: "recreation",
    authorId: "usr-006",
    isTeam: false,
    title: "The Great Bath of Mohenjo-daro — 2500 BC",
    content:
      "Step into the Great Bath of Mohenjo-daro, the world's earliest known public water tank. This recreation models the entire citadel mound, including the granary, the college of priests, and the sophisticated drainage system that wouldn't be matched in Europe for 2,000 years. The brickwork is accurate to surviving archaeological remains, with bitumen waterproofing visible on the bath floor.",
    media: {
      type: "video",
      url: "https://atlas.app/recreations/mohenjo-daro-2500bc",
      thumbnail:
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&h=400&fit=crop",
    },
    metadata: {
      era: "ancient",
      coordinates: [27.329, 68.1389],
      location: "Sindh, Pakistan",
    },
    score: 167,
    commentCount: 21,
    createdAt: "2026-03-01T20:30:00Z",
  },
  {
    id: "fp-017",
    type: "recreation",
    authorId: "usr-007",
    isTeam: false,
    title: "Angkor Wat at Dawn — 1150 AD",
    content:
      "Angkor Wat during the reign of Suryavarman II, fully painted and gilded as it would have appeared in the 12th century. Most people don't realize the entire temple was covered in gold leaf and painted in vivid reds, blues, and greens. This recreation restores the color based on pigment analysis, and includes the massive barays (reservoirs) that made the Khmer Empire's hydraulic engineering possible.",
    media: {
      type: "3d",
      url: "https://atlas.app/recreations/angkor-wat-1150",
      thumbnail:
        "https://images.unsplash.com/photo-1600490036275-35f5f1656861?w=600&h=400&fit=crop",
    },
    metadata: {
      era: "medieval",
      coordinates: [13.4125, 103.867],
      location: "Siem Reap, Cambodia",
    },
    score: 258,
    commentCount: 36,
    createdAt: "2026-03-01T11:00:00Z",
  },

  // ── Map Annotations (4) ───────────────────────────────

  {
    id: "fp-018",
    type: "map-annotation",
    authorId: "usr-009",
    isTeam: false,
    title: "L'Anse aux Meadows — Norse Settlement in North America",
    content:
      "Pinned the confirmed Norse settlement at L'Anse aux Meadows, Newfoundland. Radiocarbon dating places occupation around 1021 AD — exactly 1,000 years before its discovery. The site includes eight Norse-style turf buildings, a forge with bog iron smelting, and butternuts that don't grow locally, proving the Norse traveled further south. This is the only confirmed pre-Columbian European settlement in the Americas.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?w=600&h=400&fit=crop",
    },
    metadata: {
      era: "medieval",
      coordinates: [51.5966, -55.5339],
      location: "Newfoundland, Canada",
    },
    score: 231,
    commentCount: 39,
    createdAt: "2026-03-03T09:45:00Z",
  },
  {
    id: "fp-019",
    type: "map-annotation",
    authorId: "usr-010",
    isTeam: false,
    title: "The Walls of Great Zimbabwe",
    content:
      "Annotating the Great Zimbabwe ruins — the largest ancient stone structure south of the Sahara. Built between the 11th and 15th centuries by ancestors of the Shona people, the Great Enclosure's walls are 11 meters high and 5 meters thick, constructed entirely without mortar. The site was a thriving trade center connected to the Swahili Coast, with Chinese pottery and Persian glass found in excavations.",
    metadata: {
      era: "medieval",
      coordinates: [-20.2674, 30.9338],
      location: "Masvingo Province, Zimbabwe",
    },
    score: 176,
    commentCount: 24,
    createdAt: "2026-03-02T17:30:00Z",
  },
  {
    id: "fp-020",
    type: "map-annotation",
    authorId: "usr-002",
    isTeam: false,
    title: "Dunhuang Mogao Caves — Crossroads of the Silk Road",
    content:
      "Pinning the Mogao Caves at Dunhuang, where 492 temples were carved into cliff faces between the 4th and 14th centuries. This site is where Buddhism, Christianity (Nestorian), Manichaeism, and Islam all left their marks on the same rock face. The Library Cave, sealed around 1002 AD, contained 50,000 manuscripts in Chinese, Tibetan, Sanskrit, Sogdian, and Khotanese — one of the greatest archaeological finds ever.",
    metadata: {
      era: "medieval",
      coordinates: [40.0422, 94.8019],
      location: "Dunhuang, Gansu, China",
    },
    score: 194,
    commentCount: 28,
    createdAt: "2026-03-01T14:15:00Z",
  },
  {
    id: "fp-021",
    type: "map-annotation",
    authorId: "usr-008",
    isTeam: false,
    title: "Petra's Hidden Water System",
    content:
      "Annotating the Nabataean water management system at Petra. Most visitors only see the Treasury, but the real engineering marvel is underground. The Nabataeans built a network of dams, cisterns, and ceramic pipes that channeled flash-flood water to sustain a city of 30,000 people in the middle of a desert. I've mapped 7 of the major channels and 3 dam sites that are still visible today.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1579606032821-4e6161c81571?w=600&h=400&fit=crop",
    },
    metadata: {
      era: "classical",
      coordinates: [30.3285, 35.4444],
      location: "Ma'an Governorate, Jordan",
    },
    score: 209,
    commentCount: 33,
    createdAt: "2026-03-01T07:00:00Z",
  },

  // ── Debates (3) ───────────────────────────────────────

  {
    id: "fp-022",
    type: "debate",
    authorId: "usr-004",
    isTeam: false,
    title:
      "Was Rome's fall primarily caused by internal decay or external pressure?",
    content:
      "The classic debate, but let's actually settle it with evidence. Gibbon blamed Christianity and moral decline. Heather points to the Huns displacing Germanic tribes. Ward-Perkins shows the archaeological evidence for economic collapse. Goldsworthy blames political fragmentation. I lean toward a cascade model — internal weaknesses made Rome unable to handle external shocks it had previously absorbed. Where do you stand?",
    metadata: {
      era: "classical",
      pollFor: 342,
      pollAgainst: 287,
      argumentCount: 89,
    },
    score: 298,
    commentCount: 62,
    createdAt: "2026-03-03T07:00:00Z",
  },
  {
    id: "fp-023",
    type: "debate",
    authorId: "usr-002",
    isTeam: false,
    title:
      "Did the Ming dynasty's decision to end maritime exploration change the course of world history?",
    content:
      "After Zheng He's seven voyages (1405-1433), the Haijin policy effectively ended Chinese naval exploration. If the Ming had continued, could they have established trade networks or colonies in Africa and possibly the Americas before Europe? Or were the voyages always political spectacles with no commercial logic? I've compiled arguments from 12 historians on both sides. The counterfactual is tantalizing.",
    metadata: {
      era: "renaissance",
      pollFor: 456,
      pollAgainst: 198,
      argumentCount: 67,
    },
    score: 276,
    commentCount: 54,
    createdAt: "2026-03-02T08:00:00Z",
  },
  {
    id: "fp-024",
    type: "debate",
    authorId: "usr-006",
    isTeam: false,
    title:
      "Was the Indus Valley Civilization truly egalitarian, or are we misreading the evidence?",
    content:
      "Unlike Egypt and Mesopotamia, the Indus Valley shows no obvious palaces, monumental tombs, or glorifying inscriptions. Many scholars interpret this as evidence of a more egalitarian society. But absence of evidence isn't evidence of absence — we can't read their script. Could there be a ruling class we simply haven't identified? New excavations at Rakhigarhi are complicating the picture. Let's debate.",
    metadata: {
      era: "ancient",
      pollFor: 234,
      pollAgainst: 189,
      argumentCount: 43,
    },
    score: 187,
    commentCount: 37,
    createdAt: "2026-03-01T13:00:00Z",
  },

  // ── Sources (3) ───────────────────────────────────────

  {
    id: "fp-025",
    type: "source",
    authorId: "usr-005",
    isTeam: false,
    title: "Digitized: The Domesday Book (1086) — Full English Translation",
    content:
      "The National Archives has completed a new high-resolution digitization of the Domesday Book with a revised English translation. This is William the Conqueror's great survey of England — every manor, every hide of land, every head of livestock. You can now search by county and see exactly what each village was worth in 1086. Incredible resource for anyone studying Norman England. The level of bureaucratic detail is staggering.",
    metadata: {
      era: "medieval",
      sourceType: "government record",
      sourceOrigin: "The National Archives, Kew, London",
    },
    score: 245,
    commentCount: 32,
    createdAt: "2026-03-03T12:00:00Z",
  },
  {
    id: "fp-026",
    type: "source",
    authorId: "usr-003",
    isTeam: false,
    title: "Newly Translated: Dresden Codex Pages on Venus Tables",
    content:
      "A team at UT Austin has published a new translation of the Venus Tables from the Dresden Codex — one of only four surviving Maya manuscripts. The tables track Venus's 584-day synodic cycle with extraordinary accuracy (error of only 2 hours over 481 years). The Maya used these observations to time warfare: attacks were launched when Venus appeared as the Morning Star. Science and violence, perfectly calibrated.",
    media: {
      type: "document",
      url: "https://atlas.app/sources/dresden-codex-venus",
    },
    metadata: {
      era: "classical",
      sourceType: "manuscript",
      sourceOrigin: "Saxon State and University Library, Dresden",
    },
    score: 213,
    commentCount: 26,
    createdAt: "2026-03-02T11:00:00Z",
  },
  {
    id: "fp-027",
    type: "source",
    authorId: "usr-007",
    isTeam: false,
    title: "Found: 17th-Century Edo Fire Brigade Records from Tokyo Metropolitan Archives",
    content:
      "Just got access to a remarkable collection of hikeshi (fire brigade) records from the Edo period. These documents detail the organization of the machi-bikeshi — commoner fire brigades established in 1718 by Tokugawa Yoshimune. They include brigade rosters, equipment inventories, and maps of fire-break zones. Edo burned so frequently that firefighting became a sophisticated civic institution. Transcriptions and scans linked below.",
    metadata: {
      era: "renaissance",
      sourceType: "municipal archive",
      sourceOrigin: "Tokyo Metropolitan Archives",
    },
    score: 142,
    commentCount: 18,
    createdAt: "2026-03-01T15:30:00Z",
  },

  // ── Corrections (2) ───────────────────────────────────

  {
    id: "fp-028",
    type: "correction",
    authorId: "usr-009",
    isTeam: false,
    content:
      'The event "Viking Discovery of Vinland" lists the date as 1002 AD. Based on the Groenlendinga saga and the 2021 dendrochronological study published in Nature (Kuitems et al.), the confirmed date of Norse presence at L\'Anse aux Meadows is 1021 AD. The saga dates are unreliable, but the tree-ring evidence is definitive. Correcting the year.',
    metadata: {
      correctedField: "year",
      correctedEventId: "evt-vinland-discovery",
      oldValue: "1002",
      newValue: "1021",
    },
    score: 89,
    commentCount: 12,
    createdAt: "2026-03-03T10:30:00Z",
  },
  {
    id: "fp-029",
    type: "correction",
    authorId: "usr-010",
    isTeam: false,
    content:
      'The Great Zimbabwe event description states the walls were "built by an unknown civilization." This framing, rooted in colonial-era denial, is inaccurate. Archaeological, linguistic, and oral historical evidence firmly attributes construction to ancestors of the Shona people between the 11th and 15th centuries. Gertrude Caton-Thompson established this conclusively in 1929. Correcting the description to reflect the scholarly consensus.',
    metadata: {
      correctedField: "description",
      correctedEventId: "evt-great-zimbabwe",
      oldValue: "built by an unknown civilization",
      newValue:
        "built by ancestors of the Shona people between the 11th and 15th centuries",
    },
    score: 156,
    commentCount: 19,
    createdAt: "2026-03-02T06:00:00Z",
  },

  // ── Team Post (1) ─────────────────────────────────────

  {
    id: "fp-030",
    type: "team",
    authorId: "atlas-team",
    isTeam: true,
    title: "Introducing the Atlas Community Feed",
    content:
      "Today we're launching the Atlas Community Feed — a new way to explore history together. Share thoughts, publish chronicles, debate interpretations, and pin discoveries on the map. We've built this for the historians, the curious, and the obsessed. Every post is grounded in real sources and real scholarship. This isn't social media — it's a living, breathing historical record built by the community. Welcome to the conversation.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&h=400&fit=crop",
    },
    score: 328,
    commentCount: 43,
    createdAt: "2026-03-03T18:00:00Z",
  },
];
