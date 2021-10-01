const {Command} = require('discord-akairo')
const mysql = require('mysql')

class iNeverCommand extends Command {
    constructor() {
        super('jnj', {
            aliases: ['jnj']
        });
    }

    exec(message){

        Array.prototype.random = function () {
            return this[Math.floor((Math.random()*this.length))];
        }

        message.delete()

        var connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "alexandre123Sa",
            database: "secret's",
            supportBigNumbers: true,
            bigNumberString: true,
            charset: 'utf8mb4_general_ci'
        })

        connection.query("SELECT * FROM inever", function(error, result){
            if(error){
                console.log(error)
            }
            if(result){
                let dataINever = JSON.stringify(result)
                let INever = JSON.parse(dataINever)
                console.log(INever)
                let oneINever = INever.random()
                message.channel.send(oneINever['iNeverQuestion'] + " Alors, que va tu répondre ? La vérité ou un mensonge ? :smiling_imp:").then(response1 => {
                    const filter = message => message.author.id ;
                    response1.channel.awaitMessages({filter, max:1}).then(collector1 => {
                        let responseFromPlayer = collector1.first().content;
                        message.channel.send("Hmm... Je ne sais que faire de ta réponse... J'attends les ordres des autres..")
                    })
                })
            }
        })
    }
}

module.exports = iNeverCommand