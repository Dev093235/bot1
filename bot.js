const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // ✅ 1. Load Cookies from JSON File
    const cookies = JSON.parse(fs.readFileSync('cookies.json', 'utf8'));
    await page.setCookie(...cookies);

    // ✅ 2. Facebook Open Karo
    await page.goto('https://www.facebook.com', { waitUntil: 'networkidle2' });

    // ✅ 3. Check If Login is Successful
    if (await page.$('input[name="email"]')) {
        console.log("❌ Login Failed (Cookies Expired ya Invalid)");
    } else {
        console.log("✅ Login Successful!");
    }

    await browser.close();
})();
