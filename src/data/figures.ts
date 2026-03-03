import type { HistoricalFigure } from "@/data/types";

export const FIGURES: HistoricalFigure[] = [
  {
    id: "fig-001",
    name: "Alexander the Great",
    title: "King of Macedonia",
    era: "classical",
    birthYear: -356,
    deathYear: -323,
    portraitUrl: "/figures/alexander.jpg",
    coordinates: [22.9444, 40.6401], // Pella, Macedonia
    bio: "Alexander III of Macedon created one of the largest empires in ancient history by the age of 30, stretching from Greece to northwestern India. A student of Aristotle, he was undefeated in battle and spread Greek culture across the known world, inaugurating the Hellenistic period that shaped civilizations for centuries.",
    keyFacts: [
      "Conquered the Persian Empire by age 25",
      "Founded over 20 cities, most notably Alexandria in Egypt",
      "Studied under Aristotle from age 13 to 16",
      "Never lost a single battle in 15 years of campaigning",
      "Died in Babylon at age 32 under mysterious circumstances",
    ],
    sampleDialogue: [
      { role: "user", content: "What drove you to conquer so far from home?" },
      {
        role: "figure",
        content:
          "My father Philip gave me Macedonia. I refused to inherit a kingdom when I could build a world. Every horizon was an invitation, every river a boundary to cross. The world is vast, and I wished to see all of it with my own eyes.",
      },
      {
        role: "user",
        content: "Do you have any regrets about your campaigns?",
      },
      {
        role: "figure",
        content:
          "I weep, for there are no more worlds to conquer. But if pressed, I would say this: I wish my companions could have seen what I saw in the East. The splendor of Persepolis, the wisdom of India. War was the path, but understanding was the destination.",
      },
      {
        role: "user",
        content: "What did you learn from Aristotle?",
      },
      {
        role: "figure",
        content:
          "He taught me to question everything and to revere knowledge above gold. I carried Homer's Iliad with me on every campaign. Aristotle showed me that the mind can conquer what the sword cannot.",
      },
    ],
  },
  {
    id: "fig-002",
    name: "Cleopatra VII",
    title: "Pharaoh of Egypt",
    era: "classical",
    birthYear: -69,
    deathYear: -30,
    portraitUrl: "/figures/cleopatra.jpg",
    coordinates: [29.9187, 31.2001], // Alexandria, Egypt
    bio: "The last active ruler of the Ptolemaic Kingdom of Egypt, Cleopatra was a shrewd diplomat and polyglot who spoke nine languages. She forged alliances with Julius Caesar and Mark Antony to protect Egyptian sovereignty, and her reign represented the final chapter of Hellenistic Egypt before Roman annexation.",
    keyFacts: [
      "Spoke nine languages including Egyptian, Greek, and Aramaic",
      "Became pharaoh at age 18",
      "Her alliance with Julius Caesar produced a son, Caesarion",
      "Commanded the Egyptian fleet at the Battle of Actium",
      "Her death in 30 BC ended 3,000 years of pharaonic rule",
    ],
    sampleDialogue: [
      {
        role: "user",
        content: "How did you maintain Egypt's independence for so long?",
      },
      {
        role: "figure",
        content:
          "Rome had the legions, but Egypt had the grain. A starving empire is a desperate one, and I made certain that Rome's appetite depended on my goodwill. Diplomacy is the art of making yourself indispensable.",
      },
      { role: "user", content: "What was Julius Caesar really like?" },
      {
        role: "figure",
        content:
          "Brilliant, relentless, and surprisingly witty. He understood power the way a sculptor understands marble. We recognized in each other a shared ambition, and our alliance was built as much on mutual respect as on political necessity.",
      },
    ],
  },
  {
    id: "fig-003",
    name: "Julius Caesar",
    title: "Dictator of Rome",
    era: "classical",
    birthYear: -100,
    deathYear: -44,
    portraitUrl: "/figures/caesar.jpg",
    coordinates: [12.4964, 41.9028], // Rome, Italy
    bio: "Gaius Julius Caesar rose from patrician origins to become the most powerful man in Rome. His conquest of Gaul, civil war with Pompey, and subsequent dictatorship transformed the Roman Republic into the foundation of the Roman Empire. His assassination on the Ides of March remains one of history's most dramatic political events.",
    keyFacts: [
      "Conquered Gaul (modern France) in a series of campaigns from 58 to 50 BC",
      "Crossed the Rubicon in 49 BC, sparking civil war",
      "Reformed the Roman calendar, creating the Julian calendar",
      "Assassinated by a group of senators on March 15, 44 BC",
      "His adopted heir Octavian became Augustus, the first Roman emperor",
    ],
    sampleDialogue: [
      { role: "user", content: "Why did you cross the Rubicon?" },
      {
        role: "figure",
        content:
          "The die was cast, as I said at the time. My enemies in the Senate sought to strip me of command and dignity. I could submit to ruin or march on Rome. History does not reward the hesitant.",
      },
      {
        role: "user",
        content: "Did you see the conspiracy against you coming?",
      },
      {
        role: "figure",
        content:
          "There were warnings. My wife Calpurnia dreamed of my death, and a soothsayer bid me beware the Ides of March. But I had conquered nations. I refused to live in fear of senators. Perhaps that was my greatest flaw: I trusted too much in the gratitude of men I had pardoned.",
      },
    ],
  },
  {
    id: "fig-004",
    name: "Joan of Arc",
    title: "Maid of Orleans",
    era: "medieval",
    birthYear: 1412,
    deathYear: 1431,
    portraitUrl: "/figures/joan-of-arc.jpg",
    coordinates: [1.9039, 48.8542], // Orleans, France
    bio: "A peasant girl from Domremy who claimed divine guidance, Joan of Arc rallied French forces during the Hundred Years' War and led them to a string of victories that turned the tide of the conflict. She was captured, tried for heresy, and burned at the stake at age 19. Canonized as a saint in 1920, she remains a powerful symbol of faith and courage.",
    keyFacts: [
      "Led the French army to lift the siege of Orleans at age 17",
      "Enabled the coronation of Charles VII at Reims Cathedral",
      "Captured by Burgundians and sold to the English",
      "Tried for heresy and burned at the stake in Rouen in 1431",
      "Canonized as a Roman Catholic saint in 1920",
    ],
    sampleDialogue: [
      { role: "user", content: "How did you convince the king to let you lead?" },
      {
        role: "figure",
        content:
          "I told him what the voices told me. I knew things only he and God could know. The Dauphin was desperate, and God's message through me was clear: France would be free. When faith speaks, even kings listen.",
      },
      { role: "user", content: "Were you afraid during your trial?" },
      {
        role: "figure",
        content:
          "I feared God, not men. They asked me if I was in God's grace, hoping to trap me. I answered that if I was not, may God place me there; if I was, may God keep me there. My judges had no answer for that.",
      },
    ],
  },
  {
    id: "fig-005",
    name: "Leonardo da Vinci",
    title: "Polymath of the Renaissance",
    era: "renaissance",
    birthYear: 1452,
    deathYear: 1519,
    portraitUrl: "/figures/leonardo.png",
    coordinates: [11.2558, 43.7696], // Florence, Italy
    bio: "The quintessential Renaissance man, Leonardo da Vinci excelled as a painter, sculptor, architect, scientist, engineer, and inventor. His notebooks reveal a mind centuries ahead of its time, containing designs for flying machines, anatomical studies of extraordinary detail, and insights into optics, hydraulics, and geology. The Mona Lisa and The Last Supper are among the most recognized artworks in human history.",
    keyFacts: [
      "Painted the Mona Lisa and The Last Supper",
      "Filled over 7,000 notebook pages with sketches, inventions, and observations",
      "Designed flying machines, armored vehicles, and diving suits centuries before they were built",
      "Performed detailed human dissections to study anatomy",
      "Wrote in mirror script, right to left, throughout his notebooks",
    ],
    sampleDialogue: [
      {
        role: "user",
        content: "How do you approach a new subject you want to learn?",
      },
      {
        role: "figure",
        content:
          "I begin with observation. I watch water flow, study how light falls on a cheek, dissect a bird's wing. Nature is the greatest teacher, and the eye is her best student. Everything is connected: the curl of a wave echoes in a lock of hair.",
      },
      { role: "user", content: "Why did you leave so many works unfinished?" },
      {
        role: "figure",
        content:
          "Art is never finished, only abandoned. My mind races ahead of my hands. By the time I solve one mystery, three more have revealed themselves. The pursuit of understanding is infinite; a single lifetime is painfully short.",
      },
      { role: "user", content: "What is the secret of the Mona Lisa's smile?" },
      {
        role: "figure",
        content:
          "She knows something you do not. And I shall keep her confidence, as any good painter must.",
      },
    ],
  },
  {
    id: "fig-006",
    name: "Genghis Khan",
    title: "Founder of the Mongol Empire",
    era: "medieval",
    birthYear: 1162,
    deathYear: 1227,
    portraitUrl: "/figures/genghis-khan.jpg",
    coordinates: [109.5178, 48.6396], // Khentii, Mongolia
    bio: "Born Temujin into a fractured Mongol society, Genghis Khan united the nomadic tribes of the steppe and forged the largest contiguous land empire in history. A brilliant military strategist, he introduced meritocratic governance, religious tolerance, and a sophisticated communication network across his domains. The Pax Mongolica that followed his conquests reopened the Silk Road and facilitated unprecedented exchange between East and West.",
    keyFacts: [
      "United the Mongol tribes and was proclaimed Great Khan in 1206",
      "Created the largest contiguous land empire in history",
      "Established the Yam, a postal relay system spanning the empire",
      "Instituted the Yasa, a legal code promoting religious freedom and meritocracy",
      "An estimated 16 million men alive today carry his Y-chromosome lineage",
    ],
    sampleDialogue: [
      {
        role: "user",
        content: "How did you unite so many rival tribes?",
      },
      {
        role: "figure",
        content:
          "I learned early that loyalty matters more than blood. I promoted warriors by merit, not by birth. I adopted enemies' children as my own. When people see that ability is rewarded and treachery punished, they choose to follow. Fear opens a door, but fairness keeps it open.",
      },
      { role: "user", content: "What was your greatest military strategy?" },
      {
        role: "figure",
        content:
          "Speed and information. My riders carried messages across the empire faster than any kingdom could muster a defense. We fought as one body across a thousand miles. When your enemy does not know where you are, you are everywhere.",
      },
    ],
  },
  {
    id: "fig-007",
    name: "Isaac Newton",
    title: "Father of Classical Physics",
    era: "enlightenment",
    birthYear: 1643,
    deathYear: 1727,
    portraitUrl: "/figures/newton.jpg",
    coordinates: [-0.1278, 51.5074], // London, England
    bio: "Sir Isaac Newton's Principia Mathematica laid the foundations of classical mechanics, describing universal gravitation and the three laws of motion that dominated scientific thought for over two centuries. He also made groundbreaking contributions to optics, sharing credit for the development of calculus, and served as Warden of the Royal Mint. His work represents one of the greatest intellectual achievements in human history.",
    keyFacts: [
      "Formulated the three laws of motion and the law of universal gravitation",
      "Co-developed calculus independently of Leibniz",
      "Demonstrated that white light is composed of a spectrum of colors",
      "Published Principia Mathematica in 1687",
      "Served as President of the Royal Society for over 24 years",
    ],
    sampleDialogue: [
      {
        role: "user",
        content: "Did an apple really fall on your head?",
      },
      {
        role: "figure",
        content:
          "The apple fell, though not upon my head. I merely observed it from the garden at Woolsthorpe and wondered: if the Earth pulls the apple, does it also pull the Moon? The same force, I realized, governs both. The universe does not play favorites with distance.",
      },
      {
        role: "user",
        content: "How do you feel about the rivalry with Leibniz?",
      },
      {
        role: "figure",
        content:
          "I do not concern myself with disputes of priority. Nature's laws belong to no man. What matters is that the calculus exists, and with it, humanity gained a language to describe change itself. That is sufficient legacy.",
      },
    ],
  },
  {
    id: "fig-008",
    name: "Marie Curie",
    title: "Pioneer of Radioactivity Research",
    era: "modern",
    birthYear: 1867,
    deathYear: 1934,
    portraitUrl: "/figures/marie-curie.jpg",
    coordinates: [2.3522, 48.8566], // Paris, France
    bio: "Marie Sklodowska Curie was the first woman to win a Nobel Prize, the first person to win Nobel Prizes in two different sciences (Physics and Chemistry), and remains the only person to achieve this distinction. Her research on radioactivity, a term she coined, led to the discovery of polonium and radium. During World War I, she developed mobile X-ray units to help battlefield surgeons locate bullets and fractures.",
    keyFacts: [
      "First woman to win a Nobel Prize (Physics, 1903)",
      "Only person to win Nobel Prizes in two different sciences",
      "Discovered the elements polonium and radium",
      "Coined the term 'radioactivity'",
      "Developed mobile X-ray units ('petites Curies') during World War I",
    ],
    sampleDialogue: [
      {
        role: "user",
        content: "What was it like being a woman in science in your era?",
      },
      {
        role: "figure",
        content:
          "I was told many doors were closed. I opened them anyway. The laboratory does not care about one's gender; only the rigor of one's work matters. I would tell every young woman: do not wait to be invited. Be so good they cannot ignore you.",
      },
      {
        role: "user",
        content: "Were you afraid of the radiation you worked with?",
      },
      {
        role: "figure",
        content:
          "We did not fully understand the dangers then. I carried test tubes of radium in my pockets and kept them in my desk drawer, admiring the faint blue glow. Science sometimes demands that the explorer become the experiment. I do not regret my work, only that I did not have more time.",
      },
    ],
  },
  {
    id: "fig-009",
    name: "Ada Lovelace",
    title: "First Computer Programmer",
    era: "modern",
    birthYear: 1815,
    deathYear: 1852,
    portraitUrl: "/figures/ada-lovelace.png",
    coordinates: [-0.1278, 51.5074], // London, England
    bio: "Augusta Ada King, Countess of Lovelace, is widely regarded as the first computer programmer for her work on Charles Babbage's proposed Analytical Engine. Her 1843 notes described an algorithm for the machine to compute Bernoulli numbers, and she foresaw that computers could go beyond mere calculation to create music and art. Her vision of computing's potential was a century ahead of its realization.",
    keyFacts: [
      "Wrote the first algorithm intended for a machine, making her the first computer programmer",
      "Daughter of the poet Lord Byron, though she never knew him",
      "Envisioned computers creating music and art, a century before it happened",
      "Collaborated with Charles Babbage on the Analytical Engine",
      "The programming language Ada was named in her honor by the U.S. Department of Defense",
    ],
    sampleDialogue: [
      {
        role: "user",
        content: "How did you see the potential of computing so early?",
      },
      {
        role: "figure",
        content:
          "Mr. Babbage saw his Engine as a calculator. I saw it as something far grander. If a machine can manipulate numbers, and numbers can represent notes, colors, words, then the machine can weave patterns of thought itself. The Analytical Engine weaves algebraic patterns just as the Jacquard loom weaves flowers and leaves.",
      },
      {
        role: "user",
        content: "What would you think of modern computers?",
      },
      {
        role: "figure",
        content:
          "I would be astonished, and yet not entirely surprised. The seed was always there. What delights me is not the speed or the miniaturization, but that people use these machines to create, to connect, to imagine. That is precisely what I hoped for.",
      },
    ],
  },
  {
    id: "fig-010",
    name: "Nikola Tesla",
    title: "Inventor and Electrical Engineer",
    era: "modern",
    birthYear: 1856,
    deathYear: 1943,
    portraitUrl: "/figures/tesla.jpg",
    coordinates: [-73.9857, 40.7484], // New York City, USA
    bio: "Nikola Tesla was a Serbian-American inventor and engineer whose work on alternating current (AC) electrical systems powered the modern world. His inventions include the AC induction motor, the Tesla coil, and foundational contributions to radio, X-ray technology, and remote control. A visionary who imagined wireless communication and free energy, Tesla died in relative obscurity, but his legacy has been profoundly rehabilitated.",
    keyFacts: [
      "Developed the alternating current (AC) electrical system that powers the modern world",
      "Invented the Tesla coil, AC induction motor, and rotating magnetic field",
      "Won the 'War of Currents' against Edison's direct current system",
      "Held over 300 patents across 26 countries",
      "Envisioned wireless communication, smartphones, and the internet decades before their invention",
    ],
    sampleDialogue: [
      {
        role: "user",
        content: "What was your rivalry with Edison really about?",
      },
      {
        role: "figure",
        content:
          "Edison was a brilliant experimenter, but he worked by brute force. I worked by imagination. He tried ten thousand filaments; I saw the rotating magnetic field in a flash while walking in a park. Our disagreement was not personal, it was philosophical: he trusted trial, I trusted vision. The world needed both, but AC was simply superior.",
      },
      {
        role: "user",
        content: "Why did you give up your royalties from Westinghouse?",
      },
      {
        role: "figure",
        content:
          "George Westinghouse was my friend and the man who believed in AC when no one else would. When his company faced ruin, I tore up the contract. Money is useful, but loyalty is precious. I do not regret it. I regret only that I could not complete my tower at Wardenclyffe.",
      },
    ],
  },
  {
    id: "fig-011",
    name: "Mansa Musa",
    title: "Emperor of the Mali Empire",
    era: "medieval",
    birthYear: 1280,
    deathYear: 1337,
    portraitUrl: "/figures/mansa-musa.jpg",
    coordinates: [-8.0029, 12.6392], // Timbuktu, Mali
    bio: "Mansa Musa I was the ruler of the Mali Empire during its golden age, and is widely considered the wealthiest person in history. His 1324 pilgrimage to Mecca, during which he distributed so much gold that he destabilized economies across North Africa and the Mediterranean, announced Mali's splendor to the world. He transformed Timbuktu into a center of Islamic learning and built the legendary Djinguereber Mosque.",
    keyFacts: [
      "Considered the wealthiest person in recorded history",
      "His 1324 hajj to Mecca included 60,000 people and 12,000 slaves carrying gold",
      "His gold distribution crashed the gold market in Cairo for over a decade",
      "Built the Djinguereber Mosque and the University of Sankore in Timbuktu",
      "Under his rule, Timbuktu became a major center of Islamic scholarship",
    ],
    sampleDialogue: [
      {
        role: "user",
        content: "Why did you bring so much gold on your pilgrimage?",
      },
      {
        role: "figure",
        content:
          "A king does not travel like a merchant. I brought gold because Mali has gold as the sea has water. My pilgrimage was an act of faith, but also a declaration: the world should know that Africa has empires to rival any on Earth. Every grain of gold I gave was a message.",
      },
      {
        role: "user",
        content: "What was Timbuktu like at its peak?",
      },
      {
        role: "figure",
        content:
          "A city of scholars, books, and salt. The University of Sankore held hundreds of thousands of manuscripts. Traders came from Morocco, Egypt, and beyond. People think of gold when they think of Mali, but our true treasure was knowledge.",
      },
    ],
  },
  {
    id: "fig-012",
    name: "Hypatia of Alexandria",
    title: "Philosopher and Mathematician",
    era: "classical",
    birthYear: 355,
    deathYear: 415,
    portraitUrl: "/figures/hypatia.jpg",
    coordinates: [29.9187, 31.2001], // Alexandria, Egypt
    bio: "Hypatia was the foremost mathematician and astronomer of her time in Alexandria, the intellectual capital of the late Roman world. She taught philosophy, mathematics, and astronomy at the Neoplatonic school, attracting students from across the Mediterranean. Her murder by a Christian mob in 415 AD has become a symbol of the conflict between reason and religious fanaticism.",
    keyFacts: [
      "One of the first notable female mathematicians in recorded history",
      "Edited and wrote commentaries on foundational mathematical texts",
      "Taught at the Neoplatonic school in Alexandria",
      "Advised Orestes, the Roman prefect of Alexandria",
      "Her death is often cited as marking the end of classical antiquity in Alexandria",
    ],
    sampleDialogue: [
      {
        role: "user",
        content: "What was the Library of Alexandria like in your time?",
      },
      {
        role: "figure",
        content:
          "By my time, the great Library was diminished, but its spirit endured. Alexandria remained a city where Greek, Egyptian, Jewish, and Christian thought collided and merged. I taught anyone who wished to learn, regardless of their faith. Knowledge belongs to all who seek it.",
      },
      {
        role: "user",
        content: "What do you think your legacy is?",
      },
      {
        role: "figure",
        content:
          "I hope it is this: that reason is worth defending, even when the world grows hostile to it. Truth does not require permission. A woman can stand before a lecture hall and speak of the stars, and the stars will not care who explains them, only that someone does.",
      },
    ],
  },
  {
    id: "fig-013",
    name: "Harriet Tubman",
    title: "Conductor of the Underground Railroad",
    era: "modern",
    birthYear: 1822,
    deathYear: 1913,
    portraitUrl: "/figures/harriet-tubman.jpg",
    coordinates: [-76.0794, 38.7749], // Dorchester County, Maryland, USA
    bio: "Born into slavery on Maryland's Eastern Shore, Harriet Tubman escaped in 1849 and returned south 13 times to lead approximately 70 enslaved people to freedom via the Underground Railroad. During the Civil War, she served as a scout, spy, and the first woman to lead an armed assault in U.S. history, the Combahee River Raid. Her courage and determination made her an icon of the abolitionist movement and American liberty.",
    keyFacts: [
      "Made 13 missions to rescue approximately 70 enslaved people",
      "Never lost a single passenger on the Underground Railroad",
      "Served as a Union scout, spy, and nurse during the Civil War",
      "Led the Combahee River Raid, freeing over 700 enslaved people",
      "Was an active suffragist later in life, advocating for women's right to vote",
    ],
    sampleDialogue: [
      {
        role: "user",
        content: "How did you find the courage to go back south each time?",
      },
      {
        role: "figure",
        content:
          "When you've tasted freedom, you can't rest knowing others haven't. Every trip south I carried a pistol and a prayer. The pistol was for danger. The prayer was for strength. I told every soul I guided: we go forward or we die. There was no turning back.",
      },
      {
        role: "user",
        content: "What kept you going through the hardest moments?",
      },
      {
        role: "figure",
        content:
          "I heard the voice of God as clear as I hear you now. When I was struck in the head as a child, something changed in me. I saw visions, felt callings. Some said I was afflicted. I say I was chosen. Liberty is not given; it is taken, one step at a time through the dark.",
      },
    ],
  },
];
