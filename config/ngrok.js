const ngrok = require("ngrok");
const pipedrive_webhook = require("./webhook");
const pw = new pipedrive_webhook();
require("dotenv/config");

(async function () {
  //exposing my localhost to web using ngrok
  ngrok.connect(process.env.PORT).then((url) => {
    console.log(url);
    pw.create_webhook(url + "/async/opportunity").then((response) => {
      if (response.status == "ok") {
        console.log("CREATED AND CONFIGURATED A WEBHOOK");
      } else {
        console.log("ERROR CREATED AND CONFIGURATED A WEBHOOK");
      }
    });
  });
})();
