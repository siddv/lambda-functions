const start = [
  ':arrow_lower_right: :arrow_down: :arrow_down: ',
  ':arrow_right: :sparkles: :sparkles: ',
  ':arrow_right: :sparkles: :wave: ',
  ':arrow_right: :sparkles: :wave: ',
  ':arrow_right: :sparkles: :wave: ',
  ':arrow_right: :sparkles: :sparkles: ',
  ':arrow_upper_right: :arrow_up: :arrow_up: '
]

const mid = [
  ':arrow_down: ',
  ':sparkles: ',
  ':wave: ',
  null,
  ':wave: ',
  ':sparkles: ',
  ':arrow_down: ',
]

const end = [
  ':arrow_down: :arrow_down: :arrow_lower_left:',
  ':sparkles: :sparkles: :arrow_left:',
  ':wave: :sparkles: :arrow_left:',
  ':wave: :sparkles: :arrow_left:',
  ':wave: :sparkles: :arrow_left:',
  ':sparkles: :sparkles: :arrow_left:',
  ':arrow_up: :arrow_up: :arrow_upper_left:'
]

const onionify = text => {

  let message = ''
  let emojiCount = Math.ceil(text.length / 3) 
  const emojisDoRemove = Math.round(text.length / 21)
  emojiCount = emojiCount - emojisDoRemove

  for(let i = 0; i < 7; i++) {
    message += start[i]

    for(let j = 0; j < emojiCount; j++) {
      if(mid[i]) {
        message += mid[i]
      }
    }

    if(i == 3) {
      message += '`' + text + ' '.repeat(0) + '` '
    }
    message += end[i]

    message += '\n'
  }
  return message
}

exports.handler = async (event, context) => {
  let response = 'Please specify some text ';
  let err = true;

  if(event && event.queryStringParameters && event.queryStringParameters.text) {
    response = onionify(event.queryStringParameters.text)
    err = false;
  }

  return {
    headers: {
      "content-type": "application/json"
    },
    statusCode: 200,
    body: JSON.stringify({
      response_type: err ? 'ephemeral' : 'in_channel',
      text: response
    })
  };
}
