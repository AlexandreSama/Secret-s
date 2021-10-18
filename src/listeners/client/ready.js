const {Listener} = require('discord-akairo');
const { ToadScheduler, SimpleIntervalJob, Task } = require('toad-scheduler')
const request = require('request')
const { MessageEmbed } = require('discord.js');

class ReadyListener extends Listener {
    constructor(){
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    exec(client) {
        console.log('Je suis prêt !')
        client.channels.cache.get('899616869177258074').send("J'ai trouvé du café, je retourne au boulot !")
        // const bree = new Bree({
        //     jobs: [{
        //         name: "awards",
        //         interval: "1 * L-7 * ?"
        //     }]
        // })
        // const graceful = new Graceful({ brees: [bree] });
        // graceful.listen();
        // bree.start();
        const scheduler = new ToadScheduler()

        let guild = client.guilds.cache.get('822108267538677771')
        let meteoChannel = guild.channels.cache.get('899624162837008394')

        const task = new Task('météo', () => { 
            request('http://api.weatherstack.com/current?access_key=c43212b2b08a51670ded31b1accced45&query=Chicago', function(error, response, body){

            console.log(body)
                let heure = body['location']['localtime'].split(' ')
                const embedMeteo = new MessageEmbed()
                .setFooter('Présenté par votre chère Secret\'s !')
                .setTitle('Météo de Chicago !')
                .setDescription('C\'est la météo du jour !')
                .addFields([
                    {
                        name: "Heure du moment:",
                        value: heure[1]
                    },
                    {
                        name: "Tempèrature du jour :",
                        value: `${body['current']['temperature']}`
                    },
                ])
                .color(0x47e7e7)

            if(body['current']['weather_descriptions'][0] === "Clear" && body['current']['is_day'] === "yes"){
                let meteo = "Le ciel est clair pour le moment!"
                embedMeteo.addField("Météo :", meteo)
            }else if(body['current']['weather_descriptions'][0] === "Clear" && body['current']['is_day'] === "no"){
                let meteo = "Aucun nuage ce soir pour le moment !"
                embedMeteo.addField("Météo :", meteo)
            }else if(body['current']['weather_descriptions'][0] === "Sunny" && body['current']['is_day'] === "yes"){
                let meteo = "La journée sera ensoleillé pour le moment !"
                embedMeteo.addField("Météo :", meteo)
            }else if(body['current']['weather_descriptions'][0] === "Sunny" && body['current']['is_day'] === "no"){
                let meteo = "Quelques petits nuages cet nuit pour le moment !"
                embedMeteo.addField("Météo :", meteo)
            }else if(body['current']['weather_descriptions'][0] === "Mist" && body['current']['is_day'] === "no"){
                let meteo = "Il y a de la brume pour le moment !"
                embedMeteo.addField("Météo :", meteo)
            }else if(body['current']['weather_descriptions'][0] === "Mist" && body['current']['is_day'] === "Yes"){
                let meteo = "Il y a de la brume cet nuit pour le moment !"
                embedMeteo.addField("Météo :", meteo)
            }

            if(body['current']['temperature'] < 15){
                let conseilDuJour = "Pensez a vous habiller chaudement"
                embedMeteo.addField("Conseil du moment :", conseilDuJour)
            }else if(body['current']['temperature'] > 20){
                let conseilDuJour = "Montrer nous vos avantages les enfants, le temps s'y prête !"
                embedMeteo.addField("Conseil du moment :", conseilDuJour)
            }else {
                let conseilDuJour = "Mettez un gilet pour ne pas attraper froid mes petits chéris !"
                embedMeteo.addField("Conseil du moment :", conseilDuJour)
            }

            meteoChannel.send({embeds: [embedMeteo]})
            })
        })
        const job = new SimpleIntervalJob({ minutes: 1, }, task)
        
        scheduler.addSimpleIntervalJob(job)

    }
}

module.exports = ReadyListener