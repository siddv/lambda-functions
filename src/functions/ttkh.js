exports.handler = async (event, context) => {
  return {
    headers: {
      "content-type": "application/json"
    },
    statusCode: 200,
    body: JSON.stringify({
      response_type: 'in_channel',
      text: 'https://youtu.be/gLoBkbsUGyc'
    })
  };

}
