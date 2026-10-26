/* =====================================================================
   NAVY REUNION 2027 — SCRIPT
   =====================================================================

   HOW THIS FILE IS ORGANIZED
   --------------------------
   PART 1. SHARED_SHEETS: switch sign-ups from "this device only" to a
           shared Google Form + Google Sheet so everyone sees everyone.
   PART 2. DATA: every piece of text, date, link, and contact on the
           site. EDIT HERE to change wording. You never need to touch
           index.html to update the content.
   PART 3. SAMPLE_ENTRIES: the example families shown on the boards.
   PART 4+. The code that builds the page from DATA. You can leave
           this alone.

   EDITING TIPS
   ------------
   * Text goes inside quotes: 'like this'. If your text has an apostrophe
     (Jeremiah's), use straight double quotes around it instead:
     "Jeremiah's", or write it as Jeremiah\'s.
   * Every item in a list ends with a comma.
   * To link a place inside any sentence, write its short id in curly
     braces, like {willardBay} or {jeremiahs}. The site turns it into a
     link with the place's official name. The ids are the names on the
     left side in DATA.places and DATA.activities (for example hill,
     snowbasin, heberRailroad).
   * After editing, save and refresh the browser. If the page goes
     blank, you probably deleted a comma or a quote. Press F12 and look
     at the "Console" tab for the line number.
   ===================================================================== */


/* =====================================================================
   PART 1. SHARED SIGN-UPS (GOOGLE FORM + GOOGLE SHEET)
   =====================================================================

   RIGHT NOW (enabled: false) every form on the site (Who's Coming,
   Lake Day and Dinner headcounts, activity sign-ups, shirt sizes and
   the Room Finder) saves only in each visitor's own browser
   (localStorage). That's fine for a preview, but other people WON'T
   see your entries.

   TO MAKE THEM SHARED (about 30 minutes, free):

   1. Go to forms.google.com and make one Google Form per list, with
      short-answer questions in EXACTLY this order:
        "Who's Coming":           Family name, Generation 1, Generation 2,
                                  Generation 3, Entry ID
        "Lake Day Headcount":     Family name, Adults, Kids, Entry ID
        "Group Dinner Headcount": Family name, Adults, Kids, Entry ID
        "Activity Sign-Ups":      Family name, Adults, Kids, Activities,
                                  Day, Entry ID
        "Shirt Sizes":            Family name, Person, Adult or Youth, Size
        "Room Finder":            Family name, Room, Arrived, Entry ID
      Make all of them "Short answer" questions, even Activities. The
      site sends the activities as one line, for example
      "Hill Aerospace Museum, Barefoot Tubing".

      "Entry ID" is filled in automatically by the site (visitors never
      see it). It lets a family UPDATE their own entry by submitting
      again, without ever replacing another family's entry, even when
      two families share a last name or use the same phone.

   2. In each form: Responses tab → green Sheets icon → "Create a new
      spreadsheet".

   3. Get each question's "entry" number:
        Form ⋮ menu → "Get pre-filled link" → type anything in each box
        → "Get link" → paste the link somewhere. It looks like:
        ...viewform?entry.123456=Smith&entry.987654=2...
        Copy those entry.###### numbers into "fields" below, in order.

   4. formUrl: take the form's link, which ends in /viewform, and change
      the ending to /formResponse.

   5. csvUrl: in the Google Sheet: File → Share → Publish to web →
      pick the "Form Responses 1" tab and "Comma-separated values (.csv)"
      → Publish → copy that link here.

   6. Change enabled: false to enabled: true below. Save. Done!

   Note: Google refreshes published sheets about every 5 minutes, so a
   brand-new entry can take a few minutes to show up for other people.
   The person who submits it sees it right away.
   ===================================================================== */
const SHARED_SHEETS = {
  enabled: false,   // ← change to true once the URLs below are filled in

  rsvp: {
    formUrl: 'https://docs.google.com/forms/d/e/PASTE_RSVP_FORM_ID/formResponse',
    csvUrl:  'https://docs.google.com/spreadsheets/d/e/PASTE_RSVP_SHEET_ID/pub?output=csv',
    // Keep these in the same order as the questions in your form.
    fields: {
      family:  'entry.4000000001',
      gen1:    'entry.4000000002',
      gen2:    'entry.4000000003',
      gen3:    'entry.4000000004',
      entryId: 'entry.4000000005',
    },
  },

  lakeDay: {
    formUrl: 'https://docs.google.com/forms/d/e/PASTE_LAKE_FORM_ID/formResponse',
    csvUrl:  'https://docs.google.com/spreadsheets/d/e/PASTE_LAKE_SHEET_ID/pub?output=csv',
    fields: {
      family:  'entry.5000000001',
      adults:  'entry.5000000002',
      kids:    'entry.5000000003',
      entryId: 'entry.5000000004',
    },
  },

  dinner: {
    formUrl: 'https://docs.google.com/forms/d/e/PASTE_DINNER_FORM_ID/formResponse',
    csvUrl:  'https://docs.google.com/spreadsheets/d/e/PASTE_DINNER_SHEET_ID/pub?output=csv',
    fields: {
      family:  'entry.6000000001',
      adults:  'entry.6000000002',
      kids:    'entry.6000000003',
      entryId: 'entry.6000000004',
    },
  },

  signups: {
    formUrl: 'https://docs.google.com/forms/d/e/PASTE_SIGNUP_FORM_ID/formResponse',
    csvUrl:  'https://docs.google.com/spreadsheets/d/e/PASTE_SIGNUP_SHEET_ID/pub?output=csv',
    // Keep these in the same order as the questions in your form.
    fields: {
      family:     'entry.1000000001',
      adults:     'entry.1000000002',
      kids:       'entry.1000000003',
      activities: 'entry.1000000004',
      day:        'entry.1000000005',
      entryId:    'entry.1000000006',
    },
  },

  shirts: {
    formUrl: 'https://docs.google.com/forms/d/e/PASTE_SHIRT_FORM_ID/formResponse',
    csvUrl:  'https://docs.google.com/spreadsheets/d/e/PASTE_SHIRT_SHEET_ID/pub?output=csv',
    fields: {
      family: 'entry.2000000001',
      name:   'entry.2000000002',
      type:   'entry.2000000003',
      size:   'entry.2000000004',
    },
  },

  rooms: {
    formUrl: 'https://docs.google.com/forms/d/e/PASTE_ROOM_FORM_ID/formResponse',
    csvUrl:  'https://docs.google.com/spreadsheets/d/e/PASTE_ROOM_SHEET_ID/pub?output=csv',
    fields: {
      family:  'entry.3000000001',
      room:    'entry.3000000002',
      arrival: 'entry.3000000003',
      entryId: 'entry.3000000004',
    },
  },
};


/* =====================================================================
   PART 2. DATA: ALL THE CONTENT ON THE SITE
   ===================================================================== */
