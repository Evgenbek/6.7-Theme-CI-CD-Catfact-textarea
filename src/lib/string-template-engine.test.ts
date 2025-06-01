import { stringTemplateEngine } from './string-template-engine';

test('renders empty string on undefined', () => {
  expect(stringTemplateEngine(undefined)).toBe('');
});

test('renders empty string on null', () => {
  expect(stringTemplateEngine(null)).toBe('');
});

test('renders empty string on false', () => {
  expect(stringTemplateEngine(false)).toBe('');
});

test('renders same string on string', () => {
  expect(stringTemplateEngine('hello')).toBe('hello');
});

test('renders stringed number on number', () => {
  expect(stringTemplateEngine(42)).toBe('42');
});

test('renders true string on true', () => {
  expect(stringTemplateEngine(true)).toBe('true');
});

test('renders empty div', () => {
  expect(stringTemplateEngine({ block: 'div' })).toBe('<div></div>');
});

test('renders empty array', () => {
  expect(stringTemplateEngine([{ block: 'div' }, 'dusty', { block: 'span' }])).toBe('<div></div>dusty<span></span>');
});

test('renders div with class', () => {
  expect(stringTemplateEngine({ block: 'div', cls: 'test' })).toBe('<div class="test"></div>');
});

test('renders div with classes', () => {
  expect(stringTemplateEngine({ block: 'div', cls: ['test', 'dusty'] })).toBe('<div class="test dusty"></div>');
});

test('renders div with attrs', () => {
  expect(stringTemplateEngine({ block: 'div', attrs: { test: 'dusty' } })).toBe('<div test="dusty"></div>');
});

test('renders div with content', () => {
  expect(stringTemplateEngine({ block: 'div', content: 'test' })).toBe('<div>test</div>');
});

test('renders div with sanitized content', () => {
  expect(stringTemplateEngine({ block: 'div', content: '&<>\'"/' })).toBe('<div>&amp;&lt;&gt;&#x27;&quot;&#x2F;</div>');
});
