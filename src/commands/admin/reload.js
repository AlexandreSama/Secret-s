const {Command} = require('discord-akairo')

class ReloadCommand extends Command {
    constructor() {
        super('reload', {
            aliases: ['reload']
        });
    }

    async exec(message, client){

        if(message.author.id === "256892994504884224"){
            await message.delete()
            await client.channels.cache.get('899616869177258074').send("Je cherche du café...")
            process.exit()
        }else{
            await message.channel.send("Qui est-tu pour me donner des ordres ?")
        }
    }
}

module.exports = ReloadCommand