const DATA = {

  /* ---------- Event basics (hero banner at the top) ---------- */
  event: {
    heroTitle: 'Navy Reunion 2027 · Ogden, Utah',
    datesText: 'June 14–18, 2027',
    welcome:   'Welcome aboard, family! This year we gather in the shadow of the Wasatch Mountains to honor our Navy veterans, the service and sacrifice that brought us all together, and make new memories side by side.',
    // Countdown target: midnight Mountain Time on June 14, 2027.
    // (-06:00 means Utah summer time. Leave it as is.)
    countdownTo: '2027-06-14T00:00:00-06:00',
    endsOn:      '2027-06-19T00:00:00-06:00',
  },

  // Photo behind the hero banner (must be in the /images folder)
  heroImage: 'images/20261024_104046.jpg',

  /* ---------- Quick info cards under the hero ----------
     "href" is where the card jumps to (#id of a section). */
  quickCards: [
    { emoji: '📅', label: 'Dates',        detail: 'Mon–Fri, June 14–18, 2027',  href: '#schedule' },
    { emoji: '🏨', label: 'Hotel',        detail: 'Best Western Plus High Country Inn', href: '#hotel' },
    { emoji: '🚤', label: 'Lake Day',     detail: 'Wed 6/16 · Willard Bay',      href: '#day-wed' },
    { emoji: '🍽️', label: 'Group Dinner', detail: "Thu 6/17 · Jeremiah's",       href: '#day-thu' },
    { emoji: '👕', label: 'Shirt Sizes',  detail: 'Order deadline: TBD',         href: '#shirts' },
    { emoji: '📸', label: 'Photo Upload', detail: 'Share your pictures',         href: '#photos' },
  ],

  /* ---------- Who's Coming (reunion RSVP near the top) ----------
     One counter per generation. Change the labels or hints freely.
     To add a 4th generation: add { key: 'gen4', ... } here AND a
     "Generation 4" question + gen4 field in SHARED_SHEETS.rsvp. */
  whosComingIntro: 'Let us know who\'s coming! Enter how many people from your family are in each generation. Submit again any time to update your numbers.',
  generations: [
    { key: 'gen1', label: 'Generation 1', hint: 'Grandparents' },
    { key: 'gen2', label: 'Generation 2', hint: 'Their children & spouses' },
    { key: 'gen3', label: 'Generation 3', hint: 'Grandkids' },
  ],

  /* ---------- Hotel ---------- */
  hotel: {
    name: 'Best Western Plus High Country Inn',
    url: 'https://www.bestwestern.com/en_US/book/hotels-in-ogden/best-western-plus-high-country-inn/propertyCode.45050.html',
    address: '1335 W 12th St, Ogden, UT 84404',
    // Used as the starting point for every "Directions" button on the site:
    mapsAddress: 'Best Western Plus High Country Inn, 1335 W 12th St, Ogden, UT 84404',
    phone: '801-394-9474',
    directionsNote: 'Just off I-15 at the 12th Street exit',
    amenities: [
      'Free full hot breakfast every morning',
      'Heated indoor pool and hot tub',
      "{jeremiahs} right next door, sharing the hotel parking lot (our Thursday group dinner)",
      'Free parking, with room for large rigs like campers, RVs and trailers',
      'On-site dog park, so bring the pups',
    ],
    rateCode: 'TBD',
    bookBy:   'TBD',
    // Replace with the group-booking link from the hotel when you have it.
    // While it contains "REPLACE", the button shows "Booking link coming soon".
    bookingUrl: 'REPLACE_WITH_GROUP_BOOKING_LINK',
    homeBase: {
      title: 'Our Home Base: The Back Garden',
      text:  "We've reserved the hotel's back garden area as our family home base all week. Stop by any time to visit, and join us every evening around the fire.",
    },
  },

  /* ---------- Photo strips in the Hotel section and on Lake Day ----------
     To use a new photo: put it in the /images folder, then change "file"
     to its name (and update the alt text and caption). Tap = full size. */
  hotelPhotos: [
    { file: '20261023_171344.jpg', alt: 'Exterior of the Best Western Plus High Country Inn with stone pillars and a green lawn', caption: 'Best Western Plus High Country Inn' },
    { file: '20261023_171333.jpg', alt: 'Curving sidewalk through the hotel\'s landscaped back garden under a big cloudy sky', caption: 'The back garden: our home base' },
    { file: '20261024_102510.jpg', alt: 'Small cabin with Adirondack chairs, barrels and string lights beside a sandy area under a blue sky', caption: 'Garden gathering area' },
  ],
  lakeDayPhotos: [
    { file: '20261024_104116.jpg', alt: 'Covered Eagle Beach group pavilion with picnic tables at Willard Bay; a sign says by reservation only', caption: 'Eagle Beach group pavilion' },
    { file: '20261024_104404.jpg', alt: 'Covered picnic shelter with charcoal grills and tables at Willard Bay', caption: 'Picnic shelter with grills' },
    { file: '20261024_104743.jpg', alt: 'Calm, clear water lapping the sandy shoreline of Willard Bay with mountains far across the lake', caption: 'The beach at Willard Bay' },
  ],

  /* ---------- Places that aren't activity cards ----------
     name = what shows on the link, url = official website,
     maps = what Google Maps should search for (for Directions). */
  places: {
    hotel:          { name: 'Best Western Plus High Country Inn', url: 'https://www.bestwestern.com/en_US/book/hotels-in-ogden/best-western-plus-high-country-inn/propertyCode.45050.html', maps: 'Best Western Plus High Country Inn, 1335 W 12th St, Ogden, UT 84404' },
    jeremiahs:      { name: "Jeremiah's Restaurant", url: 'https://www.jeremiahsutah.com/' },  // no Directions button: it's a short walk across the parking lot
    clubRec:        { name: 'Club Rec', url: 'https://www.clubrecnorth.com/', maps: 'Club Rec, Willard Bay State Park, Willard, UT' },
    templeSquare:   { name: 'Temple Square', url: 'https://www.templesquare.org/', maps: 'Temple Square, Salt Lake City, UT' },
    cityCreek:      { name: 'City Creek Center', url: 'https://www.shopcitycreekcenter.com/', maps: 'City Creek Center, Salt Lake City, UT' },
    thanksgivingPt: { name: 'Thanksgiving Point', url: 'https://thanksgivingpoint.org/', maps: 'Thanksgiving Point, Lehi, UT' },
    recGov:         { name: 'Recreation.gov (cave tickets)', url: 'https://www.recreation.gov/search?q=Timpanogos%20Cave%20National%20Monument' },
    airport:        { name: 'Salt Lake City International Airport', url: 'https://www.slcairport.com/', maps: 'Salt Lake City International Airport, UT' },
    fishingLicense: { name: 'Utah Division of Wildlife Resources (fishing licenses)', url: 'https://wildlife.utah.gov/' },
    deerCreek:      { name: 'Deer Creek State Park', url: 'https://stateparks.utah.gov/parks/deer-creek/', maps: 'Deer Creek State Park, UT' },
    dinoPark:       { name: 'George S. Eccles Dinosaur Park', url: 'https://dinosaurpark.org/', maps: 'George S. Eccles Dinosaur Park, 1544 E Park Blvd, Ogden, UT 84401' },
  },

  /* ---------- Things that happen every day ---------- */
  everyDay: [
    { emoji: '🥐', text: '<strong>Every morning:</strong> free hot breakfast at the hotel' },
    { emoji: '🔥', text: '<strong>Every evening:</strong> fire in the back garden' },
  ],

  /* ---------- Day-by-day schedule ----------
     group: true gives the day a gold frame.
     lakeDayExtras: true shows the "What to bring" checklist. */
  schedule: [
    {
      id: 'day-mon', date: 'Monday, June 14', title: 'Arrivals & Welcome',
      items: [
        'Arrive and check in at the {hotel}. Then add your room number to the <a href="#rooms">Room Finder</a> so everyone can find you.',
        'Evening gathering in the back garden: hugs, catching up, and the first fire of the week.',
      ],
    },
    {
      id: 'day-tue', date: 'Tuesday, June 15', title: 'Open Day',
      items: [
        'Free day to explore. See the <a href="#activities">Optional Activities</a> and <a href="#day-plans">sample day plans</a>, and put your family on the <a href="#signups">sign-up board</a> so others can join you.',
        'Evening fire in the back garden.',
      ],
    },
    {
      id: 'day-wed', date: 'Wednesday, June 16', title: 'Group Lake Day at {willardBay}',
      group: true, flag: 'All Together',
      meta: ['🚗 ~20 min from the hotel', '🕚 Arrive about 11:00 AM', '📸 Group photos + shirts', '💲 Group meal: cost per person TBD'],
      items: [
        '<strong>Group photos and reunion shirts!</strong> We\'ll hand out this year\'s shirts at the lake, then take our group photos together.',
        '<strong>Group meal grilled at the lake.</strong> Cost per person: TBD.',
        'Things to do: rentals through {clubRec} (kayaks, canoes, pedal boats, pontoon boats, fishing boats, and water trampolines), fishing, swimming, and the beach.',
        '<strong>Good to know:</strong> Utah State Parks charges a day-use fee at Willard Bay; check the {willardBay} page for the current fee. Check with {clubRec} for rental prices and reservations.',
      ],
      buttons: ['willardBay', 'clubRec'],
      lakeDayExtras: true,
      headcount: { list: 'lakeDay', title: '🏖️ Who\'s coming to Lake Day?', note: 'Helps us plan the group meal. Submit again any time to update your numbers.' },
    },
    {
      id: 'day-thu', date: 'Thursday, June 17', title: "Open Day + Group Dinner at {jeremiahs}",
      group: true, flag: 'Group Dinner',
      meta: ['🍽️ Dinner time: TBD', '💲 Cost per person: TBD', '🚶 Right next door: shares the hotel parking lot'],
      items: [
        'Open day for activities (see the <a href="#activities">Optional Activities</a> and <a href="#day-plans">sample day plans</a>).',
        "Then we all meet for dinner at {jeremiahs}, the log-cabin-style restaurant that shares our hotel's parking lot, famous for its Utah scones with honey butter.",
        '<strong>Dinner details and cost per person: TBD.</strong> We\'re still figuring out how this dinner will look and will post updates here.',
        "We'll eat together, have a great time, and plan next year's reunion. Bring your ideas!",
        'Evening fire in the back garden.',
      ],
      buttons: ['jeremiahs'],
      headcount: { list: 'dinner', title: '🍽️ Who\'s coming to the Group Dinner?', note: 'Helps us reserve enough seats. Submit again any time to update your numbers.' },
    },
    {
      id: 'day-fri', date: 'Friday, June 18', title: 'Farewells',
      items: [
        'Breakfast together at the hotel.',
        'Goodbyes and safe travels home. Until next year!',
      ],
    },
  ],

  /* ---------- Lake Day extras ---------- */
  lakeDay: {
    whatToBring: [
      'Sunscreen',
      'Hats & sunglasses',
      'Towels',
      'Camp chairs',
      'Cooler with drinks',
      'Life jackets for little ones',
      'Utah fishing license if 12+ ({fishingLicense})',
      'Swimsuit & water shoes',
    ],
  },

  /* ---------- Optional activities ----------
     driveMin   = number of minutes (used for the filter and sorting)
     driveText  = what the badge says
     goodFor    = any of: 'kids', 'seniors', 'adventurous', 'veterans'
     maps       = what Google Maps searches for (for Directions)
     photo      = optional photo from /images for the card header
     extraLinks = ids from DATA.places to show as "Also see" links */
  activities: [
    {
      id: 'hill', emoji: '✈️', name: 'Hill Aerospace Museum',
      url: 'https://aerospaceutah.org/', maps: 'Hill Aerospace Museum, Roy, UT',
      driveMin: 15, driveText: '~15 min',
      desc: 'Free admission! Dozens of military aircraft, missiles and vehicles indoors and out. A must for our veterans and a hit with kids.',
      goodFor: ['veterans', 'seniors', 'kids'],
    },
    {
      id: 'twentyFifth', emoji: '🛍️', name: 'Historic 25th Street',
      url: 'https://visitogden.com/things-to-do/self-guided-tours/historic-25th-street', maps: 'Historic 25th Street, Ogden, UT',
      driveMin: 10, driveText: '~10 min',
      desc: 'Downtown Ogden\'s historic main street, lined with turn-of-the-century buildings full of local restaurants, boutique shops, art galleries and pubs. Easy walking and close to the hotel, so it\'s great for lunch, dinner or an evening stroll.',
      goodFor: ['seniors', 'kids'],
    },
    {
      id: 'willardBay', emoji: '🏖️', name: 'Willard Bay State Park',
      url: 'https://stateparks.utah.gov/parks/willard-bay/', maps: 'Willard Bay State Park, Willard, UT',
      driveMin: 20, driveText: '~20 min', photo: 'images/20261024_104743.jpg',
      desc: 'Our Wednesday Lake Day spot, and great for a second lake day too: beaches, boat rentals, fishing and picnic pavilions. State park day-use fee applies.',
      goodFor: ['kids', 'seniors'],
    },
    {
      id: 'barefoot', emoji: '🛟', name: 'Barefoot Tubing',
      url: 'https://www.barefoottubing.com/', maps: 'Barefoot Tubing, Morgan, UT',
      driveMin: 30, driveText: '~30 min',
      desc: 'Float the Weber River in Morgan, UT on big tubes. Reservations required; check their site for age and swimming requirements.',
      goodFor: ['adventurous', 'kids'],
    },
    {
      id: 'snowbasin', emoji: '🚡', name: 'Snowbasin Resort Gondola & Mini Golf',
      url: 'https://www.snowbasin.com/', maps: 'Snowbasin Resort, Huntsville, UT',
      driveMin: 35, driveText: '~35 min',
      desc: 'Ride the gondola to the top of the mountain for big views. Summit dining is only Sunday brunch and Thursday sunset dinner, so pack a picnic or eat before you go. Back at the base, play the 18-hole Wildflower Mini Golf course. Bring a jacket; it\'s cooler up top. Mini golf has been weekends-only in past summers, so check the schedule for your day.',
      goodFor: ['seniors', 'kids'],
    },
    {
      id: 'antelope', emoji: '🦬', name: 'Antelope Island State Park',
      url: 'https://stateparks.utah.gov/parks/antelope-island/', maps: 'Antelope Island State Park, Syracuse, UT',
      driveMin: 40, driveText: '~40 min',
      desc: 'Free-roaming bison, sandy beaches and sweeping Great Salt Lake views. Lots to see from the car, so it\'s easy for everyone. Day-use fee applies.',
      goodFor: ['kids', 'seniors'],
    },
    {
      id: 'slc', emoji: '🏙️', name: 'Salt Lake City',
      url: 'https://www.visitsaltlake.com/', maps: 'Temple Square, Salt Lake City, UT',
      driveMin: 40, driveText: '~40 min',
      desc: 'Stroll Temple Square\'s gardens, explore downtown, and shop or eat at City Creek Center with its creek running right through the mall.',
      goodFor: ['seniors', 'kids'],
      extraLinks: ['templeSquare', 'cityCreek'],
    },
    {
      id: 'olympic', emoji: '🥇', name: 'Utah Olympic Park',
      url: 'https://utaholympiclegacy.org/location/utah-olympic-park/', maps: 'Utah Olympic Park, Park City, UT',
      driveMin: 55, driveText: '~55 min', photo: 'images/20261024_134154.jpg',
      desc: 'Home of the 2002 Winter Games in Park City. Free Olympic museum, plus zip lines, an alpine slide and watching athletes train on the jumps.',
      goodFor: ['kids', 'adventurous', 'seniors'],
    },
    {
      id: 'heberRailroad', emoji: '🚂', name: 'Heber Valley Railroad',
      url: 'https://www.hebervalleyrailroad.org/', maps: 'Heber Valley Railroad, Heber City, UT',
      driveMin: 70, driveText: '~1 hr 10 min',
      desc: 'Historic train rides through the beautiful Heber Valley and Provo Canyon. Relaxing and scenic for every age.',
      goodFor: ['seniors', 'kids'],
    },
    {
      id: 'atv', emoji: '🏍️', name: 'ATV / Side-by-Side Rides',
      url: 'https://loftypeaks.com/', maps: 'Lofty Peaks Adventures, 845 S Main St, Heber City, UT 84032',
      driveMin: 70, driveText: '~1 hr 10 min',
      desc: 'Rent ATVs or side-by-sides and hit the mountain trails near Heber City. Website shown is one local outfitter (Lofty Peaks Adventures); compare a few before booking.',
      goodFor: ['adventurous'],
    },
    {
      id: 'zipline', emoji: '🪂', name: 'Zipline Utah',
      url: 'https://www.ziplineutah.com/', maps: 'Zipline Utah, Deer Creek State Park, UT',
      driveMin: 80, driveText: '~1 hr 20 min', photo: 'images/20261024_171135.jpg',
      desc: 'A huge zip line over Rainbow Bay at {deerCreek}, said to be one of the longest over water. Near Heber, so it pairs well with the railroad or ATVs.',
      goodFor: ['adventurous'],
      extraLinks: ['deerCreek'],
    },
    {
      id: 'crater', emoji: '♨️', name: 'The Homestead Crater',
      url: 'https://www.utahcrater.com/', maps: 'Homestead Crater, 700 N Homestead Dr, Midway, UT 84049',
      driveMin: 70, driveText: '~1 hr 10 min',
      desc: 'Swim, soak or snorkel in warm (90–96°F) mineral water inside a 55-foot beehive-shaped limestone dome at the Homestead Resort in Midway, right next to Heber. Reservations required for every session.',
      goodFor: ['kids', 'seniors', 'adventurous'],
    },
    {
      id: 'timpanogos', emoji: '🦇', name: 'Timpanogos Cave National Monument',
      url: 'https://www.nps.gov/tica/', maps: 'Timpanogos Cave National Monument, American Fork, UT',
      driveMin: 75, driveText: '~1 hr 15 min',
      desc: 'Stunning caves in American Fork Canyon, near Thanksgiving Point. Timed tickets via Recreation.gov. Steep 1.5-mile paved hike up to the cave, so it\'s best for strong walkers.',
      goodFor: ['adventurous', 'kids'],
      extraLinks: ['recGov', 'thanksgivingPt'],
    },
  ],

  driveNote: 'Drive times are approximate and depend on traffic. Hours/prices: confirm before you go.',

  /* ---------- Sample day plans for the open days (Tue & Thu) ----------
     Each plan is a card. Add, remove or reorder plans freely.
     "steps" are the parts of the day; {ids} become links. */
  dayPlansIntro: 'Here are some ready-made plans for the open days. Mix and match, or just relax at the hotel. Everyone meets back at the fire in the evening.',
  dayPlans: [
    {
      emoji: '🏠', title: 'Easy Day Close to Home', drive: 'Nothing more than ~20 min away',
      goodFor: ['seniors', 'kids', 'veterans'],
      steps: [
        { when: 'Morning',   what: 'Tour the {hill}. It\'s free, and our veterans will love it. Plan on about 2 hours.' },
        { when: 'Lunch',     what: 'Eat and browse the shops on {twentyFifth} in downtown Ogden.' },
        { when: 'Afternoon', what: 'Take the grandkids to {dinoPark} (~15 min), or rest at the hotel\'s indoor pool and hot tub.' },
      ],
    },
    {
      emoji: '🏔️', title: 'Mountain Day', drive: '~35 min each way',
      goodFor: ['seniors', 'kids'],
      steps: [
        { when: 'Morning',   what: 'Ride the gondola at {snowbasin} to the top for big mountain views.' },
        { when: 'Lunch',     what: 'Pack a picnic to enjoy with the mountain views. The summit lodge doesn\'t serve lunch on our open days.' },
        { when: 'Afternoon', what: 'Play mini golf at the base (check it\'s open that day), then take your time on the scenic drive back.' },
      ],
    },
    {
      emoji: '🚂', title: 'Heber Day', drive: '~1 hr 10 min each way',
      goodFor: ['seniors', 'kids', 'adventurous'],
      steps: [
        { when: 'Morning',   what: 'Ride the {heberRailroad} through the valley.' },
        { when: 'Lunch',     what: 'Grab lunch in Heber City.' },
        { when: 'Afternoon', what: 'Thrill-seekers can fly over Rainbow Bay with {zipline} or hit the trails on {atv}. Want something calmer? Take a warm swim at {crater} in Midway, just next door (reserve ahead).' },
      ],
    },
    {
      emoji: '🦬', title: 'Island & City Day', drive: '~40 min to each stop',
      goodFor: ['seniors', 'kids'],
      steps: [
        { when: 'Morning',   what: 'Drive the causeway to {antelope} to see bison and Great Salt Lake views.' },
        { when: 'Lunch',     what: 'Eat downtown at {cityCreek}.' },
        { when: 'Afternoon', what: 'Stroll the gardens at {templeSquare} and explore downtown {slc}.' },
      ],
    },
    {
      emoji: '🛟', title: 'Adventure Day', drive: '~30 min out, ~55 min back',
      goodFor: ['adventurous', 'kids'],
      steps: [
        { when: 'Morning',   what: 'Float the Weber River with {barefoot} (reservations required).' },
        { when: 'Lunch',     what: 'Picnic or grab a bite in Morgan or Park City.' },
        { when: 'Afternoon', what: 'Zip lines, the alpine slide and the Olympic museum at {olympic}.' },
      ],
    },
    {
      emoji: '🦇', title: 'Cave & Gardens Day', drive: '~1 hr 15 min each way',
      goodFor: ['adventurous', 'kids'],
      steps: [
        { when: 'Morning',   what: 'Hike up to {timpanogos}. Book timed tickets early on {recGov}.' },
        { when: 'Lunch',     what: 'Head down the canyon to {thanksgivingPt}.' },
        { when: 'Afternoon', what: 'Explore the gardens and museums at Thanksgiving Point, then head home.' },
      ],
    },
  ],

  /* ---------- Shirts ---------- */
  shirtIntro: 'Every year we make matching reunion shirts. They\'re how we spot each other across the lake, and they show up in every group photo! Add each person in your family and their size so we can place one order for everybody. Shirts will be handed out at Lake Day (Wednesday 6/16) at Willard Bay, where we\'ll take our group photos.',
  shirtDeadline: 'TBD',

  /* ---------- Room Finder: choices for "Arrived" ---------- */
  roomArrivalDays: ['Sun 6/13', 'Mon 6/14', 'Tue 6/15', 'Wed 6/16', 'Thu 6/17'],
  roomArrivalDefault: 'Mon 6/14',
  // Room Finder is hidden until closer to the reunion. Change to true to open it.
  roomFinderOpen: false,
  roomFinderClosedText: '🔑 The Room Finder opens closer to the reunion. Once you\'ve checked in, you\'ll post your room number here so everyone can find you.',
  shirtSizes: {
    Youth: ['XS', 'S', 'M', 'L', 'XL'],
    Adult: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
  },

  /* ---------- Photo albums ----------
     HOW TO SET THESE UP (Google Photos shared albums):
       1. Open photos.google.com (or the Google Photos app).
       2. Create an album (e.g. "Ogden 2027") → tap Share.
       3. Turn ON "Collaborate" (also called "Let others add photos")
          and "Link sharing".
       4. Tap "Copy link" and paste it as the url below.
     Anyone with the link can then view AND add photos.
     While a url contains "REPLACE", the button says "Link coming soon". */
  albums: [
    { emoji: '⚓', name: 'Navy Days',     desc: 'Old photos of our Navy guys',  url: 'https://photos.app.goo.gl/REPLACE_WITH_NAVY_DAYS_LINK' },
    { emoji: '📖', name: 'Past Reunions', desc: 'Memories from years gone by',  url: 'https://photos.app.goo.gl/REPLACE_WITH_PAST_REUNIONS_LINK' },
    { emoji: '🏔️', name: 'Ogden 2027',    desc: 'New photos from this trip',    url: 'https://photos.app.goo.gl/REPLACE_WITH_OGDEN_2027_LINK' },
  ],

  uploadSteps: [
    'Tap one of the album buttons above (for this trip, tap <strong>Ogden 2027</strong>).',
    'It opens in Google Photos. If it asks, sign in with a Google (Gmail) account. It\'s free, and you only do this once.',
    'Tap <strong>Join</strong> if you see it.',
    'Tap the <strong>Add photos</strong> button (a little picture with a + sign) at the top or bottom of the screen.',
    'Tap each photo you want to share so it gets a check mark, then tap <strong>Add</strong> (or <strong>Done</strong>).',
    'That\'s it! Everyone with the link can now see your pictures. Stuck? Text your photos to Rebecca or Athena and they\'ll add them.',
  ],

  /* ---------- Scouting-trip gallery (files in /images) ---------- */
  gallery: [
    { file: '20261023_171333.jpg', alt: 'Curving sidewalk through the hotel\'s landscaped back garden under a big cloudy sky', caption: 'The hotel\'s back garden: our home base' },
    { file: '20261023_171336.jpg', alt: 'Family member taking photos on a garden path, with mountains in the distance', caption: 'Scouting the garden paths' },
    { file: '20261023_171342.jpg', alt: 'Rustic lodge-style building with a stone chimney across a green lawn at the hotel', caption: 'Lodge building on the hotel grounds' },
    { file: '20261023_171344.jpg', alt: 'Exterior of the Best Western Plus High Country Inn with stone pillars and a green lawn', caption: 'Best Western Plus High Country Inn' },
    { file: '20261024_093520.jpg', alt: 'Banquet room set with round tables and white tablecloths', caption: 'Banquet room' },
    { file: '20261024_102510.jpg', alt: 'Small wooden cabin with Adirondack chairs, barrels and string lights beside a sandy area under a blue sky', caption: 'Cozy seating with string lights' },
    { file: '20261024_104116.jpg', alt: 'Covered Eagle Beach group pavilion with picnic tables at Willard Bay; a sign says by reservation only', caption: 'Eagle Beach group pavilion, Willard Bay' },
    { file: '20261024_104133.jpg', alt: 'Eagle Beach rules sign: life jackets required for everyone 12 and under, no glass, no ground fires, pets on leash', caption: 'Eagle Beach rules' },
    { file: '20261024_104146.jpg', alt: 'Restroom building near the beach at Willard Bay with trees and the lake behind it', caption: 'Restrooms near the beach' },
    { file: '20261024_104404.jpg', alt: 'Covered picnic shelter with charcoal grills and tables at Willard Bay', caption: 'Picnic shelter with grills' },
    { file: '20261024_104422.jpg', alt: 'Two charcoal grills on a concrete pad under cottonwood trees at Willard Bay', caption: 'Grills for our Lake Day cookout' },
    { file: '20261024_104743.jpg', alt: 'Calm, clear water lapping the sandy shoreline of Willard Bay with mountains far across the lake', caption: 'The water at Willard Bay' },
    { file: '20261024_134120.jpg', alt: 'Bobsled on display on a concrete walkway outside a glass building at Utah Olympic Park', caption: 'Utah Olympic Park' },
    { file: '20261024_134154.jpg', alt: 'Freestyle aerial ski-jump ramps above a splash pool at Utah Olympic Park', caption: 'Olympic training jumps and splash pool' },
    { file: '20261024_171132.jpg', alt: 'Sagebrush-covered hills at sunset near Deer Creek State Park', caption: 'Hills near Deer Creek' },
    { file: '20261024_171135.jpg', alt: 'Tall wooden Zipline Utah tower and ropes course with a white shuttle van parked in front', caption: 'Zipline Utah at Deer Creek' },
    { file: '20261024_171437.jpg', alt: 'Zipline Utah price board seen through a window, listing 1-hour, 2-hour and day options', caption: 'Zipline Utah prices (fall 2026)' },
    { file: '20261024_171441.jpg', alt: 'Zipline Utah price board listing the Big Line, Aerial Park and Out \'N Back', caption: 'Zipline Utah options' },
    { file: '20261024_171619.jpg', alt: 'Rainbow Bay pavilion rules sign: reservations at the Aqua Shack, clean up after use, no alcohol or glass', caption: 'Rainbow Bay pavilion rules' },
  ],

  /* ---------- Organizers ---------- */
  contacts: [
    { name: 'Athena Talmadge', email: 'Theena95@gmail.com',          phone: '415-917-0144' },
    { name: 'Rebecca Thomas',  email: 'rebeccagthomas13@gmail.com',  phone: '507-323-5742' },
  ],

  /* ---------- FAQ (the "All Links" list is added automatically at the end) ---------- */
  faq: [
    {
      q: 'What\'s the nearest airport?',
      a: '{airport} (SLC) is about 40 minutes south of the hotel. Renting a car is the easiest way to get around, since most activities are a drive away.',
    },
    {
      q: 'What should I pack for June in Utah?',
      a: '<ul><li><strong>Warm days:</strong> usually 80s°F in Ogden, sunny and dry.</li><li><strong>Cool evenings:</strong> it can drop into the 50s, and it\'s colder in the mountains (Snowbasin, Park City). Bring layers and a light jacket for the evening fire.</li><li><strong>Sun protection:</strong> sunscreen, hats and sunglasses. The sun is strong at this altitude.</li><li><strong>Water bottle:</strong> it\'s a dry climate, so drink more than you think.</li><li>Swimsuit for the pool and lake, and comfy walking shoes.</li></ul>',
    },
    {
      q: 'Do I have to do every activity?',
      a: 'Not at all! Lake Day (Wed) and the Group Dinner (Thu) are our two all-together events. Everything else is optional. Do as much or as little as you like, and the back garden fire is always there to come home to.',
    },
    {
      q: 'Who do I call with questions?',
      a: 'Call or text Athena or Rebecca (see the <a href="#contacts">Organizers</a> above).',
    },
  ],
};


