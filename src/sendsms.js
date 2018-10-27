/* eslint-disable no-console */


const clockwork = require('clockwork')({ key: 'bda6f6f63cb6aca638e229783db06237c0d5f155' });

const sendresponse = (phoneno, message) => {
  clockwork.sendSms({ To: phoneno, Content: message }, (error, resp) => {
    if (error) {
      console.log('Something went wrong', error);
    } else {
      console.log('Message sent to', resp.responses[0].to);
      console.log('MessageID was', resp.responses[0].id);
    }
  });
};

module.exports = { sendresponse };
