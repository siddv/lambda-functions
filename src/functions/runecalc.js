 const runec = (chance, drops) => {
  let run = true;
  let i = 0;
  let successes = [];
  while(run === true) {
    const interation = Math.floor(Math.random() * chance + 1);
    if (interation === chance) {
      successes.push(i);
      if(successes.length === dropsNeeded) {
        run = false;
      }
    }
    i++;
  }
  return successes;
};

exports.handler = async (event, context) => {
  let statusCode = 400;
  let responseBody = { error: 'please make sure you\'ve specified "chance" and "drops" query params' };

  if (event && event.queryStringParameters && event.queryStringParameters.chance && event.queryStringParameters.drops) {
    statusCode = 200;
    const successes = runec(event.queryStringParameters.chance,  event.queryStringParameters.drops);
    responseBody = { successes };
  }

  return {
    headers: {
      "content-type": "application/json"
    },
    statusCode: 200,
    body:  JSON.stringify(responseBody),
  };
};
