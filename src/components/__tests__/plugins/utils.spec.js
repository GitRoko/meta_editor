import { describe, it, expect, expectTypeOf } from 'vitest';

import {
  objectToArray,
  arrayToObject,
  getDefaultGenerator,
  getDefaultField,
  newWidgetType
} from '@/plugins/utils.js';

import {
  testObjectData,
  testArrayData,
  defaultField,
  defaultGeneratorList,
  defaultGenerator,
  widgetTypesList,
  widgetTypes
} from '@/components/__tests__/testData.js';

describe('utils.js test', () => {
  describe('objectToArray', () => {
    it('should convert an object to an array', () => {

      const expectedArrayData = testArrayData

      const result = objectToArray(testObjectData);

      expect(result).toEqual(expectedArrayData);
      expectTypeOf(result).toBeArray();
    });
  });

  describe('arrayToObject', () => {
    it('should convert an array to an object', () => {
 
      const expectedObjectData = testObjectData

      const result = arrayToObject(testArrayData);

      expect(result).toEqual(expectedObjectData);
      expectTypeOf(result).toBeObject();
    });
  });

  describe('getDefaultGenerator', () => {

    defaultGeneratorList.forEach((type) => {
      it(`should return the default generator for type "${type}"`, () => {
        const result = getDefaultGenerator(type);
        expect(result).toEqual(defaultGenerator[type]);
        expectTypeOf(result).toBeObject();
      });
    });
  });

  describe('getDefaultField', () => {

    it('should return the default field', () => {
      const result = getDefaultField();
      expect(result).toEqual(defaultField);
      expectTypeOf(result).toBeObject();
    });
  });

  describe('newWidgetType', () => {
   
    widgetTypesList.forEach((type) => {
      it(`should return the new widget type "${type}"`, () => {
        const result = newWidgetType(type);
        expect(result).toEqual(widgetTypes[type]);
        expectTypeOf(result).toBeObject();
      });
    });
  });
});
