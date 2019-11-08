exports.handler = async (event, context) => {
  let response = 'Please specify some text ';
  let err = true;

  if(event && event.queryStringParameters && event.queryStringParameters.text) {
    response = `https://giphy.com/search/${event.queryStringParameters.text}`
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
