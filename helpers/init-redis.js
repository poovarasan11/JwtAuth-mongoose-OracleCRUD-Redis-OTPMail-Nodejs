const redis = require("redis");

const client = redis.createClient({
  port: 6379,
  host: "127.0.0.1",
});

client.on("connect", () => {
  console.log("Client connected to redis port 6379...");
});

client.on("ready", () => {
  console.log("Client connected to redis and ready to use...");
});

client.on("error", (err) => {
  console.log(err.message);
});

client.on("end", () => {
  console.log("Client disconnected from redis");
});
client.connect((err) => {
  console.log(err);
});

process.on("SIGINT", () => {
  client.quit();
});

module.exports = client;
