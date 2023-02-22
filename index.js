// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const bible = require('./bible.json');

/* Function to perform NLP task on the bible */
async function processBibleText(query) {
    // Search the bible dataset for the specified query
    const results = [];
    for (const book in bible) {
        for (const chapter in bible[book]) {
            for (const verse in bible[book][chapter]) {
                if (bible[book][chapter][verse].includes(query)) {
                    results.push(`${book} ${chapter}:${verse} - ${bible[book][chapter][verse]}`);
                }
            }
        }
    }
}

// Create a new client instance
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,

    ],
});

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;
    return message.reply(`${message.content}`);
});

// Log in to Discord with your client's token
client.login(token);


