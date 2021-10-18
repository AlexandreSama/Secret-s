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

        const scheduler = new ToadScheduler()

        let guild = client.guilds.cache.get('822108267538677771')
        let meteoChannel = guild.channels.cache.get('899624162837008394')

        const task = new Task('météo', () => { 
            request('http://api.weatherstack.com/current?access_key=c43212b2b08a51670ded31b1accced45&query=Chicago', function(error, response, body){

            let data = JSON.parse(body)
            let heure = data['location']['localtime'].split(' ')
            const embedMeteo = new MessageEmbed()
            .setFooter('**Présenté par votre chère Secret\'s !**')
            .setTitle('Météo de Chicago !')
            .setDescription('C\'est la météo du jour !')
            .addFields([
                {
                    name: ":thermometer: Tempèrature du moment :",
                    value: `${data['current']['temperature']}°C`
                },
            ])
            .setColor(0x47e7e7)


            if(data['current']['is_day'] === "yes" && heure[1] <= 11){
                embedMeteo.addField(":clock1: Heure du moment:", heure[1] + ' Du matin')
            }else if(data['current']['is_day'] === "yes" && heure[1] > 11){
                embedMeteo.addField(":clock1: Heure du moment:", heure[1])
            }else{
                embedMeteo.addField(":clock1: Heure du moment:", heure[1])
            }

            if(data['current']['weather_descriptions'][0] === "Clear" && data['current']['is_day'] === "yes"){

                let meteo = "Le ciel est clair pour le moment!"
                embedMeteo.addField("Météo :", meteo)

            }else if(data['current']['weather_descriptions'][0] === "Clear" && data['current']['is_day'] === "no"){

                let meteo = "Aucun nuage ce soir pour le moment !"
                embedMeteo.addField("Météo :", meteo)

            }else if(data['current']['weather_descriptions'][0] === "Sunny" && data['current']['is_day'] === "yes"){

                let meteo = "La journée sera ensoleillé pour le moment !"
                embedMeteo.addField("Météo :", meteo)

            }else if(data['current']['weather_descriptions'][0] === "Sunny" && data['current']['is_day'] === "no"){

                let meteo = "Quelques petits nuages cet nuit pour le moment !"
                embedMeteo.addField("Météo :", meteo)

            }else if(data['current']['weather_descriptions'][0] === "Mist" && data['current']['is_day'] === "no"){

                let meteo = "Il y a de la brume pour le moment !"
                embedMeteo.addField("Météo :", meteo)

            }else if(data['current']['weather_descriptions'][0] === "Mist" && data['current']['is_day'] === "Yes"){

                let meteo = "Il y a de la brume cet nuit pour le moment !"
                embedMeteo.addField("Météo :", meteo)

            }

            if(data['current']['temperature'] < 15){
                let conseilDuJour = "Pensez a vous habiller chaudement"
                embedMeteo.addField(":rotating_light: Conseil du moment :", conseilDuJour)
            }else if(data['current']['temperature'] > 20){
                let conseilDuJour = "Montrer nous vos avantages les enfants, le temps s'y prête !"
                embedMeteo.addField(":rotating_light: Conseil du moment :", conseilDuJour)
            }else {
                let conseilDuJour = "Mettez un gilet pour ne pas attraper froid mes petits chéris !"
                embedMeteo.addField(":rotating_light: Conseil du moment :", conseilDuJour)
            }

            meteoChannel.send({embeds: [embedMeteo]})
            })
        })
        const job = new SimpleIntervalJob({ seconds: 20, }, task)
        
        scheduler.addSimpleIntervalJob(job)

    }
}

module.exports = ReadyListener