const {Command} = require('discord-akairo')
const mysql = require('mysql')

class TruthOrDareCommand extends Command {
    constructor() {
        super('tod', {
            aliases: ['tod']
        });
    }

    exec(message){
        Array.prototype.random = function () {
            return this[Math.floor((Math.random()*this.length))];
        }
        message.channel.send("Alors " + message.author.username + ", Action ou Vérité ?... :smirk:").then(response => {

            const filter = message => message.author.id ;

            response.channel.awaitMessages({filter, max: 1}).then(collector1 => {

                let tod = collector1.first().content;

                if(tod === "action"){

                    var connection = mysql.createConnection({
                        host: "localhost",
                        user: "root",
                        database: "Secret's",
                        supportBigNumbers: true,
                        bigNumberString: true
                    })
                
                    connection.query('SELECT * FROM tod WHERE type = "dare"', function(error, result){
                        if(error){
                            console.log(error)
                        }
                        let data = JSON.stringify(result)
                        let dares = JSON.parse(data)
                        console.log(dares)
                        let oneDare = dares.random()
                        message.channel.send("<@" + message.author.id + "> ! " + oneDare['description'])
                    })

                }else if(tod === "vérité"){

                    var connection = mysql.createConnection({
                        host: "localhost",
                        user: "root",
                        database: "Secret's",
                        supportBigNumbers: true,
                        bigNumberString: true
                    })
                
                    connection.query('SELECT * FROM tod WHERE type = "truth"', function(error, result){
                        if(error){
                            console.log(error)
                        }
                        let data = JSON.stringify(result)
                        let truths = JSON.parse(data)
                        let oneTruth = truths.random()
                        message.channel.send("<@" + message.author.id + "> ! " + oneTruth['description'])
                    })

                }else{
                    message.channel.send("Ecris correctement ! Tu me prend pour un traducteur ou quoi ?")
                }
            })
        })
    }
}

module.exports = TruthOrDareCommand