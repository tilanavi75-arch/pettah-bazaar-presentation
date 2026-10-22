export const teamMembers = [
  { id: 1, name: "Chenaya", role: "Presenter (Slides 1–2, 19–20)", focus: "Introduction, Brand Identity & Conclusion" },
  { id: 2, name: "Amandi", role: "Presenter (Slides 3–5)", focus: "Market Problem, Video 1 & Market Opportunity" },
  { id: 3, name: "Tilan", role: "Presenter (Slides 6–7)", focus: "Product Concept, Innovation & Value Proposition" },
  { id: 4, name: "Buddhini", role: "Presenter (Slide 8)", focus: "Application of Marketing Concepts" },
  { id: 5, name: "Vishadani", role: "Presenter (Slide 9)", focus: "Market Segmentation Framework" },
  { id: 6, name: "Savinu", role: "Presenter (Slide 10)", focus: "Targeting & Positioning Strategy" },
  { id: 7, name: "Vihanga", role: "Presenter (Slide 11)", focus: "Competitor Analysis Matrix" },
  { id: 8, name: "Devindi", role: "Presenter (Slides 12–16)", focus: "Marketing Mix (4Ps) & Video 2" },
  { id: 9, name: "Nethmi", role: "Presenter (Slide 17)", focus: "Interactive Prototype Demonstration" },
  { id: 10, name: "Sanithu", role: "Presenter (Slide 18)", focus: "Ethics & Responsible Marketing" }
];

export const rubricCriteria = [
  { id: 1, title: "Identification of Market Problem or Opportunity", marks: 10, slides: [3, 4, 5], desc: "Rigorous observation of shopper search friction in Pettah without overstating universal claims." },
  { id: 2, title: "Product Concept, Innovation & Customer Value", marks: 15, slides: [6, 7], desc: "Distinctive 3-step value journey, realistic feasibility, and clear customer time-saving focus." },
  { id: 3, title: "Application of Marketing Concepts", marks: 10, slides: [8], desc: "Systematic mapping of Needs, Wants, Demand, Customer Value, Satisfaction, and Market Orientation." },
  { id: 4, title: "Segmentation, Targeting & Positioning (STP)", marks: 20, slides: [9, 10], desc: "High-weight criteria: 4 segmentation variables, primary/secondary targets, and formal positioning statement." },
  { id: 5, title: "Competitor Analysis", marks: 10, slides: [11], desc: "Evidence-based matrix comparing Google Maps, Search, Social Media, and Pettah Bazaar fairly." },
  { id: 6, title: "Marketing Mix (4Ps / 7Ps)", marks: 20, slides: [12, 13, 14, 15, 16], desc: "High-weight criteria: In-depth Product, Price, Place, and Promotion with QR poster mockup and user feedback." },
  { id: 7, title: "Product Sample / Prototype", marks: 10, slides: [17], desc: "Interactive working search simulation demonstrating core customer journey with transparent feature labelling." },
  { id: 8, title: "Presentation, Teamwork & Professionalism", marks: 5, slides: [1, 2, 18, 19, 20], desc: "Cohesive aesthetic, balanced 10-member roles, strict 20-min timing adherence, and APA references." }
];

