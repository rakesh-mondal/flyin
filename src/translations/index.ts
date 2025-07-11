import { useLanguage } from '../hooks/useLanguage';

export const translations = {
  en: {
    // Navigation
    flights: 'Flights',
    hotels: 'Hotels',
    flightAndHotel: 'Flight + Hotel',
    staycations: 'Staycations',
    activities: 'Activities',
    deals: 'Deals',
    myBookings: 'My Bookings',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    hello: 'Hello',
    rentals: 'Rentals',
    
    // Search
    from: 'From',
    to: 'To',
    departure: 'Departure',
    return: 'Return',
    searchFlights: 'Search Flights',
    passengers: 'Passengers',
    oneWay: 'One Way',
    roundTrip: 'Round Trip',
    dates: 'Dates',
    who: 'Who',
    multiCity: 'Multi-city',
    countryOrAirport: 'Country, city or airport',
    departureReturn: 'Departure — Return',
    adults: 'Adults',
    children: 'Children',
    infants: 'Infants',
    economy: 'Economy',
    age12Plus: 'Age 12+',
    age2to11: 'Age 2-11',
    under2: 'Under 2',
    cabinClass: 'Cabin Class',
    discoverMiddleEastern: 'Discover Middle Eastern Experiences',
    trending: 'Trending',
    forYou: 'For You',
    popular: 'Popular',
    userGreeting: 'Hello {name},',
    adult: 'Adult',
    child: 'Child',
    infant: 'Infant',
    premiumEconomy: 'Premium Economy',
    business: 'Business',
    first: 'First',
    
    // Flight Options
    cheapest: 'Cheapest',
    best: 'Best',
    quickest: 'Quickest',
    
    // Destinations
    culturalDubai: 'Cultural Dubai',
    magicalIstanbul: 'Magical Istanbul',
    ancientCairo: 'Ancient Cairo',
    magicalDoha: 'Magical Doha',
    
    // Flight amenities and services
    visaRequired: 'Visa req.',
    prayerRoom: 'Prayer rm.',
    wifi: 'Wi-Fi',
    baggage: 'Baggage',
    wifiAvailable: 'Wi-fi available',
    freeWifi: 'Free Wi-fi',
    extraBaggage: 'Extra Baggage',
    
    // Contact information
    customerServicePhone: '+966112246333',
    
    // Promotional banners
    useCodeADCB: 'Use code ADCB and get up to AED 350 off flights & hotels',
    useCodeAHB: 'Use code AHB and get up to 20% off flights & hotels',
    useCodeVIP: 'Use code VIP and get up to AED 300 off on bookings',
    
    // Flight search results
    noFlightsFound: 'No flights found matching your filters.',
    findingDestinations: 'Finding the perfect Middle Eastern destinations for you...',
    checkingAvailability: 'Checking availability for your dates...',
    curatingExperiences: 'Curating personalized experiences...',
    findingBestValue: 'Finding the best value options...',
    
    // AI Messages
    dubaiMessage: "Dubai offers a perfect blend of modernity and tradition. I've curated these experiences with luxury accommodations and unique cultural activities.",
    istanbulMessage: "Istanbul is where East meets West. These journeys highlight the rich history and vibrant culture of this fascinating city at the crossroads of civilizations.",
    cairoMessage: "Explore the wonders of ancient Egypt with these carefully selected trips to Cairo. Experience the pyramids and the rich cultural heritage of this historic destination.",
    dohaMessage: "Discover the modern marvels and traditional charm of Doha. These journeys offer luxury accommodations and unique cultural experiences in Qatar's capital.",
    beachMessage: "The Middle East has some stunning beaches. I've selected some options with beautiful shorelines along the Arabian Gulf and Red Sea.",
    cultureMessage: "The Middle East is rich in cultural experiences. These journeys focus on historical sites, local traditions, and authentic cultural immersion.",
    defaultMessage: "Based on your interest in \"{searchQuery}\", I've curated these Middle Eastern journeys that I think you'll love.",
    
    // Toast messages
    messageReceived: 'Message received!',
    adjustRecommendations: "I'll adjust your recommendations accordingly.",
    refinedOptions: "I've refined the options based on your preferences.",
    
    // Footer
    support: 'Support',
    discover: 'Discover',
    termsAndSettings: 'Terms and settings',
    partners: 'Partners',
    about: 'About',
    covidFaqs: 'Coronavirus (COVID-19) FAQs',
    manageTrips: 'Manage your trips',
    contactCustomerService: 'Contact Customer Service',
    safetyResourceCentre: 'Safety resource centre',
    geniusLoyalty: 'Genius loyalty programme',
    seasonalDeals: 'Seasonal and holiday deals',
    travelArticles: 'Travel articles',
    flyinBusiness: 'Flyin.com for Business',
    travellerReviewAwards: 'Traveller Review Awards',
    carHire: 'Car hire',
    flightFinder: 'Flight finder',
    restaurantReservations: 'Restaurant reservations',
    flyinTravelAgents: 'Flyin.com for Travel Agents',
    privacyCookies: 'Privacy & cookies',
    termsConditions: 'Terms and conditions',
    grievanceOfficer: 'Grievance officer',
    modernSlaveryStatement: 'Modern Slavery Statement',
    humanRightsStatement: 'Human Rights Statement',
    extranetLogin: 'Extranet login',
    partnerHelp: 'Partner help',
    listProperty: 'List your property',
    becomeAffiliate: 'Become an affiliate',
    aboutFlyin: 'About Flyin.com',
    howWeWork: 'How we work',
    sustainability: 'Sustainability',
    pressCentre: 'Press centre',
    careers: 'Careers',
    investorRelations: 'Investor relations',
    corporateContact: 'Corporate contact',
    flyinDescription: 'Flyin.com is part of Flyin Holdings Inc., the world leader in online travel and related services.',
    copyright: 'Copyright © 1996–{year} Flyin.com™. All rights reserved.',
    
    // Booking
    bookNow: 'Book Now',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone',
    nationality: 'Nationality',
    dateOfBirth: 'Date of Birth',
    passengerDetails: 'Passenger Details',
    totalPrice: 'Total Price',
    
    // Flight Details
    directFlight: 'Direct Flight',
    stops: 'stops',
    stop: 'stop',
    duration: 'Duration',
    meal: 'Meal',
    entertainment: 'Entertainment',
    
    // Homepage
    whereIsYourNextFlight: "Where's your next flight?",
    takingYou: "taking you",
    tryFlyinAI: "Try Flyin AI",
    
    // Price Alerts and Filters
    getPriceAlerts: 'Get Price Alerts',
    recommended: 'Recommended',
    nonstop: 'Nonstop',
    checkedBaggageIncluded: 'Checked baggage included',
    hideBudgetAirlines: 'Hide budget airlines',
    reset: 'Reset',
    direct: 'Direct',
    flightTimings: 'Flight Timings',
    departingFlight: 'Departing flight',
    returningFlight: 'Returning flight',
    am12pm: 'AM - 12 PM',
    before6am: 'Before 6 AM',
    after6pm: 'After 6 PM',
    pm6pm: 'PM - 6 PM',
    of: 'of',
    flightsCount: 'flights',
    stopsPlus: 'stops +',
    airlines: 'Airlines',
    showMultiAirlineItineraries: 'Show multi-airline itineraries',
    only: 'Only',
    price: 'Price',
    airports: 'Airports',
    returnFlightArrivesAtDeparture: 'Return flight arrives at departure',
    arrivingIn: 'Arriving in',
    stopoverDuration: 'Stopover Duration',
    totalDuration: 'Total Duration',
    aircrafts: 'Aircrafts',
    largeAircraft: 'Large aircraft',
    midsizeAircraft: 'Midsize aircraft',
    
    // Airlines
    emirates: 'Emirates',
    airIndia: 'Air India', 
    etihad: 'Etihad',
    vistara: 'Vistara',
    qatarAirways: 'Qatar Airways',
    lufthansa: 'Lufthansa',
    singaporeAirlines: 'Singapore Airlines',
    britishAirways: 'British Airways',
    airFrance: 'Air France',
    klm: 'KLM',
    turkishAirlines: 'Turkish Airlines',
    saudiArabian: 'Saudi Arabian Airlines',
    egyptAir: 'EgyptAir',
    royalJordanian: 'Royal Jordanian',
    middleEastAirlines: 'Middle East Airlines',
    omanAir: 'Oman Air',
    kuwaitAirways: 'Kuwait Airways',
    bahrainAir: 'Bahrain Air',
    flyDubai: 'flydubai',
    airArabiaGroup: 'Air Arabia Group',
    jazeera: 'Jazeera Airways',
    nasAir: 'Nas Air',
    flynas: 'flynas',
    pegasusAirlines: 'Pegasus Airlines',
    
    // Flight terms
    via: 'Via',
    
    // Airports and Locations
    shjSharjahInternational: 'SHJ Sharjah International',
    auhZayedInternational: 'AUH Zayed International', 
    dubaiEtihadBusStation: 'Dubai Etihad Bus Station',
    dubaiEmiratesBusStation: 'Dubai Emirates Bus Station',
    dxbInternational: 'DXB International',
    dxbAirport: 'DXB',
    
    // City names
    dubai: 'Dubai',
    newYork: 'New York',
    
    // Sorting options
    sortBy: 'Sort by',
    priceLowestFirst: 'Price - lowest first',
    priceHighestFirst: 'Price - highest first',
    departEarliestFirst: 'Depart - earliest first',
    departLatestFirst: 'Depart - latest first',
    durationShortestFirst: 'Duration - shortest first',
    durationLongestFirst: 'Duration - longest first',
    airlineAtoZ: 'Airline - A to Z',
    stopsFewestFirst: 'Stops - fewest first',
    
    // Short dropdown labels
    priceUp: 'Price ↑',
    priceDown: 'Price ↓',
    departUp: 'Depart ↑',
    departDown: 'Depart ↓',
    durationUp: 'Duration ↑',
    durationDown: 'Duration ↓',
    airlineUp: 'Airline ↑',
    stopsUp: 'Stops ↑',
    
    // Tooltip text
    noCheckInBaggage: 'No check in baggage',
    shortLayoverWarning: 'Short Layover Warning',
    longLayover: 'Long Layover',
    layover: 'Layover',
    lessThanTwoHours: 'Less than 2 hours - may be risky for connections',
    moreThanFourHours: 'More than 4 hours - plenty of time for connections',
    
    // Quick filter cards
    returnDeal: 'Return Deal %',
    scrollLeft: 'Scroll left',
    scrollRight: 'Scroll right',
    
    // Flight list card
    getOffWithFly: 'Get ₹{amount} off with FLY',
    visaReq: 'Visa req.',
    prayerRm: 'Prayer rm.',
    moreInfo: 'More info',
    flightDetails: 'Flight details',
    nonStop: 'non-stop',
    
    // Selected trip detail
    backToFlightOptions: 'Back to Flight Options',
    outboundFlight: 'Outbound Flight',
    returnFlight: 'Return Flight',
    priceSummary: 'Price Summary',
    baseFare: 'Base fare',
    taxesAndFees: 'Taxes & fees',
    totalPerPerson: 'Total per person',
    proceedToBook: 'Proceed to Book',
    termsAndConditions: 'By proceeding, you agree to our terms and conditions',
    
    // Booking page
    fareSummary: 'Fare summary',
    traveller: 'traveller',
    addOns: 'Add-ons',
    seatSelection: 'Seat selection',

    // Airport codes
    jfkAirport: 'JFK',
    lhrAirport: 'LHR',
    cdgAirport: 'CDG',
    bomAirport: 'BOM',
    fraAirport: 'FRA',

    // Cities
    london: 'London',
    paris: 'Paris',
    mumbai: 'Mumbai',

    // Airlines (missing ones)
    swiss: 'Swiss',
    austrianAirlines: 'Austrian Airlines',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    select: 'Select',
    continue: 'Continue',
    back: 'Back',
    next: 'Next',
    close: 'Close',
    
    // Days of the week
    monday: 'Monday',
    tuesday: 'Tuesday', 
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
    
    // Days abbreviated
    mon: 'Mon',
    tue: 'Tue',
    wed: 'Wed',
    thu: 'Thu',
    fri: 'Fri',
    sat: 'Sat',
    sun: 'Sun',
    
    // Months
    january: 'January',
    february: 'February',
    march: 'March',
    april: 'April',
    may: 'May',
    june: 'June',
    july: 'July',
    august: 'August',
    september: 'September',
    october: 'October',
    november: 'November',
    december: 'December'
  },
  ar: {
    // Navigation  
    flights: 'الرحلات',
    hotels: 'الفنادق',
    flightAndHotel: 'رحلة + فندق',
    staycations: 'إقامة محلية',
    activities: 'الأنشطة',
    deals: 'العروض',
    myBookings: 'حجوزاتي',
    signIn: 'تسجيل الدخول',
    signOut: 'تسجيل الخروج',
    hello: 'مرحباً',
    rentals: 'تأجير السيارات',
    
    // Search
    from: 'من',
    to: 'إلى',
    departure: 'المغادرة',
    return: 'العودة',
    searchFlights: 'البحث عن رحلات',
    passengers: 'المسافرون',
    oneWay: 'ذهاب فقط',
    roundTrip: 'ذهاب وعودة',
    dates: 'التواريخ',
    who: 'المسافرون',
    multiCity: 'متعدد المدن',
    countryOrAirport: 'الدولة أو المدينة أو المطار',
    departureReturn: 'المغادرة — العودة',
    adults: 'البالغون',
    children: 'الأطفال',
    infants: 'الرضع',
    economy: 'الدرجة الاقتصادية',
    age12Plus: 'العمر 12+',
    age2to11: 'العمر 2-11',
    under2: 'تحت سن 2',
    cabinClass: 'درجة السفر',
    discoverMiddleEastern: 'اكتشف تجارب الشرق الأوسط',
    trending: 'الأكثر رواجاً',
    forYou: 'لك',
    popular: 'الأكثر شعبية',
    userGreeting: 'مرحباً {name}،',
    adult: 'بالغ',
    child: 'طفل',
    infant: 'رضيع',
    premiumEconomy: 'الدرجة الاقتصادية المميزة',
    business: 'درجة رجال الأعمال',
    first: 'الدرجة الأولى',
    
    // Flight Options
    cheapest: 'الأرخص',
    best: 'الأفضل',
    quickest: 'الأسرع',
    
    // Destinations
    culturalDubai: 'دبي الثقافي',
    magicalIstanbul: 'إسطنبول السحري',
    ancientCairo: 'القاهرة القديمة',
    magicalDoha: 'دوحة السحرية',
    
    // Flight amenities and services
    visaRequired: 'رخصة ضرورية',
    prayerRoom: 'غرفة صلاة',
    wifi: 'واي فاي',
    baggage: 'الأمتعة',
    wifiAvailable: 'واي فاي متاح',
    freeWifi: 'واي فاي مجاني',
    extraBaggage: 'أمتعة إضافية',
    
    // Contact information
    customerServicePhone: '+٩٦٦١١٢٢٤٦٣٣٣',
    
    // Promotional banners
    useCodeADCB: 'استخدم رمز ADCB واحصل على خصم 350 على رحلات وفنادق',
    useCodeAHB: 'استخدم رمز AHB واحصل على خصم 20% على رحلات وفنادق',
    useCodeVIP: 'استخدم رمز VIP واحصل على خصم 300 على الحجوزات',
    
    // Flight search results
    noFlightsFound: 'لم يتم العثور على رحلات تطابق مع معاييرك.',
    findingDestinations: 'جاري البحث عن الوجهات المثالية للشرق الأوسط لك...',
    checkingAvailability: 'جاري التحقق من توفر المواعيد...',
    curatingExperiences: 'جاري إنشاء تجارب شخصية...',
    findingBestValue: 'جاري البحث عن خيارات القيمة الأفضل...',
    
    // AI Messages
    dubaiMessage: "دبي توفر مزيجًا مثاليًا بين الحداثة والتقاليد. قمت بتصفيف هذه التجارب مع إقامات خاصة وأنشطة ثقافية عريقة عريقة.",
    istanbulMessage: "إسطنبول هو حيث تلتقي الشرق مع الغرب. هذه الرحلات تليح التاريخ والثقافة الرائعة لهذه المدينة المثيرة في معبر المدنيين.",
    cairoMessage: "استكشف عجائز المصر القديمة مع هذه الرحلات المحددة إلى القاهرة. استكشف الهرم والتراث الثقافي الغني لهذه الوجهة التاريخية.",
    dohaMessage: "اكتشف المعالم الحديثة والثقافة التقليدية لدوحة. هذه الرحلات توفر إقامات خاصة وتجارب ثقافية عريقة في عاصمة قطر.",
    beachMessage: "تحتوي الشرق الأوسط على بعض الشواطئ المذهلة. قمت باختيار بعض الخيارات مع جوانب الشاطئ الجميلة مع الخليج العربي والبحر الأحمر.",
    cultureMessage: "الشرق الأوسط غني بتجارب الثقافة. هذه الرحلات تركز على المواقع التاريخية، التقاليد المحلية، والتغطير الثقافي الصحيح.",
    defaultMessage: "بناءً على اهتمامك بـ \"{searchQuery}\"، قمت بتصفيف هذه الرحلات الشرقية الأوسطية التي أعتقد أنك ستحبها.",
    
    // Toast messages
    messageReceived: 'تم التلقي الرسالة!',
    adjustRecommendations: "سأقوم بتعديل التوصيات الخاصة بك على الاطلاع.",
    refinedOptions: "لقد قمت بتحديث الخيارات بناءً على تفضيلاتك.",
    
    // Footer
    support: 'الدعم',
    discover: 'اكتشف',
    termsAndSettings: 'الشروط والإعدادات',
    partners: 'الشركاء',
    about: 'حول',
    covidFaqs: 'أسئلة شائعة حول كوفيد-19',
    manageTrips: 'إدارة رحلاتك',
    contactCustomerService: 'اتصل بخدمة العملاء',
    safetyResourceCentre: 'مركز موارد السلامة',
    geniusLoyalty: 'برنامج ولاء جينيوس',
    seasonalDeals: 'عروض موسمية وعطل',
    travelArticles: 'مقالات السفر',
    flyinBusiness: 'Flyin.com للأعمال',
    travellerReviewAwards: 'جوائز تقييمات المسافرين',
    carHire: 'تأجير السيارات',
    flightFinder: 'باحث الرحلات',
    restaurantReservations: 'حجوزات المطاعم',
    flyinTravelAgents: 'Flyin.com لوكلاء السفر',
    privacyCookies: 'الخصوصية وملفات تعريف الارتباط',
    termsConditions: 'الشروط والأحكام',
    grievanceOfficer: 'مسؤول الشكاوى',
    modernSlaveryStatement: 'بيان العبودية الحديثة',
    humanRightsStatement: 'بيان حقوق الإنسان',
    extranetLogin: 'تسجيل دخول الشبكة الخارجية',
    partnerHelp: 'مساعدة الشريك',
    listProperty: 'أدرج عقارك',
    becomeAffiliate: 'كن شريكاً تابعاً',
    aboutFlyin: 'حول Flyin.com',
    howWeWork: 'كيف نعمل',
    sustainability: 'الاستدامة',
    pressCentre: 'المركز الصحفي',
    careers: 'الوظائف',
    investorRelations: 'علاقات المستثمرين',
    corporateContact: 'الاتصال المؤسسي',
    flyinDescription: 'Flyin.com جزء من Flyin Holdings Inc.، الرائد العالمي في السفر عبر الإنترنت والخدمات ذات الصلة.',
    copyright: 'حقوق الطبع والنشر © 1996–{year} Flyin.com™. جميع الحقوق محفوظة.',
    
    // Booking
    bookNow: 'احجز الآن',
    firstName: 'الاسم الأول',
    lastName: 'اسم العائلة',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    nationality: 'الجنسية',
    dateOfBirth: 'تاريخ الميلاد',
    passengerDetails: 'تفاصيل المسافر',
    totalPrice: 'السعر الإجمالي',
    
    // Flight Details
    directFlight: 'رحلة مباشرة',
    stops: 'توقفات',
    stop: 'توقف',
    'non-stop': 'مباشر',
    '1 stop': 'توقف واحد',
    '2 stops': 'توقفان',
    '2+ stops': 'توقفان أو أكثر',
    seatsLeft: 'مقاعد متبقية',
    duration: 'المدة',
    meal: 'الوجبة',
    entertainment: 'الترفيه',
    
    // Homepage
    whereIsYourNextFlight: "أين رحلتك القادمة؟",
    takingYou: "نأخذك إلى",
    tryFlyinAI: "جرب فلاين AI",
    
    // Price Alerts and Filters
    getPriceAlerts: 'احصل على تنبيهات الأسعار',
    recommended: 'موصى به',
    nonstop: 'مباشر',
    checkedBaggageIncluded: 'الأمتعة المسجلة متضمنة',
    hideBudgetAirlines: 'إخفاء الطيران الاقتصادي',
    reset: 'إعادة تعيين',
    direct: 'مباشر',
    flightTimings: 'مواعيد الرحلات',
    departingFlight: 'رحلة المغادرة',
    returningFlight: 'رحلة العودة',
    am12pm: 'صباحاً - 12 ظهراً',
    before6am: 'قبل 6 صباحاً',
    after6pm: 'بعد 6 مساءً',
    pm6pm: 'مساءً - 6 مساءً',
    of: 'من',
    flightsCount: 'رحلات',
    stopsPlus: 'توقفات +',
    airlines: 'شركات الطيران',
    showMultiAirlineItineraries: 'إظهار رحلات متعددة الشركات',
    only: 'فقط',
    price: 'السعر',
    airports: 'المطارات',
    returnFlightArrivesAtDeparture: 'رحلة العودة تصل في نقطة المغادرة',
    arrivingIn: 'الوصول في',
    stopoverDuration: 'مدة التوقف',
    totalDuration: 'إجمالي المدة',
    aircrafts: 'الطائرات',
    largeAircraft: 'طائرة كبيرة',
    midsizeAircraft: 'طائرة متوسطة',
    
    // Airlines
    emirates: 'طيران الإمارات',
    airIndia: 'طيران الهند',
    etihad: 'الاتحاد للطيران',
    vistara: 'فيستارا',
    qatarAirways: 'الخطوط الجوية القطرية',
    lufthansa: 'لوفتهانزا',
    singaporeAirlines: 'خطوط سنغافورة الجوية',
    britishAirways: 'الخطوط الجوية البريطانية',
    airFrance: 'الخطوط الجوية الفرنسية',
    klm: 'الخطوط الجوية الملكية الهولندية',
    turkishAirlines: 'الخطوط الجوية التركية',
    saudiArabian: 'الخطوط الجوية السعودية',
    egyptAir: 'مصر للطيران',
    royalJordanian: 'الملكية الأردنية',
    middleEastAirlines: 'طيران الشرق الأوسط',
    omanAir: 'طيران عمان',
    kuwaitAirways: 'الخطوط الجوية الكويتية',
    bahrainAir: 'طيران البحرين',
    flyDubai: 'فلاي دبي',
    airArabiaGroup: 'العربية للطيران',
    jazeera: 'طيران الجزيرة',
    nasAir: 'طيران ناس',
    flynas: 'طيران أديل',
    pegasusAirlines: 'طيران بيجاسوس',
    
    // Flight terms
    via: 'عبر',
    
    // Airports and Locations
    shjSharjahInternational: 'مطار الشارقة الدولي SHJ',
    auhZayedInternational: 'مطار زايد الدولي AUH',
    dubaiEtihadBusStation: 'محطة حافلات الاتحاد دبي',
    dubaiEmiratesBusStation: 'محطة حافلات الإمارات دبي', 
    dxbInternational: 'مطار دبي الدولي DXB',
    dxbAirport: 'دبي',
    
    // City names
    dubai: 'دبي',
    newYork: 'نيويورك',
    
    // Sorting options
    sortBy: 'ترتيب حسب',
    priceLowestFirst: 'السعر - الأقل أولاً',
    priceHighestFirst: 'السعر - الأعلى أولاً',
    departEarliestFirst: 'المغادرة - الأبكر أولاً',
    departLatestFirst: 'المغادرة - الأحدث أولاً',
    durationShortestFirst: 'المدة - الأقصر أولاً',
    durationLongestFirst: 'المدة - الأطول أولاً',
    airlineAtoZ: 'شركة الطيران - أ إلى ي',
    stopsFewestFirst: 'التوقفات - الأقل أولاً',
    
    // Short dropdown labels
    priceUp: 'السعر ↑',
    priceDown: 'السعر ↓',
    departUp: 'المغادرة ↑',
    departDown: 'المغادرة ↓',
    durationUp: 'المدة ↑',
    durationDown: 'المدة ↓',
    airlineUp: 'الطيران ↑',
    stopsUp: 'التوقفات ↑',
    
    // Tooltip text
    noCheckInBaggage: 'لا توجد حقائب مسجلة',
    shortLayoverWarning: 'تحذير توقف قصير',
    longLayover: 'توقف طويل',
    layover: 'التوقف',
    lessThanTwoHours: 'أقل من ساعتين - قد يكون محفوفاً بالمخاطر للاتصالات',
    moreThanFourHours: 'أكثر من 4 ساعات - وقت كافٍ للاتصالات',
    
    // Quick filter cards
    returnDeal: 'عرض العودة %',
    scrollLeft: 'التمرير لليسار',
    scrollRight: 'التمرير لليمين',
    
    // Flight list card
    getOffWithFly: 'احصل على خصم ₹{amount} مع FLY',
    visaReq: 'تأشيرة مطلوبة',
    prayerRm: 'غرفة صلاة',
    moreInfo: 'مزيد من المعلومات',
    flightDetails: 'تفاصيل الرحلة',
    nonStop: 'مباشر',
    
    // Selected trip detail
    backToFlightOptions: 'العودة إلى خيارات الرحلة',
    outboundFlight: 'رحلة الذهاب',
    returnFlight: 'رحلة العودة',
    priceSummary: 'ملخص السعر',
    baseFare: 'سعر الأساس',
    taxesAndFees: 'الضرائب والرسوم',
    totalPerPerson: 'المجموع للشخص الواحد',
    proceedToBook: 'المتابعة للحجز',
    termsAndConditions: 'بالمتابعة، أنت توافق على الشروط والأحكام',
    
    // Booking page
    fareSummary: 'ملخص التكلفة',
    traveller: 'مسافر',
    addOns: 'الإضافات',
    seatSelection: 'اختيار المقعد',
    
    mumbai: 'مومباي',
    delhi: 'دلهي',
    riyadh: 'الرياض',
    jeddah: 'جدة',
    cairo: 'القاهرة',
    istanbul: 'إسطنبول',
    doha: 'الدوحة',
    abuDhabi: 'أبو ظبي',
    sharjah: 'الشارقة',
    bangalore: 'بنغالور',
    hyderabad: 'حيدراباد',
    chennai: 'تشيناي',
    kolkata: 'كولكاتا',
    pune: 'بونا',
    ahmedabad: 'أحمد آباد',
    
    // Airport codes
    jfkAirport: 'جون كينيدي',
    lhrAirport: 'هيثرو',
    cdgAirport: 'شارل ديغول',
    bomAirport: 'مومباي',
    fraAirport: 'فرانكفورت',

    // Cities
    london: 'لندن',
    paris: 'باريس',

    // Airlines (missing ones)
    swiss: 'سويس',
    austrianAirlines: 'الخطوط الجوية النمساوية',
    
    // Common
    loading: 'جاري التحميل...',
    error: 'خطأ',
    success: 'نجح',
    cancel: 'إلغاء',
    confirm: 'تأكيد',
    save: 'حفظ',
    edit: 'تعديل',
    delete: 'حذف',
    select: 'اختر',
    selected: 'مختار',
    share: 'مشاركة',
    update: 'تحديث',
    continue: 'متابعة',
    back: 'رجوع',
    next: 'التالي',
    close: 'إغلاق',
    
    // Days of the week
    monday: 'الاثنين',
    tuesday: 'الثلاثاء', 
    wednesday: 'الأربعاء',
    thursday: 'الخميس',
    friday: 'الجمعة',
    saturday: 'السبت',
    sunday: 'الأحد',
    
    // Days abbreviated
    mon: 'إثنين',
    tue: 'ثلاثاء',
    wed: 'أربعاء',
    thu: 'خميس',
    fri: 'جمعة',
    sat: 'سبت',
    sun: 'أحد',
    
    // Months
    january: 'يناير',
    february: 'فبراير',
    march: 'مارس',
    april: 'أبريل',
    may: 'مايو',
    june: 'يونيو',
    july: 'يوليو',
    august: 'أغسطس',
    september: 'سبتمبر',
    october: 'أكتوبر',
    november: 'نوفمبر',
    december: 'ديسمبر'
  }
};

export const useTranslation = () => {
  const { language } = useLanguage();
  
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language as keyof typeof translations];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };
  
  return { t };
}; 