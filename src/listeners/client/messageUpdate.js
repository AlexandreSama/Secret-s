const {Listener} = require('discord-akairo')
const { MessageEmbed } = require('discord.js');

class MessageUpdateListener extends Listener {
    constructor(){
        super('messageUpdate', {
            emitter: 'client',
            event: 'messageUpdate'
        });
    }

    async exec(oldMessage, newMessage) {

        const deletedMessageEmbed = new MessageEmbed()
        .setAuthor('Secret\'s')
        .setFooter('Toujours la pour servir dans l\'ombre..')
    
        deletedMessageEmbed.setDescription(`Message modifié de ${oldMessage.author.username}`)
        deletedMessageEmbed.addField("Voici le message original :", oldMessage.content)
        deletedMessageEmbed.addField('Et le message modifié :', newMessage.content)
        deletedMessageEmbed.addField('Il a été modifié dans le channel :', oldMessage.channel.name)

        newMessage.guild.channels.cache.get("899624162837008394").send({embeds: [deletedMessageEmbed]})
        
    }
}

module.exports = MessageUpdateListener