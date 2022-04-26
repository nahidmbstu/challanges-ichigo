// i have used redis as in memory data structure
const redis = require("redis");

const client = redis.createClient({
  url: "redis://127.0.0.1:6379",
});

async function connectRedis() {
  client.on("error", (err) => console.log("Redis Client Error", err));
  client.connect();
}
connectRedis();

module.exports = client;
