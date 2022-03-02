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
                message.reply('Bonjour mon cher petit esclave :smiling_imp:')
            }
        })
        welcomeNight.forEach(element => {
            if(message.content == element){
                message.reply('Bonsoir mon cher petit esclave :smiling_imp:')
            }
        })
        if(message.content.includes("Dixie")){
            message.reply('Ah ? On parle de la plus belle des salopes de Chicago ?')
        }
        if(message.content.includes("Chocolatine") || message.content.includes("chocolatine")){
            message.reply('Bande de sauvages !')
        }
        if(message.content.includes("Loup") || message.content.includes("loup")){
            message.reply('On parle de l\'Alpha des Alphas : Adrian ?')
        }
        if(message.content.includes("Ou est Conrad") || message.content.includes("ou est Conrad") || message.content.includes("ou est Conrad ?") || message.content.includes("Ou est Conrad ?")){
            message.reply('Actuellement ? Dans ton cul :thinking:')
        }
        if(message.content.includes("Ou est Mal ?") || message.content.includes("ou est Mal ?") || message.content.includes("Ou est Mal") || message.content.includes("ou est Mal")){
            message.reply('Actuellement ? Disparu dans les méandres des abdos de Jason Statham :smiling_imp:')
        }

        if (!message.author.bot && message.system == false && message.channel.type == 'GUILD_TEXT') {

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
            const attachment = new Discord.MessageAttachment("src/AydenQueen.jpg")
            message.channel.send({content: "Voici la maitresse de mon diabolique maitre !", files: [attachment]})
            message.channel.send('Essaye de lui arriver a la cheville (Ou apporte des gaufres)')
        }
    }
}
module.exports = messageCreateListener