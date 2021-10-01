const {Command} = require('discord-akairo')
const mysql = require('mysql')

class WhoIsCommand extends Command {
    constructor() {
        super('who', {
            aliases: ['who']
        });
    }

    exec(message){

        Array.prototype.random = function () {
            return this[Math.floor((Math.random()*this.length))];
        }

        message.delete()
        message.channel.send("Ainsi tu souhaite résoudre une de mes petites énigmes ? :smirk: Bien ! En voici une pour toi...").then(response1 => {

            var connection = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "alexandre123Sa",
                database: "secret's",
                supportBigNumbers: true,
                bigNumberString: true,
                charset: 'utf8mb4_general_ci'
            })

            connection.query('SELECT * FROM whois', function(error, result){
                if(error){
                    console.log(error)
                }
                if(result){
                    let dataWhoIs = JSON.stringify(result)
                    let whoIs = JSON.parse(dataWhoIs)
                    console.log(whoIs)
                    let oneWhoIs = whoIs.random()
                    message.channel.send("<@" + message.author.id + "> ! " + oneWhoIs['WhoIsQuestion']).then(response2 => {
                        const filter = message => message.author.id ;
                        response2.channel.awaitMessages({filter, max:1}).then(collector1 => {
                            let responseFromPlayer = collector1.first().content.toLowerCase();
                            if(responseFromPlayer === oneWhoIs['WhoIsResponse']){
                                message.channel.send("Bien joué ! Tu est plus futé que je ne le pensais :smiling_imp:")
                            }else{
                                message.channel.send("Perdu ! Petit idiot... La réponse était : " + oneWhoIs['WhoIsResponse'] + " :smiling_imp:")
                            }
                        })
                    })
                }
            })
        })
    }
}

module.exports = WhoIsCommand