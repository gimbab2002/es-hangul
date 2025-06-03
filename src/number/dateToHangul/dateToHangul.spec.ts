import { describe, it, expect } from 'vitest';
import { dateToHangul } from './dateToHangul';

describe('dateToHangul', () => {
  it('문자열 포맷 입력', () => {
    expect(dateToHangul('2025-06-03')).toBe('이천이십오년 육월 삼일');
  });
  it('Date 객체 입력', () => {
    const d = new Date(1999, 11, 31); // 1999년 12월 31일
    expect(dateToHangul(d)).toBe('천구백구십구년 십이월 삼십일일');
  });
});
