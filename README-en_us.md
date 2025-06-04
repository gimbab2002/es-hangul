![es-hangul Logo](https://github.com/toss/es-hangul/assets/69495129/433ddc8c-b32d-4c4c-8b60-5cc9cbe315d3)

# es-hangul &middot; [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/toss/slash/blob/main/LICENSE) [![NPM badge](https://img.shields.io/npm/v/es-hangul?logo=npm)](https://www.npmjs.com/package/es-hangul) [![Discord Badge](https://discord.com/api/guilds/1281071127052943361/widget.png?style=shield)](https://discord.gg/vGXbVjP2nY)

한국어 | [English](https://github.com/toss/es-hangul/blob/main/README-en_us.md)
------------------------------------------

## 🥅 Goal

The goal of this project is to provide an integrated library for handling Hangul (Korean script). It is specifically designed to support the following features:

- Generation of collation keys for sorting Korean words
- Conversion of numbers and currency amounts into Hangul
- Outputting dates in Korean
- Extending the original `es-hangul` open source project and packaging it as a Docker image for reusability

---

## Usage Examples

You can easily perform various Korean text processing tasks such as string sorting, converting amounts to Korean, and converting dates to Korean.

```
import { toCollationKey, sortHangulArray } from 'es-hangul';

const words = ['사과', '가방', '바나나'];
const sorted = sortHangulArray(words);

console.log(sorted); // ['가방', '사과', '바나나']

// You can also check the collation key for a single string.
const key = toCollationKey('사과');
console.log(key); // 'b6b4b791' (syllable-based collation key)
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

---

## 📦 Requirements

The following are the major dependencies and environment settings used inside the Docker container:

- Node.js: 20  
- Yarn: 4.1.1 (enabled via Corepack)  
- Git: installed for cloning the source code within the container  
- TypeScript: ^5.4.3 (installed via devDependencies)  
- Vitest: ^2.1.2 (for running tests)  
- Others: Development tools like ESLint, Prettier, Changesets, tsup are installed automatically via `yarn install`  

---

## 🐳 How to Install & Run

Assuming Docker is already installed, follow the steps below to run this project.

### 1️⃣ Download and Install Docker Image

```bash
docker pull gimbab/final_2021040034:v1
```

This command pulls the latest `es-hangul` image from Docker Hub to your local environment.

### 2️⃣ Create and Run a Docker Container

```bash
docker run -dit gimbab/final_2021040034:v1
docker exec -it <CONTAINER ID> /bin/bash
```

These commands create and run the `es-hangul` container and give you interactive terminal access.

### 3️⃣ Run demo.ts:

```bash
cd ~
cd es-hangul/
yarn install
yarn add -D tsx
yarn tsx demo.ts
```

### 4️⃣ Expected Output:
```
--- CollationKey Functionality ---
Before sorting: [ '사과', '가방', '바나나' ]
After sorting: [ '가방', '바나나', '사과' ]
Collation Key for "사과": 14acacfc

--- CurrencyToHangul Functionality ---
123456789₩ → 일억이천삼백사십오만육천칠백팔십구원
99$ → 구십구달러

--- DateToHangul Functionality ---
2025-06-04 → 이천이십오년 육월 사일
Today's date (2025. 6. 4.) → 이천이십오년 육월 사일
```
### 5️⃣ How to Exit
#### Exit the running container (return to host):
```
ctrl+p+q
```

#### Stop the container running in the background:
```
docker stop <CONTAINER ID>
```

#### Remove the container entirely:
```
docker rm <CONTAINER ID>
```

#### Remove the image as well:
```
docker rmi <IMAGE ID>
```

---

## Directory Structure

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
│   ├── core/
│   │   ├── assemble/
│   │   ├── canBeChoseong/
│   │   ├── canBeJongseong/
│   │   ├── canBeJungseong/
│   │   ├── collationKey/
│   │   ├── combineCharacter/
│   │   ├── combineVowels/
│   │   ├── disassemble/
│   │   ├── disassembleCompleteCharacter/
│   │   ├── disassembleToGroups/
│   │   ├── getChoseong/
│   │   ├── hasBatchim/
│   │   ├── josa/
│   │   └── removeLastCharacter/
│   ├── keyboard/
│   │   ├── convertAlphabetToQwerty/
│   │   ├── convertHangulToQwerty/
│   │   ├── convertQwertyToAlphabet/
│   │   └── convertQwertyToHangul/
│   ├── number/
│   │   ├── amountToHangul/
│   │   ├── currencyToHangul/
│   │   ├── dateToHangul/
│   │   ├── days/
│   │   ├── numberToHangul/
│   │   ├── numberToHangulMixed/
│   │   ├── seosusa/
│   │   └── susa/
│   ├── pronunciation/
│   │   ├── romanize/
│   │   ├── standardizePronunciation/
│   │   └── index.ts
│   ├── _internal/
│   └── index.ts
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
└── yarn.lock
```
---
## Github Action

Unit tests are performed for each code push to the main branch.
Result:

```
 % Coverage report from istanbul
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------|---------|----------|---------|---------|-------------------
All files          |     100 |    99.76 |     100 |     100 |
  _internal        |     100 |      100 |     100 |     100 |
  constants.ts     |     100 |      100 |     100 |     100 |
  hangul.ts        |     100 |      100 |     100 |     100 |
  index.ts         |     100 |      100 |     100 |     100 |
  core/assemble    |     100 |      100 |     100 |     100 |
  assemble.ts      |     100 |      100 |     100 |     100 |
  .../canBeChoseong|     100 |      100 |     100 |     100 |
  canBeChoseong.ts |     100 |      100 |     100 |     100 |
  ...canBeJongseong|     100 |      100 |     100 |     100 |
  ...eJongseong.ts |     100 |      100 |     100 |     100 |
  ...canBeJungseong|     100 |      100 |     100 |     100 |
  ...eJungseong.ts |     100 |      100 |     100 |     100 |
  core/collationKey|     100 |    96.96 |     100 |     100 |
  collationKey.ts  |     100 |    96.96 |     100 |     100 | 39
  ...mbineCharacter|     100 |      100 |     100 |     100 |
  ...eCharacter.ts |     100 |      100 |     100 |     100 |
  .../combineVowels|     100 |      100 |     100 |     100 |
  combineVowels.ts |     100 |      100 |     100 |     100 |
  core/disassemble |     100 |      100 |     100 |     100 |
  disassemble.ts   |     100 |      100 |     100 |     100 |
  ...pleteCharacter|     100 |      100 |     100 |     100 |
  ...eCharacter.ts |     100 |      100 |     100 |     100 |
  ...sembleToGroups|     100 |      100 |     100 |     100 |
  ...leToGroups.ts |     100 |      100 |     100 |     100 |
  core/getChoseong |     100 |      100 |     100 |     100 |
  constants.ts     |     100 |      100 |     100 |     100 |
  getChoseong.ts   |     100 |      100 |     100 |     100 |
  core/hasBatchim  |     100 |      100 |     100 |     100 |
  hasBatchim.ts    |     100 |      100 |     100 |     100 |
  core/josa        |     100 |      100 |     100 |     100 |
  josa.ts          |     100 |      100 |     100 |     100 |
  ...eLastCharacter|     100 |      100 |     100 |     100 |
  ...tCharacter.ts |     100 |      100 |     100 |     100 |
  ...HangulToQwerty|     100 |      100 |     100 |     100 |
  constants.ts     |     100 |      100 |     100 |     100 |
  ...ulToQwerty.ts |     100 |      100 |     100 |     100 |
  ...ertyToAlphabet|     100 |      100 |     100 |     100 |
  constants.ts     |     100 |      100 |     100 |     100 |
  ...ToAlphabet.ts |     100 |      100 |     100 |     100 |
  ...QwertyToHangul|     100 |      100 |     100 |     100 |
  ...tyToHangul.ts |     100 |      100 |     100 |     100 |
  ...amountToHangul|     100 |      100 |     100 |     100 |
  ...ntToHangul.ts |     100 |      100 |     100 |     100 |
  ...rrencyToHangul|     100 |      100 |     100 |     100 |
  ...cyToHangul.ts |     100 |      100 |     100 |     100 |
  ...r/dateToHangul|     100 |      100 |     100 |     100 |
  dateToHangul.ts  |     100 |      100 |     100 |     100 |
  number/days      |     100 |      100 |     100 |     100 |
  constants.ts     |     100 |      100 |     100 |     100 |
  days.ts          |     100 |      100 |     100 |     100 |
  ...numberToHangul|     100 |      100 |     100 |     100 |
  ...erToHangul.ts |     100 |      100 |     100 |     100 |
  ...rToHangulMixed|     100 |      100 |     100 |     100 |
  ...angulMixed.ts |     100 |      100 |     100 |     100 |
  number/seosusa   |     100 |      100 |     100 |     100 |
  constants.ts     |     100 |      100 |     100 |     100 |
  seosusa.ts       |     100 |      100 |     100 |     100 |
  number/susa      |     100 |      100 |     100 |     100 |
  constants.ts     |     100 |      100 |     100 |     100 |
  susa.ts          |     100 |      100 |     100 |     100 |
  ...ation/romanize|     100 |      100 |     100 |     100 |
  constants.ts     |     100 |      100 |     100 |     100 |
  romanize.ts      |     100 |      100 |     100 |     100 |
  ...ePronunciation|     100 |      100 |     100 |     100 |
  constants.ts     |     100 |      100 |     100 |     100 |
  ...nunciation.ts |     100 |      100 |     100 |     100 |
  ...nciation/rules|     100 |      100 |     100 |     100 |
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
---
## License

MIT © Viva Republica, Inc. See the [LICENSE](https://github.com/gimbab2002/es-hangul/blob/main/LICENSE) file for details.

<a title="Toss" href="https://toss.im">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://static.toss.im/logos/png/4x/logo-toss-reverse.png">
    <img alt="Toss" src="https://static.toss.im/logos/png/4x/logo-toss.png" width="100">
  </picture>
</a>
