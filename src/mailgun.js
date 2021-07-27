const settings = require('../settings/settings.json')
const mailgun = require("mailgun-js");


const sendmessage = (text) => {
var mg = mailgun({apiKey: settings.mailgunkey, domain: settings.mailgundomain});
var data = {
	from: `Web sentinal <mailgun@${settings.mailgundomain}>`,
	to: `${settings.reciever}, ${settings.reciever}`,
	subject: 'New web sentinal notification',
	text: text
};
mg.messages().send(data, function (error, body) {
	console.log(body);
});
}
module.exports.sendmessage = sendmessage