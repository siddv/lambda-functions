import {jokes} from './modules/jokes'

exports.handler = async (event, context) => {
  
  let command = '';

  const genericError = {
    headers: {
      "content-type": "application/json"
    },
    statusCode: 400,
    body: JSON.stringify({
      response_type: "in_channel",
      text: `It didn't work. Try harder.`
    })
  };

  if(event && event.queryStringParameters && event.queryStringParameters.text) {
      command = event.queryStringParameters.text
  } else {
    return genericError;
  }

  const jokeRegex = /tell a (.*) joke/i
  const res = jokeRegex.exec(command)
  const subject = res ? res[1] : null;

  if (jokes[subject]) {
    let jokesLength = jokes[subject].length
    let jokeIndex = Math.floor(Math.random() * jokesLength)
    let currentJoke = jokes[subject][jokeIndex]
    let jokeParts = [];

    for (let jokePart of currentJoke) {
      jokeParts.push({
        text: jokePart
      })
    }

    return {
      headers: {
        "content-type": "application/json"
      },
      statusCode: 200,
      body: JSON.stringify({
        response_type: "in_channel",
        attachments: jokeParts
      })
    };
  } else {
    return genericError;
  }
}
