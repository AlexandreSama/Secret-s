const {
    Command
} = require('discord-akairo')

class InfosCommand extends Command {
    constructor() {
        super('infos', {
            aliases: ['infos']
        });
    }

    exec(message) {
        message.reply("Salut ! Moi c'est Secret's, votre reine de Chicago et celle qui fera de ta vie un enfer. Sâche que je suis partout, j'ai les yeux partout et les oreilles qui traînent. Evidemment ne t'en fais pas, tout se que je dis, n'est rien d'autre que la vérité. Remercions aussi mes petites fouines.. Ah oui ! Tu pensais être épargnée ? Ne rêve pas trop, ton tour viendra tôt ou tard. Surveille bien, suivant votre activité, je sors un article tout les 15 jours ou tout les mois. A très bientôt, XoXo.")
    }
}

module.exports = InfosCommand