/* =====================================================================
   PART 3. SAMPLE ENTRIES
   These example families fill the boards so the preview looks real.
   They only appear in "this device only" mode (SHARED_SHEETS.enabled
   = false). Delete them or edit them as you like.
   ===================================================================== */
const SAMPLE_ENTRIES = {
  signups: [
    { family: 'The Miller Family',  adults: 2, kids: 2, activities: ['hill', 'snowbasin', 'heberRailroad'], day: 'Tue 6/15', sample: true },
    { family: 'The Garcia Family',  adults: 2, kids: 3, activities: ['barefoot', 'olympic', 'willardBay'],   day: 'Tue 6/15', sample: true },
    { family: 'The Johnson Family', adults: 4, kids: 0, activities: ['hill', 'heberRailroad', 'zipline'],    day: 'Thu 6/17', sample: true },
    { family: 'The Brooks Family',  adults: 2, kids: 1, activities: ['antelope', 'slc', 'hill'],             day: 'Either day', sample: true },
  ],
  shirts: [
    { family: 'The Miller Family',  name: 'Dave',   type: 'Adult', size: 'XL', sample: true },
    { family: 'The Miller Family',  name: 'Karen',  type: 'Adult', size: 'M',  sample: true },
    { family: 'The Miller Family',  name: 'Emma',   type: 'Youth', size: 'M',  sample: true },
    { family: 'The Miller Family',  name: 'Jack',   type: 'Youth', size: 'S',  sample: true },
    { family: 'The Garcia Family',  name: 'Luis',   type: 'Adult', size: '2XL', sample: true },
    { family: 'The Garcia Family',  name: 'Ana',    type: 'Adult', size: 'S',  sample: true },
    { family: 'The Garcia Family',  name: 'Sofia',  type: 'Youth', size: 'L',  sample: true },
    { family: 'The Johnson Family', name: 'Grandpa Ray', type: 'Adult', size: 'L', sample: true },
  ],
  rooms: [
    { family: 'The Miller Family',  room: '112', arrival: 'Mon 6/14', sample: true },
    { family: 'The Garcia Family',  room: '118', arrival: 'Mon 6/14', sample: true },
    { family: 'The Johnson Family', room: '204', arrival: 'Sun 6/13', sample: true },
  ],
  rsvp: [
    { family: 'The Miller Family',  gen1: 0, gen2: 2, gen3: 2, sample: true },
    { family: 'The Garcia Family',  gen1: 0, gen2: 2, gen3: 3, sample: true },
    { family: 'The Johnson Family', gen1: 2, gen2: 2, gen3: 0, sample: true },
    { family: 'The Brooks Family',  gen1: 0, gen2: 2, gen3: 1, sample: true },
  ],
  lakeDay: [
    { family: 'The Miller Family',  adults: 2, kids: 2, sample: true },
    { family: 'The Johnson Family', adults: 4, kids: 0, sample: true },
  ],
  dinner: [
    { family: 'The Miller Family',  adults: 2, kids: 2, sample: true },
    { family: 'The Garcia Family',  adults: 2, kids: 3, sample: true },
    { family: 'The Johnson Family', adults: 4, kids: 0, sample: true },
  ],
};


