require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once('ready', () => console.log('Court OS Ready'));

require('./events/interactionCreate')(client);
require('./events/messageCreate')(client);

client.login(process.env.TOKEN);