'use strict';
import { expect } from 'chai';
import api from '../../app/lib/api';

describe('API Helpers', () => {
  describe('handleErrors', () => {
    it('should throw error if response is not ok', () => {
      let mockResponse = { ok: false };
      expect(() => api.handleErrors(mockResponse)).to.throw(Error);
    });

    it('should return response otherwise', () => {
      let mockResponse = { ok: true };
      expect(api.handleErrors(mockResponse)).to.eql({ ok: true });
    });
  });
});
