const redis = require("redis");

const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || "redis-master",
    port: process.env.REDIS_PORT || 6379
  },
  username: "default",
  password: process.env.REDIS_PASSWORD
});

client.on("error", (err) => console.error("Redis error:", err));

(async () => {
  await client.connect();
  console.log("Connected to Redis");
})();

module.exports = client;
