import { describe, it, expect } from 'vitest';
import { currencyToHangul } from './currencyToHangul';

describe('currencyToHangul', () => {
  it('원화 단위 변환', () => {
    expect(currencyToHangul(12345, '₩')).toBe('일만이천삼백사십오원');
  });
  it('달러 단위 변환', () => {
    expect(currencyToHangul(99, '$')).toBe('구십구달러');
  });
  it('유로 단위 변환', () => {
    expect(currencyToHangul(1928, '€')).toBe('천구백이십팔유로');
  });
  it('0보다 작은 수', () => {
    expect(() => currencyToHangul(-20, '₩')).toThrow('amount는 0 이상의 정수여야 합니다.');
  });
  it('정수가 아닌 수', () => {
    expect(() => currencyToHangul(19.29, '₩')).toThrow('amount는 0 이상의 정수여야 합니다.');
  });
});
