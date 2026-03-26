const U = (id: string, w = 800) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export const STOCK_IMAGES = {
  hero: {
    functional: [
      U("1497366216548-37526070297c"), U("1504384308090-c894fdcc538d"), U("1553877522-43269d4ea984"),
      U("1556761175-4b46a572b786"), U("1497215842964-222b430dc094"), U("1486406146926-c627a92ad1ab"),
    ],
    blog: [
      U("1499750310107-5fef28a66643"), U("1455390582262-044cdead277a"), U("1486312338219-ce68d2c6f44d"),
      U("1488190211105-8b0e65b80b4e"), U("1501504905252-473c47e087f8"), U("1432821596592-e2c18b78144f"),
    ],
    ecommerce: [
      U("1556742049-0cfed4f6a45d"), U("1607082348824-0a96f2a4b9da"), U("1472851294608-062f824d29cc"),
      U("1523275335684-37898b6baf30"), U("1560343090-f0409e92791a"), U("1542291026-7eec264c27ff"),
    ],
    "sales-funnel": [
      U("1460925895917-afdab827c52f"), U("1551434678-e076c223a692"), U("1553877522-43269d4ea984"),
      U("1519389950473-47ba0277781c"), U("1504868584819-f8e8b4b6d7e3"), U("1517694712202-14dd9538aa97"),
    ],
    landing: [
      U("1519389950473-47ba0277781c"), U("1498050108023-c5249f4df085"), U("1559028012-481c04fa702d"),
      U("1551434678-e076c223a692"), U("1504868584819-f8e8b4b6d7e3"), U("1555066931-4365d14bab8c"),
    ],
    dropship: [
      U("1441986300917-64674bd600d8"), U("1556742049-0cfed4f6a45d"), U("1607082348824-0a96f2a4b9da"),
      U("1472851294608-062f824d29cc"), U("1491553895911-0055eca6402d"), U("1542291026-7eec264c27ff"),
    ],
    course: [
      U("1503676260728-1c00da094a0b"), U("1524178232363-1fb2b075b655"), U("1509062522246-3755977927d7"),
      U("1522202176988-66273c2fd55f"), U("1513258496099-48168024aec0"), U("1571260899304-425eee4c7efc"),
    ],
    membership: [
      U("1522071820081-009f0129c71c"), U("1517245386807-bb43f82c33c4"), U("1521737852567-6949af3a6b7c"),
      U("1552664730-d307ca884978"), U("1543269865-cbf427effbad"), U("1556761175-5973dc0f32e7"),
    ],
    agency: [
      U("1460925895917-afdab827c52f"), U("1558655146-9f40138edfeb"), U("1542744094-3a31f272c490"),
      U("1581291518857-4e27b48ff24e"), U("1618005182384-a83a8bd57fbe"), U("1504691342899-4d92b50853e1"),
    ],
    marketplace: [
      U("1556742049-0cfed4f6a45d"), U("1607082348824-0a96f2a4b9da"), U("1441986300917-64674bd600d8"),
      U("1523275335684-37898b6baf30"), U("1560343090-f0409e92791a"), U("1472851294608-062f824d29cc"),
    ],
    ads: [
      U("1460925895917-afdab827c52f"), U("1504868584819-f8e8b4b6d7e3"), U("1551434678-e076c223a692"),
      U("1519389950473-47ba0277781c"), U("1517694712202-14dd9538aa97"), U("1555066931-4365d14bab8c"),
    ],
    local: [
      U("1556761175-5973dc0f32e7"), U("1600880292203-757bb62b4baf"), U("1521791136064-7986c2920216"),
      U("1573497019940-1c28c88b4f3e"), U("1552664730-d307ca884978"), U("1600439614353-174ad0ee3b25"),
    ],
    "mobile-app": [
      U("1512941937-f72f5e13a454"), U("1551650975-87deedd944c3"), U("1556656793-0c9175a3d013"),
      U("1526498460520-4c09db6d88e4"), U("1616348436168-de43ad0db179"), U("1563986768-81a6b8f6c661"),
    ],
  },

  about: [
    U("1522071820081-009f0129c71c"), U("1517245386807-bb43f82c33c4"), U("1521737852567-6949af3a6b7c"),
    U("1552664730-d307ca884978"), U("1543269865-cbf427effbad"), U("1600880292203-757bb62b4baf"),
    U("1556761175-5973dc0f32e7"), U("1573497019940-1c28c88b4f3e"), U("1556761175-4b46a572b786"),
    U("1497366216548-37526070297c"), U("1504384308090-c894fdcc538d"), U("1553877522-43269d4ea984"),
  ],

  gallery: [
    U("1460925895917-afdab827c52f"), U("1558655146-9f40138edfeb"), U("1542744094-3a31f272c490"),
    U("1507003211169-0a1dd7228f2d"), U("1513542789411-b6a5d4f31634"), U("1504691342899-4d92b50853e1"),
    U("1581291518857-4e27b48ff24e"), U("1618005182384-a83a8bd57fbe"), U("1486312338219-ce68d2c6f44d"),
    U("1522071820081-009f0129c71c"), U("1556742049-0cfed4f6a45d"), U("1441986300917-64674bd600d8"),
  ],

  content: [
    U("1499750310107-5fef28a66643"), U("1455390582262-044cdead277a"), U("1486312338219-ce68d2c6f44d"),
    U("1488190211105-8b0e65b80b4e"), U("1501504905252-473c47e087f8"), U("1519337265831-281ec6cc8514"),
    U("1471107340929-a87cd0f5b5f3"), U("1432821596592-e2c18b78144f"), U("1434030216411-0b793f4b4173"),
    U("1504868584819-f8e8b4b6d7e3"), U("1517694712202-14dd9538aa97"), U("1555066931-4365d14bab8c"),
  ],

  team: [
    U("1472099645785-5658abf4ff4e", 200), U("1560250097-0b93528c311a", 200),
    U("1519085360753-af0119f7cbe7", 200), U("1507003211169-0a1dd7228f2d", 200),
    U("1494790108377-be9c29b29330", 200), U("1573496359142-b8d87734a5a2", 200),
    U("1580489944761-15a19d654956", 200), U("1506794778202-cad84cf45f1d", 200),
  ],

  features: [
    U("1460925895917-afdab827c52f"), U("1551434678-e076c223a692"), U("1553877522-43269d4ea984"),
    U("1519389950473-47ba0277781c"), U("1498050108023-c5249f4df085"), U("1504868584819-f8e8b4b6d7e3"),
  ],

  video: [
    U("1516321497487-e288fb19713f"), U("1536240478700-b869070f9279"), U("1485846234645-a62644f84728"),
    U("1492691527338-e3d5023dbbc3"), U("1504639725590-34d0984388bd"), U("1522071820081-009f0129c71c"),
  ],

  benefits: [
    U("1553877522-43269d4ea984"), U("1460925895917-afdab827c52f"), U("1519389950473-47ba0277781c"),
    U("1498050108023-c5249f4df085"), U("1551434678-e076c223a692"), U("1504868584819-f8e8b4b6d7e3"),
  ],

  howItWorks: [
    U("1517694712202-14dd9538aa97"), U("1460925895917-afdab827c52f"), U("1553877522-43269d4ea984"),
  ],
} as const;

