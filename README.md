![es-hangul 로고](https://github.com/toss/es-hangul/assets/69495129/433ddc8c-b32d-4c4c-8b60-5cc9cbe315d3)


# es-hangul &middot; [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/toss/slash/blob/main/LICENSE)  [![NPM badge](https://img.shields.io/npm/v/es-hangul?logo=npm)](https://www.npmjs.com/package/es-hangul)  [![Discord Badge](https://discord.com/api/guilds/1281071127052943361/widget.png?style=shield)](https://discord.gg/vGXbVjP2nY)

한국어 | [English](https://github.com/gimbab2002/es-hangul/blob/main/README-en_us.md)
------------------------------------------
## 🥅 Goal

프로젝트의 목적은 한글 처리 기능을 통합적으로 제공하는 라이브러리를 완성하는 것입니다. 이 프로젝트는 특히 다음과 같은 기능 구현을 목적으로 구성하였습니다.

- 한글 정렬을 위한 collation key 생성

- 숫자 및 금액의 한글 표현 변환

- 날짜를 한국어로 출력

- 기존 es-hangul 오픈소스에 기능을 추가하고, 도커 이미지로 배포하여 재사용 가능하도록 패키징
--------------
## 사용 예시

문자열 정렬, 금액 한글 변환, 날짜 한글 변환 등 다양한 한글 처리를 간편하게 할 수 있습니다.

```
import { toCollationKey, sortHangulArray } from 'es-hangul';

const words = ['사과', '가방', '바나나'];
const sorted = sortHangulArray(words);

console.log(sorted); // ['가방', '사과', '바나나']

// 단일 문자열의 정렬 키를 확인할 수도 있습니다.
const key = toCollationKey('사과');
console.log(key); // 'b6b4b791' (음절 기반 정렬 키)
```
```
import { currencyToHangul } from 'es-hangul';

const amount = 123456789;
const hangulAmount = currencyToHangul(amount, '₩');

console.log(hangulAmount); // '일억이천삼백사십오만육천칠백팔십구원'
```
```
import { dateToHangul } from 'es-hangul';

const date = new Date('2024-08-15');
const hangulDate = dateToHangul(date);

console.log(hangulDate); // '이천이십사년 팔월 십오일'
```
-----------------------
## 📦 Requirements
아래는 Docker 컨테이너 내에서 설치되어 있는 주요 라이브러리 및 환경입니다:

- Node.js: 20 

- Yarn: 4.1.1 (corepack으로 활성화됨)

- Git: 컨테이너에서 코드 clone을 위해 설치

- TypeScript: ^5.4.3 (devDependencies로 설치됨)

- Vitest: ^2.1.2 (테스트 실행용)

- 기타: ESLint, Prettier, Changesets, tsup 등 개발 도구는 모두 yarn install 시 설치됩니다.
-------------------------
## 🐳 How to Install & Run
Docker가 설치되어 있다는 전제 하에, 다음 단계대로 실행하면 됩니다.

#### 1️⃣ Docker Image 다운로드 및 설치
```
docker pull gimbab/final_2021040034:v1
```
위 명령어는 Docker Hub에 업로드된 최신 es-hangul 이미지를 로컬에 다운로드합니다.

#### 2️⃣ Docker Container 생성 및 실행
```
docker run -dit gimbab/final_2021040034:v1
docker exec -it <CONTAINER ID> /bin/bash
```
위 명령어는 es-hangul 컨테이너를 생성하고 대화형 터미널로 진입합니다.

#### 3️⃣ demo.ts 실행:
```
cd ~
cd es-hangul/
yarn install
yarn add -D tsx
yarn tsx demo.ts
```
#### 4️⃣ 예상 실행 결과: 
```
--- CollationKey 기능 ---
정렬 전: [ '사과', '가방', '바나나' ]
정렬 후: [ '가방', '바나나', '사과' ]
"사과"의 Collation Key: 14acacfc

--- CurrencyToHangul 기능 ---
123456789₩ → 일억이천삼백사십오만육천칠백팔십구원
99$ → 구십구달러

--- DateToHangul 기능 ---
2025-06-04 → 이천이십오년 육월 사일
오늘 날짜(2025. 6. 4.) → 이천이십오년 육월 사일
```
#### 5️⃣ 실행 종료 방법
컨테이너를 일시 중지하거나 종료하려면 아래 명령을 사용합니다:
##### 실행 중인 컨테이너 나가기 (exit 입력)
```
ctrl+p+q 입력
```
##### 백그라운드 실행 후 중지하려면:
```
docker stop <CONTAINER ID>
```
##### 완전히 제거하려면:
```
docker rm <CONTAINER ID>
```
##### 이미지까지 제거하려면:
```
docker rmi <IMAGE ID> 
```
---------------------------------
#### 디렉토리 구조
```
es-hangul/
├── .changeset/
├── .circleci/
├── .github/
├── .scripts/
├── .vscode/
├── .yarn/
├── benchmarks/
├── coverage/
├── docs/
├── node_modules/
├── src/
│   ├── core/
│   │   ├── assemble/
│   │   ├── canBeChoseong/
│   │   ├── canBeJongseong/
│   │   ├── canBeJungseong/
│   │   ├── collationKey/
│   │   ├── combineCharacter/
│   │   ├── combineVowels/
│   │   ├── disassemble/
│   │   ├── disassembleCompleteCharacter/
│   │   ├── disassembleToGroups/
│   │   ├── getChoseong/
│   │   ├── hasBatchim/
│   │   ├── josa/
│   │   ├── removeLastCharacter/
│   │   └── index.ts
│   ├── keyboard/
│   │   ├── convertAlphabetToQwerty/
│   │   ├── convertHangulToQwerty/
│   │   ├── convertQwertyToAlphabet/
│   │   ├── convertQwertyToHangul/
│   │   └── index.ts
│   ├── number/
│   │   ├── amountToHangul/
│   │   ├── currencyToHangul/
│   │   ├── dateToHangul/
│   │   ├── days/
│   │   ├── numberToHangul/
│   │   ├── numberToHangulMixed/
│   │   ├── seosusa/
│   │   ├── susa/
│   │   └── index.ts
│   ├── pronunciation/
│   │   ├── romanize/
│   │   ├── standardizePronunciation/
│   │   └── index.ts
│   ├── _internal/
│   └── index.ts
├── .eslintrc.js
├── .gitignore
├── .nvmrc
├── .prettierrc
├── .yarnrc.yml
├── CHANGELOG.md
├── codecov.yml
├── cspell.json
├── demo.ts
├── Dockerfile
├── LICENSE
├── mise.toml
├── netlify.toml
├── package.json
├── packlint.config.mjs
├── README.md
├── README-en_us.md
├── SECURITY.md
├── tsconfig.json
├── tsup.config.ts
├── vitest.config.mts
├── yarn.lock
```
----------------------------------
## github action

main에 push할 때마다, 코드별로 유닛테스트를 진행합니다. 
결과: 
```
 % Coverage report from istanbul
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------|---------|----------|---------|---------|-------------------
All files          |     100 |    99.76 |     100 |     100 |                   
 _internal         |     100 |      100 |     100 |     100 |                   
  constants.ts     |     100 |      100 |     100 |     100 |                   
  hangul.ts        |     100 |      100 |     100 |     100 |                   
  index.ts         |     100 |      100 |     100 |     100 |                   
 core/assemble     |     100 |      100 |     100 |     100 |                   
  assemble.ts      |     100 |      100 |     100 |     100 |                   
 .../canBeChoseong |     100 |      100 |     100 |     100 |                   
  canBeChoseong.ts |     100 |      100 |     100 |     100 |                   
 ...canBeJongseong |     100 |      100 |     100 |     100 |                   
  ...eJongseong.ts |     100 |      100 |     100 |     100 |                   
 ...canBeJungseong |     100 |      100 |     100 |     100 |                   
  ...eJungseong.ts |     100 |      100 |     100 |     100 |                   
 core/collationKey |     100 |    96.96 |     100 |     100 |                   
  collationKey.ts  |     100 |    96.96 |     100 |     100 | 39                
 ...mbineCharacter |     100 |      100 |     100 |     100 |                   
  ...eCharacter.ts |     100 |      100 |     100 |     100 |                   
 .../combineVowels |     100 |      100 |     100 |     100 |                   
  combineVowels.ts |     100 |      100 |     100 |     100 |                   
 core/disassemble  |     100 |      100 |     100 |     100 |                   
  disassemble.ts   |     100 |      100 |     100 |     100 |                   
 ...pleteCharacter |     100 |      100 |     100 |     100 |                   
  ...eCharacter.ts |     100 |      100 |     100 |     100 |                   
 ...sembleToGroups |     100 |      100 |     100 |     100 |                   
  ...leToGroups.ts |     100 |      100 |     100 |     100 |                   
 core/getChoseong  |     100 |      100 |     100 |     100 |                   
  constants.ts     |     100 |      100 |     100 |     100 |                   
  getChoseong.ts   |     100 |      100 |     100 |     100 |                   
 core/hasBatchim   |     100 |      100 |     100 |     100 |                   
  hasBatchim.ts    |     100 |      100 |     100 |     100 |                   
 core/josa         |     100 |      100 |     100 |     100 |                   
  josa.ts          |     100 |      100 |     100 |     100 |                   
 ...eLastCharacter |     100 |      100 |     100 |     100 |                   
  ...tCharacter.ts |     100 |      100 |     100 |     100 |                   
 ...HangulToQwerty |     100 |      100 |     100 |     100 |                   
  constants.ts     |     100 |      100 |     100 |     100 |                   
  ...ulToQwerty.ts |     100 |      100 |     100 |     100 |                   
 ...ertyToAlphabet |     100 |      100 |     100 |     100 |                   
  constants.ts     |     100 |      100 |     100 |     100 |                   
  ...ToAlphabet.ts |     100 |      100 |     100 |     100 |                   
 ...QwertyToHangul |     100 |      100 |     100 |     100 |                   
  ...tyToHangul.ts |     100 |      100 |     100 |     100 |                   
 ...amountToHangul |     100 |      100 |     100 |     100 |                   
  ...ntToHangul.ts |     100 |      100 |     100 |     100 |                   
 ...rrencyToHangul |     100 |      100 |     100 |     100 |                   
  ...cyToHangul.ts |     100 |      100 |     100 |     100 |                   
 ...r/dateToHangul |     100 |      100 |     100 |     100 |                   
  dateToHangul.ts  |     100 |      100 |     100 |     100 |                   
 number/days       |     100 |      100 |     100 |     100 |                   
  constants.ts     |     100 |      100 |     100 |     100 |                   
  days.ts          |     100 |      100 |     100 |     100 |                   
 ...numberToHangul |     100 |      100 |     100 |     100 |                   
  ...erToHangul.ts |     100 |      100 |     100 |     100 |                   
 ...rToHangulMixed |     100 |      100 |     100 |     100 |                   
  ...angulMixed.ts |     100 |      100 |     100 |     100 |                   
 number/seosusa    |     100 |      100 |     100 |     100 |                   
  constants.ts     |     100 |      100 |     100 |     100 |                   
  seosusa.ts       |     100 |      100 |     100 |     100 |                   
 number/susa       |     100 |      100 |     100 |     100 |                   
  constants.ts     |     100 |      100 |     100 |     100 |                   
  susa.ts          |     100 |      100 |     100 |     100 |                   
 ...ation/romanize |     100 |      100 |     100 |     100 |                   
  constants.ts     |     100 |      100 |     100 |     100 |                   
  romanize.ts      |     100 |      100 |     100 |     100 |                   
 ...ePronunciation |     100 |      100 |     100 |     100 |                   
  constants.ts     |     100 |      100 |     100 |     100 |                   
  ...nunciation.ts |     100 |      100 |     100 |     100 |                   
 ...nciation/rules |     100 |      100 |     100 |     100 |                   
  rules.utils.ts   |     100 |      100 |     100 |     100 |                   
  transform12th.ts |     100 |      100 |     100 |     100 |                   
  ...m13And14th.ts |     100 |      100 |     100 |     100 |                   
  transform16th.ts |     100 |      100 |     100 |     100 |                   
  transform17th.ts |     100 |      100 |     100 |     100 |                   
  transform18th.ts |     100 |      100 |     100 |     100 |                   
  transform19th.ts |     100 |      100 |     100 |     100 |                   
  transform20th.ts |     100 |      100 |     100 |     100 |                   
  ...d10And11th.ts |     100 |      100 |     100 |     100 |                   
  ...Conversion.ts |     100 |      100 |     100 |     100 |                   
  ...similation.ts |     100 |      100 |     100 |     100 |                   
-------------------|---------|----------|---------|---------|-------------------
```
----------------------------------
## 라이선스

MIT © Viva Republica, Inc. [LICENSE](https://github.com/gimbab2002/es-hangul/blob/main/LICENSE) 파일을 참고하세요.

<a title="토스" href="https://toss.im">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://static.toss.im/logos/png/4x/logo-toss-reverse.png">
    <img alt="토스" src="https://static.toss.im/logos/png/4x/logo-toss.png" width="100">
  </picture>
</a>

