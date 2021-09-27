const Discord = require('discord.js')
const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGES
    ]
})
const config = require('./config.json')

Client.on('ready', () => {
    console.log('ready to serve !')
})

Client.login(config.token)

Client.on('messageCreate', message => {
    if(message.author.bot) return;

    if(message.content === config.prefix + "ping"){
        message.channel.send('Arrête de m\'appeler connard')
    }
})