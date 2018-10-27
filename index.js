const sendsms = require('./src/sendsms');

const phoneno = '447787168962';
const messagecontent = 'SAY THAT AGAIN';

sendsms.sendresponse(phoneno, messagecontent);
