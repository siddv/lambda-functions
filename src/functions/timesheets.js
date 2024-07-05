exports.handler = async (event, context) => {
  return {
    headers: {
      "content-type": "application/json"
    },
    statusCode: 200,
    body: JSON.stringify({
      response_type: 'in_channel',
      text: ':alphabet-white-t: :alphabet-white-i: :alphabet-white-m:  :alphabet-white-e: :alphabet-white-s: :alphabet-white-h: :alphabet-white-e: :alphabet-white-e: :alphabet-white-t: :alphabet-white-s:'
    })
  };

}
