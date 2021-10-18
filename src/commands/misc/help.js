const {Command} = require('discord-akairo')
const { MessageEmbed } = require('discord.js');

class HelpCommand extends Command {
    constructor() {
        super('support', {
            aliases: ['support']
        });
    }

    exec(message){

        message.delete()
        if(message.channel.id === "847434193780604938" && "822108267538677774"){
            const helpEmbed = new MessageEmbed()
                .setAuthor('Moi-même')
                .setTitle("Panneau des commandes")
                .setDescription("Ici se trouve toutes les commandes du bot")
                .addFields({
                    name: "!who", value: "Qui est-ce ?"
                },
                {
                    name: "!secrets", value: "Action ou Vérité ?"
                },
                {
                    name: "!jnj", value: "Je n'ai jamais ?"
                })
                .setFooter("Bonne chance !")

                message.channel.send({embeds: [helpEmbed]})
                
        }else{

        }
        
    }
}

module.exports = HelpCommand