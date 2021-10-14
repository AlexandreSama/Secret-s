const {Command} = require('discord-akairo')
const mysql = require('mysql')
const md = require('markdown-it')();
const emoji = require('markdown-it-emoji');

class addToDCommand extends Command {
    constructor() {
        super('addaov', {
            aliases: ['addaov']
        });
    }

    exec(message){
        message.author.send("Bonjour " + message.author.username + " ! Alors comme ca tu veut participer a notre petit jeu en interne... Bien ! Est-ce une action ou une vérité ?").then(response1 => {
            const filter = message => message.author.id ;

            response1.channel.awaitMessages({filter, max:1}).then(collector1 => {
                let typeChoose = collector1.first().content.toLowerCase();
                message.author.send("Bien ! Maintenant donne moi cet action ou cet vérité !").then(response2 => {
                    response2.channel.awaitMessages({filter, max:1}).then(collector2 => {
                        let descriptionChoose = collector2.first().content;
                        console.log(descriptionChoose)

                        var connection = mysql.createConnection({
                            host: "localhost",
                            user: "root",
                            password: "alexandre123Sa",
                            database: "secrets",
                            supportBigNumbers: true,
                            bigNumberString: true,
                            charset: 'utf8mb4_general_ci'
                        })

                        md.use(emoji)
                        md.renderer()

                        connection.query(`INSERT INTO tod (type, description) VALUES ("${typeChoose}"", "${descriptionChoose}")`, function(error, result){
                            if(error){
                                console.log(error.sqlMessage)
                                connection.destroy()
                            }
                            if(result){
                                message.author.send("Merci pour ta participation ! On se revois très bientôt.. :smirk:")
                                connection.destroy()
                            }
                        })
                    })
                })
            })
        })
    }
}

module.exports = addToDCommand