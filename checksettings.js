const settings = require('./settings/settings.json');
const {printascii} = require('./src/printascii');
printascii()

if(settings.mailgunenabled) {
console.log(`
mailgun is enabled:

the domain is: ${settings.mailgundomain},
the api key is: ${settings.mailgunkey},
the reciever is: ${settings.reciever}
`)
} else {
    console.log(`
mailgun is disabled
    `)
}

console.log(`and the interval is ${settings.interval} seconds`)