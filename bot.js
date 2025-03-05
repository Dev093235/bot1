const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({
            headless: true,  // ✅ Safe headless mode (No "new")
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
    } catch (error) {
        console.error("❌ Error Occurred:", error);
        process.exit(1); // ❌ Fail the GitHub Actions job
    }
})();
