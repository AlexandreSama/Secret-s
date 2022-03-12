const GotoClient = require('./structures/GotoClient')
const config = require('./config.json')

let client = new GotoClient({
    prefix: config.prefix
})

client.login(config.token)
