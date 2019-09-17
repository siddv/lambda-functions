import results from './modules/londontobrighton/results.csv';

exports.handler = async () => {
  return {
    headers: {
      "content-type": "application/json"
    },
    statusCode: 200,
    body: JSON.stringify(results)
  }
}