/* =====================================================================
   PART 4. HELPER FUNCTIONS
   (Everything below builds the page. No need to edit.)
   ===================================================================== */

// Shortcut for finding one element on the page
const $ = (selector) => document.querySelector(selector);

// Makes text typed by visitors safe to show on the page
function esc(text) {
  return String(text ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// True if a URL is still a placeholder (contains "REPLACE")
const isPlaceholder = (url) => !url || url.includes('REPLACE');

// Look up a place or activity by its id
function findPlace(id) {
  return DATA.places[id] || DATA.activities.find((a) => a.id === id);
}

// A link that opens in a new tab
function extLink(name, url) {
  return `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(name)}</a>`;
}

// Turns {placeId} inside text into a link to that place's website
function linkify(text) {
  return String(text).replace(/\{(\w+)\}/g, (match, id) => {
    const place = findPlace(id);
    return place ? extLink(place.name, place.url) : match;
  });
}

// Google Maps directions FROM the hotel TO a destination
function directionsUrl(destination) {
  return 'https://www.google.com/maps/dir/?api=1'
    + '&origin=' + encodeURIComponent(DATA.hotel.mapsAddress)
    + '&destination=' + encodeURIComponent(destination)
    + '&travelmode=driving';
}

// Google Maps search for one place
function mapUrl(query) {
  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query);
}

// Standard "Website" and "Directions" buttons for a place
function placeButtons(place, { websiteLabel = 'Website' } = {}) {
  let html = `<a class="btn btn-outline" href="${esc(place.url)}" target="_blank" rel="noopener">🌐 ${esc(websiteLabel)}</a>`;
  if (place.maps) {
    html += `<a class="btn btn-navy" href="${esc(directionsUrl(place.maps))}" target="_blank" rel="noopener">🧭 Directions</a>`;
  }
  return html;
}

// Turns "415-917-0144" into "+14159170144" for tap-to-call links
const telHref = (phone) => '+1' + phone.replace(/\D/g, '');

// Puts "1 kid" vs "2 kids" correctly
const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;


/* =====================================================================
   PART 5. SAVING & LOADING ENTRIES
   Saves to this browser (localStorage) OR to Google Sheets, depending
   on SHARED_SHEETS.enabled.
   ===================================================================== */
const STORAGE_PREFIX = 'navyReunion2027.';
const lists = { rsvp: [], lakeDay: [], dinner: [], signups: [], shirts: [], rooms: [] };

// Lists where submitting again UPDATES your earlier entry instead of
// adding a second one. (Shirts add people, so they're not on this list.)
const UPDATE_LISTS = ['rsvp', 'lakeDay', 'dinner', 'signups', 'rooms'];

// Fields that hold numbers (everything else is text)
const NUMBER_FIELDS = ['adults', 'kids', 'gen1', 'gen2', 'gen3', 'gen4', 'gen5'];

/* HOW "UPDATE MY ENTRY" WORKS WITHOUT OVERWRITING ANYONE ELSE
   Each phone/computer gets a random secret code the first time it uses
   the site. An entry's ID = that code + the family name. Submitting
   again from the same device with the same family name replaces that
   entry. Another family can't produce the same ID, even with the same
   last name or on the same shared tablet, because either the device
   code or the family name will differ. Worst case (same family, two
   different phones) you get two entries, and an organizer can delete
   the extra row in the Google Sheet. */
function deviceCode() {
  let code = readLocal('deviceCode');
  if (!code) {
    code = Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
    writeLocal('deviceCode', code);
  }
  return code;
}
const entryIdFor = (family) => deviceCode() + ':' + family.trim().toLowerCase().replace(/\s+/g, ' ');

// Keeps only the LAST entry for each entry ID (entries without one are all kept)
function keepLatest(records) {
  const lastIndex = new Map();
  records.forEach((r, i) => { if (r.entryId) lastIndex.set(r.entryId, i); });
  return records.filter((r, i) => !r.entryId || lastIndex.get(r.entryId) === i);
}

function readLocal(name) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + name);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null; // private browsing or storage blocked: just use samples
  }
}

