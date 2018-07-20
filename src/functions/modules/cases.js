import {jokes} from './jokes'

export default {

  help() {
    return {
      headers: {
          "content-type": "application/json"
      },
      statusCode: 200,
      body: JSON.stringify({
        response_type: "ephemeral",
        text: `
Supported commands:

\`/b tell a [subject] joke\`
        ` 
      })
    };
  },

  tell(command, error) {
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
      return error(`I don't know any ${subject} jokes.`);
    }
  }
}