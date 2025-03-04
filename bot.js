const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Owner का नाम
const owner = "Dev Ji";

// लड़का/लड़की पहचानने के लिए keywords
const maleWords = ["bhai", "bro", "dost", "banda", "beta"];
const femaleWords = ["behan", "sis", "didi", "bandi", "beti"];

// Auto replies
const replies = {
    "kaise ho": ["Mast hu bhai, tu bata?", "Badiya bhai, tu sunaa?", "Ek dum zabardast!"],
    "kya kar raha hai": ["Bas timepass bhai!", "Tere sawaalon ka jawab de raha hu 😆", "Bohot kaam hai bhai, bot bhi busy hote hain!"],
    "namaste": ["Namaste bhai!", "Ram Ram!", "Pranam 🙏"],
    "love you": ["Aree wah! Love you too yaar ❤️", "Jyada chipak mat, bas bot hu! 😂"],
    "joke sunao": ["Ek machhar aadmi ko Sher bana sakta hai! 😂", "Padhai ki tarah, sapne bhi bade hone chahiye! 😂"],
    "owner kaun hai": [`Mere malik ${owner} hain!`, `Mujhe ${owner} ne banaya hai!`, `${owner} mere creator hain!`]
};

// Function jo gender pehchan sake
function detectGender(message) {
    for (let word of maleWords) {
        if (message.toLowerCase().includes(word)) return "male";
    }
    for (let word of femaleWords) {
        if (message.toLowerCase().includes(word)) return "female";
    }
    return "unknown";
}

// Flirty Messages Load karna
let flirtyMessages = [];
try {
    let data = fs.readFileSync("flirty_messages.json", "utf8");
    flirtyMessages = JSON.parse(data).messages;
} catch (error) {
    console.log("Error loading flirty messages:", error);
}

// Memes Load karna
let memes = [];
try {
    let data = fs.readFileSync("memes.json", "utf8");
    memes = JSON.parse(data).memes;
} catch (error) {
    console.log("Error loading memes:", error);
}

// Voice Replies Load karna
let voiceReplies = {};
try {
    let data = fs.readFileSync("voice_replies.json", "utf8");
    voiceReplies = JSON.parse(data);
} catch (error) {
    console.log("Error loading voice replies:", error);
}

// Bot Response Function
function getResponse(message) {
    message = message.toLowerCase();

    // Gender detection
    let gender = detectGender(message);

    // Owner related response
    if (message.includes("owner") || message.includes("creator") || message.includes("malik")) {
        return `Mere owner ${owner} hain!`;
    }

    // Checking for predefined replies
    for (let key in replies) {
        if (message.includes(key)) {
            let responses = replies[key];
            return responses[Math.floor(Math.random() * responses.length)];
        }
    }

    // Flirty response check
    if (message.includes("tareef") || message.includes("impress") || message.includes("mujhse pyar")) {
        if (flirtyMessages.length > 0) {
            return flirtyMessages[Math.floor(Math.random() * flirtyMessages.length)];
        } else {
            return "Teri tareef karna chahata hu, par dictionary me words hi nahi hai! 😍";
        }
    }

    // Meme Response
    if (message.includes("meme") || message.includes("funny")) {
        if (memes.length > 0) {
            return `😂 ${memes[Math.floor(Math.random() * memes.length)]}`;
        } else {
            return "Aaj ke liye koi meme nahi hai bhai! 😂";
        }
    }

    // Voice Reply Handling
    for (let key in voiceReplies) {
        if (message.includes(key)) {
            return `🎤 ${voiceReplies[key]}`;
        }
    }

    // Gender based response
    if (gender === "male") {
        return "Tu ek dum bindass banda hai bhai!";
    } else if (gender === "female") {
        return "Aap ek dum sherni ho, respect! 👸";
    }

    // Default response
    return "Samajhne ki koshish kar raha hu, thoda easy bol na bhai!";
}

// Input Listener
rl.question("Aap kya kehna chahenge? ", function(message) {
    console.log(getResponse(message));
    rl.close();
});
