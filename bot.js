const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto('https://www.facebook.com/', { waitUntil: 'networkidle2' });

    // ✅ Facebook cookies add karo yaha
    const cookies = [
        {
            name: "c_user",
            value: "61573832129271",
            domain: ".facebook.com"
        },
        {
            name: "xs",
            value: "32%3AQuvUQvmfXbMp7Q%3A2%3A1741014332%3A-1%3A-1%3A%3AAcXjVnfqvHQpVfdN8mu97OQWn3pQH0SkJ_ygSdslMg",
            domain: ".facebook.com"
        }
    ];

    await page.setCookie(...cookies);
    console.log("✅ Cookies Set Successfully!");

    await page.reload({ waitUntil: "networkidle2" });
    console.log("✅ Page Reloaded with Cookies!");

    await page.screenshot({ path: 'login.png' });
    console.log("✅ Screenshot Saved!");

    await browser.close();
})();
