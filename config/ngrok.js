const ngrok = require("ngrok");
const pipedrive_webhook = require("./webhook");
const pw = new pipedrive_webhook();
require('dotenv/config');

(async function () {
  //exposing my localhost to web using ngrok
  const url = await ngrok.connect(process.env.PORT);
  console.log(url)
  const response = await pw.create_webhook(url + "/async/opportunity");
  if (response.status == "ok") {
    console.log("CREATED AND CONFIGURATED A WEBHOOK");
  } else {
    console.log("ERROR CREATED AND CONFIGURATED A WEBHOOK");
  }
})();
