'use strict';
import { expect } from 'chai';
import { handleErrors } from '../../app/lib/api';

describe('api helper', () => {
  describe('handleErrors', () => {
    it('should throw error if response is not ok', () => {
      let mockResponse = { ok: false };
      expect(() => handleErrors(mockResponse)).to.throw(Error);
    });

    it('should return response otherwise', () => {
      let mockResponse = { ok: true };
      expect(handleErrors(mockResponse)).to.eql({ ok: true });
    });
  });
});
