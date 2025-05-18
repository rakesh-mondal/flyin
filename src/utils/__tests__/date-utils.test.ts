import {
  formatDate,
  getDateDifference,
  isDateInPast,
  addDays,
  formatDateRange
} from '../date-utils';

describe('Date Utilities', () => {
  describe('formatDate', () => {
    it('should format a date with default options', () => {
      const testDate = new Date(2023, 4, 15); // May 15, 2023
      expect(formatDate(testDate)).toBe('May 15, 2023');
    });

    it('should format a date with custom options', () => {
      const testDate = new Date(2023, 4, 15); // May 15, 2023
      expect(formatDate(testDate, { weekday: 'short', month: 'short', day: 'numeric' })).toBe('Mon, May 15');
    });
  });

  describe('getDateDifference', () => {
    it('should calculate the difference between two dates in days', () => {
      const date1 = new Date(2023, 4, 15); // May 15, 2023
      const date2 = new Date(2023, 4, 20); // May 20, 2023
      expect(getDateDifference(date1, date2)).toBe(5);
    });

    it('should return a negative value if the second date is before the first', () => {
      const date1 = new Date(2023, 4, 20); // May 20, 2023
      const date2 = new Date(2023, 4, 15); // May 15, 2023
      expect(getDateDifference(date1, date2)).toBe(-5);
    });
  });

  describe('isDateInPast', () => {
    it('should return true for a past date', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1); // Yesterday
      expect(isDateInPast(pastDate)).toBe(true);
    });

    it('should return false for a future date', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1); // Tomorrow
      expect(isDateInPast(futureDate)).toBe(false);
    });
  });

  describe('addDays', () => {
    it('should add days to a date', () => {
      const startDate = new Date(2023, 4, 15); // May 15, 2023
      const resultDate = addDays(startDate, 5);
      expect(resultDate.getDate()).toBe(20);
      expect(resultDate.getMonth()).toBe(4); // May
      expect(resultDate.getFullYear()).toBe(2023);
    });

    it('should handle month crossover when adding days', () => {
      const startDate = new Date(2023, 4, 30); // May 30, 2023
      const resultDate = addDays(startDate, 5);
      expect(resultDate.getDate()).toBe(4);
      expect(resultDate.getMonth()).toBe(5); // June
      expect(resultDate.getFullYear()).toBe(2023);
    });
  });

  describe('formatDateRange', () => {
    it('should format dates in the same month and year', () => {
      const startDate = new Date(2023, 4, 15); // May 15, 2023
      const endDate = new Date(2023, 4, 20); // May 20, 2023
      expect(formatDateRange(startDate, endDate)).toBe('May 15 - 20, 2023');
    });

    it('should format dates in different months but same year', () => {
      const startDate = new Date(2023, 4, 15); // May 15, 2023
      const endDate = new Date(2023, 5, 10); // June 10, 2023
      expect(formatDateRange(startDate, endDate)).toBe('May 15 - June 10, 2023');
    });

    it('should format dates in different years', () => {
      const startDate = new Date(2023, 11, 25); // December 25, 2023
      const endDate = new Date(2024, 0, 5); // January 5, 2024
      expect(formatDateRange(startDate, endDate)).toBe('December 25, 2023 - January 5, 2024');
    });
  });
}); 