var request = require('request');

var CommunicatorApi = {
  _API_URL: "https://leafdock.com/api/v1/",
  _oAuthToken: "secret_token123",

  send: function (customerId, message) {
    request.post({
      url: this._API_URL + "messages",
      headers: {
        "Authorization": "Bearer " + this._oAuthToken,
        "Content-Type": "application/json"
      }
    }, function (error, response, body) {
      if (response.statusCode >= 400) {
        console.log("error sending message to customer " + customerId);
        console.log(response.statusCode, JSON.parse(body));
      } else {
        console.log("message successfully sent to customer " + customerId + " with http status code " +
          response.statusCode + " and body " + JSON.parse(body));
      }
    })
  }
};

module.exports = CommunicatorApi;
