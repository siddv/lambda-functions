exports.handler = async (event, context) => {
  let response = 'Please specify some text ';
  let err = true;

  return {
    headers: {
      "content-type": "application/json"
    },
    statusCode: 200,
    body: JSON.stringify({
      response_type: 'in_channel',
      text: 'https://www.youtube.com/watch?v=1Bix44C1EzY'
    })
  };

}
