const superagent = require('superagent');
const fs = require('fs');
const settings = require('./settings/settings.json');
const {sendmessage} = require('./src/mailgun')
var urls = fs.readFileSync('settings/urls.txt').toString().split(',');
const {printascii} = require('./src/printascii');
printascii()

setInterval(() => {

urls.forEach(url => {
superagent.get(url).end((err,res) => {
    if(err) {console.log(err);};
    // the html is at res.text
    try {
        if(fs.readFileSync(`cache/${url.split('http://')[1]}.cache`) != res.text){
            // site is the same and can be left alone.

            // the site is diffrent then the cache so i should send a message. and update the cache



            log(`${url.split('http://')[1]} has changed`);

            console.log(`${url.split('http://')[1]} has changed`);
            fs.writeFileSync(`cache/${url.split('http://')[1]}.cache`, res.text);
            
            }
    } catch (error) {
        console.log(error)
        fs.writeFileSync(`cache/${url.split('http://')[1]}.cache`, res.text);
    }


})

    
})

}, settings.interval * 1000);

const getdate = () => {
    var date = new Date();
    var date = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;
    return date;
}

const gettime = () => {
    var date = new Date();
    var time = `${date.getHours()}:${date.getMinutes()}`;
    return time;
}

const log = (txt) => {
    if(settings.mailgunkey) {
        sendmessage(`
        New Websentinal notification:
        ${txt}
        `)
    }


    try {
        fs.writeFileSync(`logs/${getdate()}.log`,fs.readFileSync(`logs/${getdate()}.log`) + '\n' + gettime() + ' ' + txt)
    } catch (error) {
        fs.writeFileSync(`logs/${getdate()}.log`,`${gettime()} ` + txt)
    }
}