function writeLocal(name, value) {
  try { localStorage.setItem(STORAGE_PREFIX + name, JSON.stringify(value)); } catch (e) { /* ignore */ }
}

// Simple CSV reader (handles quoted cells with commas inside)
function parseCsv(text) {
  const rows = [];
  let row = [], cell = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') inQuotes = false;
      else cell += ch;
    } else if (ch === '"') inQuotes = true;
    else if (ch === ',') { row.push(cell); cell = ''; }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); rows.push(row); row = []; cell = '';
    } else cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

// Converts one spreadsheet row into the same shape the site uses locally.
// Column A is Google's timestamp; the rest follow the "fields" order.
function rowToRecord(name, row) {
  const keys = Object.keys(SHARED_SHEETS[name].fields);
  const record = {};
  keys.forEach((key, i) => {
    const value = (row[i + 1] || '').trim();
    record[key] = NUMBER_FIELDS.includes(key) ? (parseInt(value, 10) || 0) : value;
  });
  if (name === 'signups') {
    // Activity names → ids
    record.activities = record.activities.split(',')
      .map((n) => DATA.activities.find((a) => a.name.toLowerCase() === n.trim().toLowerCase()))
      .filter(Boolean).map((a) => a.id);
  }
  return record;
}

async function loadList(name) {
  if (SHARED_SHEETS.enabled) {
    try {
      const response = await fetch(SHARED_SHEETS[name].csvUrl, { cache: 'no-store' });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      const rows = parseCsv(await response.text()).slice(1); // skip header row
      lists[name] = keepLatest(rows.filter((r) => r.some((c) => c.trim())).map((r) => rowToRecord(name, r)));
      return;
    } catch (err) {
      console.warn(`Could not load the shared "${name}" sheet. Check csvUrl in SHARED_SHEETS.`, err);
      lists[name] = [];
      return;
    }
  }
  const saved = readLocal(name);
  lists[name] = saved || SAMPLE_ENTRIES[name].map((r) => ({ ...r }));
  if (!saved) writeLocal(name, lists[name]);
}

// Sends one record to the Google Form
async function postToForm(name, record) {
  const config = SHARED_SHEETS[name];
  const body = new URLSearchParams();
  Object.entries(config.fields).forEach(([key, entryId]) => {
    let value = record[key];
    if (key === 'activities') value = value.map((id) => findPlace(id).name).join(', ');
    body.append(entryId, value);
  });
  // "no-cors" is how Google Forms accepts posts from other websites.
  // We can't read the reply, but the entry is saved.
  await fetch(config.formUrl, { method: 'POST', mode: 'no-cors', body });
}

// Saves new entries. Returns true if it UPDATED an earlier entry.
async function addRecords(name, records) {
  let updated = false;
  if (UPDATE_LISTS.includes(name)) {
    records.forEach((r) => { r.entryId = entryIdFor(r.family); });
    const ids = new Set(records.map((r) => r.entryId));
    const before = lists[name].length;
    lists[name] = lists[name].filter((r) => !ids.has(r.entryId));
    updated = lists[name].length < before;
  }
  if (SHARED_SHEETS.enabled) {
    for (const record of records) await postToForm(name, record);
  }
  lists[name].push(...records);
  if (!SHARED_SHEETS.enabled) writeLocal(name, lists[name]);
  return updated;
}

function resetToSamples(name) {
  lists[name] = SAMPLE_ENTRIES[name].map((r) => ({ ...r }));
  writeLocal(name, lists[name]);
}

const sampleTag = (r) => (r.sample ? '<span class="sample-tag">sample</span>' : '');


/* =====================================================================
   PART 6. BUILDING EACH SECTION
   ===================================================================== */

// Simple text slots marked data-fill="..." in index.html
function renderFills() {
  const fills = {
    heroTitle: DATA.event.heroTitle,
    datesText: DATA.event.datesText,
    welcome: DATA.event.welcome,
    driveNote: DATA.driveNote,
    shirtIntro: DATA.shirtIntro,
    shirtDeadline: DATA.shirtDeadline,
  };
  document.querySelectorAll('[data-fill]').forEach((el) => {
    const value = fills[el.dataset.fill];
    if (value !== undefined) el.textContent = value;
  });

  // Hero photo
  $('#hero-bg').style.setProperty('--hero-img', `url("${DATA.heroImage}")`);

  // "Sample mode" vs "shared" notes above the forms
  const banner = SHARED_SHEETS.enabled
    ? '✅ Everyone sees these entries. New ones can take a few minutes to show up for others.'
    : 'ℹ️ Preview mode: entries are saved on this device only. Examples marked "sample" are made up.';
  document.querySelectorAll('[data-mode-banner]').forEach((el) => { el.textContent = banner; });

  // Show the "reset to sample" buttons only in preview mode
  document.querySelectorAll('[data-reset]').forEach((btn) => { btn.hidden = SHARED_SHEETS.enabled; });
}

// 2. Quick info cards
function renderQuickCards() {
  $('#quick-cards').innerHTML = DATA.quickCards.map((c) => `
    <a class="quick-card" href="${esc(c.href)}">
      <span class="quick-emoji" aria-hidden="true">${c.emoji}</span>
      <span class="quick-label">${esc(c.label)}</span>
      <span class="quick-detail">${esc(c.detail)}</span>
    </a>`).join('');
}

