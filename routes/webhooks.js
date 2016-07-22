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
        // send required bill
        console.log("callback ref data: " + message.auth.ref);
        // TODO
      }
    }
  }
  res.sendStatus(201);
});

module.exports = router;
