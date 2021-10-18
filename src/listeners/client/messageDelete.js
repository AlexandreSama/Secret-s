const {Listener} = require('discord-akairo')
const { MessageEmbed } = require('discord.js');

class MessageCreateListener extends Listener {
    constructor(){
        super('messageCreate', {
            emitter: 'client',
            event: 'messageDelete'
        });
    }

    async exec(message) {

        const deletedMessageEmbed = new MessageEmbed()
        .setAuthor('Secret\'s')
        .setFooter('Toujours la pour servir dans l\'ombre..')


        // Ignore direct messages
        if (!message.guild) return;
        const fetchedLogs = await message.guild.fetchAuditLogs({
            limit: 1,
            type: 'MESSAGE_DELETE',
        });
        // Since there's only 1 audit log entry in this collection, grab the first one
        const deletionLog = fetchedLogs.entries.first();

        // Perform a coherence check to make sure that there's *something*
        if (!deletionLog) return console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);

        // Now grab the user object of the person who deleted the message
        // Also grab the target of this action to double-check things
        const { executor, target } = deletionLog;

        // Update the output with a bit more information
        // Also run a check to make sure that the log returned was for the same author's message
        if (target.id === message.author.id) {
            deletedMessageEmbed.setDescription(`Message supprimé de ${message.author.username}`)
            deletedMessageEmbed.addField("Voici le message supprimé :", message.content)
            deletedMessageEmbed.addField('Il a été supprimé par :', executor.username)
            deletedMessageEmbed.addField('Il a été supprimé le :', deletionLog.createdAt)
        } else {
            deletedMessageEmbed.setDescription(`Message supprimé de ${message.author.username}`)
            deletedMessageEmbed.addField("Voici le message supprimé :", message.content)
            deletedMessageEmbed.addField('Il a été supprimé par :', "Je n'en sais rien.. Il a un trop grand pouvoir")
            deletedMessageEmbed.addField('Il a été supprimé le :', deletionLog.createdAt)
        }

        message.guild.channels.cache.get("899624162837008394").send({embeds: [deletedMessageEmbed]})
        
    }
}

module.exports = MessageCreateListener