import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('page exposes semantic navigation and stays within narrow viewports', async ({
  page
}) => {
  await page.setViewportSize({
    width: 320,
    height: 800
  });
  await page.goto('/');
  await expect(page.getByRole('heading', {
    level: 1
  })).toContainText('Intelligent');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole('button', {
    name: 'Open navigation'
  }).click();
  await page.getByRole('navigation', {
    name: 'Mobile navigation'
  }).getByRole('link', {
    name: 'Products',
    exact: true
  }).click();
  await expect(page.getByRole('button', {
    name: 'Open navigation'
  })).toHaveAttribute('aria-expanded', 'false');
});
test('project tabs support keyboard navigation', async ({
  page
}) => {
  await page.goto('/');
  const tab = page.getByRole('tab', {
    name: 'FAO',
    exact: true
  });
  await tab.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', {
    name: 'LUMS',
    exact: true
  })).toBeFocused();
  await expect(page.getByRole('tabpanel')).toContainText('One institution.');
});
test('reel closes with Escape and restores focus', async ({
  page
}) => {
  await page.goto('/');
  const trigger = page.getByRole('button', {
    name: 'Watch innovation reel'
  });
  await trigger.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(trigger).toBeFocused();
});
test('consultation validates, reviews, handles delivery failure and retries', async ({
  page
}) => {
  await page.goto('/');
  const form = page.getByRole('form', {
    name: 'Consultation enquiry'
  });
  await form.getByRole('button', {
    name: 'Continue'
  }).click();
  await expect(form.getByText('Choose an area of interest.')).toBeVisible();
  await form.getByText('AI & automation', {
    exact: true
  }).click();
  await form.getByLabel('Your project or challenge').fill('We need an accessible operational platform for a distributed team.');
  await form.getByRole('button', {
    name: 'Continue'
  }).click();
  await form.getByLabel('Full name').fill('Ayesha Khan');
  await form.getByLabel('Email address', {
    exact: false
  }).fill('ayesha@example.com');
  await form.getByRole('button', {
    name: 'Continue'
  }).click();
  await form.getByRole('checkbox').check();
  await page.route('**/api/inquiries', route => route.fulfill({
    status: 503,
    json: {
      error: 'Delivery is unavailable. Please retry.'
    }
  }));
  await form.getByRole('button', {
    name: 'Send enquiry'
  }).click();
  await expect(page.getByRole('alert')).toContainText('Delivery is unavailable');
  await expect(page.getByText('A good conversation starts here.')).toHaveCount(0);
  await page.unroute('**/api/inquiries');
  await page.route('**/api/inquiries', route => route.fulfill({
    json: {
      ok: true,
      message: 'Your enquiry is on its way.'
    }
  }));
  await form.getByRole('button', {
    name: 'Send enquiry'
  }).click();
  await expect(page.getByRole('heading', {
    name: 'A good conversation starts here.'
  })).toBeVisible();
});
test('page passes automated WCAG AA checks', async ({
  page
}) => {
  await page.goto('/');
  const results = await new AxeBuilder({
    page
  }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
  expect(results.violations).toEqual([]);
});
