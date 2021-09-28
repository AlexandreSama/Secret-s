const {Listener} = require('discord-akairo')

class MessageCreateListener extends Listener {
    constructor(){
        super('messageCreate', {
            emitter: 'client',
            event: 'messageCreate'
        });
    }

    exec(message) {
        let helloArray = ['Bonjour', 'bonjour']
        let badArray = ['pute']
        let goodNightArray = ['Bonne nuit', 'bonne nuit']
        if(message.channel.id === "866045872483991554" && helloArray.some(word => message.content.includes(word)) == true){
            message.channel.send("Tiens.. Te voila toi ? Tu as quoi à me raconter ?")
        }else if (message.channel.id === "866045872483991554" && badArray.some(word => message.content.includes(word)) == true) {
            message.channel.send("On parle de qui ? Katherine ? Sélena ? Lexie ? Elyana ?")
        }else if (message.channel.id === "866045872483991554" && goodNightArray.some(word => message.content.includes(word)) == true) {
            message.channel.send("Oui vas t'en, je vais pouvoir bien parler de toi")
        }
    }
}

module.exports = MessageCreateListener