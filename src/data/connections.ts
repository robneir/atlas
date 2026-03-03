import type { Connection } from "@/data/types";

export const CONNECTIONS: Connection[] = [
  {
    fromEventId: "evt-009", // Fall of Constantinople
    toEventId: "evt-018",   // Voyages of Zheng He
    description:
      "The fall of Constantinople severed traditional overland trade routes to Asia, intensifying European interest in maritime alternatives. While Zheng He's voyages preceded the fall, the Ottoman control of Eastern Mediterranean trade after 1453 directly spurred the European Age of Exploration that followed.",
  },
  {
    fromEventId: "evt-010", // Printing Press
    toEventId: "evt-011",   // American Revolution
    description:
      "The printing press enabled the mass distribution of Enlightenment ideas about liberty, natural rights, and self-governance. Pamphlets like Thomas Paine's 'Common Sense,' printed in the hundreds of thousands, galvanized colonial support for independence.",
  },
  {
    fromEventId: "evt-010", // Printing Press
    toEventId: "evt-012",   // French Revolution
    description:
      "Printed books and pamphlets spread Enlightenment philosophy across France, fueling demands for political reform. Revolutionary newspapers and broadsheets mobilized public opinion against the monarchy in ways that would have been impossible before mass printing.",
  },
  {
    fromEventId: "evt-012", // French Revolution
    toEventId: "evt-014",   // World War I
    description:
      "The French Revolution's legacy of nationalism and the concept of the citizen-soldier reshaped European politics for over a century. The system of competing nation-states and alliance networks that emerged in its wake directly contributed to the conditions that triggered World War I.",
  },
  {
    fromEventId: "evt-007", // Mongol Empire founding
    toEventId: "evt-009",   // Fall of Constantinople
    description:
      "The Mongol conquests weakened the Byzantine Empire's eastern allies and disrupted Eurasian trade patterns. The power vacuum left by the Mongol Empire's fragmentation enabled the rise of the Ottoman Turks, who eventually conquered Constantinople in 1453.",
  },
  {
    fromEventId: "evt-014", // World War I
    toEventId: "evt-016",   // Fall of the Berlin Wall
    description:
      "World War I's unresolved tensions led directly to World War II, which in turn produced the Cold War division of Europe. The Berlin Wall, built in 1961 to stem East German emigration, stood as the Cold War's most visible symbol until its fall in 1989.",
  },
  {
    fromEventId: "evt-013", // Industrial Revolution
    toEventId: "evt-014",   // World War I
    description:
      "The Industrial Revolution enabled the mass production of weapons, railroads for troop transport, and chemical manufacturing for explosives and poison gas. Industrialized warfare transformed a European conflict into an unprecedented catastrophe of mechanized killing.",
  },
  {
    fromEventId: "evt-016", // Fall of the Berlin Wall
    toEventId: "evt-017",   // World Wide Web
    description:
      "The end of the Cold War accelerated global interconnection and the free flow of information. The World Wide Web, proposed the same year the Wall fell, became the technological embodiment of a world no longer divided into sealed blocs.",
  },
  {
    fromEventId: "evt-005", // Fall of Western Roman Empire
    toEventId: "evt-006",   // Battle of Hastings
    description:
      "The fall of Rome created the political fragmentation of Western Europe that defined the medieval period. The competing kingdoms that arose from Rome's successor states, including the Duchy of Normandy, set the stage for the Norman Conquest of England in 1066.",
  },
  {
    fromEventId: "evt-008", // Rise of the Mali Empire
    toEventId: "evt-009",   // Fall of Constantinople
    description:
      "The Mali Empire's control of trans-Saharan gold trade made West African gold a vital component of Mediterranean economies. When Constantinople fell and Eastern trade routes shifted, European demand for African gold and alternative trade routes intensified, contributing to the Age of Exploration.",
  },
];
