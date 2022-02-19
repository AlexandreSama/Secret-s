const {
    Listener
} = require('discord-akairo');

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    exec(client) {
        client.channels.cache.get('899616869177258074').send("Va te faire foutre Val")
    }
}

module.exports = ReadyListener