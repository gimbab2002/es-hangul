// src/number/currencyToHangul.ts

import { numberToHangul } from '@/number/numberToHangul';

type Currency = '₩' | '$' | '€'; // 필요하다면 더 추가 가능

const currencyUnitMap: Record<Currency, string> = {
  '₩': '원',
  $: '달러',
  '€': '유로',
};

/**
 * amount(정수)와 통화 코드("KRW", "USD", "EUR" 등)을 받아
 * 예: (12345, 'KRW') → "일만이천삼백사십오원"
 *     (99, 'USD')   → "구십구달러"
 */
export function currencyToHangul(amount: number, currency: Currency): string {
  if (!Number.isInteger(amount) || amount < 0) {
    throw new Error('amount는 0 이상의 정수여야 합니다.');
  }

  const hangulNumber = numberToHangul(amount);
  const unit = currencyUnitMap[currency];
  return `${hangulNumber}${unit}`;
}
