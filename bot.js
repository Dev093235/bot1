const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,  // True karo agar UI nahi chahiye
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--window-size=1280,800'
        ],
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined
    });

    const page = await browser.newPage();
    await page.goto('https://www.facebook.com/', { waitUntil: 'networkidle2' });

    console.log("Facebook Page Opened!");

    // Cookie Set Karne Ka Code
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
