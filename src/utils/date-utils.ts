/**
 * Formats a date using Intl.DateTimeFormat
 * @param date The date to format
 * @param options Formatting options
 * @returns The formatted date string
 */
export function formatDate(
  date: Date,
  options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' }
): string {
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

/**
 * Calculate the difference in days between two dates
 * @param date1 First date
 * @param date2 Second date
 * @returns The difference in days (positive if date2 is after date1, negative otherwise)
 */
export function getDateDifference(date1: Date, date2: Date): number {
  const diffTime = date2.getTime() - date1.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Checks if a date is in the past
 * @param date The date to check
 * @returns True if the date is in the past, false otherwise
 */
export function isDateInPast(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date < today;
}

/**
 * Adds a specified number of days to a date
 * @param date The starting date
 * @param days The number of days to add
 * @returns A new Date object with the days added
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Formats a date range as a string
 * @param startDate The start date
 * @param endDate The end date
 * @returns Formatted date range string (e.g., "May 15 - 20, 2023")
 */
export function formatDateRange(startDate: Date, endDate: Date): string {
  if (startDate.getFullYear() === endDate.getFullYear() && 
      startDate.getMonth() === endDate.getMonth()) {
    // Same month and year
    return `${formatDate(startDate, { month: 'long', day: 'numeric' })} - ${
      endDate.getDate()}, ${endDate.getFullYear()}`;
  } else if (startDate.getFullYear() === endDate.getFullYear()) {
    // Same year
    return `${formatDate(startDate, { month: 'long', day: 'numeric' })} - ${
      formatDate(endDate, { month: 'long', day: 'numeric', year: 'numeric' })}`;
  } else {
    // Different years
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  }
} 