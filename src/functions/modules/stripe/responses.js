export default class Respond {

  constructor (event, context) {
    this.event = event
    this.context = this.context

    this.basicResponse = {
      headers: {
        "content-type": "application/json"
      },
      statusCode: 200,
      body: JSON.stringify({
        message: 'Yo.'
      })
    }
  }

  _respond(response = {}, body) {
    return Object.assign(
      {},
      this.basicResponse,
      response,
      {body: JSON.stringify(body)}
    );
  }

  methodNotAllowed() {
    return this._respond({
        statusCode: 405
      },{
        message: 'you can only POST to this endpoint'
      }
    )
  }
}