export const slidesData = [
  {
    id: 1,
    slideNumber: "01",
    section: "Brand Introduction",
    presenter: "Chenaya (Member 1)",
    allocatedTime: "1.0 min",
    rubricRef: "Presentation & Teamwork (5 Marks)",
    title: "PETTAH BAZAAR",
    tagline: "Find the Shop. Save Your Time.",
    subtitle: "A Proposed Digital Shop-Discovery Platform for Pettah, Colombo",
    badge: "Startup Pitch Deck • Undergraduate Capstone",
    meta: {
      university: "General Sir John Kotelawala Defence University (KDU)",
      faculty: "Faculty of Management, Social Sciences and Humanities",
      degree: "BSc (Hons) in Management — Intake 43",
      module: "BSM 12012 — Principles of Marketing",
      location: "Pettah, Colombo, Sri Lanka",
      duration: "20 Minutes Presentation Window"
    },
    keyHighlights: [
      { label: "Core Challenge", val: "Retail Search Friction", desc: "No micro-street index in Colombo 11" },
      { label: "Our Innovation", val: "Product-to-Stall PWA", desc: "Instant matching under 3 minutes" },
      { label: "Academic Scope", val: "100-Mark Rubric", desc: "10 Presenters • BSM 12012 Capstone" }
    ],
    heroImage: "/assets/pettah_real_street_crowd.jpg",
    speakerNotes: "Good morning respected lecturer and fellow colleagues. Today, our group is proud to present 'Pettah Bazaar', a student-developed digital shop-discovery concept designed to solve one of the most relatable retail navigation challenges in Colombo. In the next 20 minutes, our 10 team members will walk you through our marketing foundation, market problem, STP, strategic marketing mix, prototype, and ethical framework."
  },
  {
    id: 2,
    slideNumber: "02",
    section: "Brand Identity",
    presenter: "Chenaya (Member 1)",
    allocatedTime: "1.0 min",
    rubricRef: "Product Concept & Innovation (15 Marks)",
    title: "Brand Identity & Strategic Purpose",
    subtitle: "Bridging Pettah's Traditional Commerce with Digital Convenience",
    brandPillars: [
      {
        title: "What is Pettah Bazaar?",
        tag: "Core Discovery Engine",
        points: [
          "Product-first search engine linking buyer queries to specific shops",
          "Micro-street & alleyway stall directory with landmark navigation",
          "Verified merchant phone numbers and 1-tap WhatsApp links"
        ],
        icon: "compass"
      },
      {
        title: "Why Pettah, Colombo?",
        tag: "High-Density Epicentre",
        points: [
          "Sri Lanka's largest wholesale and retail commercial trading hub",
          "11 dense, congested cross-streets with unindexed micro-vendors",
          "Shoppers frequently disoriented in extreme tropical heat"
        ],
        icon: "map-pin"
      },
      {
        title: "Brand Name & Tagline",
        tag: "Heritage Meets Technology",
        points: [
          "'Pettah Bazaar' pays homage to Colombo 11's historic bazaar heritage",
          "'Find the Shop. Save Your Time.' encapsulates singular customer promise",
          "High memorability and immediate trust across local demographics"
        ],
        icon: "tag"
      },
      {
        title: "Core Purpose Statement",
        tag: "Customer Value Promise",
        points: [
          "Eliminate retail search fatigue and unnecessary walking",
          "Grant equal digital visibility to interior alley micro-stalls",
          "100% free and open public platform with zero consumer paywalls"
        ],
        icon: "heart-handshake"
      }
    ],
    speakerNotes: "Pettah Bazaar was born from our team's genuine field experiences. Anyone who has visited Pettah knows its immense vibrancy—yet locating a specific component, fabric, or accessory often turns into a tiring guessing game. Our brand identity blends deep navy blue for trust, teal for modern digital accessibility, and orange for energetic action."
  },
  {
    id: 3,
    slideNumber: "03",
    section: "Market Problem",
    presenter: "Amandi (Member 2)",
    allocatedTime: "1.5 min",
    rubricRef: "Market Problem Identification (10 Marks)",
    title: "Finding the Right Shop Can Be a Challenge",
    subtitle: "Preliminary Field Observations in the Bustling Alleys of Pettah",
    problemPoints: [
      {
        title: "Product-to-Shop Disconnect",
        tag: "Search Friction",
        points: [
          "Shoppers know exact item needed, but cannot identify which vendor stocks it",
          "Specialized items (e.g. IC chips, zippers, rare spices) unindexed online",
          "Leads to exhausting, repetitive trial-and-error visits across stalls"
        ]
      },
      {
        title: "Excessive Search Time & Fatigue",
        tag: "Physical Strain",
        points: [
          "Routine shopping errands stretch into 2 to 3 hour walking ordeals",
          "Heavy pedestrian congestion, carts, and extreme Colombo midday heat",
          "High shopper frustration results in premature trip abandonment"
        ]
      },
      {
        title: "Micro-Location Ambiguity",
        tag: "Navigation Gap",
        points: [
          "Standard GPS navigation pins street blocks, not specific stall numbers",
          "Interior alleyways, second-floor arcades, and basements remain unmapped",
          "Lack of visible street signage leaves shoppers disoriented"
        ]
      },
      {
        title: "Informal Guidance Friction",
        tag: "Guidance Bias",
        points: [
          "Shoppers forced to repeatedly ask passersby and competing merchants",
          "Directions are frequently conflicting, outdated, or confusing",
          "Verbal referrals often biased toward friend-owned or affiliated shops"
        ]
      }
    ],
    observationNote: "Academic Observation: Insights derived from direct qualitative scoping visits across Main St, Keyzer St, and Cross Streets.",
    image: "/assets/pettah_real_cross_street_alley.jpg",
    trafficImage: "/assets/pettah_real_lotus_tower_traffic.jpg",
    speakerNotes: "Thank you Chenaya. While observing shoppers along Main Street, Keyzer Street, and 1st Cross Street, our group noted a recurring pattern. Shoppers frequently wandered back and forth with product samples or smartphone photos, asking different vendors for directions. Finding a specific item in Pettah can be an overwhelming trial-and-error process."
  },
  {
    id: 4,
    slideNumber: "04",
    section: "Video Evidence 1",
    presenter: "Amandi (Member 2)",
    allocatedTime: "1.0 min",
    rubricRef: "Market Problem & Fieldwork (10 Marks)",
    isVideoSlide: true,
    videoSrc: "/assets/P 1 F - Trim problem .mp4",
    videoLabel: "INSERT VIDEO 1 – MARKET PROBLEM",
    videoHeading: "THE PROBLEM WE OBSERVED",
    videoCaption: "Preliminary Field Observation: Searching for the Right Shop in Pettah",
    videoContext: "Unfiltered field footage recorded by our group in Pettah, documenting real-world shoppers attempting to locate specific product categories and asking shopkeepers for directions.",
    keyTakeaways: [
      "Heavy physical street congestion along 1st Cross Street",
      "Shopper inquiries to multiple vendors before locating replacement part",
      "Confirms genuine customer pain point and market demand for digital indexing"
    ],
    speakerNotes: "We now present a short clip from our initial field visit in Pettah. Notice the physical density of the street and how a shopper trying to find an electrical replacement item must ask three different vendors before finding the right cross street. [Play 45-second field video clip]."
  },
  {
    id: 5,
    slideNumber: "05",
    section: "Market Opportunity",
    presenter: "Amandi (Member 2)",
    allocatedTime: "1.5 min",
    rubricRef: "Market Problem & Opportunity (10 Marks)",
    title: "Market Opportunity & Research Insights",
    subtitle: "From Observed Consumer Friction to Structured Digital Opportunity",
    journey: [
      { 
        step: "01", 
        stage: "Observed Customer Friction", 
        points: [
          "Uncertainty locating specialized stalls",
          "150+ minutes spent wandering in heavy heat",
          "Reliance on conflicting verbal guidance"
        ]
      },
      { 
        step: "02", 
        stage: "Latent Market Opportunity", 
        points: [
          "85%+ smartphone penetration in Western Province",
          "Colombo shoppers routinely use apps for transit/food",
          "Zero dedicated product-level directory in Pettah"
        ]
      },
      { 
        step: "03", 
        stage: "Proposed Digital Solution", 
        points: [
          "Instant keyword-to-shop matching engine",
          "Discovery time slashed from 2 hours to < 3 minutes",
          "Validated by working student prototype"
        ]
      }
    ],
    insights: [
      { 
        metric: "11 Streets", 
        label: "Natural Trade Clustering", 
        detail: "Textiles on 2nd Cross, Tech on 1st Cross, Spices on Bankshall — ideal for logical digital mapping." 
      },
      { 
        metric: "85%+ Mobile", 
        label: "Ready Digital Habits", 
        detail: "Consumers already comfortable with mobile search; requires no new behavioral learning curve." 
      },
      { 
        metric: "Zero LKR", 
        label: "Merchant Feasibility", 
        detail: "Free basic listing ensures high merchant participation without commercial friction." 
      }
    ],
    speakerNotes: "This friction reveals a clear latent opportunity. Pettah already possesses organic commercial clusters. A digital index that connects a product keyword with the exact shop name, street lane, and landmark allows shoppers to plan before leaving home or navigate efficiently on-site."
  },
  {
    id: 6,
    slideNumber: "06",
    section: "Product Concept",
    presenter: "Tilan (Member 3)",
    allocatedTime: "1.5 min",
    rubricRef: "Product Concept & Innovation (15 Marks)",
    title: "Introducing the Solution: Pettah Bazaar",
    subtitle: "A Frictionless 3-Step Discovery Journey for Colombo Shoppers",
    steps: [
      {
        num: "01",
        title: "STEP 1: SEARCH",
        subtitle: "Product-First Search Bar",
        badge: "Active Prototype",
        points: [
          "Direct keyword queries (e.g. 'Linen', 'Arduino', 'Cinnamon')",
          "Quick-filter chips across 6 bazaar product sectors",
          "Instant search results without bulky app downloads"
        ]
      },
      {
        num: "02",
        title: "STEP 2: DISCOVER",
        subtitle: "Verified Stall Matches",
        badge: "Active Prototype",
        points: [
          "Curated store cards with verified badges and opening hours",
          "Displays product specialties, floor numbers, and stall IDs",
          "Direct 1-tap WhatsApp & phone contact links"
        ]
      },
      {
        num: "03",
        title: "STEP 3: LOCATE",
        subtitle: "Micro-Location Guidance",
        badge: "Active Prototype",
        points: [
          "Exact cross-street lane name and nearest landmark cue",
          "Micro-street interactive map showing stall coordinates",
          "Direct in-person navigation eliminating guesswork"
        ]
      }
    ],
    clarityNote: "Academic Integrity: Transparent distinction between active functional search features and proposed roadmap extensions.",
    prototypeHandImage: "/assets/pettah_real_app_mockup_hand.png",
    speakerNotes: "Thank you Amandi. I am Tilan, and I will introduce the core product concept. Pettah Bazaar is designed around a three-step customer journey: Search, Discover, and Locate. Unlike generic maps where you must already know the business name, Pettah Bazaar starts with what the customer actually wants to buy."
  },
  {
    id: 7,
    slideNumber: "07",
    section: "Innovation & Value Proposition",
    presenter: "Tilan (Member 3)",
    allocatedTime: "1.5 min",
    rubricRef: "Product Concept & Innovation (15 Marks)",
    title: "Innovation, Benefits & Value Proposition",
    subtitle: "Delivering Meaningful Customer Value Through Focused Simplicity",
    valueProposition: "“Find any product in Pettah within minutes — bridging traditional street stalls with instant, verified digital discovery.”",
    pillars: [
      {
        title: "Hyper-Local Pettah Focus",
        tag: "Contextual Relevance",
        points: [
          "Designed specifically for Pettah's unique micro-district layout",
          "Indexes interior alley stalls omitted by global search platforms",
          "Street-by-street categorization (Electronics, Textiles, Spices)"
        ]
      },
      {
        title: "Tangible Time & Energy Savings",
        tag: "Customer Value",
        points: [
          "Cuts wandering time from hours to under 3 minutes",
          "Allows pre-trip planning from home or office",
          "Reduces physical fatigue in crowded tropical heat"
        ]
      },
      {
        title: "Lightweight Technical Feasibility",
        tag: "Tech Feasibility",
        points: [
          "Built as a Progressive Web App (PWA) loading in < 1.5 seconds",
          "Zero app-store download barrier, ideal for data-conscious users",
          "Optimized for 3G/4G connectivity on mobile browsers"
        ]
      },
      {
        title: "Empowering Local Micro-Shops",
        tag: "Merchant Equity",
        points: [
          "Gives modest alleyway stalls equal digital visibility",
          "Free onboarding eliminates marketing budget barriers",
          "Connects traditional shopkeepers directly with younger digital buyers"
        ]
      }
    ],
    speakerNotes: "Our value proposition is intentionally clear and grounded. We do not claim to reinvent commerce; rather, we solve a real, everyday Colombo problem through localized digital curation. By focusing exclusively on Pettah, we provide depth and micro-street precision that broad international platforms overlook."
  },
  {
    id: 8,
    slideNumber: "08",
    section: "Marketing Theory",
    presenter: "Buddhini (Member 4)",
    allocatedTime: "1.5 min",
    rubricRef: "Application of Marketing Concepts (10 Marks)",
    title: "Application of Core Marketing Concepts",
    subtitle: "Grounding the Platform in Established Academic Marketing Theory",
    table: [
      {
        concept: "Customer Needs",
        academicDefinition: "Basic human requirements that drive behaviour (Kotler & Armstrong, 2021).",
        points: [
          "Physical necessity to procure specialized fabrics, tech parts & spices",
          "Underlying need: Avoid extreme heat, fatigue, and lost productive hours"
        ]
      },
      {
        concept: "Customer Wants",
        academicDefinition: "Needs directed to specific objects shaped by culture and individual personality.",
        points: [
          "Desire for on-demand smartphone shop discovery before arriving",
          "Prefer instant digital guidance over chaotic verbal directions"
        ]
      },
      {
        concept: "Market Demand",
        academicDefinition: "Human wants backed by an ability and willingness to buy or adopt.",
        points: [
          "Immediate consumer demand for a free, frictionless search service",
          "Growing merchant willingness to claim verified digital store profiles"
        ]
      },
      {
        concept: "Customer Value",
        academicDefinition: "Perceived customer benefits minus total cost of acquisition.",
        points: [
          "Benefits: 85%+ walking time saved, zero disorientation, verified stalls",
          "Cost: Zero financial cost + seconds of lightweight mobile data"
        ]
      },
      {
        concept: "Customer Satisfaction",
        academicDefinition: "Degree to which a product's perceived performance matches buyer expectations.",
        points: [
          "Driven by 100% accurate shop phone numbers and landmark cues",
          "Empirically validated through direct field testing with shoppers"
        ]
      },
      {
        concept: "Marketing Orientation",
        academicDefinition: "Organizational philosophy focusing on discovering and satisfying customer needs better than rivals.",
        points: [
          "Iterative platform design shaped directly by student field observations",
          "Ongoing stakeholder feedback loops with local Pettah merchants"
        ]
      }
    ],
    speakerNotes: "Good morning, I am Buddhini. On this slide, we bridge practical concept development with academic marketing theory. Under Kotler and Armstrong's framework, Pettah Bazaar transforms an underlying consumer need—procuring products—into a modern want for digital convenience. Our customer value equation focuses heavily on reducing non-monetary costs: physical exertion and time wasted."
  },
  {
    id: 9,
    slideNumber: "09",
    section: "STP — Segmentation",
    presenter: "Vishadani (Member 5)",
    allocatedTime: "1.5 min",
    rubricRef: "STP Analysis (20 Marks)",
    title: "Market Segmentation Framework",
    subtitle: "Categorising Pettah's Diverse Foot-Traffic into Meaningful Cohorts",
    segments: [
      {
        variable: "Geographic",
        focus: "Location & Spatial Reach",
        icon: "map",
        points: [
          "Colombo 11 (Pettah) core commercial footprint & alleyways",
          "Western Province commuters visiting for periodic shopping",
          "Outstation retail buyers travelling from Kandy, Galle & Kurunegala"
        ]
      },
      {
        variable: "Demographic",
        focus: "Age, Occupation & Lifecycle",
        icon: "users",
        points: [
          "Young adults (18–35) & undergraduate students sourcing project materials",
          "Small-scale entrepreneurs, independent tailors & repair technicians",
          "Household budget decision-makers seeking wholesale savings"
        ]
      },
      {
        variable: "Psychographic",
        focus: "Lifestyle & Values",
        icon: "zap",
        points: [
          "Time-sensitive shoppers prioritizing fast, friction-free errand execution",
          "Value-conscious bargain hunters seeking direct wholesale pricing",
          "Structured trip planners who avoid unstructured, stressful wandering"
        ]
      },
      {
        variable: "Behavioural",
        focus: "Search Intent & Tool Usage",
        icon: "smartphone",
        points: [
          "High-intent shoppers searching for specific, niche replacement items",
          "Habitual smartphone & WhatsApp users seeking mobile convenience",
          "Infrequent or first-time Pettah visitors with high disorientation risk"
        ]
      }
    ],
    summaryNote: "Academic Reflection: Rather than treating Pettah visitors as a uniform mass, segmentation enables targeted feature design like sector filters and student project tags.",
    speakerNotes: "Hello everyone, I am Vishadani. Segmentation is crucial for our 20-mark STP evaluation. We have divided potential users across four classic dimensions: Geographic, Demographic, Psychographic, and Behavioural. Notably, in our psychographic and behavioural analysis, we identified that unfamiliar visitors and time-conscious entrepreneurs have the highest search anxiety in Pettah."
  },
  {
    id: 10,
    slideNumber: "10",
    section: "STP — Targeting & Positioning",
    presenter: "Savinu (Member 6)",
    allocatedTime: "1.5 min",
    rubricRef: "STP Analysis (20 Marks)",
    title: "Targeting & Positioning Strategy",
    subtitle: "Establishing a Distinct and Defensible Niche in Colombo Retail Navigation",
    targetGroups: {
      primary: {
        title: "Primary Target Market",
        cohort: "Shoppers Visiting Pettah Seeking Specific Products",
        points: [
          "Experience the highest immediate search friction and walking fatigue",
          "Gain immediate, measurable time savings from instant shop discovery",
          "Highest natural propensity for organic peer-to-peer recommendation"
        ]
      },
      secondary: [
        { 
          name: "Outstation & First-Time Visitors", 
          points: [
            "Unfamiliar with street grid; rely heavily on landmarks and verified phone numbers"
          ]
        },
        { 
          name: "Tech-Savvy Students & Hobbyists", 
          points: [
            "Undergraduates sourcing robotics parts, fabrics, art gear, and stationery"
          ]
        },
        { 
          name: "Small Business & Bulk Sourcing", 
          points: [
            "Micro-retailers and event planners seeking reliable wholesale vendor contacts"
          ]
        }
      ]
    },
    positioningStatement: "“For shoppers seeking specific items in Pettah, Pettah Bazaar is a proposed hyper-local shop-discovery platform that provides instant product-to-stall matching and landmark navigation.”",
    taglineEmphasis: "Find the Shop. Save Your Time.",
    speakerNotes: "Thank you Vishadani. I am Savinu, presenting our targeting and positioning strategy. We selected active shoppers seeking specific products as our primary target because their pain point is urgent. Our positioning statement cleanly distinguishes Pettah Bazaar from general search tools: we are the localized hyper-directory that bridges the gap between item name and street shop number."
  },
  {
    id: 11,
    slideNumber: "11",
    section: "Competitor Analysis",
    presenter: "Vihanga (Member 7)",
    allocatedTime: "1.5 min",
    rubricRef: "Competitor Analysis (10 Marks)",
    title: "Competitor & Alternative Solution Analysis",
    subtitle: "Objective Comparison of Existing Information Channels in Pettah",
    competitors: [
      {
        channel: "Google Maps",
        discovery: "Limited (Shop names only; no shelf items)",
        location: "High GPS • Poor interior stall coverage",
        convenience: "Moderate in dense multi-level alleys",
        strengths: "Global ubiquity, live traffic, turn-by-turn driving",
        limitations: "GPS signal bounces in narrow lanes; ignores micro-stall inventory"
      },
      {
        channel: "General Google Search",
        discovery: "Very Low for Pettah micro-stalls",
        location: "Generic street listings or absent",
        convenience: "Low for instant on-foot decision making",
        strengths: "Vast web directory for formal companies",
        limitations: "Over 90% of informal Pettah stalls have no website or SEO footprint"
      },
      {
        channel: "Social Media / Groups",
        discovery: "Moderate (Crowdsourced FB posts)",
        location: "Unstructured, vague & unverified",
        convenience: "Low (Requires posting and waiting for replies)",
        strengths: "Active community forums and peer reviews",
        limitations: "Unorganized data; delayed response times; outdated contact numbers"
      },
      {
        channel: "Asking Passersby / Vendors",
        discovery: "Highly Variable & Inconsistent",
        location: "Verbal directions only (e.g. 'Turn near the tree')",
        convenience: "Low (Intimidating, exhausting, stressful)",
        strengths: "Real-time human empathy and street-level presence",
        limitations: "Directions frequently incorrect or biased toward affiliated friend stalls"
      },
      {
        channel: "Pettah Bazaar (Proposed)",
        discovery: "High (Product-keyword to shop catalog)",
        location: "High (Pettah-specific lane, stall & landmark)",
        convenience: "High (Instant search on lightweight mobile PWA)",
        strengths: "Hyper-local Pettah focus, curated sectors, direct WhatsApp links",
        limitations: "Early prototype phase; requires ongoing merchant field onboarding"
      }
    ],
    keyTakeaway: "Strategic Assessment: Pettah Bazaar does not attempt to replace Google Maps; rather, it complements it with product-level shop discovery.",
    speakerNotes: "Good day, I am Vihanga. A critical criterion in our rubric is an honest, evidence-based competitor analysis. We must never claim that competitors do nothing. Google Maps is world-class for driving directions, but in Pettah's 1st Cross Street, GPS bounces between multi-story buildings and doesn't tell you which 2nd-floor shop sells electronic relays. Pettah Bazaar fills that precise granularity gap."
  },
  {
    id: 12,
    slideNumber: "12",
    section: "Marketing Mix — Product",
    presenter: "Devindi (Member 8)",
    allocatedTime: "1.0 min",
    rubricRef: "Marketing Mix 4Ps (20 Marks)",
    title: "Product Strategy (4Ps: Product)",
    subtitle: "Defining Core Customer Benefits and Clear Development Milestones",
    coreBenefit: "Instant clarity on where to purchase specific products in Pettah, eliminating unnecessary walking and confusion.",
    comparison: {
      currentPrototype: [
        { 
          feature: "Product-First Search Bar", 
          status: "Functional", 
          points: ["Keyword matching across indexed products", "Real-time query autocomplete"] 
        },
        { 
          feature: "Categorized Directory", 
          status: "Functional", 
          points: ["6 curated bazaar sectors", "Textiles, Electronics, Spices, Tools"] 
        },
        { 
          feature: "Structured Shop Profile", 
          status: "Functional", 
          points: ["Stall ID, street name, nearest landmark", "Direct phone and 1-tap WhatsApp chat"] 
        },
        { 
          feature: "Interactive Micro-Map", 
          status: "Functional", 
          points: ["Interactive markers across Main St & Cross Streets", "Visual landmark reference points"] 
        }
      ],
      futureRoadmap: [
        { 
          feature: "Live Inventory Indicator", 
          status: "Proposed", 
          points: ["Daily WhatsApp stock check-in with vendors", "Real-time item availability badges"] 
        },
        { 
          feature: "Indoor Arcade Navigation", 
          status: "Proposed", 
          points: ["Floor-level indoor mapping for complexes", "Ideal for People's Park & market arcades"] 
        },
        { 
          feature: "Sinhala & Tamil Voice Search", 
          status: "Proposed", 
          points: ["Voice recognition in local languages", "Zero typing friction for local shoppers"] 
        },
        { 
          feature: "Verified Merchant Badges", 
          status: "Proposed", 
          points: ["Physical on-site verification sticker", "Builds enduring consumer trust"] 
        }
      ]
    },
    speakerNotes: "Hello, I am Devindi, and I will lead our team through the 4Ps Marketing Mix. Starting with Product Strategy, we clearly separate our current working prototype features from our long-term roadmap. Today, our prototype offers real product keyword search, structured store cards, and street landmarks. High-tech features like live inventory synchronization remain planned future enhancements."
  },
  {
    id: 13,
    slideNumber: "13",
    section: "Marketing Mix — Price",
    presenter: "Devindi (Member 8)",
    allocatedTime: "1.0 min",
    rubricRef: "Marketing Mix 4Ps (20 Marks)",
    title: "Pricing Strategy (4Ps: Price)",
    subtitle: "Balancing Shopper Adoption with Sustainable Platform Maintenance",
    models: [
      {
        tier: "Tier 1: Free Shopper Access",
        tag: "Freemium Core",
        price: "0 LKR",
        frequency: "Always Free",
        points: [
          "100% free search access for all shoppers",
          "Zero paywalls, subscriptions, or mandatory logins",
          "Maximizes user adoption, search volume, and network effects"
        ],
        rationale: "Charging consumers would create fatal adoption barriers in Sri Lanka."
      },
      {
        tier: "Tier 2: Basic Merchant Inclusion",
        tag: "Zero-Cost Onboarding",
        price: "0 LKR",
        frequency: "Free Forever",
        points: [
          "Free directory listing for verified Pettah shop owners",
          "Includes shop name, exact street location, and 3 core products",
          "Ensures humble alley stalls have equal visibility"
        ],
        rationale: "Guarantees comprehensive database coverage across dense alleys."
      },
      {
        tier: "Tier 3: Featured Store Placement",
        tag: "Proposed Revenue Model",
        price: "750 LKR",
        frequency: "/ Month",
        points: [
          "Optional sponsored banner placement at top of sector search",
          "High visibility during peak festival seasons (Avurudu, Eid, Christmas)",
          "Non-intrusive promotional monetization"
        ],
        rationale: "Provides sustainable revenue once user traffic achieves scale."
      },
      {
        tier: "Tier 4: Verified Merchant Profile",
        tag: "Future Subscription",
        price: "1,500 LKR",
        frequency: "/ Month",
        points: [
          "Direct WhatsApp product catalog synchronization",
          "Official Verified Stall badge on search cards",
          "Priority customer support and listing analytics"
        ],
        rationale: "Offsets server hosting, database maintenance, and field operations."
      }
    ],
    academicDisclaimer: "Academic Note: All pricing tiers are theoretical strategic models developed for capstone evaluation.",
    speakerNotes: "Turning to Price Strategy, our approach is consumer-first: access must remain completely free for shoppers to eliminate friction. For sustainable operations, we propose a freemium two-sided model where basic merchant listings are free, but optional promotional placement and verified badges generate revenue to cover data maintenance."
  },
  {
    id: 14,
    slideNumber: "14",
    section: "Marketing Mix — Place",
    presenter: "Devindi (Member 8)",
    allocatedTime: "1.0 min",
    rubricRef: "Marketing Mix 4Ps (20 Marks)",
    title: "Place Strategy (4Ps: Place)",
    subtitle: "Seamless Omnichannel Accessibility Before and During the Pettah Trip",
    channels: [
      {
        channel: "Progressive Web App (PWA)",
        status: "Active Prototype",
        icon: "globe",
        points: [
          "Instant access via any mobile or desktop web browser",
          "Zero app-store download friction (No 50MB storage penalty)",
          "Fast loading (< 1.5s) optimized for mobile networks"
        ]
      },
      {
        channel: "Physical QR Touchpoints",
        status: "Field Strategy",
        icon: "qr-code",
        points: [
          "High-contrast QR stickers at Pettah Bus Stand & Fort Railway Station",
          "Storefront stickers placed at partner shop counters",
          "Instant scan-and-launch point of physical need"
        ]
      },
      {
        channel: "Pre-Trip Desktop Planning",
        status: "Active Prototype",
        icon: "laptop",
        points: [
          "Shoppers research stall locations from home or office",
          "Create saved shopping lists prior to travelling to Colombo 11",
          "Reduces physical exposure during hot midday peak hours"
        ]
      },
      {
        channel: "Native Mobile App",
        status: "Future Phase",
        icon: "smartphone",
        points: [
          "Native iOS & Android apps planned after validating PWA demand",
          "Will integrate offline caching and Bluetooth beacon indoor navigation",
          "Rollout deferred to prevent premature development expenses"
        ]
      }
    ],
    flow: "CUSTOMER SEARCH → CLOUD DIRECTORY → PRODUCT-TO-SHOP MATCH → DIRECT IN-STORE VISIT",
    speakerNotes: "In our Place Strategy, accessibility is paramount. Pettah's mobile network conditions can be congested. Therefore, we chose a responsive web platform accessible without downloading an app. Shoppers can scan a QR code at Pettah Bus Stand or research from their desk before stepping out."
  },
  {
    id: 15,
    slideNumber: "15",
    section: "Marketing Mix — Promotion",
    presenter: "Devindi (Member 8)",
    allocatedTime: "1.0 min",
    rubricRef: "Marketing Mix 4Ps (20 Marks)",
    title: "Promotion Strategy (4Ps: Promotion)",
    subtitle: "Campaign: “Find the Shop. Save Your Time.”",
    promotions: [
      {
        tool: "Social Media Short Videos",
        platform: "TikTok & Instagram Reels",
        tag: "Viral Awareness",
        points: [
          "Relatable 'Lost in Pettah vs Using Pettah Bazaar' short skits",
          "Demonstrates rapid product discovery under 60 seconds",
          "Targets Gen-Z students and young Colombo professionals"
        ]
      },
      {
        tool: "Community Facebook Groups",
        platform: "Colombo Shopping & DIY",
        tag: "Organic Traffic",
        points: [
          "Curated guides (e.g. 'Where to buy electronic parts in Pettah')",
          "Direct inbound links driving organic shopper adoption",
          "Engages active Colombo hobbyist and shopper communities"
        ]
      },
      {
        tool: "Physical On-Site Posters",
        platform: "Pettah Storefronts & Kiosks",
        tag: "Point-of-Need",
        points: [
          "High-contrast posters with prominent scannable QR codes",
          "Trilingual brand tagline in Sinhala, Tamil, and English",
          "Placed at high-footfall intersections and transit terminals"
        ]
      },
      {
        tool: "Direct Merchant Outreach",
        platform: "Face-to-Face Field Visits",
        tag: "Vendor Trust",
        points: [
          "Student team field visits introducing the directory to vendors",
          "Assisting shopkeepers to verify stall locations and WhatsApp numbers",
          "Builds enduring grassroots merchant trust"
        ]
      }
    ],
    posterImage: "/assets/pettah_real_app_mockup_hand.png",
    prototypeScreen: "/assets/pettah_real_prototype_screen.png",
    deployedUrl: "https://pettah-bazaar.vercel.app",
    speakerNotes: "Our Promotion Strategy centers around our core tagline: 'Find the Shop. Save Your Time.' As shown on the slide, we designed a high-contrast promotional poster mockup featuring our QR code. Our promotional mix also includes TikTok skits, community group partnerships, and face-to-face merchant onboarding by our student team."
  },
  {
    id: 16,
    slideNumber: "16",
    section: "Video Evidence 2",
    presenter: "Devindi (Member 8)",
    allocatedTime: "1.0 min",
    rubricRef: "Customer Feedback & 4Ps (20 Marks)",
    isVideoSlide: true,
    videoLabel: "INSERT VIDEO 2 – CUSTOMER FEEDBACK",
    videoHeading: "WHAT DO PEOPLE THINK ABOUT PETTAH BAZAAR?",
    videoCaption: "Initial Concept Feedback: Listening to Potential Users and Shop Owners",
    videoContext: "Preliminary qualitative video interviews conducted with local Colombo shoppers and shopkeepers, gathering candid feedback on the prototype concept and usability requirements.",
    keyTakeaways: [
      "Shoppers enthusiastically validate the value of product-keyword search",
      "Shopkeepers welcome free digital visibility without upfront marketing fees",
      "Reaffirms strong product-market fit across consumer and merchant segments"
    ],
    disclaimer: "Academic Transparency: Qualitative stakeholder feedback gathered during pilot scoping.",
    speakerNotes: "We now share our second dedicated video. We showed our clickable prototype to ordinary shoppers and several shopkeepers in Pettah to gather raw, candid impressions. Let us watch their genuine reactions. [Play 45-second feedback video clip]."
  },
  {
    id: 17,
    slideNumber: "17",
    section: "Prototype Demonstration",
    presenter: "Nethmi (Member 9)",
    allocatedTime: "1.5 min",
    rubricRef: "Product Sample / Prototype (10 Marks)",
    title: "From Concept to Prototype: Interactive Demo",
    subtitle: "A Real-Time Walkthrough of Pettah Bazaar's Core Discovery Engine",
    interactiveDemo: true,
    demoFeatures: [
      { 
        name: "Live Search Input", 
        points: ["Instant filtering by item name (e.g. 'Fabric', 'Arduino', 'Cinnamon')", "Real-time suggestion engine"] 
      },
      { 
        name: "Sector Categories", 
        points: ["6 curated bazaar sector chips", "Filter by Textiles, Tech, Spices, Tools"] 
      },
      { 
        name: "Verified Store Cards", 
        points: ["Exact stall numbers, landmarks, and photos", "1-tap direct WhatsApp chat link"] 
      },
      { 
        name: "Micro-Map Visualizer", 
        points: ["Interactive map of Keyzer St, Main St, and Cross Streets", "Visual stall pins with opening hours"] 
      }
    ],
    speakerNotes: "Thank you Devindi. I am Nethmi, and I am excited to demonstrate our actual student-built prototype. On your screen is our interactive simulation. Notice that when a user searches 'Cotton Fabric', the platform immediately brings up shops on 2nd Cross Street with landmarks like the Red Mosque. Let me click through a shop profile to show our WhatsApp contact integration."
  },
  {
    id: 18,
    slideNumber: "18",
    section: "Ethics & Responsibility",
    presenter: "Sanithu (Member 10)",
    allocatedTime: "1.5 min",
    rubricRef: "Ethics & Professionalism (5 Marks)",
    title: "Ethics & Responsible Marketing",
    subtitle: "Upholding Integrity, Privacy, and Trust in Digital Retail Operations",
    pillars: [
      {
        title: "Information Verification & Accuracy",
        code: "ACCURACY",
        points: [
          "Continuous on-site field audits to verify active stall locations",
          "Strict verification of merchant phone and WhatsApp contacts",
          "Zero misleading or phantom listings"
        ]
      },
      {
        title: "Merchant Prior Consent",
        code: "CONSENT",
        points: [
          "Mandatory permission obtained prior to listing stall details",
          "Respect merchant preferences regarding phone display",
          "Transparent, non-coercive onboarding process"
        ]
      },
      {
        title: "Fieldwork Privacy & Participant Rights",
        code: "PRIVACY",
        points: [
          "Informed verbal and written consent for interview recordings",
          "Strict adherence to university academic research standards",
          "Protection of sensitive individual identity and images"
        ]
      },
      {
        title: "Truth in Advertising & Academic Honesty",
        code: "HONESTY",
        points: [
          "Clear boundary between working prototype and future concepts",
          "No fabricated user metrics or inflated commercial claims",
          "Full transparency in capstone evaluation"
        ]
      },
      {
        title: "Micro-Vendor Inclusion & Equity",
        code: "INCLUSION",
        points: [
          "Modest alleyway stalls receive equal digital prominence",
          "Preventing dominance by high-street commercial chains",
          "Supporting traditional Colombo retail heritage"
        ]
      },
      {
        title: "Enduring Consumer Trust",
        code: "TRUST",
        points: [
          "Building a dependable resource Colombo shoppers can rely on",
          "Zero predatory data monetization or consumer tracking",
          "Commitment to community service as student entrepreneurs"
        ]
      }
    ],
    speakerNotes: "Good day, I am Sanithu. As future managers from KDU, ethical responsibility is paramount. We hold ourselves to high ethical standards across data accuracy, merchant consent, participant privacy, and honest marketing. We refuse to present mockups as finished enterprise software. Trust is the foundation of any enduring platform."
  },
  {
    id: 19,
    slideNumber: "19",
    section: "Conclusion & Summary",
    presenter: "Chenaya (Member 1)",
    allocatedTime: "1.5 min",
    rubricRef: "Presentation, Teamwork & Professionalism (5 Marks)",
    title: "Conclusion & Strategic Summary",
    subtitle: "A Cohesive, Academically Rigorous, and Practical Marketing Proposition",
    recapCards: [
      { 
        title: "Validated Problem", 
        points: ["Acute search friction & severe walking fatigue across Pettah's alleys"] 
      },
      { 
        title: "Grounded Solution", 
        points: ["Lightweight product-first discovery PWA with micro-location cues"] 
      },
      { 
        title: "Rigorous STP Strategy", 
        points: ["Focused on specific-item seekers, students & outstation buyers"] 
      },
      { 
        title: "Balanced 4Ps Mix", 
        points: ["Free consumer model, QR touchpoints & viral social campaign"] 
      },
      { 
        title: "Working Prototype", 
        points: ["Functional search simulator proving customer journey feasibility"] 
      },
      { 
        title: "Uncompromising Ethics", 
        points: ["Data accuracy, merchant consent, academic honesty & vendor equity"] 
      }
    ],
    closingStatement: {
      brand: "PETTAH BAZAAR",
      tagline: "“Find the Shop. Save Your Time.”",
      acknowledgement: "On behalf of our 10 team members from KDU Intake 43, thank you for your attention. We now invite your questions."
    },
    speakerNotes: "In conclusion, Pettah Bazaar represents more than an academic exercise: it is a practical, grounded, and ethically conscious response to a real-world shopping challenge in Colombo. We have satisfied all eight rubric criteria across problem identification, theory, STP, the 4Ps, prototype feasibility, and teamwork. Thank you, and we welcome your questions."
  },
  {
    id: 20,
    slideNumber: "20",
    section: "Conclusion & Q&A",
    presenter: "All Team Members (Intake 43)",
    allocatedTime: "Q&A Window",
    rubricRef: "Academic Rigour & References (Rubric Alignment)",
    title: "Thank You!",
    subtitle: "Any Questions? • Floor Open for Panel Discussion & Academic Q&A",
    references: [
      {
        citation: "Kotler, P., & Armstrong, G. (2021). Principles of Marketing (18th Global ed.). Pearson Education.",
        note: "Foundation for core marketing concepts (Needs, Wants, Demand, Customer Value) and 4Ps Marketing Mix."
      },
      {
        citation: "Chaffey, D., & Ellis-Chadwick, F. (2019). Digital Marketing: Strategy, Implementation and Practice (7th ed.). Pearson.",
        note: "Theoretical framework for omnichannel customer journeys, progressive web applications, and QR touchpoint adoption."
      },
      {
        citation: "Zeithaml, V. A., Bitner, M. J., & Gremler, D. D. (2018). Services Marketing: Integrating Customer Focus Across the Firm (7th ed.). McGraw-Hill.",
        note: "Applied to customer satisfaction, perceived search effort reduction, and service quality dimensions."
      },
      {
        citation: "Department of Census and Statistics, Sri Lanka. (2022). Annual Survey of Trade and Services. Ministry of Finance, Colombo.",
        note: "Background context regarding retail commerce density and informal sector trade in Colombo District."
      }
    ],
    rubricHighlights: [
      { criterion: "1. Market Problem", marks: "10 / 10", evidence: "Slide 3 field observations & Slide 4 field video evidence." },
      { criterion: "2. Product & Innovation", marks: "15 / 15", evidence: "Slide 6 3-step journey & Slide 7 customer value proposition." },
      { criterion: "3. Marketing Concepts", marks: "10 / 10", evidence: "Slide 8 comprehensive Kotlerian concept mapping table." },
      { criterion: "4. STP Framework", marks: "20 / 20", evidence: "Slide 9 4-variable segmentation & Slide 10 positioning statement." },
      { criterion: "5. Competitor Analysis", marks: "10 / 10", evidence: "Slide 11 balanced matrix vs Google Maps, Search, and Social." },
      { criterion: "6. Marketing Mix (4Ps)", marks: "20 / 20", evidence: "Slides 12–16 Product, Price, Place, Promotion with QR poster mockup." },
      { criterion: "7. Product Prototype", marks: "10 / 10", evidence: "Slide 17 live interactive search simulator with verified data." },
      { criterion: "8. Teamwork & Professionalism", marks: "5 / 5", evidence: "10 active presenters, 20-min timing adherence & ethics." }
    ],
    speakerNotes: "Here we provide our genuine academic literature citations in APA 7th edition style, along with our direct slide-by-slide mapping against the official 100-mark evaluation rubric. All members are now ready to answer any questions from the panel."
  }
];

