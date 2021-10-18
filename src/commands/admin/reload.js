const {Command} = require('discord-akairo')

class ReloadCommand extends Command {
    constructor() {
        super('pong', {
            aliases: ['pong']
        });
    }

    async exec(message){
        await message.delete()
        await message.channel.send("Je cherche du café...")
        process.exit()
    }
}

module.exports = ReloadCommand