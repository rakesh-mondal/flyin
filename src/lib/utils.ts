import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges multiple classnames together and handles Tailwind conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Creates a debounced function that delays invoking the provided function
 * until after the specified wait time has elapsed since the last time it was invoked
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Formats a price with the appropriate currency symbol
 */
export function formatPrice(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Converts Western numerals (0-9) to Arabic-Indic numerals (٠-٩)
 */
export function toArabicNumerals(text: string | number): string {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(text).replace(/[0-9]/g, (digit) => arabicNumerals[parseInt(digit)]);
}

/**
 * Formats numbers with proper locale-specific numerals
 */
export function formatNumber(value: string | number, isArabic: boolean): string {
  if (!isArabic) return value.toString();
  
  const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return value.toString().replace(/[0-9]/g, (digit) => arabicNumbers[parseInt(digit)]);
}

// Date formatting utility for Arabic translation
export function formatDate(englishDate: string, isArabic: boolean, t: (key: string) => string): string {
  if (!isArabic) return englishDate;
  
  // Parse English date format like "Wed, 14 May"
  const parts = englishDate.split(', ');
  if (parts.length !== 2) return englishDate;
  
  const [dayName, dateMonth] = parts;
  const [day, month] = dateMonth.split(' ');
  
  // Translate day name
  const dayTranslations: { [key: string]: string } = {
    'Mon': t('mon'),
    'Tue': t('tue'), 
    'Wed': t('wed'),
    'Thu': t('thu'),
    'Fri': t('fri'),
    'Sat': t('sat'),
    'Sun': t('sun')
  };
  
  // Translate month name
  const monthTranslations: { [key: string]: string } = {
    'Jan': t('january'),
    'Feb': t('february'),
    'Mar': t('march'),
    'Apr': t('april'),
    'May': t('may'),
    'Jun': t('june'),
    'Jul': t('july'),
    'Aug': t('august'),
    'Sep': t('september'),
    'Oct': t('october'),
    'Nov': t('november'),
    'Dec': t('december')
  };
  
  const translatedDay = dayTranslations[dayName] || dayName;
  const translatedMonth = monthTranslations[month] || month;
  const arabicDay = formatNumber(day, true);
  
  return `${translatedDay}، ${arabicDay} ${translatedMonth}`;
}
