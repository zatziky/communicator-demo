var CommunicatorApi = require('../helpers/communicator');
var express = require('express');
var router = express.Router();
/*
 POST to webhooks (webhook url can be set in leafdock.com app to any address of your choice
 i.e. https://my-app.com/leafdock-webhook, '/communicator' entry point here is just our
 custom implementation for this example). Received message is in following format:
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
        CommunicatorApi.send(message.sender.id, {
          "text": "Díky za zakoupení jízdenky! Využíváme messenger pro to, abychom mohli našim zakazníkům poskytovat " +
              "stále lepší servis. Pokud na nás máte nějaký dotaz, neváhejte nám tedy napsat přímo zde. Váš Regio JET :-)",
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "generic",
              "elements": [
                {
                  "title": "Praha -> Brno",
                  "image_url": "http://test.leafdock.com/img/qrcode.png",
                  "subtitle": "Jizdenka c. 2154687654\n15:00 - 16:30\n130 Kc",
                  "buttons":[
                    {
                      "type":"web_url",
                      "url":"https://jizdenky.studentagency.cz/OnlineTicket?pam1=2843155134&pam2=1466504197217",
                      "title":"Detail"
                    }
                  ]
                },
                {
                  "title": "Praha -> Brno",
                  "image_url": "http://test.leafdock.com/img/qrcode.png",
                  "subtitle": "Jizdenka c. 2154687655\n15:00 - 16:30\n130 Kc",
                  "buttons":[
                    {
                      "type":"web_url",
                      "url":"https://jizdenky.studentagency.cz/OnlineTicket?pam1=2843155134&pam2=1466504197217",
                      "title":"Detail"
                    }
                  ]
                }
              ]
            }
          }
        });
      }
    }
  }
  res.sendStatus(201);
});

module.exports = router;
