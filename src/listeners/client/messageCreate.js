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
    }
}

module.exports = messageCreateListener