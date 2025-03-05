const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,  // ✅ Headless disable karo taaki debug kar sako
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

    // 👇 Bot ko running rakhne ke liye ek infinite loop
    while (true) {
        console.log("Bot is still running...");
        await page.waitForTimeout(30000);  // Har 30 sec me check karega
    }

    // await browser.close();  // ❌ Isko hata do agar bot continuously chalana hai
})();
