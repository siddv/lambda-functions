import cases from './modules/botato/cases';

exports.handler = async (event, context) => {
  
  let text = '';

  console.log('event', event);

  function genericError (text) {
    return {
      headers: {
        "content-type": "application/json"
      },
      statusCode: 200,
      body: JSON.stringify({
        response_type: "ephemeral",
        text: text || 'It didn\'t work. Try `/b help`.'
      })
    }
  };

  if(event && event.queryStringParameters && event.queryStringParameters.text) {
      text = event.queryStringParameters.text
  } else {
    return genericError()
  }

  let command = text.split(' ')[0];

  if(cases[command]) {
    return cases[command](text, genericError)
  } else {
    return genericError()
  }
}
