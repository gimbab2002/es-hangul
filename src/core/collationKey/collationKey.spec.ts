// src/core/collationKey/collationKey.spec.ts

import { describe, it, expect, vi } from 'vitest';
import * as disassembleModule from '@/core/disassembleCompleteCharacter';
import { toCollationKey, sortHangulArray } from './collationKey';

// disassembleCompleteCharacter의 원래 반환 타입 (undefined 가능)
type RawReturn = ReturnType<typeof disassembleModule.disassembleCompleteCharacter>;
// 모킹용으로는 “undefined 제외”한 순수 Disassembled 형태만 쓰겠다고 선언
type Disassembled = NonNullable<RawReturn>;

describe('toCollationKey', () => {
  it('단일 음절 순서가 키값에 반영되어야 한다', () => {
    const keyA = toCollationKey('가');
    const keyB = toCollationKey('나');
    expect(keyA < keyB).toBe(true);
  });

  it('“각” vs “간”의 정렬 우선순위 확인', () => {
    expect(toCollationKey('각') < toCollationKey('간')).toBe(true);
  });

  it('한글이 아닌 문자는 코드포인트를 그대로 16진수로 변환한다 (27번 줄)', () => {
    const char = 'A';
    const expected = char.charCodeAt(0).toString(16).padStart(4, '0');
    expect(toCollationKey(char)).toBe(expected);
  });

  it('disassembleCompleteCharacter가 undefined를 반환하면 27번 줄 분기', () => {
    const originalFn = disassembleModule.disassembleCompleteCharacter;

    // 모킹 함수는 “무조건 Disassembled(=NonNullable)만 반환”이라고 선언
    vi.spyOn(disassembleModule, 'disassembleCompleteCharacter').mockImplementation((ch: string): Disassembled => {
      if (ch === '가') {
        // undefined 대신 “null as unknown as Disassembled”로 강제 캐스팅
        return null as unknown as Disassembled;
      }
      // 나머지는 원래 함수가 반환하는 객체가 절대로 undefined가 아니므로
      return originalFn(ch)! as Disassembled;
    });

    const hex = toCollationKey('가');
    // '가'.charCodeAt(0) === 0xAC00 → 16진수 "ac00"
    expect(hex).toBe('ac00');

    vi.restoreAllMocks();
  });

  it('parts는 있지만 음소 인덱스가 -1인 경우(42번 줄)', () => {
    const originalFn = disassembleModule.disassembleCompleteCharacter;

    // 이 모킹 또한 “무조건 Disassembled만 반환”이라고 선언
    vi.spyOn(disassembleModule, 'disassembleCompleteCharacter').mockImplementation((ch: string): Disassembled => {
      if (ch === '각') {
        // Disassembled 타입에 필요한 프로퍼티만 넣고, as unknown as Disassembled로 캐스팅
        return {
          choseong: '잘못된초성',
          jungseong: '잘못된중성',
          jongseong: '잘못된종성',
        } as unknown as Disassembled;
      }
      return originalFn(ch)! as Disassembled;
    });

    const hex = toCollationKey('각');
    // '각'.charCodeAt(0) === 0xAC01 → 16진수 "ac01"
    expect(hex).toBe('ac01');

    vi.restoreAllMocks();
  });
});

describe('sortHangulArray', () => {
  it('여러 단어를 한글 사전식으로 정렬해야 한다', () => {
    const arr = ['바나나', '가나다', '각', '간', '가다'];
    const sorted = sortHangulArray(arr);
    expect(sorted).toEqual(['가나다', '가다', '각', '간', '바나나']);
  });

  it('한글 없는 문자열(영어 등)은 모두 한글 뒤에 오며, 알파벳 순으로 정렬된다', () => {
    const arr = ['abc', '가', 'A', '각', '다'];
    const sorted = sortHangulArray(arr);
    expect(sorted).toEqual(['가', '각', '다', 'A', 'abc']);
  });

  it('영어만 있는 배열은 알파벳 순으로 정렬된다', () => {
    const arr = ['z', 'a', 'm'];
    const sorted = sortHangulArray(arr);
    expect(sorted).toEqual(['a', 'm', 'z']);
  });

  it('동일한 한글 문자열끼리 비교 시 return 0 분기를 탄다', () => {
    const arr = ['가', '가'];
    const sorted = sortHangulArray(arr);
    expect(sorted).toEqual(['가', '가']);
  });

  it('한글 하나 + 동일한 영어 두 개 → 영어끼리 비교 시 return 0 분기', () => {
    const arr = ['가', 'A', 'A'];
    const sorted = sortHangulArray(arr);
    expect(sorted).toEqual(['가', 'A', 'A']);
  });

  it('동일한 영어 문자열끼리 비교 시 return 0 분기를 탄다', () => {
    const arr = ['A', 'A'];
    const sorted = sortHangulArray(arr);
    expect(sorted).toEqual(['A', 'A']);
  });
});
