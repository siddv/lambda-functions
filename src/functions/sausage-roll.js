exports.handler = async (event, context) => {
  let response = ':sausage-roll-left::sausage-roll-middle::sausage-roll-right:'

  if(event && event.queryStringParameters && event.queryStringParameters.text) {
    response = `:sausage-roll-top:\n${(':sausage-roll-middle-vertical:\n'.repeat(parseInt(event.queryStringParameters.text)))}:sausage-roll-bottom:`;
  }

  return {
    headers: {
      "content-type": "application/json"
    },
    statusCode: 200,
    body: JSON.stringify({
      response_type: 'in_channel',
      text: response
    })
  };

}