export function pickImage(pool: readonly string[], seed: number): string {
  return pool[Math.abs(seed) % pool.length];
}

export function pickImages(pool: readonly string[], count: number, seed: number): string[] {
  const results: string[] = [];
  for (let i = 0; i < count; i++) {
    results.push(pool[(Math.abs(seed) + i) % pool.length]);
  }
  return results;
}

export function getHeroImage(category: string, seed: number): string {
  const pool = STOCK_IMAGES.hero[category as keyof typeof STOCK_IMAGES.hero] || STOCK_IMAGES.hero.functional;
  return pickImage(pool, seed);
}

export function getAboutImage(seed: number): string {
  return pickImage(STOCK_IMAGES.about, seed);
}

export function getGalleryImages(count: number, seed: number): string[] {
  return pickImages(STOCK_IMAGES.gallery, count, seed);
}

export function getContentImages(count: number, seed: number): string[] {
  return pickImages(STOCK_IMAGES.content, count, seed);
}

export function getTeamPhotos(count: number, seed: number): string[] {
  return pickImages(STOCK_IMAGES.team, count, seed);
}

export function getFeatureImages(count: number, seed: number): string[] {
  return pickImages(STOCK_IMAGES.features, count, seed);
}

export function getVideoThumbnail(seed: number): string {
  return pickImage(STOCK_IMAGES.video, seed);
}

export function getBenefitImages(count: number, seed: number): string[] {
  return pickImages(STOCK_IMAGES.benefits, count, seed);
}

export function getHowItWorksImages(count: number, seed: number): string[] {
  return pickImages(STOCK_IMAGES.howItWorks, count, seed);
}
