import type { Chronicle } from "@/data/types";

export const CHRONICLES: Chronicle[] = [
  {
    id: "chr-001",
    title: "The Silk Road's Hidden Cities",
    excerpt:
      "Buried beneath the sands of Central Asia lie the ruins of cities that once rivaled Rome and Constantinople in splendor. These forgotten hubs of the Silk Road connected empires and cultures for over a thousand years.",
    content: `## The Silk Road's Hidden Cities

For centuries, the Silk Road was not a single road but a vast web of trade routes linking China to the Mediterranean. Along these paths, extraordinary cities rose and fell, many now lost beneath desert sands.

**Merv**, in present-day Turkmenistan, was once the largest city in the world. At its peak in the 12th century, it may have housed over 200,000 people — scholars, merchants, and artisans from dozens of cultures. The Mongol invasion of 1221 devastated the city, and it never recovered.

Further east, **Dunhuang** served as a gateway between China and the West. The Mogao Caves, carved into cliffs outside the city, contain nearly 500 temples filled with Buddhist art spanning a thousand years. A sealed library cave, discovered in 1900, held tens of thousands of manuscripts in languages from Chinese to Sanskrit to Sogdian.

These hidden cities remind us that globalization is not new. The Silk Road was the internet of the ancient world, transmitting not just goods but ideas, religions, and technologies across continents.`,
    authorId: "usr-001",
    era: "medieval",
    stars: 1847,
    createdAt: "2024-03-15T10:30:00Z",
    tags: ["trade", "central-asia", "silk-road", "archaeology"],
    relatedEventIds: ["evt-007"],
    coordinates: [62.1871, 37.6639], // Merv, Turkmenistan
  },
  {
    id: "chr-002",
    title: "Code Breakers of Bletchley",
    excerpt:
      "Inside a Victorian mansion in the English countryside, a team of mathematicians, linguists, and crossword enthusiasts waged a secret war against Nazi encryption. Their work shortened World War II by an estimated two years.",
    content: `## Code Breakers of Bletchley

Bletchley Park was Britain's best-kept secret. From 1939 to 1945, thousands of men and women worked around the clock to decrypt intercepted Axis communications, most notably the messages encoded by Germany's Enigma machine.

**Alan Turing**, a brilliant and eccentric mathematician, designed the Bombe, an electromechanical device that could test thousands of possible Enigma settings per day. His work, building on earlier Polish breakthroughs, was instrumental in cracking the seemingly unbreakable code.

But Bletchley was far more than Turing alone. **Dilly Knox**, a classical scholar, broke the Italian naval Enigma. **Mavis Batey**, a 19-year-old linguist, cracked a message that revealed Italy's plans before the Battle of Matapan. The workforce was remarkably diverse for its era, with over 8,000 women serving among the codebreakers.

The intelligence produced at Bletchley, codenamed "Ultra," gave the Allies advance knowledge of German military operations. Historians estimate it shortened the war by two to four years and saved millions of lives. Yet the codebreakers were sworn to secrecy for decades; many went to their graves without their families ever knowing what they had accomplished.`,
    authorId: "usr-002",
    era: "modern",
    stars: 1523,
    createdAt: "2024-05-22T14:15:00Z",
    tags: ["world-war-ii", "cryptography", "britain", "technology"],
    relatedEventIds: ["evt-014"],
    coordinates: [-0.7484, 51.9976], // Bletchley Park, England
  },
  {
    id: "chr-003",
    title: "The Library of Alexandria: What Was Really Lost",
    excerpt:
      "The destruction of the Library of Alexandria is often called the greatest intellectual catastrophe of the ancient world. But the real story is more complex and more heartbreaking than the legends suggest.",
    content: `## The Library of Alexandria: What Was Really Lost

The Library of Alexandria was the ancient world's greatest repository of knowledge. Founded by Ptolemy I around 300 BC, it aimed to collect every written work in existence. At its height, it may have held between 400,000 and 700,000 scrolls.

Contrary to popular myth, the Library was not destroyed in a single dramatic fire. It suffered multiple blows over centuries. Julius Caesar's fire in 48 BC damaged part of the collection. Christian mobs targeted pagan institutions in the 4th century. The final decline was gradual, as funding dried up and scholars dispersed.

What was truly lost is staggering to contemplate. We know of entire works by Sophocles, Euripides, and Aristotle only through references in surviving texts. The complete works of the mathematician Archimedes, medical texts by Herophilos (who first described the nervous system), and histories of civilizations now forgotten — all vanished.

But the Library's legacy endures in what survived. The idea that knowledge should be collected, preserved, and made accessible to scholars has shaped every great library and university since. In a sense, the internet is Alexandria's truest heir.`,
    authorId: "usr-003",
    era: "classical",
    stars: 2134,
    createdAt: "2024-01-08T09:45:00Z",
    tags: ["alexandria", "libraries", "ancient-egypt", "knowledge"],
    relatedEventIds: ["evt-005"],
    coordinates: [29.9187, 31.2001], // Alexandria, Egypt
  },
  {
    id: "chr-004",
    title: "Pompeii's Last Day",
    excerpt:
      "On August 24, 79 AD, Mount Vesuvius erupted with a force equivalent to 100,000 nuclear bombs. The Roman city of Pompeii was buried in volcanic ash, preserving a snapshot of daily life frozen in time.",
    content: `## Pompeii's Last Day

The morning of August 24, 79 AD began like any other in Pompeii. Bakers lit their ovens, merchants opened their stalls, and children played in the forum. Then Vesuvius awoke.

The eruption began around noon with a massive explosion that sent a column of pumice and ash 33 kilometers into the sky. For hours, pumice rained down on the city. Many residents fled; others sheltered in their homes, hoping the storm would pass. It would not.

Around midnight, the eruption column collapsed, sending pyroclastic surges — superheated clouds of gas and rock traveling at over 700 kilometers per hour — racing down the mountain. These flows killed everyone still in the city within seconds. Bodies were entombed in ash, creating the haunting voids that archaeologists would later fill with plaster to reveal figures frozen in their final moments.

The tragedy of Pompeii became archaeology's greatest gift. Excavations beginning in the 18th century revealed an extraordinarily complete Roman city: frescoed villas, taverns with menus still painted on walls, graffiti declaring love and rivalry, and artifacts from every level of society. Pompeii allows us to step into the Roman world not as distant history, but as a living city stopped mid-breath.`,
    authorId: "usr-004",
    era: "classical",
    stars: 1891,
    createdAt: "2024-02-14T16:20:00Z",
    tags: ["rome", "vesuvius", "archaeology", "natural-disaster"],
    relatedEventIds: ["evt-001"],
    coordinates: [14.4851, 40.7509], // Pompeii, Italy
  },
  {
    id: "chr-005",
    title: "The Voyages of Zheng He",
    excerpt:
      "Decades before Columbus crossed the Atlantic, a Chinese admiral commanded the largest fleet the world had ever seen. Zheng He's seven voyages reshaped Indian Ocean trade and projected Ming Dynasty power across half the globe.",
    content: `## The Voyages of Zheng He

In 1405, the Yongle Emperor of China's Ming Dynasty dispatched Admiral Zheng He on the first of seven extraordinary maritime expeditions. His flagship, at over 120 meters long, dwarfed the largest European vessels of the era. Columbus's Santa Maria, by comparison, was roughly 20 meters.

Zheng He's fleet — sometimes numbering over 300 ships and 27,000 crew — sailed to Southeast Asia, India, the Persian Gulf, and the east coast of Africa. They carried silk, porcelain, and tea, returning with ivory, spices, giraffes, and ambassadors from distant kingdoms.

These were not voyages of conquest but of diplomacy and trade. Zheng He established tribute relationships, mediated disputes between local rulers, and created a Chinese-led maritime order in the Indian Ocean. In Sri Lanka, he erected a trilingual inscription honoring Buddha, Vishnu, and Allah — a remarkable act of multicultural diplomacy.

Yet after the Yongle Emperor's death, a new court faction gained power and ordered the great fleet dismantled. China turned inward, and the seas were left to others. Historians have long debated: what might have happened if China had continued its maritime expansion? The Age of Exploration might have had a very different author.`,
    authorId: "usr-005",
    era: "renaissance",
    stars: 1256,
    createdAt: "2024-04-02T11:00:00Z",
    tags: ["china", "exploration", "maritime", "ming-dynasty"],
    relatedEventIds: ["evt-018"],
    coordinates: [118.7969, 32.0603], // Nanjing, China
  },
  {
    id: "chr-006",
    title: "The Dawn of the Digital Age",
    excerpt:
      "From a quiet proposal at CERN to a revolution that reshaped civilization, the invention of the World Wide Web began as a simple idea: what if all the world's information could be linked together?",
    content: `## The Dawn of the Digital Age

In March 1989, Tim Berners-Lee, a British physicist working at CERN, submitted a document titled "Information Management: A Proposal." His supervisor's handwritten note on the cover page read: "Vague, but exciting." It was perhaps the greatest understatement in the history of technology.

Berners-Lee's idea was deceptively simple: combine hypertext (clickable links between documents) with the internet (a network connecting computers worldwide). He built the first web browser and web server on a NeXT computer at CERN, and on August 6, 1991, the first website went live.

What followed was an explosion of connectivity that no one predicted. By 1995, there were 10,000 websites. By 2000, over 10 million. Today, there are nearly 2 billion. The Web democratized access to information, created entirely new industries, and connected people across every border and language.

Berners-Lee chose not to patent his invention. He made the Web free and open for everyone, a decision that shaped its democratic character. "Had the technology been proprietary," he later reflected, "it would never have taken off. The Web is what it is because it belongs to everyone."`,
    authorId: "usr-006",
    era: "contemporary",
    stars: 987,
    createdAt: "2024-06-10T08:30:00Z",
    tags: ["technology", "internet", "cern", "innovation"],
    relatedEventIds: ["evt-017"],
    coordinates: [6.1432, 46.2044], // Geneva, Switzerland
  },
  {
    id: "chr-007",
    title: "Cleopatra's Alexandria: The City That Sank",
    excerpt:
      "Much of Cleopatra's royal quarter now lies beneath the waters of Alexandria's harbor, submerged by earthquakes and rising seas. Underwater archaeology is slowly revealing the grandeur of her lost world.",
    content: `## Cleopatra's Alexandria: The City That Sank

When Cleopatra ruled Egypt, Alexandria was one of the most magnificent cities on Earth. The Pharos lighthouse, one of the Seven Wonders, guided ships into a harbor lined with marble palaces and temples. The Mouseion, the world's greatest center of learning, attracted scholars from across the Mediterranean.

But over the centuries, earthquakes and subsidence submerged much of the royal quarter beneath the harbor. The lighthouse collapsed in a 14th-century earthquake. For centuries, Cleopatra's world lay hidden beneath murky waters.

In 1998, French underwater archaeologist Franck Goddio began systematic exploration of the harbor floor. His team discovered colossal statues, sphinxes, columns of red granite, and the foundations of what may have been the royal palace itself. Artifacts included coins, jewelry, ceramics, and ritual objects spanning centuries of Ptolemaic rule.

The discoveries paint a picture of extraordinary cultural fusion: Egyptian sphinxes alongside Greek statues, hieroglyphic inscriptions next to Greek texts. Alexandria was where East met West, where Egyptian, Greek, Jewish, and eventually Roman cultures blended into something entirely new. Beneath the waves, that cosmopolitan spirit still endures.`,
    authorId: "usr-003",
    era: "classical",
    stars: 1445,
    createdAt: "2024-07-19T13:45:00Z",
    tags: ["cleopatra", "alexandria", "underwater-archaeology", "egypt"],
    relatedEventIds: [],
    coordinates: [29.9187, 31.2001], // Alexandria, Egypt
  },
  {
    id: "chr-008",
    title: "The Printing Press and the Information Explosion",
    excerpt:
      "Gutenberg's printing press did not just make books cheaper. It detonated an information revolution that toppled empires, launched religions, and created the modern world.",
    content: `## The Printing Press and the Information Explosion

Before Gutenberg, a single book could take a monk months to copy by hand. A university library of 200 volumes was considered extraordinary. Knowledge was scarce, expensive, and tightly controlled by the Church and nobility.

Johannes Gutenberg's movable-type printing press, perfected around 1440 in Mainz, Germany, changed everything. By 1500, an estimated 20 million volumes had been printed in Europe. By 1600, that number had reached 200 million. The cost of a book dropped by roughly 80 percent in a single generation.

The consequences were seismic. Martin Luther's 95 Theses, printed and distributed across Germany in weeks, sparked the Protestant Reformation. Scientific texts could be shared, debated, and improved upon, launching the Scientific Revolution. Vernacular literature flourished, giving rise to national identities and languages.

But the printing press also brought chaos. Propaganda, misinformation, and seditious pamphlets spread as easily as scripture and science. The information explosion of the 15th century foreshadowed our own digital age, raising the same question humanity still grapples with: when everyone can publish, who can be trusted?`,
    authorId: "usr-007",
    era: "renaissance",
    stars: 1678,
    createdAt: "2024-08-05T10:00:00Z",
    tags: ["gutenberg", "printing", "reformation", "information"],
    relatedEventIds: ["evt-010"],
    coordinates: [8.2473, 49.9929], // Mainz, Germany
  },
  {
    id: "chr-009",
    title: "The Women of Bletchley Park",
    excerpt:
      "Over 8,000 women worked at Bletchley Park during World War II, operating the machines, translating intercepted messages, and analyzing intelligence. Most were never recognized for their service.",
    content: `## The Women of Bletchley Park

The story of Bletchley Park is often told through the lens of Alan Turing and his male colleagues. But the majority of the workforce — roughly 75 percent — were women. They were recruited from universities, typing pools, and the Women's Royal Naval Service, and they performed some of the most critical work of the war.

**Mavis Batey**, recruited at age 19, broke the Italian naval Enigma, providing intelligence that was crucial to the British victory at the Battle of Cape Matapan. **Joan Clarke**, one of the few women in the codebreaking huts, worked directly alongside Turing on naval Enigma and was widely regarded as one of the best cryptanalysts at Bletchley.

Hundreds of Wrens (members of the Women's Royal Naval Service) operated the Bombe machines, the Colossus computers, and the intercept stations. Their work was repetitive, exhausting, and absolutely essential. Without them, the codebreaking operation could not have functioned.

After the war, the women of Bletchley were bound by the Official Secrets Act. Many never told their families what they had done. Their contributions remained hidden for decades, a silence that mirrors the broader erasure of women's roles in wartime. Today, their stories are finally being told.`,
    authorId: "usr-002",
    era: "modern",
    stars: 1134,
    createdAt: "2024-09-12T15:30:00Z",
    tags: ["world-war-ii", "women-in-history", "cryptography", "britain"],
    relatedEventIds: ["evt-014"],
    coordinates: [-0.7484, 51.9976], // Bletchley Park, England
  },
  {
    id: "chr-010",
    title: "The Golden Age of Timbuktu",
    excerpt:
      "Long dismissed by Europeans as a mythical city of gold, Timbuktu was in reality something far more valuable: one of the greatest centers of learning the world has ever known.",
    content: `## The Golden Age of Timbuktu

In the 14th and 15th centuries, Timbuktu was not the remote desert outpost of modern imagination. It was a thriving metropolis of 100,000 people, a crossroads of the trans-Saharan trade, and one of the world's great intellectual centers.

The University of Sankore, founded in the 14th century, attracted scholars from across the Islamic world. At its peak, it may have had 25,000 students studying theology, law, astronomy, mathematics, and medicine. The city's private libraries collectively held hundreds of thousands of manuscripts, many written in Arabic and local languages.

**Mansa Musa's** patronage transformed the city. After his legendary 1324 hajj to Mecca, he brought back architects, scholars, and books. The Djinguereber Mosque, designed by the Andalusian architect Abu Es Haq es Saheli, still stands today. Musa's investment in education and architecture made Timbuktu a beacon of learning that rivaled contemporary Cairo and Fez.

Today, the Timbuktu Manuscripts — an estimated 700,000 surviving texts covering astronomy, music, botany, and genealogy — represent one of Africa's greatest written heritages. Ongoing digitization efforts aim to preserve these treasures, proving that Timbuktu's real gold was always its knowledge.`,
    authorId: "usr-008",
    era: "medieval",
    stars: 1567,
    createdAt: "2024-10-01T09:15:00Z",
    tags: ["timbuktu", "africa", "education", "mali-empire"],
    relatedEventIds: ["evt-008"],
    coordinates: [-3.0074, 16.7735], // Timbuktu, Mali
  },
  {
    id: "chr-011",
    title: "Tesla vs. Edison: The War of Currents",
    excerpt:
      "The battle between alternating current and direct current was more than a technical dispute. It was a clash of visions for the future of civilization, fought with propaganda, electrocuted elephants, and the electric chair.",
    content: `## Tesla vs. Edison: The War of Currents

In the late 1880s, two visions for America's electrical future collided. Thomas Edison championed direct current (DC), which his company was already selling to customers in New York. Nikola Tesla, backed by industrialist George Westinghouse, proposed alternating current (AC), which could travel long distances without significant power loss.

Edison launched a ruthless propaganda campaign against AC, publicly electrocuting stray animals to demonstrate its "dangers." His associates helped develop the electric chair — powered by AC — to associate Tesla's system with death. Edison even coined the term "Westinghoused" as a synonym for electrocution.

But physics was on Tesla's side. AC could be transmitted hundreds of miles using transformers, while DC lost power after just a few blocks. In 1893, Westinghouse and Tesla won the contract to illuminate the Chicago World's Fair, dazzling millions. Two years later, they harnessed Niagara Falls to generate AC power for Buffalo, New York.

The War of Currents was over. AC powered the modern world, and Tesla's vision prevailed. Yet Edison's fame endured while Tesla died alone in a New York hotel room in 1943. History, it seems, does not always reward the victor.`,
    authorId: "usr-006",
    era: "modern",
    stars: 1389,
    createdAt: "2024-11-18T12:00:00Z",
    tags: ["tesla", "edison", "electricity", "invention"],
    relatedEventIds: ["evt-013"],
    coordinates: [-73.9857, 40.7484], // New York City, USA
  },
  {
    id: "chr-012",
    title: "The Inca Road: Engineering an Empire",
    excerpt:
      "Stretching over 30,000 kilometers through some of the most extreme terrain on Earth, the Inca road network was one of the greatest engineering achievements of the pre-Columbian Americas.",
    content: `## The Inca Road: Engineering an Empire

The Inca Empire, known as Tawantinsuyu, governed roughly 12 million people across a territory stretching from Colombia to Chile. Binding this vast realm together was the Qhapaq Nan, a road network of over 30,000 kilometers that crossed deserts, scaled mountains, and bridged canyons.

The roads were engineering marvels. In the Andes, the Inca carved staircases directly into mountainsides at altitudes above 5,000 meters. Suspension bridges woven from grass ropes spanned gorges that seemed impassable. In the coastal deserts, the roads were marked with wooden posts and bordered with low walls to prevent sand from burying the path.

Without wheeled vehicles or horses, the Inca relied on **chasquis**, relay runners who carried messages and small goods across the empire. A message could travel 240 kilometers in a single day, rivaling the speed of the Roman cursus publicus. Instead of writing, the Inca used **quipus**, knotted strings that encoded numerical and possibly narrative information.

The Spanish conquest in the 1530s devastated the Inca Empire, but the roads endured. Many modern highways in Peru and Ecuador follow the same routes the Inca carved centuries ago. The Qhapaq Nan was designated a UNESCO World Heritage Site in 2014, recognizing it as one of humanity's greatest infrastructure achievements.`,
    authorId: "usr-005",
    era: "renaissance",
    stars: 892,
    createdAt: "2024-12-03T14:45:00Z",
    tags: ["inca", "engineering", "south-america", "roads"],
    relatedEventIds: [],
    coordinates: [-72.545, -13.1631], // Cusco, Peru
  },
];
