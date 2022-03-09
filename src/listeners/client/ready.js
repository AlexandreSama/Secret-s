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
        console.log('Ready !')
    }
}

module.exports = ReadyListener