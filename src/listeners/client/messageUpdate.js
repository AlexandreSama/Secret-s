const {
    Listener
} = require('discord-akairo')
const Discord = require('discord.js');
const config = require('../../config.json')

class messageUpdateListener extends Listener {
    constructor() {
        super('messageUpdateListener', {
            emitter: 'client',
            event: 'messageUpdate'
        });
    }

    exec(oldMessage, newMessage) {

        console.log('Message Update')

        if (!newMessage.author.bot && newMessage.system == false && newMessage.channel.type == 'GUILD_TEXT') {

            const embedInfos = new Discord.MessageEmbed()
                .setColor('#FF6C00')
                .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
                .setTitle('Message Modifié !')
                .setDescription(`Un message de <@${newMessage.author.id}> a été modifié !`)
                .addFields({
                    name: "Ancien message",
                    value: oldMessage.content,
                    inline: true
                }, {
                    name: "Nouveau message",
                    value: newMessage.content,
                    inline: true
                })
                .setImage(newMessage.author.displayAvatarURL())
                .setTimestamp(Date.now())

            newMessage.guild.channels.cache.find(channel => channel.id === "899616869177258074").send({
                embeds: [embedInfos]
            })
        }
    }
}

module.exports = messageUpdateListener