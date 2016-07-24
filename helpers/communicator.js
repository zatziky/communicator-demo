var request = require('request');

var CommunicatorApi = {
  _API_URL: "https://leafdock.com/api/v1/",
  _oAuthToken: process.env.COMMUNICATOR_OAUTH_TOKEN,

  send: function (customerId, message) {
    request.post({
      url: this._API_URL + "messages",
      headers: {
        "Authorization": "Bearer " + this._oAuthToken,
      },
      json: true,
      body: {
        "recipient": {
          "id": customerId
        },
        "message": message
      }
    }, function (error, response, body) {
      if (!error) {
        if (response.statusCode >= 400) {
          console.log("error sending message to customer " + customerId);
          console.log(response.statusCode, body);
        } else {
          console.log("message successfully sent to customer " + customerId + " with http status code " +
            response.statusCode, body);
        }
      } else {
        console.log("error while sending message to customer", error);
      }
    })
  }
};

module.exports = CommunicatorApi;
