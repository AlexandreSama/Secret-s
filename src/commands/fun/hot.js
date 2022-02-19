const {
    Command
} = require('discord-akairo')

class HotCommand extends Command {
    constructor() {
        super('Hot', {
            aliases: ['hot'],
            userPermissions: ["ADMINISTRATOR"]
        });
    }

    exec(message) {
        message.reply('https://i.pinimg.com/564x/c0/c9/34/c0c934fdd09b7ba7cde8794b1a1665c9.jpg \n Oh...')
        message.reply('https://i.pinimg.com/564x/57/c9/73/57c973942fe1b757dddfd029b8a6f2c3.jpg \n Baby...')
    }
}

module.exports = HotCommand