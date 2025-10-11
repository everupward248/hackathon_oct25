const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const screenshotsDir = path.join(__dirname, 'screenshots');

  // Create screenshots directory if it doesn't exist
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  const baseUrl = 'http://localhost:3003';

  const pages = [
    { name: 'home', url: '/', waitFor: 1000 },
    { name: 'assessment', url: '/assessment', waitFor: 2000 },
    { name: 'careers', url: '/careers', waitFor: 2000 },
    { name: 'pathway', url: '/pathway/FS001', waitFor: 2000 },
    { name: 'dashboard', url: '/dashboard', waitFor: 2000 },
    { name: 'examples', url: '/examples', waitFor: 2000 },
  ];

  console.log('Taking screenshots...\n');

  for (const pageInfo of pages) {
    try {
      console.log(`Navigating to ${pageInfo.name} (${pageInfo.url})...`);
      await page.goto(`${baseUrl}${pageInfo.url}`, {
        waitUntil: 'networkidle',
        timeout: 10000
      });

      await page.waitForTimeout(pageInfo.waitFor);

      const screenshotPath = path.join(screenshotsDir, `${pageInfo.name}.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: true
      });
      console.log(`✓ Screenshot saved: ${screenshotPath}\n`);
    } catch (error) {
      console.error(`✗ Error capturing ${pageInfo.name}:`, error.message, '\n');
    }
  }

  // Take screenshots of assessment steps
  console.log('Taking assessment step screenshots...');
  try {
    await page.goto(`${baseUrl}/assessment`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Step 1 - Housing
    await page.screenshot({
      path: path.join(screenshotsDir, 'assessment-step1-housing.png'),
      fullPage: true
    });
    console.log('✓ Screenshot saved: assessment-step1-housing.png');

    // Try to go to step 2
    const nextButton = page.locator('button:has-text("Next")').first();
    if (await nextButton.isVisible()) {
      await nextButton.click();
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: path.join(screenshotsDir, 'assessment-step2-lifestyle.png'),
        fullPage: true
      });
      console.log('✓ Screenshot saved: assessment-step2-lifestyle.png');

      // Try to go to step 3
      if (await nextButton.isVisible()) {
        await nextButton.click();
        await page.waitForTimeout(1000);
        await page.screenshot({
          path: path.join(screenshotsDir, 'assessment-step3-career.png'),
          fullPage: true
        });
        console.log('✓ Screenshot saved: assessment-step3-career.png');
      }
    }
  } catch (error) {
    console.error('Error capturing assessment steps:', error.message);
  }

  // Test mobile viewport
  console.log('\nTaking mobile screenshots...');
  await context.close();
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 667 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
  });
  const mobilePage = await mobileContext.newPage();

  const mobilePages = ['home', 'assessment', 'careers'];
  for (const pageName of mobilePages) {
    try {
      const pageInfo = pages.find(p => p.name === pageName);
      await mobilePage.goto(`${baseUrl}${pageInfo.url}`, {
        waitUntil: 'networkidle',
        timeout: 10000
      });
      await mobilePage.waitForTimeout(pageInfo.waitFor);

      const screenshotPath = path.join(screenshotsDir, `${pageName}-mobile.png`);
      await mobilePage.screenshot({
        path: screenshotPath,
        fullPage: true
      });
      console.log(`✓ Mobile screenshot saved: ${screenshotPath}`);
    } catch (error) {
      console.error(`✗ Error capturing mobile ${pageName}:`, error.message);
    }
  }

  await browser.close();
  console.log('\n✓ All screenshots complete!');
  console.log(`Screenshots saved to: ${screenshotsDir}`);
})();
