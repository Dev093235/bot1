const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: "new",  // ✅ Headless mode enable karo
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-gpu",
            "--disable-dev-shm-usage"
        ]
    });

    const page = await browser.newPage();
    await page.goto('https://www.facebook.com/', { waitUntil: 'networkidle2' });

    console.log("✅ Page Loaded Successfully!");

    await browser.close();
})();
