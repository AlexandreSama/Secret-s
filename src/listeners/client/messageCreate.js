const {Listener} = require('discord-akairo')
const io = require('@pm2/io')

class MessageCreateListener extends Listener {
    constructor(){
        super('messageCreate', {
            emitter: 'client',
            event: 'messageCreate'
        });
    }

    exec(message) {
        
        let helloArray = ['Bonjour', 'bonjour'] // Liste bonjour
        let badArray = ['pute'] // Liste gros mots
        let goodNightArray = ['Bonne nuit', 'bonne nuit'] // Liste bonne nuit
        let kissArray = ['bisou', "Bisou", "Bisous", "bisous"] // Liste bye

        if(message.channel.id === "847434193780604938" && "822108267538677774" && helloArray.some(word => message.content.includes(word)) == true){
            message.channel.send("Tiens.. Te voila toi ? Tu as quoi à me raconter ?")
        }else if (message.channel.id === "847434193780604938" && "822108267538677774" && badArray.some(word => message.content.includes(word)) == true) {
            message.channel.send("On parle de qui ? Katherine ? Sélena ? Lexie ? Elyana ?")
        }else if (message.channel.id === "847434193780604938" && "822108267538677774" && goodNightArray.some(word => message.content.includes(word)) == true) {
            message.channel.send("Oui vas t'en, je vais pouvoir bien parler de toi")
        }else if (message.channel.id === "847434193780604938" && "822108267538677774" && kissArray.some(word => message.content.includes(word)) == true) {
            message.channel.send("Je ne sais pas ou tu as mis ta bouche..")
        }

        const messageSendSinceBotStarting = io.metric({
            name: "Messages depuis le start du bot",
            value: "Messages",
            id: "MessageCountSinceStartBot"
        })

        let i = 0
        messageSendSinceBotStarting.set(i + 1)
    }
}

module.exports = MessageCreateListener