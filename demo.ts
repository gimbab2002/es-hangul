import { toCollationKey, sortHangulArray } from './src/core/collationKey';
import { currencyToHangul } from './src/number/currencyToHangul';
import { dateToHangul } from './src/number/dateToHangul';

// 1. CollationKey 기능 예시
console.log('--- CollationKey 기능 ---');
const words = ['사과', '가방', '바나나'];
const sorted = sortHangulArray(words);
console.log('정렬 전:', words);
console.log('정렬 후:', sorted);

const key = toCollationKey('사과');
console.log(`"사과"의 Collation Key:`, key);

// 2. CurrencyToHangul 기능 예시
console.log('\n--- CurrencyToHangul 기능 ---');
const amount = 123456789;
const wonResult = currencyToHangul(amount, '₩');
const dollarResult = currencyToHangul(99, '$');
console.log('123456789₩ →', wonResult); // 일억이천삼백사십오만육천칠백팔십구원
console.log('99$ →', dollarResult); // 구십구달러

// 3. DateToHangul 기능 예시
console.log('\n--- DateToHangul 기능 ---');
const dateString = '2025-06-04';
const dateObject = new Date();

console.log(`${dateString} →`, dateToHangul(dateString)); // 이천이십오년 유월 사일
console.log(`오늘 날짜(${dateObject.toLocaleDateString()}) →`, dateToHangul(dateObject));
