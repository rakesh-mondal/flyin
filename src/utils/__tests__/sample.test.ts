describe('Sample test', () => {
  it('should pass basic validation', () => {
    expect(1 + 1).toBe(2);
  });

  it('should handle truthy/falsy values', () => {
    expect(true).toBeTruthy();
    expect(false).toBeFalsy();
    expect(null).toBeNull();
    expect(undefined).toBeUndefined();
  });

  it('should verify arrays', () => {
    const arr = [1, 2, 3];
    expect(arr).toHaveLength(3);
    expect(arr).toContain(2);
  });

  it('should verify objects', () => {
    const obj = { name: 'Flyin', type: 'app' };
    expect(obj).toHaveProperty('name');
    expect(obj.name).toBe('Flyin');
  });
}); 