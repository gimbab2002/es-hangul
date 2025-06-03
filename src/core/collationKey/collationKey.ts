import {
  COMPLETE_HANGUL_START_CHARCODE,
  COMPLETE_HANGUL_END_CHARCODE,
  NUMBER_OF_JUNGSEONG,
  NUMBER_OF_JONGSEONG,
  CHOSEONGS,
  DISASSEMBLED_VOWELS_BY_VOWEL,
  DISASSEMBLED_CONSONANTS_BY_CONSONANT,
} from '@/_internal/constants';
import { disassembleCompleteCharacter } from '@/core/disassembleCompleteCharacter';

/** 한글 음절(U+AC00~U+D7A3) 범위 확인용 정규식 */
const HANGUL_REGEX = /[가-힣]/;

/**
 * 한 글자를 “사전 순 키” 정수로 변환
 */
function syllableToKey(ch: string): number {
  const code = ch.charCodeAt(0);

  if (code < COMPLETE_HANGUL_START_CHARCODE || code > COMPLETE_HANGUL_END_CHARCODE) {
    return code;
  }

  const parts = disassembleCompleteCharacter(ch);
  if (!parts) {
    return code;
  }

  const { choseong, jungseong, jongseong } = parts;
  const ci = CHOSEONGS.indexOf(choseong);

  const jungList = Object.keys(DISASSEMBLED_VOWELS_BY_VOWEL) as Array<keyof typeof DISASSEMBLED_VOWELS_BY_VOWEL>;
  const ji = jungList.indexOf(jungseong as keyof typeof DISASSEMBLED_VOWELS_BY_VOWEL);

  const jongList = Object.keys(DISASSEMBLED_CONSONANTS_BY_CONSONANT) as Array<
    keyof typeof DISASSEMBLED_CONSONANTS_BY_CONSONANT
  >;
  const ti = jongList.indexOf((jongseong ?? '') as keyof typeof DISASSEMBLED_CONSONANTS_BY_CONSONANT);

  if (ci < 0 || ji < 0 || ti < 0) {
    return code;
  }

  return ci * NUMBER_OF_JUNGSEONG * NUMBER_OF_JONGSEONG + ji * NUMBER_OF_JONGSEONG + ti;
}

/**
 * 문자열 전체를 “사전 순 키” 16진수 문자열로 바꿔서 반환
 */
export function toCollationKey(str: string): string {
  return Array.from(str)
    .map(ch => keyToPaddedHex(syllableToKey(ch)))
    .join('');
}

function keyToPaddedHex(key: number): string {
  return key.toString(16).padStart(4, '0');
}

/**
 * 한글(및 그 외 문자열 포함) 배열을 “한글 사전 순”으로 정렬한 뒤,
 * 모든 한글 포함 요소를 앞으로, 그 외(예: 영어만) 요소는 뒤로 보내서 반환
 */
export function sortHangulArray(arr: string[]): string[] {
  return [...arr].sort((a, b) => {
    const aHasHangul = HANGUL_REGEX.test(a);
    const bHasHangul = HANGUL_REGEX.test(b);

    // 1) a에는 한글이 있고 b에는 없으면, a가 앞으로
    if (aHasHangul && !bHasHangul) {
      return -1;
    }
    // 2) b에는 한글이 있고 a에는 없으면, b가 앞으로
    if (!aHasHangul && bHasHangul) {
      return 1;
    }
    // 3) 둘 다 한글이 포함되어 있으면, 사전 순 키 비교
    if (aHasHangul && bHasHangul) {
      const ka = toCollationKey(a);
      const kb = toCollationKey(b);
      if (ka < kb) {
        return -1;
      }
      if (ka > kb) {
        return 1;
      }
      return 0;
    }
    // 4) 둘 다 한글이 전혀 없으면(영어만 등), 원래 순서 유지(0)
    return a < b ? -1 : a > b ? 1 : 0;
  });
}
