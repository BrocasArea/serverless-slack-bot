'use strict';

require('dotenv').config();
var unirest = require('unirest');

//
module.exports.hello = (event, context, cb) => {
  console.log('event', event);
  console.log('process.env', process.env);

  let users = [
    '@11',
    '@allenlai',
    '@brocas-encore',
    '@datjaychang',
    '@dca',
    '@hanyu',
    '@jeff',
    '@lavinia',
    '@limit',
    '@oobe',
    '@paul'
  ];

  let name = users[Math.floor(Math.random()*users.length)];
  let message = {
    text: `
      時間到了，該放飯了.\n本日 Roll 幸運兒： ${name}
      \n\n點我重Roll: ${process.env.ROLL_API_URL}
    `
  };

  httpRequest(message, (err, res) => {
    cb(err, { res });
  });
}

const httpRequest = (message, callback) => {
  unirest.post(process.env.SLACK_WEBHOOK)
    .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
    .send(message)
    .end(function (response) {
      console.log(response.body);
      callback(null, response.body);
    });
}