// 3. Hotel
function renderHotel() {
  const h = DATA.hotel;
  const bookBtn = isPlaceholder(h.bookingUrl)
    ? `<span class="btn btn-gold btn-lg" aria-disabled="true">Book Your Room</span><p style="margin:10px 0 0">Booking link coming soon.</p>`
    : `<a class="btn btn-gold btn-lg" href="${esc(h.bookingUrl)}" target="_blank" rel="noopener">Book Your Room</a>`;

  $('#hotel-content').innerHTML = `
    <div class="hotel-grid">
      <div class="card">
        <h3 class="hotel-name">${extLink(h.name, h.url)}</h3>
        <p class="hotel-address">${esc(h.address)}</p>
        <p class="hotel-sub">${esc(h.directionsNote)}</p>
        <ul class="check-list">${h.amenities.map((a) => `<li>${linkify(a)}</li>`).join('')}</ul>
        <div class="btn-row">
          <a class="btn btn-outline" href="${esc(h.url)}" target="_blank" rel="noopener">🌐 Website</a>
          <a class="btn btn-navy" href="${esc(mapUrl(h.mapsAddress))}" target="_blank" rel="noopener">🗺️ Map</a>
          <a class="btn btn-outline" href="tel:${telHref(h.phone)}">📞 ${esc(h.phone)}</a>
        </div>
      </div>
      <div class="rate-box">
        <h3>Group Room Block</h3>
        <dl>
          <dt>Group rate code:</dt><dd>${esc(h.rateCode)}</dd>
          <dt>Book by:</dt><dd>${esc(h.bookBy)}</dd>
        </dl>
        ${bookBtn}
      </div>
    </div>
    <div class="home-base">
      <span class="fire" aria-hidden="true">🔥</span>
      <div>
        <h3>${esc(h.homeBase.title)}</h3>
        <p>${esc(h.homeBase.text)}</p>
      </div>
    </div>
    ${photoStrip('hotel')}`;
}

// Photo lists by name (used by the photo strips and the full-size viewer)
function photoSet(name) {
  return { gallery: DATA.gallery, hotel: DATA.hotelPhotos, lakeDay: DATA.lakeDayPhotos }[name] || [];
}

// A row of tappable photos
function photoStrip(name) {
  return `<div class="photo-strip">${photoSet(name).map((p, i) => `
    <button type="button" class="gallery-item" data-set="${name}" data-index="${i}" aria-label="Enlarge photo: ${esc(p.caption)}">
      <img src="images/${esc(p.file)}" alt="${esc(p.alt)}" loading="lazy" width="400" height="300">
      <span class="photo-caption">${esc(p.caption)}</span>
    </button>`).join('')}</div>`;
}

// 4. Schedule timeline
function renderSchedule() {
  $('#every-day').innerHTML = DATA.everyDay
    .map((d) => `<span><span aria-hidden="true">${d.emoji}</span> ${d.text}</span>`).join('');

  $('#timeline').innerHTML = DATA.schedule.map((day) => {
    const meta = day.meta ? `<div class="day-meta">${day.meta.map((m) => `<span>${esc(m)}</span>`).join('')}</div>` : '';
    const flag = day.flag ? `<span class="group-flag">${esc(day.flag)}</span>` : '';
    const buttons = day.buttons ? `<div class="btn-row">${day.buttons.map((id) => {
      const p = findPlace(id);
      return placeButtons(p, { websiteLabel: p.name });
    }).join('')}</div>` : '';
    let extras = day.lakeDayExtras ? photoStrip('lakeDay') + lakeDayExtrasHtml() : '';
    if (day.headcount) extras += `<div class="headcount" data-headcount="${esc(day.headcount.list)}"></div>`;
    return `
      <li class="timeline-item" id="${esc(day.id)}">
        <span class="timeline-dot" aria-hidden="true"><svg class="icon"><use href="${day.group ? '#icon-star' : '#icon-anchor'}"></use></svg></span>
        <article class="card day-card${day.group ? ' is-group' : ''}">
          <span class="day-date">${esc(day.date)}</span>${flag}
          <h3 class="day-title">${linkify(day.title)}</h3>
          ${meta}
          <ul>${day.items.map((item) => `<li>${linkify(item)}</li>`).join('')}</ul>
          ${buttons}
          ${extras}
        </article>
      </li>`;
  }).join('');

  if ($('#bring-list')) setupBringList();
}

function lakeDayExtrasHtml() {
  const L = DATA.lakeDay;
  return `
    <div class="day-extras">
      <div class="extra-box">
        <h4>🎒 What to bring</h4>
        <p style="margin:0 0 6px;font-size:1rem;color:var(--ink-soft)">Tap to check things off (saved on your phone).</p>
        <ul class="bring-list" id="bring-list">
          ${L.whatToBring.map((item, i) => `
            <li><label><input type="checkbox" data-bring="${i}"><span>${linkify(item)}</span></label></li>`).join('')}
        </ul>
      </div>
    </div>`;
}

// "What to bring" checkboxes remember their state on this device
function setupBringList() {
  const saved = readLocal('bringList') || {};
  document.querySelectorAll('[data-bring]').forEach((box) => {
    box.checked = !!saved[box.dataset.bring];
    box.addEventListener('change', () => {
      saved[box.dataset.bring] = box.checked;
      writeLocal('bringList', saved);
    });
  });
}

// 5. Activities (with filter + sort)
const activityView = { filter: 'all', sort: 'near' };

function renderActivities() {
  const { filter, sort } = activityView;
  let items = DATA.activities.filter((a) => {
    if (filter === 'under30') return a.driveMin < 30;
    if (filter === '30to60') return a.driveMin >= 30 && a.driveMin < 60;
    if (filter === 'over60') return a.driveMin >= 60;
    return true;
  });
  items = [...items].sort((a, b) => {
    if (sort === 'far') return b.driveMin - a.driveMin;
    if (sort === 'az') return a.name.localeCompare(b.name);
    return a.driveMin - b.driveMin;
  });

  const tagLabels = { kids: 'Kids', seniors: 'Seniors', adventurous: 'Adventurous', veterans: 'Veterans' };

  $('#activity-grid').innerHTML = items.map((a) => {
    const headStyle = a.photo ? ` style="background-image:url('${esc(a.photo)}')"` : '';
    const extra = a.extraLinks
      ? `<p class="extra-links">Also see: ${a.extraLinks.map((id) => { const p = findPlace(id); return extLink(p.name, p.url); }).join(' · ')}</p>`
      : '';
    return `
      <article class="activity-card">
        <div class="activity-head${a.photo ? ' has-photo' : ''}"${headStyle}><span aria-hidden="true">${a.emoji}</span></div>
        <div class="activity-body">
          <h3>${extLink(a.name, a.url)}</h3>
          <span class="drive-badge">🚗 Drive from hotel: ${esc(a.driveText)}</span>
          <p>${linkify(a.desc)}</p>
          <ul class="tags" aria-label="Good for">
            <li class="tags-label">Good for:</li>
            ${a.goodFor.map((t) => `<li class="tag tag-${t}">${tagLabels[t] || esc(t)}</li>`).join('')}
          </ul>
          ${extra}
          <div class="activity-actions">
            ${placeButtons(a)}
            <button type="button" class="btn btn-gold btn-signup" data-signup="${esc(a.id)}">✋ Sign up for this</button>
          </div>
        </div>
      </article>`;
  }).join('');

  $('#activity-empty').hidden = items.length > 0;
}

function setupActivityControls() {
  document.querySelectorAll('.chip[data-filter]').forEach((chip) => {
    chip.addEventListener('click', () => {
      activityView.filter = chip.dataset.filter;
      document.querySelectorAll('.chip[data-filter]').forEach((c) => {
        const on = c === chip;
        c.classList.toggle('is-active', on);
        c.setAttribute('aria-pressed', on);
      });
      renderActivities();
    });
  });
  $('#activity-sort').addEventListener('change', (e) => {
    activityView.sort = e.target.value;
    renderActivities();
  });

  // "Sign up for this" → tick that activity in the form and scroll to it
  $('#activity-grid').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-signup]');
    if (!btn) return;
    const box = document.getElementById('su-act-' + btn.dataset.signup);
    if (box) box.checked = true;
    $('#signups').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => $('#su-family').focus({ preventScroll: true }), 600);
  });
}

// Sample day plans for the open days
function renderDayPlans() {
  const tagLabels = { kids: 'Kids', seniors: 'Seniors', adventurous: 'Adventurous', veterans: 'Veterans' };
  $('#day-plans-intro').innerHTML = linkify(DATA.dayPlansIntro);
  $('#day-plans-grid').innerHTML = DATA.dayPlans.map((p) => `
    <article class="plan-card">
      <h4><span aria-hidden="true">${p.emoji}</span> ${esc(p.title)}</h4>
      <p class="plan-drive">🚗 ${esc(p.drive)}</p>
      <ul class="tags" aria-label="Good for">
        <li class="tags-label">Good for:</li>
        ${p.goodFor.map((t) => `<li class="tag tag-${t}">${tagLabels[t] || esc(t)}</li>`).join('')}
      </ul>
      <ol class="plan-steps">
        ${p.steps.map((s) => `<li><strong>${esc(s.when)}</strong>${linkify(s.what)}</li>`).join('')}
      </ol>
    </article>`).join('');
}

// 6. Sign-up form + "Who's Doing What" board
function renderSignupCheckboxes() {
  const sorted = [...DATA.activities].sort((a, b) => a.driveMin - b.driveMin);
  $('#su-activities').innerHTML = sorted.map((a) => `
    <label class="check" for="su-act-${esc(a.id)}">
      <input type="checkbox" id="su-act-${esc(a.id)}" name="activities" value="${esc(a.id)}">
      <span>${esc(a.name)} <small>(${esc(a.driveText)})</small></span>
    </label>`).join('');
}

function renderBoard() {
  const sorted = [...DATA.activities].sort((a, b) => a.driveMin - b.driveMin);
  $('#signup-board').innerHTML = sorted.map((a) => {
    const families = lists.signups.filter((s) => s.activities.includes(a.id));
    const people = families.reduce((sum, f) => sum + f.adults + f.kids, 0);
    const list = families.length
      ? `<ul>${families.map((f) => `
          <li>
            <span class="board-family">${esc(f.family)}</span>${sampleTag(f)}
            <span class="board-meta">${plural(f.adults, 'adult')}, ${plural(f.kids, 'kid')} · ${esc(f.day)}</span>
          </li>`).join('')}</ul>`
      : '<p class="board-empty">No one yet. Be the first!</p>';
    return `
      <div class="board-card">
        <h4><span>${esc(a.emoji)} ${esc(a.name)}</span><span class="board-count" title="People going">${plural(people, 'person').replace('persons', 'people')}</span></h4>
        ${list}
      </div>`;
  }).join('');
}

