![es-hangul 로고](https://github.com/toss/es-hangul/assets/69495129/433ddc8c-b32d-4c4c-8b60-5cc9cbe315d3)


# es-hangul &middot; [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/toss/slash/blob/main/LICENSE)  [![NPM badge](https://img.shields.io/npm/v/es-hangul?logo=npm)](https://www.npmjs.com/package/es-hangul)  [![Discord Badge](https://discord.com/api/guilds/1281071127052943361/widget.png?style=shield)](https://discord.gg/vGXbVjP2nY)

한국어 | [English](https://github.com/toss/es-hangul/blob/main/README-en_us.md)

## 🥅 Goal
es-hangul 프로젝트의 목적은 한글 처리 기능을 통합적으로 제공하는 라이브러리를 완성하는 것입니다. 이 프로젝트는 특히 다음과 같은 기능을 중심으로 구현 및 개선되었습니다.
-----------
##### 한글 정렬을 위한 collation key 생성

##### 숫자 및 금액의 한글 표현 변환

##### 날짜를 한국어로 출력

##### 조사 자동화 처리 및 초성 기반 검색 지원

##### 기존 es-hangul 오픈소스에 기능을 추가하고, 도커 이미지로 배포하여 재사용 가능하도록 패키징
--------------
## 사용 예시

문자열 정렬, 금액 한글 변환, 날짜 한글 변환 등 다양한 한글 처리를 간편하게 할 수 있습니다.

```tsx
import { toCollationKey, sortHangulArray } from 'es-hangul';

const words = ['사과', '가방', '바나나'];
const sorted = sortHangulArray(words);

console.log(sorted); // ['가방', '사과', '바나나']

// 단일 문자열의 정렬 키를 확인할 수도 있습니다.
const key = toCollationKey('사과');
console.log(key); // 'b6b4b791' (음절 기반 정렬 키)
```
```tsx
import { currencyToHangul } from 'es-hangul';

const amount = 123456789;
const hangulAmount = currencyToHangul(amount, '₩');

console.log(hangulAmount); // '일억이천삼백사십오만육천칠백팔십구원'
```
```tsx
import { dateToHangul } from 'es-hangul';

const date = new Date('2024-08-15');
const hangulDate = dateToHangul(date);

console.log(hangulDate); // '이천이십사년 팔월 십오일'
```
-----------------------
## 📦 Requirements
아래는 Docker 컨테이너 내에서 설치되어 있는 주요 라이브러리 및 환경입니다:

## 라이선스

MIT © Viva Republica, Inc. [LICENSE](https://github.com/toss/es-hangul/blob/main/LICENSE) 파일을 참고하세요.

<a title="토스" href="https://toss.im">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://static.toss.im/logos/png/4x/logo-toss-reverse.png">
    <img alt="토스" src="https://static.toss.im/logos/png/4x/logo-toss.png" width="100">
  </picture>
</a>

