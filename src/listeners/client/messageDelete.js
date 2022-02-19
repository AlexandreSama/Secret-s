const {
    Listener
} = require('discord-akairo')
const Discord = require('discord.js');
const config = require('../../config.json')

class messageDeleteListener extends Listener {
    constructor() {
        super('messageDeleteListener', {
            emitter: 'client',
            event: 'messageDelete'
        });
    }

    exec(message) {

        if (!message.author.bot && message.system == false && message.channel.type == 'GUILD_TEXT') {

            console.log('Message Delete')

            const embedInfos = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
                .setTitle('Message Supprimé !')
                .setDescription(`Un message de <@${message.author.id}> a été supprimé !`)
                .addField('Contenu du message :', message.content, true)
                .setImage(message.author.displayAvatarURL())
                .setTimestamp(Date.now())
            message.guild.channels.cache.find(channel => channel.id === "899616869177258074").send({
                embeds: [embedInfos]
            })
        }
    }
}

module.exports = messageDeleteListener