const puppeteer = require("puppeteer");
const fs = require("fs");
const readline = require("readline");

async function loginWithCookies() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Cookies Load Karna
    const cookies = JSON.parse(fs.readFileSync("cookies.json", "utf8"));
    await page.setCookie(...cookies);

    await page.goto("https://www.facebook.com/");
    console.log("Facebook Login with Cookies Done!");

    return { browser, page };
}

// Bot ka main function
async function startBot() {
    const { browser, page } = await loginWithCookies();

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const owner = "Dev Ji";
    const maleWords = ["bhai", "bro", "dost", "banda", "beta"];
    const femaleWords = ["behan", "sis", "didi", "bandi", "beti"];

    const replies = {
        "kaise ho": ["Mast hu bhai, tu bata?", "Badiya bhai, tu sunaa?", "Ek dum zabardast!"],
        "kya kar raha hai": ["Bas timepass bhai!", "Tere sawaalon ka jawab de raha hu 😆", "Bohot kaam hai bhai, bot bhi busy hote hain!"],
        "namaste": ["Namaste bhai!", "Ram Ram!", "Pranam 🙏"],
        "love you": ["Aree wah! Love you too yaar ❤️", "Jyada chipak mat, bas bot hu! 😂"],
        "joke sunao": ["Ek machhar aadmi ko Sher bana sakta hai! 😂", "Padhai ki tarah, sapne bhi bade hone chahiye! 😂"],
        "owner kaun hai": [`Mere malik ${owner} hain!`, `Mujhe ${owner} ne banaya hai!`, `${owner} mere creator hain!`]
    };

    function detectGender(message) {
        for (let word of maleWords) {
            if (message.toLowerCase().includes(word)) return "male";
        }
        for (let word of femaleWords) {
            if (message.toLowerCase().includes(word)) return "female";
        }
        return "unknown";
    }

    let flirtyMessages = [];
    try {
        let data = fs.readFileSync("flirty_messages.json", "utf8");
        flirtyMessages = JSON.parse(data).messages;
    } catch (error) {
        console.log("Error loading flirty messages:", error);
    }

    let memes = [];
    try {
        let data = fs.readFileSync("memes.json", "utf8");
        memes = JSON.parse(data).memes;
    } catch (error) {
        console.log("Error loading memes:", error);
    }

    let voiceReplies = {};
    try {
        let data = fs.readFileSync("voice_replies.json", "utf8");
        voiceReplies = JSON.parse(data).voice_replies;
    } catch (error) {
        console.log("Error loading voice replies:", error);
    }

    function getResponse(message) {
        message = message.toLowerCase();
        let gender = detectGender(message);

        if (message.includes("owner") || message.includes("creator") || message.includes("malik")) {
            return `Mere owner ${owner} hain!`;
        }

        for (let key in replies) {
            if (message.includes(key)) {
                let responses = replies[key];
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }

        if (message.includes("tareef") || message.includes("impress") || message.includes("mujhse pyar")) {
            if (flirtyMessages.length > 0) {
                return flirtyMessages[Math.floor(Math.random() * flirtyMessages.length)];
            } else {
                return "Teri tareef karna chahata hu, par dictionary me words hi nahi hai! 😍";
            }
        }

        if (message.includes("meme")) {
            if (memes.length > 0) {
                return memes[Math.floor(Math.random() * memes.length)];
            } else {
                return "Bhai meme ka stock khatam ho gaya, naye memes bhej! 😂";
            }
        }

        for (let key in voiceReplies) {
            if (message.includes(key)) {
                return `Voice Message: ${voiceReplies[key]}`;
            }
        }

        if (gender === "male") {
            return "Tu ek dum bindass banda hai bhai!";
        } else if (gender === "female") {
            return "Aap ek dum sherni ho, respect! 👸";
        }

        return "Samajhne ki koshish kar raha hu, thoda easy bol na bhai!";
    }

    rl.question("Aap kya kehna chahenge? ", function(message) {
        console.log(getResponse(message));
        rl.close();
        browser.close();
    });
}

startBot();
