var CommunicatorApi = require('../helpers/communicator');
var express = require('express');
var router = express.Router();
/* POST to webhooks.
* */
/*
 POST to webhooks. Message in format of:
  {
    "project": {
      "id": "PROJECT_ID"
    },
    "messaging": [
      {
        "sender": {
          "id": "CUSTOMER_ID"
        },
        "recipient": {
          "id": "PROJECT_ID"
        },
        ...
      }
    ]
  }
 */
router.post('/communicator', function(req, res, next) {
  if (req.body.messaging) {
    for(var i in req.body.messaging) {
      var message = req.body.messaging[i];
      // authentication webhook
      if (message.auth) {
        // ref data can be used for matching the user in your database
        console.log("callback ref data: " + message.auth.ref);
        // send required ticket
        CommunicatorApi.send(message.sender.id, "Here is your ticket number: 23491282");
      }
    }
  }
  res.sendStatus(201);
});

module.exports = router;
