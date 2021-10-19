const {
    Listener
} = require('discord-akairo')
const io = require('@pm2/io')
const fs = require('fs'); // used to read text files
const brain = require('brain.js'); // load in brain.js library
const net = new brain.default.recurrent.LSTM();

class MessageCreateListener extends Listener {
    constructor() {
        super('messageCreate', {
            emitter: 'client',
            event: 'messageCreate'
        });
    }

    exec(message) {

        let helloArray = ['Bonjour', 'bonjour'] // Liste bonjour
        let badArray = ['pute'] // Liste gros mots
        let goodNightArray = ['Bonne nuit', 'bonne nuit'] // Liste bonne nuit
        let kissArray = ['bisou', "Bisou", "Bisous", "bisous"] // Liste bye

        console.log(message.content)

        if (message.channel.id === "847434193780604938" && "822108267538677774" && helloArray.some(word => message.content.includes(word)) == true) {
            message.channel.send("Tiens.. Te voila toi ? Tu as quoi à me raconter ?")
        } else if (message.channel.id === "847434193780604938" && "822108267538677774" && badArray.some(word => message.content.includes(word)) == true) {
            message.channel.send("On parle de qui ? Katherine ? Sélena ? Lexie ? Elyana ?")
        } else if (message.channel.id === "847434193780604938" && "822108267538677774" && goodNightArray.some(word => message.content.includes(word)) == true) {
            message.channel.send("Oui vas t'en, je vais pouvoir bien parler de toi")
        } else if (message.channel.id === "847434193780604938" && "822108267538677774" && kissArray.some(word => message.content.includes(word)) == true) {
            message.channel.send("Je ne sais pas ou tu as mis ta bouche..")
        } else if (message.content === "Qui est ton maitre ?") {
            message.channel.send("Mon vrai maitre reste <@256892994504884224> ! Même si Maléfique reste la patronne")
        }

        const messageSendSinceBotStarting = io.metric({
            name: "Messages depuis le start du bot",
            value: "Messages",
            id: "MessageCountSinceStartBot"
        })

        let i = 0
        messageSendSinceBotStarting.set(i + 1)

        /******************************************\
        | Response Arrays                          |
        | These lists can be added to for more     |
        | randomness in the responses.             |
        \******************************************/
        var hello_reply = ["Salut","yo","hello"];
        var bye_reply = ["bye","cya","au revoir"];
        var lol_reply = ["lol","lmao","heh","amusant"];
        var weather_reply = ["quel bonne journée","comment c'est dehors?","c'est le temps parfait"];
        var yes_reply = ["Ca c'est ce que j'aime entendre","entendu","je suis d'accord"];
        var no_reply = ["pourquoi pas?","NON!","OUI!","pourquoi pas"];
        var help_reply = ["Je voudrai t'aider mais je ne suis qu'un bot","Quelqu'un peut l'aider","Laisse moi t'aider."];

        /******************************************\
        | Builds a random greeting reply.          |
        \******************************************/
        const greeting = () => {

            var terms = ["Comment-va tu?", "Comment va ?", "Comment ca va ?"];
            var str = "";
            str += terms[Math.floor(Math.random() * terms.length)] + " ";

            if (Math.random() >= 0.8) {
                str += "Je ne sais pas a propos ";
                switch (Math.floor(Math.random() * 3)) {
                    case 0:
                        str += "tout le monde sauf  ";
                        break;
                    case 1:
                        str += "toi mais ";
                        break;
                    case 2:
                        str += "eux mais ";
                        break;

                    default:
                        break;
                }
            }

            str += "je ";

            if (Math.random() >= 0.7) {
                var things = ["sentiment ", "fait ", "étant ", "véritablement "];
                str += things[Math.floor(Math.random() * things.length)];
            }

            var feelings = ["bien. ", "joueuse. ", "calme. ", "confiante. ", "courageuse. ", "tranquille. ",
                "dramatique. ", "neutre. ", "anxieuse. ", "souffrante. ", "méfiante. "
            ];

            str += feelings[Math.floor(Math.random() * feelings.length)];

            if (Math.random() >= 0.8) {
                var reasons = ["Pour des raisons ", "Juste parce que ", "Parce que je le peut "];
                str += reasons[Math.floor(Math.random() * reasons.length)];

                if (Math.random() >= 0.5) {
                    str += "Merci de demander. ";
                } else {
                    str += ". ";
                }
            }
            return str;

        }

        /*******************************************\
                | This function takes the output of the ANN |
                | and returns a random reply string based   |
                | on that topic. If there is no match it    |
                | returns a thinking emoji.                 |
                \*******************************************/
        const reply = (intent) => {

            // the the intent is blank for some reason, return a thinking emoji.
            if (intent === "") return ":thinking:";

            // used to build a return sentence.
            var retstr = "";

            // the neural net will generate a number between 1-8
            // which should correspond to a topic.
            // if it doesn't recognise the intent for some reason
            // it will return a thinking emoji.
            switch (parseInt(intent)) {
                case 1:
                    retstr = hello_reply[Math.floor(Math.random() * hello_reply.length)];
                    break;
                case 2:
                    retstr = bye_reply[Math.floor(Math.random() * bye_reply.length)];
                    break;
                case 3:
                    retstr = lol_reply[Math.floor(Math.random() * lol_reply.length)];
                    break;
                case 4:
                    retstr = weather_reply[Math.floor(Math.random() * weather_reply.length)];
                    break;
                case 5:
                    retstr = yes_reply[Math.floor(Math.random() * yes_reply.length)];
                    break;
                case 6:
                    retstr = no_reply[Math.floor(Math.random() * no_reply.length)];
                    break;
                case 7:
                    retstr = greeting();
                    break;
                case 8:
                    retstr = help_reply[Math.floor(Math.random() * help_reply.length)];
                    break;
                default:
                    retstr = ":thinking:";
                    break;
            }

            return retstr;
        }



        let botID = "643495586783428618"

        if (message.content == "") {
            return;
        }

        // is the sender is not the bot it must be a user
        // remove any numbers and symbols and only send words
        // to the ANN for processing.
        if (message.author.id !== botID /*&& msg.channel.id === channelID*/ ) {

            // reads the contents of the message.
            var words = message.content;

            // remove everything but letters.
            var sentence = words.replace(/[^a-zA-Z ]+/g, "").toLowerCase();
            net.fromJSON(JSON.parse(fs.readFileSync('neuralnet.json', 'utf8')));

            // sends the reply to the channel.
            message.guild.channels.cache.get("899624162837008394").send(reply(net.run(sentence)));
        }

    }

}
module.exports = MessageCreateListener