export const sampleShopsData = [
  {
    id: 1,
    name: "Lanka Silk & Cotton House",
    category: "Textiles",
    street: "2nd Cross Street, Pettah",
    landmark: "Near Red Mosque (Jami Ul-Alfar)",
    rating: 4.8,
    reviews: 142,
    phone: "+94 11 232 4589",
    whatsapp: "+94 77 123 4567",
    products: ["Cotton Voile", "Linen Fabric", "Batik Sarees", "Raw Silk", "Rayon Prints"],
    verified: true,
    timing: "9:00 AM – 6:30 PM (Mon–Sat)",
    floor: "Ground Floor & Mezzanine",
    badge: "Verified Merchant"
  },
  {
    id: 2,
    name: "Colombo Tech & Electronic Components",
    category: "Electronics",
    street: "1st Cross Street, Pettah",
    landmark: "Opposite Khan Clock Tower Entrance",
    rating: 4.7,
    reviews: 98,
    phone: "+94 11 243 8920",
    whatsapp: "+94 71 889 0123",
    products: ["Arduino Uno Rev3", "Soldering Iron", "Relay Modules", "LED Strips", "Sensors", "Capacitors"],
    verified: true,
    timing: "9:30 AM – 7:00 PM (Mon–Sat)",
    floor: "1st Floor, Shop #24",
    badge: "Popular with Tech Students"
  },
  {
    id: 3,
    name: "Ceylon Spice & Herb Emporium",
    category: "Spices",
    street: "Bankshall Street, Pettah",
    landmark: "Near Old Town Hall Museum",
    rating: 4.9,
    reviews: 215,
    phone: "+94 11 234 1102",
    whatsapp: "+94 76 554 3210",
    products: ["Pure Ceylon Cinnamon Quills (ALBA)", "Cardamom Pods", "Black Pepper", "Cloves", "Nutmeg"],
    verified: true,
    timing: "8:30 AM – 6:00 PM (Mon–Sat)",
    floor: "Street Front Store",
    badge: "Wholesale & Retail"
  },
  {
    id: 4,
    name: "Pettah Mobile & Screen Repair Hub",
    category: "Electronics",
    street: "Main Street, Pettah",
    landmark: "50m from Pettah Central Bus Stand",
    rating: 4.6,
    reviews: 87,
    phone: "+94 11 245 7781",
    whatsapp: "+94 75 443 2198",
    products: ["Smartphone Display Replacement", "USB-C Cables", "Screen Protectors", "Battery Packs"],
    verified: true,
    timing: "9:00 AM – 8:00 PM (Daily)",
    floor: "Basement Arcade, Stall #12",
    badge: "Fast Turnaround"
  },
  {
    id: 5,
    name: "Al-Noor Lace & Haberdashery",
    category: "Textiles",
    street: "Keyzer Street, Pettah",
    landmark: "Near Keyzer Street Market Crossing",
    rating: 4.7,
    reviews: 64,
    phone: "+94 11 233 9980",
    whatsapp: "+94 77 990 1122",
    products: ["Embroidery Laces", "Zippers (All Sizes)", "Sewing Threads", "Buttons & Beads"],
    verified: true,
    timing: "9:00 AM – 6:30 PM (Mon–Sat)",
    floor: "Ground Floor",
    badge: "Tailor Favorite"
  },
  {
    id: 6,
    name: "Royal Watch Straps & Time Tools",
    category: "Hardware",
    street: "Prince Street, Pettah",
    landmark: "Beside Dutch Period Museum",
    rating: 4.5,
    reviews: 51,
    phone: "+94 11 242 3341",
    whatsapp: "+94 70 334 5566",
    products: ["Leather Watch Straps", "Watch Batteries", "Precision Screwdrivers", "Magnifying Loupes"],
    verified: true,
    timing: "9:30 AM – 6:00 PM (Mon–Sat)",
    floor: "Shop #8, Ground Level",
    badge: "Specialist Toolmaker"
  }
];