function setupSignupForm() {
  $('#signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const error = $('#signup-error');
    const success = $('#signup-success');
    const family = form.family.value.trim();
    const adults = parseInt(form.adults.value, 10) || 0;
    const kids = parseInt(form.kids.value, 10) || 0;
    const activities = [...form.querySelectorAll('input[name="activities"]:checked')].map((b) => b.value);
    const day = form.querySelector('input[name="day"]:checked').value;

    let problem = '';
    if (!family) problem = 'Please enter your family name.';
    else if (adults + kids === 0) problem = 'Please enter how many people are coming.';
    else if (!activities.length) problem = 'Please check at least one activity.';
    if (problem) {
      error.textContent = problem; error.hidden = false; success.hidden = true;
      return;
    }
    error.hidden = true;

    const updated = await addRecords('signups', [{ family, adults, kids, activities, day }]);
    renderBoard();
    form.reset();
    success.textContent = updated
      ? `Updated! ${family}'s sign-up now shows your latest choices.`
      : `Thanks, ${family}! You're on the board below.`;
    success.hidden = false;
    $('#signup-board').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

// 7. Shirt sizes
let personCounter = 0;

function sizeOptions(type) {
  return DATA.shirtSizes[type].map((s) => `<option value="${esc(s)}">${type} ${esc(s)}</option>`).join('');
}

function addPersonRow() {
  const n = ++personCounter;
  const row = document.createElement('div');
  row.className = 'person-row';
  row.innerHTML = `
    <div>
      <label for="p-name-${n}">Name</label>
      <input type="text" id="p-name-${n}" class="p-name" placeholder="First name">
    </div>
    <div>
      <label for="p-type-${n}">Adult / Youth</label>
      <select id="p-type-${n}" class="p-type"><option>Adult</option><option>Youth</option></select>
    </div>
    <div>
      <label for="p-size-${n}">Size</label>
      <select id="p-size-${n}" class="p-size">${sizeOptions('Adult')}</select>
    </div>
    <button type="button" class="remove-person" aria-label="Remove this person">✕</button>`;

  // Changing Adult/Youth swaps the size list
  row.querySelector('.p-type').addEventListener('change', (e) => {
    row.querySelector('.p-size').innerHTML = sizeOptions(e.target.value);
  });
  row.querySelector('.remove-person').addEventListener('click', () => {
    if (document.querySelectorAll('.person-row').length > 1) row.remove();
  });
  $('#shirt-people').appendChild(row);
  return row;
}

function setupShirtForm() {
  addPersonRow();
  $('#add-person').addEventListener('click', () => addPersonRow().querySelector('.p-name').focus());

  $('#shirt-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const family = $('#sh-family').value.trim();
    const error = $('#shirt-error');
    const success = $('#shirt-success');
    const people = [...document.querySelectorAll('.person-row')]
      .map((row) => ({
        family,
        name: row.querySelector('.p-name').value.trim(),
        type: row.querySelector('.p-type').value,
        size: row.querySelector('.p-size').value,
      }))
      .filter((p) => p.name);

    let problem = '';
    if (!family) problem = 'Please enter your family name.';
    else if (!people.length) problem = 'Please add at least one person\'s name.';
    if (problem) { error.textContent = problem; error.hidden = false; success.hidden = true; return; }
    error.hidden = true;

    await addRecords('shirts', people);
    renderShirtTally();
    e.target.reset();
    $('#shirt-people').innerHTML = '';
    addPersonRow();
    success.textContent = `Got it! ${plural(people.length, 'shirt')} added for ${family}.`;
    success.hidden = false;
  });
}

function renderShirtTally() {
  let total = 0;
  let rows = '';
  Object.entries(DATA.shirtSizes).forEach(([type, sizes]) => {
    rows += `<tr class="tally-group"><th colspan="2">${type} sizes</th></tr>`;
    sizes.forEach((size) => {
      const count = lists.shirts.filter((s) => s.type === type && s.size === size).length;
      total += count;
      rows += `<tr class="${count ? '' : 'is-zero'}"><td>${type} ${size}</td><td>${count}</td></tr>`;
    });
  });
  $('#shirt-tally').innerHTML = `
    <table class="tally-table">
      <thead><tr><th>Size</th><th>Count</th></tr></thead>
      <tbody>${rows}</tbody>
      <tfoot><tr><td>Total shirts</td><td>${total}</td></tr></tfoot>
    </table>`;

  // Everyone's sizes, grouped by family
  const families = [...new Set(lists.shirts.map((s) => s.family))];
  $('#shirt-list').innerHTML = families.length
    ? families.map((f) => {
        const ppl = lists.shirts.filter((s) => s.family === f);
        return `<p><strong>${esc(f)}</strong>${sampleTag(ppl[0])}: ${ppl.map((p) => `${esc(p.name)} (${esc(p.type)} ${esc(p.size)})`).join(', ')}</p>`;
      }).join('')
    : '<p>No sizes yet.</p>';
}

/* Headcounts: "Who's Coming" (by generation) at the top, plus separate
   Lake Day and Group Dinner headcounts (adults/kids) in the schedule.
   Each one is a small form, running totals, and a list of families. */
function headcountColumns(list) {
  return list === 'rsvp'
    ? DATA.generations
    : [{ key: 'adults', label: 'Adults' }, { key: 'kids', label: 'Kids' }];
}

function headcountSettings(list) {
  if (list === 'rsvp') return { note: DATA.whosComingIntro, button: "We're coming!" };
  const day = DATA.schedule.find((d) => d.headcount && d.headcount.list === list);
  return { ...(day ? day.headcount : {}), button: 'Count us in' };
}

function mountHeadcount(box) {
  const list = box.dataset.headcount;
  const cols = headcountColumns(list);
  const s = headcountSettings(list);
  const id = 'hc-' + list;
  const isMain = box.classList.contains('headcount-main');

  const formHtml = `
    <form class="hc-form${isMain ? ' card form' : ''}" novalidate>
      <div class="form-row">
        <label for="${id}-family">Family name</label>
        <input type="text" id="${id}-family" autocomplete="family-name" placeholder="e.g. The Thomas Family" required>
      </div>
      <div class="hc-counts">
        ${cols.map((c) => `
          <div>
            <label for="${id}-${c.key}">${esc(c.label)}${c.hint ? `<small>${esc(c.hint)}</small>` : ''}</label>
            <input type="number" id="${id}-${c.key}" data-key="${esc(c.key)}" min="0" max="50" value="0" inputmode="numeric">
          </div>`).join('')}
      </div>
      <p class="form-error" role="alert" hidden></p>
      <button type="submit" class="btn btn-navy btn-lg">${esc(s.button)}</button>
      <p class="form-success" role="status" hidden></p>
      <p class="hc-hint">Plans changed? Submit again with the same family name to update your numbers.</p>
    </form>`;

  const summaryHtml = `
    <div class="${isMain ? 'card ' : ''}hc-summary">
      <div class="hc-totals" data-totals></div>
      ${isMain
        ? '<div data-list></div>'
        : '<details class="hc-list"><summary>See who\'s coming</summary><div data-list></div></details>'}
      <button type="button" class="btn-link" data-reset="${esc(list)}" ${SHARED_SHEETS.enabled ? 'hidden' : ''}>Reset to sample data</button>
    </div>`;

  box.innerHTML = `
    ${s.title ? `<h4>${esc(s.title)}</h4>` : ''}
    ${s.note ? `<p class="hc-note">${esc(s.note)}</p>` : ''}
    <div class="${isMain ? 'two-col' : 'hc-stack'}">${formHtml}${summaryHtml}</div>`;

  const form = box.querySelector('form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const error = form.querySelector('.form-error');
    const success = form.querySelector('.form-success');
    const family = form.querySelector(`#${id}-family`).value.trim();
    if (!family) {
      error.textContent = 'Please enter your family name.';
      error.hidden = false; success.hidden = true;
      return;
    }
    error.hidden = true;
    const record = { family };
    form.querySelectorAll('[data-key]').forEach((input) => {
      record[input.dataset.key] = Math.max(0, parseInt(input.value, 10) || 0);
    });
    const total = cols.reduce((sum, c) => sum + record[c.key], 0);
    const updated = await addRecords(list, [record]);
    renderHeadcount(list);
    form.reset();
    success.textContent = total === 0
      ? `Got it. We've marked ${family} as not coming. Sorry we'll miss you!`
      : `${updated ? 'Updated' : 'Thanks'}, ${family}! ${plural(total, 'person')} counted.`.replace('persons', 'people');
    success.hidden = false;
  });
}

function renderHeadcount(list) {
  const box = document.querySelector(`[data-headcount="${list}"]`);
  if (!box) return;
  const cols = headcountColumns(list);
  const entries = lists[list];
  const totalOf = (r) => cols.reduce((sum, c) => sum + (Number(r[c.key]) || 0), 0);
  const coming = entries.filter((r) => totalOf(r) > 0);
  const sums = cols.map((c) => entries.reduce((sum, r) => sum + (Number(r[c.key]) || 0), 0));
  const grand = sums.reduce((a, b) => a + b, 0);

  box.querySelector('[data-totals]').innerHTML = `
    <div class="hc-tile hc-tile-total"><span class="hc-num">${grand}</span><span class="hc-label">Total people</span></div>
    ${cols.map((c, i) => `<div class="hc-tile"><span class="hc-num">${sums[i]}</span><span class="hc-label">${esc(c.label)}</span></div>`).join('')}
    <div class="hc-tile"><span class="hc-num">${coming.length}</span><span class="hc-label">Families</span></div>`;

  box.querySelector('[data-list]').innerHTML = coming.length
    ? `<table class="count-table">
        <thead><tr><th>Family</th>${cols.map((c) => `<th>${esc(c.label.replace('Generation ', 'Gen '))}</th>`).join('')}<th>Total</th></tr></thead>
        <tbody>${coming.map((r) => `
          <tr><td>${esc(r.family)}${sampleTag(r)}</td>${cols.map((c) => `<td>${Number(r[c.key]) || 0}</td>`).join('')}<td><strong>${totalOf(r)}</strong></td></tr>`).join('')}
        </tbody>
      </table>`
    : '<p class="board-empty">No one yet. Be the first!</p>';
}

