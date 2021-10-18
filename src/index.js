const GotoClient = require('./structures/GotoClient')
const config = require('./config.json')
const { exec } = require("child_process");
const io = require('@pm2/io')

let client = new GotoClient({
    prefix: config.prefix
})

client.login(config.token)


io.action('pull github data', (cb) => {
    exec("git pull", (error, data, getter) => {
        if(error){
            return cb({error: "error.message"})
        }
        return cb({success: "Action efféctué avec succés"})
    
    });
})
