const {
    Listener
} = require('discord-akairo')
const Discord = require('discord.js');
const config = require('../../config.json')

class messageCreateListener extends Listener {
    constructor() {
        super('messageCreateListener', {
            emitter: 'client',
            event: 'messageCreate'
        });
    }

    exec(message) {

        let welcomeDay = ['Bonjour Secret\'s', "bonjour secrets", "Bonjour secret's", "bonjour Secret's"]
        let welcomeNight = ['Bonsoir Secret\'s', "bonsoir secrets", "Bonsoir secret's", "bonsoir Secret's"]
        welcomeDay.forEach(element => {
            if(message.content == element){
                message.channel.send('Bonjour mon chère petit esclave :smiling_imp:')
            }
        })
        welcomeNight.forEach(element => {
            if(message.content == element){
                message.channel.send('Bonsoir mon chère petit esclave :smiling_imp:')
            }
        })
        if (!message.author.bot && message.system == false && message.channel.type == 'GUILD_TEXT') {

            console.log('Message Create')

            const embedInfos = new Discord.MessageEmbed()
                .setColor('#00FF51')
                .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
                .setTitle('Nouveau message !')
                .setDescription(`Nouveau message de <@${message.author.id}> !`)
                .addFields({
                    name: "Message :",
                    value: message.content,
                    inline: true
                })
                .setImage(message.author.displayAvatarURL())
                .setTimestamp(Date.now())

            message.guild.channels.cache.find(channel => channel.id === "899616869177258074").send({
                embeds: [embedInfos]
            })

        }

        if(message.content === "Qui est la maitresse d'Alexandre ?"){
            message.reply('Ainsi, tu souhaite découvrir l\'identité de la maitresse de mon créateur ? \n Ainsi soit-il !')
            const attachment = new Discord.MessageAttachment("AydenQueen.jpg")
            message.channel.send({content: "Voici la maitresse de mon diabolique maitre !", files: [attachment]})
            message.channel.send('Essaye de lui arriver a la cheville (Ou apporte des gaufres)')
        }
    }
}

module.exports = messageCreateListener