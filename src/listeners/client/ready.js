const {Listener} = require('discord-akairo');
const { Message } = require('discord.js');
const schedule = require('node-schedule');

class ReadyListener extends Listener {
    constructor(){
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    exec(client) {
        console.log('Je suis prêt !')
        const job = schedule.scheduleJob('Awards', '0 0 1 * *', function(){
            console.log("Ca fait 1min")
        })
    }
}

module.exports = ReadyListener