// Room Finder (in the Hotel section)
function setupRoomForm() {
  // Hidden until DATA.roomFinderOpen is changed to true
  if (!DATA.roomFinderOpen) {
    $('#room-finder').hidden = true;
    $('#room-closed').textContent = DATA.roomFinderClosedText;
    $('#room-closed').hidden = false;
  }

  $('#rm-arrival').innerHTML = DATA.roomArrivalDays
    .map((d) => `<option${d === DATA.roomArrivalDefault ? ' selected' : ''}>${esc(d)}</option>`).join('');

  $('#room-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const family = $('#rm-family').value.trim();
    const room = $('#rm-room').value.trim();
    const error = $('#room-error');
    const success = $('#room-success');
    if (!family || !room) {
      error.textContent = 'Please enter your family name and room number.';
      error.hidden = false; success.hidden = true;
      return;
    }
    error.hidden = true;
    const updated = await addRecords('rooms', [{ family, room, arrival: $('#rm-arrival').value }]);
    renderRooms();
    e.target.reset();
    $('#rm-arrival').value = DATA.roomArrivalDefault;
    success.textContent = updated
      ? `Updated! ${family} is now listed in room ${room}.`
      : `Thanks, ${family}! You're in room ${room}.`;
    success.hidden = false;
  });
}

function renderRooms() {
  if (!lists.rooms.length) {
    $('#room-list').innerHTML = '<p class="board-empty">No rooms yet. Add yours after you check in!</p>';
    return;
  }
  // Sort by room number (numbers in order, then anything else)
  const sorted = [...lists.rooms].sort((a, b) =>
    String(a.room).localeCompare(String(b.room), undefined, { numeric: true }));
  $('#room-list').innerHTML = `
    <table class="tally-table room-table">
      <thead><tr><th>Room</th><th>Family</th><th>Arrived</th></tr></thead>
      <tbody>${sorted.map((r) => `
        <tr><td><strong>${esc(r.room)}</strong></td><td>${esc(r.family)}${sampleTag(r)}</td><td>${esc(r.arrival)}</td></tr>`).join('')}
      </tbody>
    </table>`;
}

// 8. Photos
function renderPhotos() {
  $('#album-grid').innerHTML = DATA.albums.map((a) => {
    const soon = isPlaceholder(a.url);
    const tag = soon ? 'div' : 'a';
    const attrs = soon ? 'aria-disabled="true"' : `href="${esc(a.url)}" target="_blank" rel="noopener"`;
    return `
      <${tag} class="album-btn" ${attrs}>
        <span class="album-emoji" aria-hidden="true">${a.emoji}</span>
        <span class="album-name">${esc(a.name)}</span>
        <span class="album-desc">${esc(a.desc)}</span>
        ${soon ? '<span class="album-desc"><em>Link coming soon</em></span>' : ''}
      </${tag}>`;
  }).join('');

  $('#upload-steps').innerHTML = DATA.uploadSteps.map((s) => `<li>${s}</li>`).join('');

  $('#gallery').innerHTML = DATA.gallery.map((p, i) => `
    <button type="button" class="gallery-item" data-set="gallery" data-index="${i}" aria-label="Enlarge photo: ${esc(p.caption)}">
      <img src="images/${esc(p.file)}" alt="${esc(p.alt)}" loading="lazy" width="400" height="300">
    </button>`).join('');
}

// 9. Contacts + FAQ (+ automatic "All Links" list)
function renderContacts() {
  $('#contact-grid').innerHTML = DATA.contacts.map((c) => `
    <div class="card contact-card">
      <h4>${esc(c.name)}</h4>
      <a class="btn btn-navy" href="tel:${telHref(c.phone)}">📞 Call ${esc(c.phone)}</a>
      <a class="btn btn-outline" href="sms:${telHref(c.phone)}">💬 Text ${esc(c.phone)}</a>
      <a class="btn btn-outline" href="mailto:${esc(c.email)}">✉️ ${esc(c.email)}</a>
    </div>`).join('');

  const faqHtml = DATA.faq.map((f) => `
    <details>
      <summary>${esc(f.q)}</summary>
      <div class="faq-body">${linkify(f.a)}</div>
    </details>`).join('');

  $('#faq').innerHTML = faqHtml + `
    <details>
      <summary>All Links (every website on this page)</summary>
      <div class="faq-body"><ul class="all-links">${allLinksHtml()}</ul></div>
    </details>`;
}

function allLinksHtml() {
  const seen = new Set();
  const links = [];
  const add = (name, url) => {
    if (!url || isPlaceholder(url) || seen.has(url)) return;
    seen.add(url);
    links.push({ name, url });
  };
  add(DATA.hotel.name, DATA.hotel.url);
  DATA.activities.forEach((a) => add(a.name, a.url));
  Object.values(DATA.places).forEach((p) => add(p.name, p.url));
  DATA.albums.forEach((a) => add(a.name + ' photo album', a.url));
  return links.map((l) => `<li>${extLink(l.name, l.url)}</li>`).join('');
}


/* =====================================================================
   PART 7. INTERACTIVE PIECES
   ===================================================================== */

// Countdown timer in the hero
function startCountdown() {
  const start = new Date(DATA.event.countdownTo).getTime();
  const end = new Date(DATA.event.endsOn).getTime();
  const pad = (n) => String(n).padStart(2, '0');

  function tick() {
    const now = Date.now();
    const caption = $('#countdown-caption');
    if (now >= start) {
      $('#countdown').hidden = true;
      caption.textContent = now < end
        ? '⚓ The reunion is underway. Welcome aboard!'
        : 'Thank you for a wonderful reunion. See you next year!';
      return;
    }
    const diff = Math.floor((start - now) / 1000);
    $('#cd-days').textContent = Math.floor(diff / 86400);
    $('#cd-hours').textContent = pad(Math.floor((diff % 86400) / 3600));
    $('#cd-mins').textContent = pad(Math.floor((diff % 3600) / 60));
    $('#cd-secs').textContent = pad(diff % 60);
  }
  tick();
  setInterval(tick, 1000);
}

// Phone menu, current-section highlight, back-to-top button
function setupNav() {
  const toggle = $('.nav-toggle');
  const links = $('#nav-links');

  const closeMenu = () => { links.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); };
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', (e) => { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  // Underline the nav link for the section you're looking at
  if ('IntersectionObserver' in window) {
    const navLinks = [...links.querySelectorAll('a')];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => a.classList.toggle('is-current', a.getAttribute('href') === '#' + entry.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.forEach((a) => {
      const section = document.querySelector(a.getAttribute('href'));
      if (section) observer.observe(section);
    });
  }

  const backToTop = $('#back-to-top');
  const onScroll = () => backToTop.classList.toggle('is-visible', window.scrollY > 700);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Lightbox: click a gallery photo to see it big
function setupLightbox() {
  const box = $('#lightbox');
  const img = $('#lb-img');
  const caption = $('#lb-caption');
  let current = 0;
  let photos = DATA.gallery;   // which set of photos is being viewed
  let lastFocus = null;

  function show(i) {
    current = (i + photos.length) % photos.length;
    const p = photos[current];
    img.src = 'images/' + p.file;
    img.alt = p.alt;
    caption.textContent = photos.length > 1 ? `${p.caption}  (${current + 1} of ${photos.length})` : p.caption;
    $('#lb-prev').hidden = $('#lb-next').hidden = photos.length < 2;
  }
  function open(set, i) {
    photos = set;
    lastFocus = document.activeElement;
    show(i);
    box.hidden = false;
    document.body.style.overflow = 'hidden';
    $('#lb-close').focus();
  }
  function close() {
    box.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  // Any photo button on the page: data-set says which photo list, data-index which photo
  document.addEventListener('click', (e) => {
    const item = e.target.closest('[data-set][data-index]');
    if (item) open(photoSet(item.dataset.set), Number(item.dataset.index));
  });
  $('#lb-close').addEventListener('click', close);
  $('#lb-prev').addEventListener('click', () => show(current - 1));
  $('#lb-next').addEventListener('click', () => show(current + 1));
  box.addEventListener('click', (e) => { if (e.target === box) close(); });

  document.addEventListener('keydown', (e) => {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
    // Keep keyboard focus inside the viewer
    if (e.key === 'Tab') {
      const buttons = [...box.querySelectorAll('button')];
      const idx = buttons.indexOf(document.activeElement);
      e.preventDefault();
      buttons[(idx + (e.shiftKey ? -1 : 1) + buttons.length) % buttons.length].focus();
    }
  });

  // Swipe left/right on phones
  let touchX = null;
  box.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    touchX = null;
  });
}

// "Reset to sample data" buttons (preview mode only)
function setupResetButtons() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-reset]');
    if (!btn) return;
    if (!confirm('Remove entries added on this device and show the sample data again?')) return;
    const name = btn.dataset.reset;
    resetToSamples(name);
    if (name === 'signups') renderBoard();
    if (name === 'shirts') renderShirtTally();
    if (name === 'rooms') renderRooms();
    if (['rsvp', 'lakeDay', 'dinner'].includes(name)) renderHeadcount(name);
  });
}


/* =====================================================================
   PART 8. START EVERYTHING WHEN THE PAGE LOADS
   ===================================================================== */
async function init() {
  renderFills();
  renderQuickCards();
  renderHotel();
  renderSchedule();
  renderActivities();
  renderDayPlans();
  renderSignupCheckboxes();
  renderPhotos();
  renderContacts();

  setupNav();
  setupActivityControls();
  setupSignupForm();
  setupShirtForm();
  setupRoomForm();
  document.querySelectorAll('[data-headcount]').forEach(mountHeadcount);
  setupLightbox();
  setupResetButtons();
  startCountdown();

  // Load saved entries (from this device or the shared sheets), then draw the boards
  await Promise.all(Object.keys(lists).map(loadList));
  renderBoard();
  renderShirtTally();
  renderRooms();
  ['rsvp', 'lakeDay', 'dinner'].forEach(renderHeadcount);
}

document.addEventListener('DOMContentLoaded', init);
