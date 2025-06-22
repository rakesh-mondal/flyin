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
    close: 'Close'
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
    duration: 'المدة',
    meal: 'الوجبة',
    entertainment: 'الترفيه',
    
    // Homepage
    whereIsYourNextFlight: "أين رحلتك القادمة؟",
    takingYou: "نأخذك إلى",
    tryFlyinAI: "جرب فلاين AI",
    
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
    continue: 'متابعة',
    back: 'رجوع',
    next: 'التالي',
    close: 'إغلاق'
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