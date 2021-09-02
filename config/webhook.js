var axios = require("axios");
var qs = require("qs");
require("dotenv/config");

class Webhook {
  create_webhook = async (link_ngrok) => {
    return new Promise((resolve, reject) => {
      var data = qs.stringify({
        subscription_url: link_ngrok,
        event_action: "updated",
        event_object: "deal",
      });
      var config = {
        method: "post",
        url:
          "https://api.pipedrive.com/v1/webhooks?api_token=" +
          process.env.TOKEN_PIPEDRIVE,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie:
            "__cf_bm=3e84cc9ce1dc7d76725751ddca79c4cdc28d4e86-1630548469-1800-AcUiaXOAnPFu4/S+As+yDEYGSFmJ70PvM9d49bHOA3MeFAbrSCx8CTUymI5QcJ22hEWfPZBQhVfSYA45Sqf4jtc=",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  };

}

module.exports = Webhook;
