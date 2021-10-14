const {Listener} = require('discord-akairo');
const Bree = require('bree');
const Graceful = require('@ladjs/graceful')

class ReadyListener extends Listener {
    constructor(){
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    exec(client) {
        console.log('Je suis prêt !')
        // const bree = new Bree({
        //     jobs: [{
        //         name: "awards",
        //         interval: "1 * L-7 * ?"
        //     }]
        // })
        // const graceful = new Graceful({ brees: [bree] });
        // graceful.listen();
        // bree.start();
    }
}

module.exports = ReadyListener