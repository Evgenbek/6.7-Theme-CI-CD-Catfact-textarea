// test('adds 1+2 to equal 3', () => {
//     expect(sum(1,2)).toBe(3);
// });    //просто тестировочный тест

import { helloWorld } from './hello-world';

test('hello, world', () => {
  expect(helloWorld('world')).toBe('Hello, world');
});
