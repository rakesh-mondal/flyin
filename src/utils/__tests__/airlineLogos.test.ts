import { getAirlineLogo, AIRLINE_LOGOS } from '../airlineLogos';

describe('airlineLogos utility', () => {
  describe('getAirlineLogo function', () => {
    it('should return the correct logo URL for exact matches', () => {
      expect(getAirlineLogo('emirates')).toBe('https://airhex.com/images/airline-logos/emirates.png');
      expect(getAirlineLogo('air-india')).toBe('https://airhex.com/images/airline-logos/air-india.png');
      expect(getAirlineLogo('qatar airways')).toBe('https://airhex.com/images/airline-logos/qatar-airways.png');
    });

    it('should handle case-insensitive matching', () => {
      expect(getAirlineLogo('Emirates')).toBe('https://airhex.com/images/airline-logos/emirates.png');
      expect(getAirlineLogo('EMIRATES')).toBe('https://airhex.com/images/airline-logos/emirates.png');
      expect(getAirlineLogo('Air India')).toBe('https://airhex.com/images/airline-logos/air-india.png');
    });

    it('should handle whitespace trimming', () => {
      expect(getAirlineLogo('  emirates  ')).toBe('https://airhex.com/images/airline-logos/emirates.png');
      expect(getAirlineLogo('air india ')).toBe('https://airhex.com/images/airline-logos/air-india.png');
    });

    it('should match without "airlines" suffix', () => {
      expect(getAirlineLogo('vistara airlines')).toBe('https://airhex.com/images/airline-logos/vistara.png');
      expect(getAirlineLogo('lufthansa airline')).toBe('https://airhex.com/images/airline-logos/lufthansa.png');
      // This should find 'lufthansa' after removing 'airline' suffix
    });

    it('should match on first word when other matches fail', () => {
      expect(getAirlineLogo('Emirates International')).toBe('https://airhex.com/images/airline-logos/emirates.png');
      expect(getAirlineLogo('Singapore Premium')).toBe('https://airhex.com/images/airline-logos/singapore-airlines.png');
    });

    it('should fall back to a constructed URL for unknown airlines', () => {
      expect(getAirlineLogo('Unknown Airline')).toBe('https://airhex.com/images/airline-logos/unknown-airline.png');
      expect(getAirlineLogo('JetBlue')).toBe('https://airhex.com/images/airline-logos/jetblue.png');
    });
  });

  describe('AIRLINE_LOGOS constant', () => {
    it('should contain entries for major airlines', () => {
      expect(AIRLINE_LOGOS).toHaveProperty('emirates');
      expect(AIRLINE_LOGOS).toHaveProperty('air-india');
      expect(AIRLINE_LOGOS).toHaveProperty('qatar airways');
    });
  });
}); 