const {
    Command
} = require('discord-akairo')

class PingCommand extends Command {
    constructor() {
        super('pong', {
            aliases: ['pong']
        });
    }

    exec(message) {
        return message.reply('Ta gueule !')
    }
}

module.exports = PingCommand