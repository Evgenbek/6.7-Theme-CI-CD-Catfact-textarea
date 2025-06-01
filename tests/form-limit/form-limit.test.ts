import { expect } from '@playwright/test';
import { test } from '../playwright-test';

test('form loading', async ({ page }) => {
  await page.goto('http://localhost:8080');

  // проверяем, что страница загружается и форма отображается
  const limitTextarea = page.locator('.limit-textarea');
  const limitTextareaControl = limitTextarea.locator('.limit-textarea__control');
  const limitTextareaLeft = limitTextarea.locator('.limit-textarea__left');
  const limitTextareaButton = limitTextarea.locator('.limit-textarea__button:text("OK")');

  await expect(limitTextarea).toBeVisible();
  await expect(limitTextareaControl).toBeVisible();
  await expect(limitTextareaLeft).toBeVisible();
  await expect(limitTextareaButton).toBeVisible();

  await expect(limitTextareaControl).toHaveText('Hello, user! A cat’s back is extremely flexible because it has up to 53 loosely fitting vertebrae. Humans only have 34.');
  await expect(limitTextareaLeft).toHaveText('Вы превысили лимит');

  await expect(limitTextarea).toHaveScreenshot('plain.png');

  // fill('test dusty value') - выставит значение в textara
  // await limitTextareaControl.fill('test dusty value');
});

test('form empty', async ({ page }) => {
  await page.goto('http://localhost:8080');

  const limitTextarea = page.locator('.limit-textarea');
  const limitTextareaControl = limitTextarea.locator('.limit-textarea__control');
  const limitTextareaLeft = limitTextarea.locator('.limit-textarea__left');

  await expect(limitTextareaControl).toBeVisible();

  await limitTextareaControl.fill('');

  await expect(limitTextareaControl).toHaveValue('');
  await expect(limitTextareaLeft).toHaveText('Осталось 100 символов');
});

test('form fill with value', async ({ page }) => {
  await page.goto('http://localhost:8080');

  const limitTextarea = page.locator('.limit-textarea');
  const limitTextareaControl = limitTextarea.locator('.limit-textarea__control');
  const limitTextareaLeft = limitTextarea.locator('.limit-textarea__left');

  await expect(limitTextareaControl).toBeVisible();

  await limitTextareaControl.fill('dusty test value dusty test value');

  await expect(limitTextareaControl).toHaveValue('dusty test value dusty test value');
  await expect(limitTextareaLeft).toHaveText('Осталось 67 символов');
});

test('form block on too much content', async ({ page }) => {
  await page.goto('http://localhost:8080');

  const limitTextarea = page.locator('.limit-textarea');
  const limitTextareaControl = limitTextarea.locator('.limit-textarea__control');
  const limitTextareaLeft = limitTextarea.locator('.limit-textarea__left');
  const limitTextareaButton = limitTextarea.locator('.limit-textarea__button:text("OK")');

  await expect(limitTextareaControl).toBeVisible();

  await limitTextareaControl.fill('dusty test value dusty test value dusty test value dusty test value dusty test value dusty test value dusty test value dusty test value dusty test value dusty test value dusty test value dusty test value');

  await expect(limitTextareaControl).toHaveValue('dusty test value dusty test value dusty test value dusty test value dusty test value dusty test value dusty test value dusty test value dusty test value dusty test value dusty test value dusty test value');
  await expect(limitTextareaLeft).toHaveText('Вы превысили лимит');
  await expect(limitTextareaButton).toBeDisabled();
});
