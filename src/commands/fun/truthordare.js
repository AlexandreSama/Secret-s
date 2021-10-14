const {Command} = require('discord-akairo')
const mysql = require('mysql')

class TruthOrDareCommand extends Command {
    constructor() {
        super('secret\'s', {
            aliases: ['secret\'s']
        });
    }

    exec(message){
        Array.prototype.random = function () {
            return this[Math.floor((Math.random()*this.length))];
        }
        if(message.channel.id === "847434193780604938" || "822108267538677774"){
            message.channel.send("Alors " + message.author.username + ", Action ou Vérité ?... :smirk:").then(response => {

            const filter = message => message.author.id ;

            response.channel.awaitMessages({filter, max: 1}).then(collector1 => {

                let tod = collector1.first().content.toLowerCase();
                console.log(tod)

                if(tod === "action"){

                    var connection = mysql.createConnection({
                        host: "localhost",
                        user: "root",
                        password: "alexandre123Sa",
                        database: "secrets",
                        supportBigNumbers: true,
                        bigNumberString: true
                    })
                
                    connection.query('SELECT * FROM tod WHERE type = "dare"', function(error, result){
                        if(error){
                            console.log(error)
                        }
                        let dataDare = JSON.stringify(result)
                        let dares = JSON.parse(dataDare)
                        console.log(dares)
                        let oneDare = dares.random()
                        message.channel.send("<@" + message.author.id + "> ! " + oneDare['description'])
                        connection.destroy()
                    })

                }else if(tod === "vérité"){

                    var connection = mysql.createConnection({
                        host: "localhost",
                        user: "root",
                        password: "alexandre123Sa",
                        database: "secrets",
                        supportBigNumbers: true,
                        bigNumberString: true
                    })
                
                    connection.query('SELECT * FROM tod WHERE type = "truth"', function(error, result){
                        if(error){
                            console.log(error)
                        }
                        let dataTruth = JSON.stringify(result)
                        let truths = JSON.parse(dataTruth)
                        let oneTruth = truths.random()
                        message.channel.send("<@" + message.author.id + "> ! " + oneTruth['description'])
                        connection.destroy()
                    })

                }else{
                    message.channel.send("Ecris correctement ! Tu me prend pour un traducteur ou quoi ?")
                }
            })
        })
    }
    }
}

module.exports = TruthOrDareCommand