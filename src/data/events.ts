import type { HistoricalEvent } from "@/data/types";

/**
 * Deterministic seeded-random picker: returns 5–6 "On This Day" events
 * for any given month/day combo. The seed ensures the same events appear
 * each time a user visits on the same calendar day.
 */
export function getOnThisDayEvents(
  month: number,
  day: number
): HistoricalEvent[] {
  const seed = month * 31 + day;
  // Simple deterministic shuffle using a seed-based LCG
  const shuffled = [...EVENTS]
    .map((event, i) => ({
      event,
      sort: ((seed * 2654435761 + i * 40503) >>> 0) % 1000,
    }))
    .sort((a, b) => a.sort - b.sort)
    .map((x) => x.event);

  // Pick 5 or 6 based on seed parity
  const count = seed % 2 === 0 ? 6 : 5;
  return shuffled.slice(0, Math.min(count, EVENTS.length));
}

export const EVENTS: HistoricalEvent[] = [
  // ── Ancient ──────────────────────────────────────────────────────────
  {
    id: "evt-001",
    title: "Construction of the Great Pyramid of Giza",
    date: "c. 2560 BC",
    year: -2560,
    era: "ancient",
    location: "Giza, Egypt",
    coordinates: [31.1342, 29.9792],
    description:
      "The Great Pyramid was built as a tomb for Pharaoh Khufu over an estimated 20-year period. Standing at 146 meters, it remained the tallest man-made structure in the world for over 3,800 years. Its construction required roughly 2.3 million stone blocks, each weighing an average of 2.5 tons.",
    relatedChronicleIds: ["chr-004"],
    relatedFigureIds: [],
  },
  {
    id: "evt-002",
    title: "Battle of Marathon",
    date: "September 12, 490 BC",
    year: -490,
    era: "ancient",
    location: "Marathon, Greece",
    coordinates: [23.9742, 38.1539],
    description:
      "A pivotal battle in which a heavily outnumbered Athenian force defeated the Persian army on the plains of Marathon. The victory preserved Greek independence and became a powerful symbol of democratic resistance against imperial aggression. Legend holds that a messenger ran to Athens to announce the triumph, inspiring the modern marathon race.",
    relatedChronicleIds: [],
    relatedFigureIds: [],
  },

  // ── Classical ────────────────────────────────────────────────────────
  {
    id: "evt-003",
    title: "Birth of Buddhism",
    date: "c. 528 BC",
    year: -528,
    era: "classical",
    location: "Bodh Gaya, India",
    coordinates: [84.9869, 24.6961],
    description:
      "Siddhartha Gautama attained enlightenment under the Bodhi Tree in present-day Bihar, India, becoming the Buddha. His teachings on suffering, impermanence, and the path to liberation formed the foundation of one of the world's great religions. Buddhism would eventually spread across Asia and profoundly shape the cultures of East and Southeast Asia.",
    relatedChronicleIds: [],
    relatedFigureIds: [],
  },
  {
    id: "evt-004",
    title: "Battle of Gaugamela",
    date: "October 1, 331 BC",
    year: -331,
    era: "classical",
    location: "Present-day Erbil, Iraq",
    coordinates: [44.009, 36.191],
    description:
      "Alexander the Great's decisive victory over Darius III of Persia ended the Achaemenid Empire and opened the gates of Babylon, Susa, and Persepolis. Despite being vastly outnumbered, Alexander's tactical genius shattered the Persian center. The battle marked the beginning of the Hellenistic age.",
    relatedChronicleIds: [],
    relatedFigureIds: ["fig-001"],
  },
  {
    id: "evt-005",
    title: "Fall of the Western Roman Empire",
    date: "September 4, 476 AD",
    year: 476,
    era: "classical",
    location: "Ravenna, Italy",
    coordinates: [12.1996, 44.4184],
    description:
      "Germanic chieftain Odoacer deposed the last Western Roman Emperor, Romulus Augustulus, marking the traditional end of ancient Rome. The fall fragmented Western Europe into a patchwork of successor kingdoms and ushered in the early medieval period. Eastern Rome, however, continued as the Byzantine Empire for nearly another millennium.",
    relatedChronicleIds: [],
    relatedFigureIds: ["fig-003"],
  },

  // ── Medieval ─────────────────────────────────────────────────────────
  {
    id: "evt-006",
    title: "Battle of Hastings",
    date: "October 14, 1066",
    year: 1066,
    era: "medieval",
    location: "Hastings, England",
    coordinates: [-0.4877, 50.9144],
    description:
      "William, Duke of Normandy, defeated King Harold II to seize the English throne, fundamentally transforming English society. The Norman Conquest introduced feudalism, reshaped the English language with French vocabulary, and triggered a massive program of castle and cathedral building across England.",
    relatedChronicleIds: [],
    relatedFigureIds: [],
  },
  {
    id: "evt-007",
    title: "Founding of the Mongol Empire",
    date: "1206",
    year: 1206,
    era: "medieval",
    location: "Khentii, Mongolia",
    coordinates: [109.5178, 48.6396],
    description:
      "Temujin united the Mongol tribes and was proclaimed Genghis Khan at a kurultai on the banks of the Onon River. Over the next decades, the Mongol Empire became the largest contiguous land empire in history, stretching from Korea to Hungary. The Pax Mongolica that followed reopened the Silk Road and connected East and West.",
    relatedChronicleIds: ["chr-001"],
    relatedFigureIds: ["fig-006"],
  },
  {
    id: "evt-008",
    title: "Rise of the Mali Empire",
    date: "c. 1235",
    year: 1235,
    era: "medieval",
    location: "Niani, Guinea",
    coordinates: [-8.3733, 11.3833],
    description:
      "Sundiata Keita defeated the Sosso king Sumanguru at the Battle of Kirina and established the Mali Empire, which became one of the wealthiest states in the world. At its height, Mali controlled trans-Saharan gold and salt trade routes. Mansa Musa's legendary 1324 pilgrimage to Mecca famously disrupted gold markets across the Mediterranean.",
    relatedChronicleIds: [],
    relatedFigureIds: ["fig-011"],
  },

  // ── Renaissance ──────────────────────────────────────────────────────
  {
    id: "evt-009",
    title: "Fall of Constantinople",
    date: "May 29, 1453",
    year: 1453,
    era: "renaissance",
    location: "Constantinople (Istanbul), Turkey",
    coordinates: [28.9784, 41.0082],
    description:
      "Ottoman Sultan Mehmed II breached the walls of Constantinople after a 53-day siege, ending the Byzantine Empire after over a thousand years. Greek scholars fled west carrying classical manuscripts, catalyzing the Italian Renaissance. The fall also severed traditional overland trade routes to Asia, spurring European nations to seek sea routes.",
    relatedChronicleIds: ["chr-003"],
    relatedFigureIds: [],
  },
  {
    id: "evt-010",
    title: "Invention of the Printing Press",
    date: "c. 1440",
    year: 1440,
    era: "renaissance",
    location: "Mainz, Germany",
    coordinates: [8.2473, 49.9929],
    description:
      "Johannes Gutenberg developed movable-type printing in Europe, enabling the mass production of books for the first time. The Gutenberg Bible, printed around 1455, demonstrated the technology's potential. Within decades, printing presses spread across Europe, democratizing knowledge and fueling the Reformation, the Scientific Revolution, and the Enlightenment.",
    relatedChronicleIds: [],
    relatedFigureIds: ["fig-005"],
  },

  // ── Enlightenment ────────────────────────────────────────────────────
  {
    id: "evt-011",
    title: "American Revolution",
    date: "July 4, 1776",
    year: 1776,
    era: "enlightenment",
    location: "Philadelphia, Pennsylvania, USA",
    coordinates: [-75.1652, 39.9526],
    description:
      "The thirteen American colonies declared independence from Great Britain, establishing a republic founded on Enlightenment principles of liberty, equality, and self-governance. The ensuing war, won with French assistance, produced the United States Constitution, which became a model for democratic movements worldwide.",
    relatedChronicleIds: [],
    relatedFigureIds: ["fig-007"],
  },
  {
    id: "evt-012",
    title: "French Revolution",
    date: "July 14, 1789",
    year: 1789,
    era: "enlightenment",
    location: "Paris, France",
    coordinates: [2.3522, 48.8566],
    description:
      "The storming of the Bastille ignited a revolution that overthrew the French monarchy and reshaped European politics. Born from fiscal crisis and Enlightenment ideals, the Revolution produced the Declaration of the Rights of Man, abolished feudal privileges, and ultimately led to the rise of Napoleon Bonaparte.",
    relatedChronicleIds: [],
    relatedFigureIds: [],
  },

  // ── Modern ───────────────────────────────────────────────────────────
  {
    id: "evt-013",
    title: "Beginning of the Industrial Revolution",
    date: "c. 1760",
    year: 1760,
    era: "modern",
    location: "Manchester, England",
    coordinates: [-2.2426, 53.4808],
    description:
      "The transition from agrarian economies to industrial manufacturing began in Britain's textile mills and ironworks. Steam power, mechanized looms, and factory systems transformed production, urbanized populations, and reshaped global trade. The Industrial Revolution's effects rippled outward, fundamentally altering how humanity lives and works.",
    relatedChronicleIds: [],
    relatedFigureIds: ["fig-010"],
  },
  {
    id: "evt-014",
    title: "Assassination of Archduke Franz Ferdinand",
    date: "June 28, 1914",
    year: 1914,
    era: "modern",
    location: "Sarajevo, Bosnia and Herzegovina",
    coordinates: [18.4131, 43.8563],
    description:
      "The assassination of Austro-Hungarian heir Archduke Franz Ferdinand by Gavrilo Princip triggered a chain of alliance obligations that plunged Europe into World War I. The resulting conflict killed over 17 million people, dismantled four empires, and redrew the map of Europe and the Middle East.",
    relatedChronicleIds: [],
    relatedFigureIds: [],
  },
  {
    id: "evt-015",
    title: "Apollo 11 Moon Landing",
    date: "July 20, 1969",
    year: 1969,
    era: "contemporary",
    location: "Sea of Tranquility, The Moon",
    coordinates: [23.4721, 0.6875],
    description:
      "Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon, while Michael Collins orbited above. The achievement fulfilled President Kennedy's 1961 challenge and represented a triumph of science, engineering, and human ambition. An estimated 600 million people worldwide watched the live broadcast.",
    relatedChronicleIds: [],
    relatedFigureIds: [],
  },

  // ── Contemporary ─────────────────────────────────────────────────────
  {
    id: "evt-016",
    title: "Fall of the Berlin Wall",
    date: "November 9, 1989",
    year: 1989,
    era: "contemporary",
    location: "Berlin, Germany",
    coordinates: [13.405, 52.52],
    description:
      "After weeks of civil unrest, the East German government opened the Berlin Wall, allowing free passage between East and West Berlin for the first time in 28 years. The event symbolized the end of the Cold War and catalyzed the reunification of Germany and the collapse of communist regimes across Eastern Europe.",
    relatedChronicleIds: [],
    relatedFigureIds: [],
  },
  {
    id: "evt-017",
    title: "Invention of the World Wide Web",
    date: "March 12, 1989",
    year: 1989,
    era: "contemporary",
    location: "Geneva, Switzerland",
    coordinates: [6.1432, 46.2044],
    description:
      "Tim Berners-Lee, a British scientist at CERN, proposed a system for managing information using hypertext links. By 1991, the first website was live. The World Wide Web transformed communication, commerce, and culture, connecting billions of people and creating the foundation for the modern digital age.",
    relatedChronicleIds: ["chr-006"],
    relatedFigureIds: ["fig-009"],
  },
  {
    id: "evt-018",
    title: "Voyages of Zheng He",
    date: "1405",
    year: 1405,
    era: "renaissance",
    location: "Nanjing, China",
    coordinates: [118.7969, 32.0603],
    description:
      "Chinese admiral Zheng He embarked on the first of seven grand maritime expeditions under the Ming Dynasty, commanding a fleet of enormous treasure ships. His voyages reached Southeast Asia, India, the Persian Gulf, and the east coast of Africa, projecting Chinese power and facilitating trade across the Indian Ocean decades before European exploration.",
    relatedChronicleIds: ["chr-005"],
    relatedFigureIds: [],
  },
];
