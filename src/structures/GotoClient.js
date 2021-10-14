const {AkairoClient, CommandHandler, ListenerHandler} = require('discord-akairo')

module.exports = class GotoClient extends AkairoClient {
    constructor(config = {}){
        super({
            ownerID: "256892994504884224"
        },
        {
            allowedMentions: {
                parse: ['roles', 'everyone', 'users'],
                repliedUser: false
            },
            partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER'],
            presence: {
                status: 'dnd',
                activities: [
                    {
                        name: 'Entrain d\'être développé',
                        type: "WATCHING"
                    }
                ]
            },
            intents: 32767
        });

        this.commandHandler = new CommandHandler(this, {
            allowMention: true,
            prefix: config.prefix,
            defaultCooldown: 2000,
            directory: './commands/'
        });
        this.listernerHandler = new ListenerHandler(this, {
            directory: './listeners/'
        });

        this.commandHandler.loadAll();
        this.commandHandler.useListenerHandler(this.listernerHandler);
        this.listernerHandler.loadAll();
    }
}