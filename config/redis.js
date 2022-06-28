require("dotenv").config();
const redis = require("redis");

let client;

(async function () {
  client = redis.createClient();
  await client.connect();
})();
client.on("connect", () => {
  console.log("connected to redis server");
});

module.exports = {
  client,
};
