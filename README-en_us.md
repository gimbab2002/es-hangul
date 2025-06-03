![es-hangul Logo](https://github.com/toss/es-hangul/assets/69495129/433ddc8c-b32d-4c4c-8b60-5cc9cbe315d3)

# es-hangul &middot; [![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/toss/slash/blob/main/LICENSE)  [![NPM badge](https://img.shields.io/npm/v/es-hangul?logo=npm)](https://www.npmjs.com/package/es-hangul)  [![Discord Badge](https://discord.com/api/guilds/1281071127052943361/widget.png?style=shield)](https://discord.gg/vGXbVjP2nY)

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

You can easily perform various Hangul-related operations such as string sorting, currency conversion, and date formatting:

```ts
import { toCollationKey, sortHangulArray } from 'es-hangul';

const words = ['사과', '가방', '바나나'];
const sorted = sortHangulArray(words);

console.log(sorted); // ['가방', '사과', '바나나']

// You can also retrieve a collation key for an individual string.
const key = toCollationKey('사과');
console.log(key); // 'b6b4b791' (syllable-based collation key)
```

```ts
import { currencyToHangul } from 'es-hangul';

const amount = 123456789;
const hangulAmount = currencyToHangul(amount, '₩');

console.log(hangulAmount); // '일억이천삼백사십오만육천칠백팔십구원'
```

```ts
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

**This repository is a JavaScript library written in TypeScript, and is intended to be executed via unit tests.**

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

### 3️⃣ Run Tests

```bash
cd ~
cd es-hangul/
yarn install
yarn test
```

### 4️⃣ Stop or Remove the Container

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
│   ├── _internal/
│   ├── core/
│   ├── keyboard/
│   ├── number/
│   ├── pronunciation/
│   └── index.ts
├── .eslintrc.js
├── .gitignore
├── .nvmrc
├── .prettierrc
├── .yarnrc.yml
├── CHANGELOG.md
├── codecov.yml
├── cspell.json
├── Dockerfile
├── LICENSE
├── mise.toml
├── netlify.toml
├── package.json
├── packlint.config.mjs
├── README-en_us.md
├── README.md
├── SECURITY.md
├── tsconfig.json
├── tsup.config.ts
├── vitest.config.mts
└── yarn.lock
```

---

## License

MIT © Viva Republica, Inc. See the [LICENSE](https://github.com/toss/es-hangul/blob/main/LICENSE) file for details.

<a title="Toss" href="https://toss.im">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://static.toss.im/logos/png/4x/logo-toss-reverse.png">
    <img alt="Toss" src="https://static.toss.im/logos/png/4x/logo-toss.png" width="100">
  </picture>
</a>
