import { describe, it, expect } from 'vitest'
import { rules } from '@/validation/rules.js'

// const { rules } = require('./rules');

describe('rules', () => {
  describe('regexp', () => {
    it('should return true if regexp is undefined', () => {
      const value = 'abc';
      const regexp = undefined;
      const result = rules.regexp(value, regexp);
      expect(result).toBe(true);
    }); 

    it('should return true if value matches the regular expression', () => {
      const value = 'abc';
      const regexp = /^abc$/;
      const result = rules.regexp(value, regexp);
      expect(result).toBe(true);
    });

    it('should return a string if value does not match the regular expression', () => {
      const value = 'def';
      const regexp = /^abc$/;
      const result = rules.regexp(value, regexp);
      expect(typeof result).toBe('string');
      expect(result).toContain('Invalid, rule');
    });
  });

  describe('unique', () => {
    it('should return "Value is required." if newValue is falsy', () => {
      const newValue = null;
      const oldValue = 'abc';
      const isUnique = true;
      const list = ['abc', 'def'];
      const result = rules.unique(newValue, oldValue, isUnique, list);
      expect(result).toBe('Value is required.');
    });

    it('should return true if isUnique is falsy', () => {
      const newValue = 'abc';
      const oldValue = 'abc';
      const isUnique = false;
      const list = ['abc', 'def'];
      const result = rules.unique(newValue, oldValue, isUnique, list);
      expect(result).toBe(true);
    });

    it('should return true if newValue is unique in the list', () => {
      const newValue = 'ghi';
      const oldValue = 'abc';
      const isUnique = true;
      const list = ['abc', 'def'];
      const result = rules.unique(newValue, oldValue, isUnique, list);
      expect(result).toBe(true);
    });

    it('should return a string if newValue is not unique in the list', () => {
      const newValue = 'def';
      const oldValue = 'abc';
      const isUnique = true;
      const list = ['abc', 'def'];
      const result = rules.unique(newValue, oldValue, isUnique, list);
      expect(typeof result).toBe('string');
      expect(result).toContain('Value is not unique');
    });
  });

  describe('isValidEnum', () => {
    it('should return true if value is in the enumList', () => {
      const value = 'option1';
      const enumList = ['option1', 'option2', 'option3'];
      const result = rules.isValidEnum(value, enumList);
      expect(result).toBe(true);
    });

    it('should return a string if value is not in the enumList', () => {
      const value = 'option4';
      const enumList = ['option1', 'option2', 'option3'];
      const result = rules.isValidEnum(value, enumList);
      expect(typeof result).toBe('string');
      expect(result).toContain('Invalid value');
    });
  });

  describe('required', () => {
    it('should return true if v is truthy', () => {
      const v = 'value';
      const result = rules.required(v);
      expect(result).toBe(true);
    });

    it('should return a string if v is falsy', () => {
      const v = null;
      const result = rules.required(v);
      expect(typeof result).toBe('string');
      expect(result).toContain('Required field');
    });
  });
});