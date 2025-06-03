// src/number/dateToHangul.ts

import { numberToHangul } from '@/number/numberToHangul';

/**
 * yyyy-MM-dd 형식 문자열 또는 Date 객체를 받아
 * "이천이십오년 육월 삼일" 같은 한글 표기로 변환합니다.
 *
 * - 입력이 string이면 Date로 파싱(UTC가 아닌 로컬 타임존 기준).
 * - 출력 시 연도·월·일 사이에 공백을 넣고, 각 단위를 numberToHangul로 변환 후
 *   년/월/일 글자를 붙입니다.
 */
export function dateToHangul(input: string | Date): string {
  let date: Date;

  if (typeof input === 'string') {
    // "YYYY-MM-DD" 형식이라고 가정
    const [y, m, d] = input.split('-').map(v => parseInt(v, 10));
    // 월(month)은 JS Date에서 0-based이므로 (m-1)
    date = new Date(y, m - 1, d);
  } else {
    date = input;
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // JS Date의 getMonth()는 0~11 반환
  const day = date.getDate();

  // numberToHangul: 예를 들어 2025 → "이천이십오", 6 → "육", 3 → "삼"
  const yearHangul = numberToHangul(year);
  const monthHangul = numberToHangul(month);
  const dayHangul = numberToHangul(day);

  // 조합해서 반환
  return `${yearHangul}년 ${monthHangul}월 ${dayHangul}일`;
}
